var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    request    = require("request"),
    express    = require("express");

const app = express();

//MODELS
var Movie = require("./models/Movie");

mongoose.connect("mongodb://localhost/project", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//ROUTES
app.get("/", function(req, res){
  Movie.find({}, function(err, movies){
    if (err)
      console.log(err);
    else
      res.render("home", {movies: movies});
  });
});

app.get("/movie/:id", function(req, res){
  request("http://www.omdbapi.com/?apikey=34ae9d2e&t=" + req.params.id, function(error, response, body){
      if(!error && response.statusCode == 200){
        var movie = JSON.parse(body)
        console.log(movie);
        res.render('movie', {movie: movie});
      }
    });
});

app.listen(8000, function(){
  console.log("Server up on port 8000");
});
