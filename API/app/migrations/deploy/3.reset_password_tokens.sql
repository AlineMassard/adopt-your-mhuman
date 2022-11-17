-- Deploy mhumain:3.reset_password_tokens to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "password_token" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "account_id" integer NOT NULL REFERENCES "account"("id") ON DELETE CASCADE,
  "token" TEXT NOT NULL,  
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

COMMIT;