-- Deploy mhumain:2.mailing_system to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "human_has_message" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "human_id" integer NOT NULL REFERENCES "human"("id"),
  "cat_id" integer NOT NULL REFERENCES "cat" ("id"),  
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz, 
  UNIQUE ("human_id", "cat_id")
);

CREATE TABLE IF NOT EXISTS "cat_has_message" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "cat_id" integer NOT NULL REFERENCES "cat"("id"),
  "human_id" integer NOT NULL REFERENCES "human" ("id"),  
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz, 
  UNIQUE ("cat_id", "human_id")
);

COMMIT;
