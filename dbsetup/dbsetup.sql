CREATE TABLE  IF NOT EXISTS "algorithms" (
	"alg_id" SERIAL PRIMARY KEY,
	"alg_question" VARCHAR
);

CREATE TABLE  IF NOT EXISTS "submissions" (
	"sub_id" SERIAL PRIMARY KEY,
	"code" VARCHAR,
	"username" VARCHAR,
	"submitted_at" TIMESTAMP DEFAULT NOW(),
	"alg_id" INT
);

ALTER TABLE submissions ADD CONSTRAINT submissions_fk0 FOREIGN KEY (alg_id) REFERENCES algorithms (alg_id);

INSERT INTO submissions (code, username) VALUES ('hey', 'ho');