var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/test', function (req, res) {
    res.json({hello: 'world'});
});

app.post('/rawText', function(req,res){
   console.log(req.body);
   res.send('thanks');
});


app.listen(8000);