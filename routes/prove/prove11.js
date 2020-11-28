const express = require('express');

    const router = express.Router();

    // Path to your JSON file, although it can be hardcoded in this file.
    const dummyData = {"avengers":[{"name":"Tony Stark","power":"Smart"}]}

    router.get('/', (req, res, next) => {
        res.render('pages/prove/prove11', {
            mTitle: 'Prove 11',
            path: '/prove/prove11',
        });
    });

    router.get('/fetchAll', (req, res, next) => {
        res.json(dummyData);
    });

    router.post('/insert', (req, res, next) => {
      
        if (!dummyData.avengers.some(i=> {
            return i.name === req.body.name && i.power === req.body.power;
        }))
        {
        dummyData.avengers.push({
            name: req.body.name,
            power: req.body.power,
        })
    };
    res.json(dummyData);
});

module.exports = router;