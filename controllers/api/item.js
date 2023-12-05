



// Renders all
router.get('/', async (req, res)=>{
    return res.render('all', item[req.params.num-1]);
});

// Renders the item by id
router.get('/item/:num', async (req, res)=>{
    return res.render('', item[req.params.num-1]);
});