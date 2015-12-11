var User = require('../app/models/user.js');

module.exports = function(app, passport) {

    //HOMEPAGE ==============================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // LOGIN ===============================
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the user's profile page
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP ==============================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the user's profile page
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // PROFILE PAGE ==============================
    // use route middleware to verify user with isLoggedIn function
    app.get('/profile', isLoggedIn, function(req, res) {

        // var total = 0;
        // var array = req.user.list;
        // for (var i = 0; i < array.length; i++) {
        //   var toNumber = Number(array[i]);
        //   total += toNumber;
        // }
        // req.user.total = total;

        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });

        // add to current user list
        app.post('/addItem', function(req,res){
          User.findById(req.user._id, function(err,user){
            if (err) throw err;
            console.log(req.body.item, req.body.amount, req.body.retailer);
            user.list.push({ item : req.body.item,
                             amount : req.body.amount,
                             retailer : req.body.retailer
                           })
            user.save(function(err){
              if (err) console.log(err);
              console.log('Successfully saved');
              console.log(user);
            });
            res.render('profile.ejs', { user : req.user });
          });
        }); // end POST /addItem


    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}; // end module.exports

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, continue
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
