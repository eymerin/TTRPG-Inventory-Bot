const router = require('express').Router();
const { Player, Inventory, Item } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn || false;

    // Retrieve the player using the player_id from the session
    const playerData = await Player.findByPk(req.session.player_id, {
      include: [
        {
          model: Inventory,
          attributes: ['inventory_name'],
        },
      ],
    });

    // Check if playerData is null
    if (!playerData) {
      res.status(404).send('Player not found');
      return;
    }

    // Retrieve inventories
    const inventories = playerData.Inventories.map((inventory) => inventory.get({ plain: true }));

    // Render the inventory view
    res.render('inventory', {
      inventories,
      loggedIn,
      playerSess: req.session.player_id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/inventory', withAuth, async (req, res) => {
    try {
        const inventoryData = await Inventory.findByPk(req.params.id, {
            include: [
                {
                    model: Item,
                    attributes: [
                        'item_id',
                        'item_name',
                        'item_description',
                        'inventory_id',
                    ],
                },
            ],
        });

        const inventory = inventoryData.get({ plain: true });
        res.render('inventory', { inventory, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/item/:id', withAuth, async (req, res) => {
    try {
        const itemData = await Item.findByPk(req.params.id);
        const item = itemData.get({ plain: true });
        res.render('item', { item, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;