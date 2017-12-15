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
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);


// RESTFUL ROUTES

// Index route
app.get('/', function(req, res){
  res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
  Blog.find({}, function(error, blogs){
    if (error) {
      console.log(error);
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

// New route
app.get('/blogs/new', function(req, res){
  res.render('new');
});

// Create route
app.post('/blogs', function(req, res){
  Blog.create(req.body.blog, function(error, newBlog){
    if (error) {
      console.log('There was an error. Try again.');
      res.render('new');
    } else {
      res.redirect('/blogs');
    }
  });
});

// Show route
app.get('/blogs/:id', function(req, res){
  Blog.findById(req.params.id, function(error, getBlog){
    if (error) {
      console.log(error);
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: getBlog});
    }
  });
});

// Edit route
app.get('/blogs/:id/edit', function(req, res){
  Blog.findById(req.params.id, function(error, getBlog){
    if (error) {
      console.log(error);
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: getBlog});
    }
  });
});

// Update route


// Destroy route


// START SERVER

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
