const express = require('express');
const app = express();

const port = 8088;
app.set('view engine', 'pug');
app.get('/', main)
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js/'));
app.use('/css', express.static(__dirname + '/css/'));

function main(req, res){
    let doTouch = true;
    let menu = "dial"
    
    if(req.param('notouch') === '') doTouch = false; 
    
    if(req.param('dial') === '') menu = 'dial'; 
    else if(req.param('basic') === '') menu = 'basic'; 
    res.render('index', {touch: doTouch, menu: menu});
}

app.listen(port, () => console.log(`Listening on port ${port}!`));


