const db = require('./db.js');

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.POST || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => { console.log(`Server is on, port ${port}.`) });

app.get('/items', (req,res) => res.json(db.items));

app.post('/form', (req,res) => {
    db.add(req.body);
    res.status(200).send('Data received');
})
