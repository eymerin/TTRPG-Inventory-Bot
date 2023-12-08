const router = require('express').Router();
const { Player } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const playerData = await Player.create(req.body);

    req.session.save(() => {
      req.session.player_id = playerData.player_id;
      req.session.logged_in = true;
      console.log('user-routes', player_id);
      res.status(200).json(playerData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    const playerData = await Player.findOne({ where: { username: req.body.username } });
    console.log('Player Data:', playerData);

    if (!playerData) {
      console.log('User not found');
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Compare the provided password (req.body.password) with the hashed password from the database
    const validPassword = await bcrypt.compare(req.body.password, playerData.password);

    console.log('Valid Password:', validPassword);

    if (!validPassword) {
      console.log('Invalid password');
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.player_id = playerData.player_id;
      req.session.logged_in = true;
      console.log('User logged in:', playerData.username);
      res.json({ player: playerData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
