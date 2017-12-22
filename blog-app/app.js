var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost/restful_app", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));


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
  // Sanitize user inputs
  req.body.blog.body = req.sanitize(req.body.blog.body);
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
app.put('/blogs/:id', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog){
    if (error) {
      console.log(error);
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

// Destroy route
app.delete('/blogs/:id', function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(error){
    if (error) {
      console.log(error);
    }
    res.redirect('/blogs');
  });
});


// START SERVER

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
