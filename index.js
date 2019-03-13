const express = require('express');
const app = express();

const port = 1025;
app.set('view engine', 'pug');
app.get('/', main);

function main(req, res){
    res.render('index');
}

app.listen(port, () => console.log(`Listening on port ${port}!`));


