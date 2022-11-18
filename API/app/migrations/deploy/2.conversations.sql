-- Deploy mhumain:2.conversations to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "conversation" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "cat_id" integer NOT NULL REFERENCES "cat"("id")  ON DELETE CASCADE,
  "human_id" integer NOT NULL REFERENCES "human" ("id")  ON DELETE CASCADE,
  "author" TEXT NOT NULL, 
  "message" TEXT NOT NULL, 
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

COMMIT;
