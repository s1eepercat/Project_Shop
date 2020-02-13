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
app.post('/items', (req,res) => {
    console.log(req.body);
    db.add(req.body);
    res.status(200).send('Data received');
})
