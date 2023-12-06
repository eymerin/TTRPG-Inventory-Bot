DROP DATABASE IF EXISTS ttrpg_db;
CREATE DATABASE ttrpg_db;
USE ttrpg_db;

DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS players;

CREATE TABLE players (
  id INT NOT NULL,
  player_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE inventory (
  id INT NOT NULL,
  inventory_name VARCHAR(30) NOT NULL,
  players_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (players_id)
    REFERENCES players(id)
    ON DELETE SET NULL
);

CREATE TABLE item (
  id INT NOT NULL,
  item_name VARCHAR(30),
  item_description TEXT,
  inventory_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (inventory_id)
    REFERENCES inventory(id)
    ON DELETE SET NULL
);

CREATE TABLE tag (
  id INT,
  tag_name VARCHAR(30) NOT NULL,
  item_id INT,
  tag_attributes TEXT,
  FOREIGN KEY (item_id)
    REFERENCES item(id)
    ON DELETE SET NULL
);