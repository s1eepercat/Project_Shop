const db = require('./db.js');

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.POST || 3000;

app.listen(3000, () => { console.log(`Server is on, port ${port}.`) });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static('public'));

app.get('/items', (req,res) => res.json(db.items));

app.post('/find', (req,res) => {
    const search = db.find(req.body);
    search ? res.status(200).json(search) : res.status(404);
})

app.post('/items', (req,res) => {
    db.add(req.body);
    res.status(200).send(JSON.stringify('Entry created'));
});

app.put('/items', (req,res) => {
    db.update(req.body);
    res.status(200).send(JSON.stringify('Entry updated'));
});


