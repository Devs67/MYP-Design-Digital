CREATE TABLE IF NOT EXISTS sessions (code TEXT PRIMARY KEY, quiz TEXT NOT NULL, status TEXT NOT NULL, created INTEGER NOT NULL, started INTEGER, ended INTEGER);
CREATE TABLE IF NOT EXISTS players (id TEXT PRIMARY KEY, code TEXT NOT NULL, name TEXT NOT NULL, section TEXT, joined INTEGER NOT NULL, score INTEGER, total INTEGER, finished INTEGER, answers TEXT);
CREATE INDEX IF NOT EXISTS players_code ON players (code);
CREATE TABLE IF NOT EXISTS quiz_results (id TEXT PRIMARY KEY, quiz TEXT NOT NULL, name TEXT NOT NULL, section TEXT, score INTEGER NOT NULL, total INTEGER NOT NULL, per TEXT, marks TEXT, checked INTEGER NOT NULL, received INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS quiz_results_quiz ON quiz_results (quiz, received);

/*
  Live quiz tables. In the D1 dashboard console, paste ONE line at a time and press Execute.
  (The console joins lines together, so comments must stay down here.)

  sessions: code = 4-character join code, quiz = e.g. critb-l2,
            status = waiting | live | ended, created/started/ended = ms timestamps
  players:  id = random, kept by the student's page; code = session code;
            finished = when they submitted; answers = compact answer string for checking later
  quiz_results: one row per quiz attempt (MYP 2 quiz). id = attempt id from the page,
            per = JSON of strand/skill scores, marks = 1/0 per question, checked = when the
            student checked, received = when the server stored it
*/
