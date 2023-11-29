DROP DATABASE IF EXISTS ttrpg_db;
CREATE DATABASE ttrpg_db;

USE ttrpg_db;

CREATE TABLE players (
  id INT NOT NULL,
  player_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE inventory (
  id INT,
  inventory_name VARCHAR(30) NOT NULL,
  player_id INT,
  FOREIGN KEY (player_id)
  REFERENCES players(id)
  ON DELETE SET NULL
);

CREATE TABLE item (
  id INT,
  item_name VARCHAR(30) NOT NULL,
  inventory_id INT,
  item_description TEXT,
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