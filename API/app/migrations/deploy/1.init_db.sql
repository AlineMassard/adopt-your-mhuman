-- Deploy mhumain:1.init_db to pg

BEGIN;

CREATE DOMAIN email AS TEXT
--CHECK(VALUE ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'); regex not working --
CHECK(VALUE ~* '^(.+)@(.+)$');

CREATE TABLE IF NOT EXISTS "account" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" email NOT NULL UNIQUE,
  "password" text NOT NULL, --TODO voir quel type mettre ici selon comment on va sotcker les mot de pass (hash bcrypt, user session etc etc)
  "is_admin" boolean DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "human" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "pseudo" text NOT NULL UNIQUE,
  "image" text NOT NULL, 
  "name" varchar(64) NOT NULL,
  "description" text NOT NULL,
  "age" integer NOT NULL,
  "has_pets" boolean NOT NULL,
  "has_kids" boolean NOT NULL,
  "has_garden" boolean NOT NULL,
  "account_id" integer NOT NULL REFERENCES "account"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "cat" ( 
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "pseudo" text NOT NULL UNIQUE,
  "image" text NOT NULL, 
  "name" varchar(64) NOT NULL,
  "description" text NOT NULL,
  "race" varchar(64) NOT NULL,
  "age" integer NOT NULL,
  "sexe" varchar(64) NOT NULL,
  "color" varchar(64) NOT NULL,
  "likes_pets" BOOLEAN NOT NULL,
  "likes_kids" BOOLEAN NOT NULL, 
  "needs_garden" BOOLEAN NOT NULL,
  "is_adopted" BOOLEAN DEFAULT NULL,
  "siblings_id" integer DEFAULT NULL REFERENCES "cat"("id") ON DELETE CASCADE,
  "owner_id" integer DEFAULT NULL REFERENCES "human"("id") ON DELETE CASCADE,
  "account_id" integer NOT NULL REFERENCES "account"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "cat_has_favorites" ( --TODO voir si on doit faire une deuxième table d'associations pour dog_has_favorites ? semblerait que oui!
                                                 --TODO ou est ce que une seule table d'association 'has_favorites' suffit ? normalement oui car manyToMany. 
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "cat_id" integer NOT NULL REFERENCES "cat"("id") ON DELETE CASCADE,
  "human_id" integer NOT NULL REFERENCES "human" ("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz, 
  UNIQUE ("cat_id", "human_id")
);

CREATE TABLE IF NOT EXISTS "human_has_favorites" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "human_id" integer NOT NULL REFERENCES "human"("id") ON DELETE CASCADE,
  "cat_id" integer NOT NULL REFERENCES "cat" ("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz, 
  UNIQUE ("human_id", "cat_id")
);

COMMIT;
