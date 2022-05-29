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