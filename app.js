import express from 'express';
const app = express()
const port = 3000
import { toys, categories } from './data.js';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// -------------------------- TOYS -------------------------
// Route "/toys"
app.get('/toys', (request, response) => {
    response.json(toys);
})

// Route "/toys/:id"
app.get('/toys/:id', (req, res) => {
    console.log(req.url)
    if (toys[req.params.id]) {
        res.json(toys[req.params.id]);
    } 
    else {
        res.sendStatus(404);
    }
})

// POST "/toys"
app.post('/toys', (req, res) => {
    if (req.body.name && req.body.description && req.body.price && req.body.category_id) {
        toys.push({ 'name': req.body.name, 'description': req.body.description, 'category': parseInt(req.body.category_id), 'price': parseInt(req.body.price) });
        res.json(req.body);
    } else res.sendStatus(422);
})

// PUT "/toys/:id" -> on pouvait utiliser assign
app.put('/toys/:id', (req, res) => {
    if (toys[req.params.id]) {
        if (req.body.name) {
            toys[req.params.id].name = req.body.name;
        }
        if (req.body.description) {
            toys[req.params.description].name = req.body.description;
        }
        if (req.body.price) {
            toys[req.params.price].name = req.body.price;
        }
        if (req.body.category_id) {
            toys[req.params.category_id].name = req.body.category_id;
        }
        res.json(toys[req.params.id]);
    } else res.sendStatus(404);
})

// DELETE "/toys/:id"
app.delete('/toys/:id', (req, res, next) => {
    if (toys[req.params.id]) {
        res.json(toys.splice(req.params.id, 1)); // toys[req.params.id] = "";
    } else res.sendStatus(404);
})


app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
  });
  


// // ----------------------------------- CATEGORIES -------------------------------------
// GET "/categories"
app.get('/categories', (req, res) => {
    res.json(categories);
})

// GET "/categories/:id"
app.get('/categories/:id', (req, res) => {
    if (categories[req.params.id]) {
        res.json(categories[req.params.id]);
    } else res.sendStatus(404);
})

// POST "/categories"
app.post('/categories', (req, res) => {
    if (Object.keys(req.body).length === 1 && Object.keys(req.body).includes('name')) {
        categories.push(req.body);
        res.json(req.body);
    } else res.sendStatus(422);
})


app.put('/categories/:id', (req, res) => {
    if (categories[req.params.id]) {
        if (req.body.name) {
            categories[req.params.id].name = req.body.name;
        }
        res.json(categories[req.params.id]);
    } else res.sendStatus(404);
})

// app.delete('/categories/:id', (req, res) => {
//     if (categories[req.params.id]) {
//         res.json(categories.splice(req.params.id, 1));
//     } else res.sendStatus(404);
// })

// // "/categories/:name/toys"
app.get('/categories/:name/toys', (req, res) => {
    for (let i = 0; i < categories.length; i++) {
        if (cagfgtegories[i].name == req.params.name) {
            let categ_id = i;
            let categ_toys = [];
            for (let j = 0; j < toys.length; j++) {
                //console.log(toys[j].category_id);
                if (toys[j].category_id == categ_id) {
                    categ_toys.push(toys[j]);
                }
            }
            res.json(categ_toys);
        }
    }
})

// ------------------------------------ LISTEN --------------------------------------
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
