const db = require('./db.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.POST || 3000;

app.listen(3000, () => { console.log(`Server is on, port ${port}.`) });
app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/items', (req, res) => {
    if (req.query.id) {
        const search = db.adminSearch(req.query.id);
        search ? res.status(200).json(search) : res.status(404).json('No entry found');
    } else {
        const itemArr = db.itemArr;
        itemArr.length ? res.status(200).json(itemArr) : res.status(404).json('No entries found');
    }
});

app.post('/items', (req, res) => {
    const add = db.adminAdd(req);
    add ? res.status(200).json('Entry created') : res.status(404).json('Adding failed');
});

app.put('/items', (req, res) => {
    const update = db.adminUpdate(req);
    update ? res.status(200).json('Entry updated') : res.status(404).json('Could not update');
});

app.delete('/items', (req, res) => {
    const del = db.adminDelete(req);
    del ? res.status(200).json('Entry deleted') : res.status(404).json('Item not found');
})