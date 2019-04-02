const express = require('express');
const app = express();

const port = 8888;
app.set('view engine', 'pug');
app.get('/', main)
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js/'));
app.use('/css', express.static(__dirname + '/css/'));

function main(req, res){
    let doTouch = true;
    if(req.param('notouch') === '') doTouch = false; 
    res.render('index', {touch: doTouch});
}

app.listen(port, () => console.log(`Listening on port ${port}!`));


