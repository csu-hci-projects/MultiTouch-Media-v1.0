const express = require('express');
const app = express();

const port = 8088;

app.set('view engine', 'pug');

//For all requests to localhost:port/, call main().
app.get('/', main)
//Allow the all to use /images.
app.use('/images', express.static(__dirname + '/images'));
//Allow the all to use /js.
app.use('/js', express.static(__dirname + '/js/'));
//Allow the all to use /css.
app.use('/css', express.static(__dirname + '/css/'));

//Called for page localhost:port/.
function main(req, res){
    //If true, touch is enabled and mouse is disabled.
    let doTouch = true;
    //Add ?notouch to the url to turn off touch, or use the hidden slider in the top right.
    if(req.param('notouch') === '') doTouch = false; 

    //for now, set this to your UI 8-)
    let menu = "radial"
    if(req.param('dial') === '') menu = 'dial'; 
    else if(req.param('basic') === '') menu = 'basic';
    else if(req.param('radial') === '') menu = 'radial';
    //Render views/index.pug with the following two javascript variables included. 
    res.render('index', {touch: doTouch, menu: menu});
}

//This runs the server on the specified port
app.listen(port, () => console.log(`Listening on port ${port}!`));


