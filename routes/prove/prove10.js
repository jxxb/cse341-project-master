const express = require('express');
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'prove10.json'
 );

    const router = express.Router();

    // Path to your JSON file, although it can be hardcoded in this file.
    const dummyData = require('../../data/prove10.json')

    router.get('/', (req, res, next) => {
        res.render('pages/prove/prove10', {
            mTitle: 'Prove 10',
            path: '/prove/prove10',
            
        });
    });

    router.get('/fetchAll', (req, res, next) => {

        let sync = fs.readFileSync(p);
        sync = JSON.parse(sync);
        res.json(sync);

    });

    router.post('/insert', (req, res, next) => {
      console.log(req.body);
      let sync = fs.readFileSync(p);
        sync = JSON.parse(sync);
        sync.avengers.push({
            name: req.body.name,
        })
        fs.writeFile(p, JSON.stringify(sync), (err) => {
            if(err) {
                throw new Error(err);
            }
            console.log('data');
        }); 
        next();
    });

module.exports = router;