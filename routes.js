import { toys, categories } from './data';

import express, { urlencoded } from 'express';
let app = express();
const port = 3000;

app.use(urlencoded({ extended: true }));

function handleStringsToNumber(body) {
    if (typeof body.price === 'string') {
        body.price = parseFloat(body.price);
    }
    if (typeof body.category_id === 'string') {
        if (body.category_id === 'null') {
            body.category_id = null;
        } else {
            body.category_id = parseInt(body.category_id);
        }
    }
}

app.all('/toys', function (req, res) {
    if (req.method === 'GET') {
        res.json(toys);
    } else if (req.method === 'POST') {
        if (Object.keys(req.body).length === 4 && ['name', 'description', 'price', 'category_id'].every((el) => Object.keys(req.body).includes(el))) {
            handleStringsToNumber(req.body);
            toys = [...toys, req.body];
            res.json(toys.slice(-1)[0]);
        } else {
            res.sendStatus(422);
        }
    } else {
        res.sendStatus(404);
    }
});
app.all('/toys/:id', (req, res) => {
    if (req.params.id >= 0 && req.params.id <= toys.length - 1) {
        if (req.method === 'GET') {
            res.json(toys[req.params.id]);
        } else if (req.method === 'PUT') {
            if (req.body.category_id || req.body.price) {
                handleStringsToNumber(req.body);
                if (req.body.category_id || req.body.category_id === null) {
                    toys[req.params.id].category_id = req.body.category_id;
                }
                if (req.body.price) {
                    toys[req.params.id].price = req.body.price;
                }
            }
            if (req.body.name) {
                toys[req.params.id].name = req.body.name;
            }
            if (req.body.description) {
                toys[req.params.id].description = req.body.description;
            }
            res.json(toys[req.params.id]);
        } else if (req.method === 'DELETE') {
            let deletedObjectsArray = toys.splice(req.params.id, 1);
            res.json(deletedObjectsArray[0]);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});

app.all('/categories', function (req, res) {
    if (req.method === 'GET') {
        res.json(categories);
    } else if (req.method === 'POST') {
        if (Object.keys(req.body).length === 1 && Object.keys(req.body).includes('name')) {
            handleStringsToNumber(req.body);
            categories = [...categories, req.body];
            res.json(categories.slice(-1)[0]);
        } else {
            res.sendStatus(422);
        }
    } else {
        res.sendStatus(404);
    }
});
app.all('/categories/:id', (req, res) => {
    if (req.params.id >= 0 && req.params.id <= categories.length - 1) {
        if (req.method === 'GET') {
            res.json(categories[req.params.id]);
        } else if (req.method === 'PUT') {
            if (req.body.name) {
                categories[req.params.id].name = req.body.name;
            }
            res.json(categories[req.params.id]);
        } else if (req.method === 'DELETE') {
            let deletedObjectsArray = categories.splice(req.params.id, 1);
            res.json(deletedObjectsArray[0]);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});
app.all('/categories/:name/toys', function (req, res) {
    let indexOfSearchObject;
    if (
        categories.some((el) => {
            if (Object.values(el).includes(req.params.name)) {
                indexOfSearchObject = categories.indexOf(el);
                return true;
            }
        })
    ) {
        if (req.method === 'GET') {
            let resultArray = [];
            toys.map((el) => {
                if (Object.values(el).includes(indexOfSearchObject)) {
                    resultArray.push(el);
                }
            });
            res.json(resultArray);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(port, () => {});
