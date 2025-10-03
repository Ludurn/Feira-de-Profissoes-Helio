CREATE TABLE IF NOT EXISTS user_table (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(15) NOT NULL,
    user_email VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS image_table (
    image_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES user_table(user_id),
    image_url TEXT NOT NULL,
    public_id VARCHAR(225) NOT NULL
);

CREATE TABLE IF NOT EXISTS adm_table (
    adm_id SERIAL PRIMARY KEY,
    adm_name VARCHAR(15) NOT NULL,
    adm_key CHAR(7) NOT NULL
);