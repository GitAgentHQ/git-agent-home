-- Webhook events: stores every incoming GitHub webhook event
CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  action TEXT,
  repository_full_name TEXT NOT NULL,
  pull_request_number INTEGER,
  payload TEXT NOT NULL,
  received_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Webhook registrations: tracks which repos have webhooks registered
CREATE TABLE IF NOT EXISTS webhook_registrations (
  id TEXT PRIMARY KEY,
  github_user_id TEXT NOT NULL,
  repository_full_name TEXT NOT NULL,
  webhook_id INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(repository_full_name)
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_events_repo ON webhook_events(repository_full_name);
CREATE INDEX IF NOT EXISTS idx_events_type ON webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_received ON webhook_events(received_at);
CREATE INDEX IF NOT EXISTS idx_events_pr ON webhook_events(pull_request_number);
CREATE INDEX IF NOT EXISTS idx_registrations_user ON webhook_registrations(github_user_id);