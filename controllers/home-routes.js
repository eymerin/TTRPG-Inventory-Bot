const router = require('express').Router();
const { Player, Inventory, Item } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log(req.session.player_id);
    const loggedIn = req.session.loggedIn || false;

    const inventoryData = await Player.findByPk(req.session.player_id, {
      include: [
        {
          model: Inventory,
          attributes: ['inventory_name'],
        },
      ],
    });

    if (!inventoryData) {
      // Handle the case where the player with the specified ID is not found
      res.status(404).send('Player not found');
      return;
    }

    const inventories = inventoryData.get({ plain: true });
    // need to save player_id from session to find correct inventory
    const playerSess = req.session.player_id;
    
    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      req.session.player_id;

      res.render('inventory', {
        inventories,
        loggedIn:req.session.loggedIn,
        // We send over the current 'countVisit' session variable to be rendered
        playerSess: req.session.player_id,
      });
      console.log(inventories);
      console.log(playerSess);
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/inventory/:id', withAuth, async (req, res) => {
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