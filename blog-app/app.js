var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/restful_app", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE CONFIG SCHEMA AND MODEL

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  text: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);


// RESTFUL ROUTES


app.listen(3000, function(){
  console.log('Listening on port 3000');
});
