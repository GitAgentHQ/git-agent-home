-- Multi-tenant subscriptions: which users receive events for which repos.
-- A repo-level webhook lives in webhook_registrations (one row per repo); each
-- user who wants events for that repo gets a row here.
CREATE TABLE IF NOT EXISTS webhook_subscriptions (
  id TEXT PRIMARY KEY,
  github_user_id TEXT NOT NULL,
  repository_full_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(repository_full_name, github_user_id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON webhook_subscriptions(github_user_id);