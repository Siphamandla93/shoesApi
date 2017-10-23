var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var Funtions = require('./API');
var Models = require('./models/schema');
var MongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost/shoesAPI';
var models = Models(MongoUrl);

var routes = Funtions(models);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
  next();
})

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// app.use(express.cookieParser('keyboard cat'));
app.use(session({
    secret: "keyboard cat",
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());


app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// List all shoes in the stock
app.get("/api/shoes", routes.allShoes);
app.get("/api/shoes/brand/:brandname", routes.brandFunction);
app.get("/api/shoes/size/:size", routes.sizeFunction);
app.get("/api/shoes/brand/:brandname/size/:size", routes.brandAndSize);
app.get("/api/shoes/sold/:id", routes.Quantity);
app.post("/api/shoes", routes.addShoes);



app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
