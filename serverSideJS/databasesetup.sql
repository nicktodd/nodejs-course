DROP DATABASE IF EXISTS albums;
CREATE DATABASE albums;
use albums;
CREATE TABLE albums (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255),
    artist varchar(255),
    price float,
    tracks int,
    PRIMARY KEY (id)
);
INSERT INTO albums (title, artist, price, tracks) values ("Gold", "Abba", 12.99, 12);
INSERT INTO albums (title, artist, price, tracks) values ("Spice World", "Spice Girls", 4.99, 9);
