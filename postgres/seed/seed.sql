BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) VALUES ('jhon', 'jhonsnow@gmail.com',  5, '2023-10-27 13:44:45.351');
INSERT into login (email, hash) VALUES ('jhonsnow@gmail.com', '$2a$10$YO0A2HHFWJEOFLP/mGQR/eIgf5lDbLF2efPA2u3XgDz0YWjX7v97.');
-- password for the hash is: secret

COMMIT;