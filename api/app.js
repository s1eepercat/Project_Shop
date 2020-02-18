const db = require('./db.js');

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.POST || 3000;

app.listen(3000, () => { console.log(`Server is on, port ${port}.`) });

app.use('/', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/items', (req,res) => {
    const itemArr = db.itemArr;
    itemArr.length > 0 ? res.status(200).json(itemArr) : res.status(404).json('No entries found');
});

app.post('/items', (req,res) => {
    const search = db.search(req.body);
    search !== undefined ? res.status(200).json(search) : res.status(404).json('No entry found');
})

app.put('/items/update', (req,res) => {
    const update = db.update(req.body);
    update ? res.status(200).json('Entry updated') : res.status(404).json('Could not update');
});

app.delete('/items/delete', (req,res) => {
    const del = db.del(req.body);
    del ? res.status(200).json('Entry deleted') : res.status(404).json('Item not found');
})

app.post('/items/add', (req,res) => {
    const add = db.add(req.body);
    add ? res.status(200).json('Entry created') : res.status(404).json('Adding failed');
});