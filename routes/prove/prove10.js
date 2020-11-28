const express = require('express');
const router = express.Router();
const dummyData = {"avengers":[{"name":"Tony Stark","power":"Smart"}]}

router.get('/', (req, res, next) => {
    res.render('pages/prove/prove10', {
        mTitle: 'Prove 10',
        path: '/prove/prove10',
    });
});

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insert', (req, res, next) => {
    if (!dummyData.avengers.some(i=> {
        return i.name === req.body.name && i.power === req.body.power;})) {
            dummyData.avengers.push({
            name: req.body.name,
            power: req.body.power,
            })
        };
res.json(dummyData);
});

module.exports = router;