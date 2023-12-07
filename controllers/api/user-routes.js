const router = require('express').Router();
const { Player } = require('../../models');

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
    const playerData = await Player.findOne({ where: { username: req.body.player } });

    if (!playerData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await playerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.player_id = playerData.player_id;
      req.session.logged_in = true;
      
      res.json({ player: playerData, message: 'You are now logged in!' });
    });

  } catch (err) {
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
