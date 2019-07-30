//LIBRARIES
var bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    request       = require("request"),
    express       = require("express"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    movieTrailer  = require("movie-trailer");

const app = express();

//MODELS
var Movie = require("./models/Movie"),
    User  = require("./models/User");

//App Setup
mongoose.connect("mongodb://localhost/project", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Passport Config
app.use(require("express-session")({
  secret: "I have a mango tree",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//ROUTES
app.get("/", function(req, res){
  res.render("home");
});

app.get("/movie/:title", function(req, res){
  request("http://www.omdbapi.com/?apikey=34ae9d2e&t=" + req.params.title, function(error, response, body){
      if(!error && response.statusCode == 200){
        var movie = JSON.parse(body)
        console.log(movie);
        movieTrailer(req.params.title, function (error, response){
          trailer = response.split("/")[3].split("=")[1]
          res.render('movie', {movie: movie, trailer: trailer});
        });
      }
    });
});

//Auth ROUTES
//Register
app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res){
  var newUser = new User({
    username: req.body.username,
    email: req.body.email
  });
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    });
  });
});

//Login
app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/",
    failureRedirect: "/login"
  }),function(req, res){
});

//Logout
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

//User Profile
app.get("/user-profile", isLoggedIn, function(req, res){
  res.render("profile");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(8000, function(){
  console.log("Server up on port 8000");
});
