CREATE TABLE IF NOT EXISTS sessions (code TEXT PRIMARY KEY, quiz TEXT NOT NULL, status TEXT NOT NULL, created INTEGER NOT NULL, started INTEGER, ended INTEGER);
CREATE TABLE IF NOT EXISTS players (id TEXT PRIMARY KEY, code TEXT NOT NULL, name TEXT NOT NULL, section TEXT, joined INTEGER NOT NULL, score INTEGER, total INTEGER, finished INTEGER, answers TEXT);
CREATE INDEX IF NOT EXISTS players_code ON players (code);

/*
  Live quiz tables. In the D1 dashboard console, paste ONE line at a time and press Execute.
  (The console joins lines together, so comments must stay down here.)

  sessions: code = 4-character join code, quiz = e.g. critb-l2,
            status = waiting | live | ended, created/started/ended = ms timestamps
  players:  id = random, kept by the student's page; code = session code;
            finished = when they submitted; answers = compact answer string for checking later
*/
