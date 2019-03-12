const express = require('express');
const app = express();

const port = 1025;
app.get('/', main);
function main(req, res){
    res.send("A multitouch paint app.");
}

app.listen(port, () => console.log(`Listening on port ${port}!`));
