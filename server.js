const express = require('express');

const app = express();

app.get('/api', (req,res) => {
    message = [
        {id: 1, firstName:'Swapnil', lastName:'Shinde'},
        {id: 2, firstName:'Rahul', lastName:'Sawant-Desai'},
        {id: 3, firstName:'Omkar', lastName:'Prabhu'},
    ]
    res.json(message);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

