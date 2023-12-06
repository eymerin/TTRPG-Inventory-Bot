const router = require('express').Router();
const { Inventory, Item } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbInventoryData = await Inventory.findall({
            include: [
                {
                    model: Inventory,
                    attributes: ['item_name', 'description'],
                },
            ],
        });

        const inventories = dbInventoryData.map((inventory) => 
        inventory.get({ plain: true })
        );

        res.render('player', {
            inventories,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/inventory/:id', withAuth, async (req, res) => {
    try {
        const dbInventoryData = await Inventory.findByPk(req.params.id, {
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

        const inventory = dbInventoryData.get({ plain: true });
        res.render('inventory', { inventory, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/item/:id', withAuth, async (req, res) => {
    try {
        const dbItemData = await Item.findByPk(req.params.id);

        const item = dbItemData.get({ plain: true });

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