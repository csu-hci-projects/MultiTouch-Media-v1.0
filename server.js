const express = require('express');
const app = express();

const port = 8088;
app.set('view engine', 'pug');
app.get('/', main)
app.use('/js', express.static(__dirname + '/js/'));

function main(req, res){


    res.render('index');
}

app.listen(port, () => console.log(`Listening on port ${port}!`));

