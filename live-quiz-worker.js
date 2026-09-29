/* ============================================================
   Live quiz Worker: class sessions for the Criterion B FA quiz, Level 2.

   Deployed through the Cloudflare dashboard as its own Worker
   (named myp-live-quiz, database myp-live-quiz), NOT from this repo. This file is
   the source to paste in. It is separate from the progress Worker.

   Bindings:  env.DB        D1 database (tables in live-quiz-schema.sql)
   Secrets:   env.ADMIN_KEY teacher key, never committed

   Teacher routes need ?key=. Students can join, wait and submit,
   but can never read the leaderboard.

   Also stores quiz results (/quiz/result, /quiz/results) for the MYP 2
   Criterion B quiz. Those routes have no key, by Dev's choice: anyone with
   the results page link can read them.
   ============================================================ */

const ORIGINS = ['https://devs67.github.io', 'http://127.0.0.1:5500', 'http://localhost:5500'];
// quizzes allowed to store results
const QUIZZES = ['critb-myp2'];
// same alphabet as progress codes: no I, L, O, 0, 1, S or 5
const CODE_CHARS = 'ABCDEFGHJKMNPQRTUVWXYZ2346789';

function cors(request) {
  const origin = request.headers.get('Origin');
  return {
    'Access-Control-Allow-Origin': ORIGINS.includes(origin) ? origin : ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...cors(request) }
  });
}

function randomString(chars, n) {
  const bytes = crypto.getRandomValues(new Uint8Array(n));
  let out = '';
  for (const b of bytes) out += chars[b % chars.length];
  return out;
}

function cleanCode(v) {
  const c = String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return /^[A-Z0-9]{4}$/.test(c) ? c : null;
}

function cleanText(v, max) {
  return String(v || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

async function readBody(request) {
  try { return await request.json(); } catch (e) { return {}; }
}

async function getSession(env, code) {
  return env.DB.prepare('SELECT code, status, started, ended FROM sessions WHERE code = ?').bind(code).first();
}

// Ranked by score, then by time taken since the teacher pressed Start.
async function board(env, session) {
  const { results } = await env.DB.prepare(
    'SELECT name, section, joined, score, total, finished FROM players WHERE code = ?'
  ).bind(session.code).all();
  const done = results.filter(p => p.finished != null);
  const waiting = results.filter(p => p.finished == null);
  done.sort((a, b) => (b.score - a.score) || (a.finished - b.finished));
  let rank = 0, prev = null;
  const ranked = done.map((p, i) => {
    const key = p.score + ':' + p.finished;
    if (key !== prev) rank = i + 1;
    prev = key;
    return { rank, name: p.name, section: p.section, score: p.score, total: p.total,
      seconds: session.started ? Math.max(0, Math.round((p.finished - session.started) / 1000)) : null };
  });
  waiting.sort((a, b) => a.joined - b.joined);
  return { ranked, waiting: waiting.map(p => ({ name: p.name, section: p.section })) };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors(request) });

    const url = new URL(request.url);
    const path = url.pathname;
    const isTeacher = !!env.ADMIN_KEY && url.searchParams.get('key') === env.ADMIN_KEY;
    const now = Date.now();

    try {
      /* ---------- teacher ---------- */
      if (path === '/live/create' && request.method === 'POST') {
        if (!isTeacher) return json(request, { error: 'Wrong key' }, 401);
        for (let tries = 0; tries < 8; tries++) {
          const code = randomString(CODE_CHARS, 4);
          if (await getSession(env, code)) continue;
          await env.DB.prepare('INSERT INTO sessions (code, quiz, status, created) VALUES (?, ?, ?, ?)')
            .bind(code, 'critb-l2', 'waiting', now).run();
          return json(request, { code, status: 'waiting' });
        }
        return json(request, { error: 'Could not make a code, try again' }, 500);
      }

      if (path === '/live/host' && request.method === 'GET') {
        if (!isTeacher) return json(request, { error: 'Wrong key' }, 401);
        const code = cleanCode(url.searchParams.get('code'));
        const session = code && await getSession(env, code);
        if (!session) return json(request, { error: 'No session with that code' }, 404);
        return json(request, { code, status: session.status, started: session.started, ...(await board(env, session)) });
      }

      if ((path === '/live/start' || path === '/live/end') && request.method === 'POST') {
        if (!isTeacher) return json(request, { error: 'Wrong key' }, 401);
        const body = await readBody(request);
        const code = cleanCode(body.code);
        const session = code && await getSession(env, code);
        if (!session) return json(request, { error: 'No session with that code' }, 404);
        if (path === '/live/start' && session.status === 'waiting') {
          await env.DB.prepare('UPDATE sessions SET status = ?, started = ? WHERE code = ?').bind('live', now, code).run();
        }
        if (path === '/live/end' && session.status !== 'ended') {
          await env.DB.prepare('UPDATE sessions SET status = ?, ended = ? WHERE code = ?').bind('ended', now, code).run();
        }
        const s = await getSession(env, code);
        return json(request, { code, status: s.status, started: s.started });
      }

      /* ---------- students ---------- */
      if (path === '/live/join' && request.method === 'POST') {
        const body = await readBody(request);
        const code = cleanCode(body.code);
        const name = cleanText(body.name, 60);
        const section = cleanText(body.section, 12);
        if (!code || !name) return json(request, { error: 'Code and name are needed' }, 400);
        const session = await getSession(env, code);
        if (!session) return json(request, { error: 'No quiz with that code. Check it with your teacher.' }, 404);
        if (session.status === 'ended') return json(request, { error: 'That quiz has finished.' }, 409);
        const player = randomString('abcdefghijkmnpqrstuvwxyz23456789', 12);
        await env.DB.prepare('INSERT INTO players (id, code, name, section, joined) VALUES (?, ?, ?, ?, ?)')
          .bind(player, code, name, section, now).run();
        return json(request, { player, status: session.status });
      }

      if (path === '/live/status' && request.method === 'GET') {
        const code = cleanCode(url.searchParams.get('code'));
        const session = code && await getSession(env, code);
        if (!session) return json(request, { error: 'No quiz with that code' }, 404);
        return json(request, { status: session.status });
      }

      if (path === '/live/submit' && request.method === 'POST') {
        const body = await readBody(request);
        const code = cleanCode(body.code);
        const player = String(body.player || '').slice(0, 20);
        const score = Math.floor(Number(body.score));
        const total = Math.floor(Number(body.total));
        if (!code || !player || !(total > 0) || !(score >= 0) || score > total) return json(request, { error: 'Bad result' }, 400);
        const session = await getSession(env, code);
        if (!session) return json(request, { error: 'No quiz with that code' }, 404);
        if (session.status !== 'live') return json(request, { error: session.status === 'ended' ? 'The quiz has finished.' : 'The quiz has not started.' }, 409);
        const row = await env.DB.prepare('SELECT finished FROM players WHERE id = ? AND code = ?').bind(player, code).first();
        if (!row) return json(request, { error: 'You are not in this quiz. Join again.' }, 404);
        if (row.finished != null) return json(request, { ok: true, already: true });
        await env.DB.prepare('UPDATE players SET score = ?, total = ?, finished = ?, answers = ? WHERE id = ?')
          .bind(score, total, now, String(body.answers || '').slice(0, 400), player).run();
        return json(request, { ok: true });
      }

      /* ---------- quiz results (MYP 2 quiz): no key, by Dev's choice ---------- */
      if (path === '/quiz/result' && request.method === 'POST') {
        const body = await readBody(request);
        const quiz = String(body.quiz || '');
        const id = String(body.id || '');
        const name = cleanText(body.name, 60);
        const section = cleanText(body.section, 12);
        const score = Math.floor(Number(body.score));
        const total = Math.floor(Number(body.total));
        const marks = String(body.marks || '');
        const checked = Math.floor(Number(body.checked)) || now;
        if (!QUIZZES.includes(quiz) || !/^[a-z0-9-]{3,40}$/.test(id) || !name ||
            !(total > 0 && total <= 100) || !(score >= 0 && score <= total) || !/^[01]{1,100}$/.test(marks)) {
          return json(request, { error: 'Bad result' }, 400);
        }
        const per = JSON.stringify(body.per || {}).slice(0, 600);
        // the same attempt can be sent twice (refresh, retry); the id keeps one row per attempt
        await env.DB.prepare('INSERT OR IGNORE INTO quiz_results (id, quiz, name, section, score, total, per, marks, checked, received) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
          .bind(id, quiz, name, section, score, total, per, marks, checked, now).run();
        return json(request, { ok: true });
      }

      if (path === '/quiz/results' && request.method === 'GET') {
        const quiz = String(url.searchParams.get('quiz') || '');
        if (!QUIZZES.includes(quiz)) return json(request, { error: 'Unknown quiz' }, 404);
        const { results } = await env.DB.prepare(
          'SELECT name, section, score, total, per, marks, checked, received FROM quiz_results WHERE quiz = ? ORDER BY received DESC LIMIT 2000'
        ).bind(quiz).all();
        return json(request, { results: results.map(r => {
          let per = {};
          try { per = JSON.parse(r.per || '{}'); } catch (e) {}
          return { ...r, per };
        }) });
      }

      return json(request, { error: 'Not found' }, 404);
    } catch (e) {
      return json(request, { error: 'Server error' }, 500);
    }
  }
};
