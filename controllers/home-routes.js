const router = require('express').Router();
const { Inventory, Item } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const inventoryData = await Inventory.findAll({
        include: [
          {
            model: Inventory,
            attributes: ['item_name', 'description'],
          },
        ],
      });
  
      const inventories = inventoryData.map((inventory) =>
        inventory.get({ plain: true })
      );
  
      res.render('main', {
        inventories,
        loggedIn: req.session.loggedIn,
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