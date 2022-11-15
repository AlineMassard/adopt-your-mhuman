-- Deploy mhumain:3.jwt_log to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "user_tokens" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "user_id" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,  
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

COMMIT;
