// Create a basic server using Express.JS
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a few array variables that will hold the data
var tables = [
    {
        id: "a",
        name: "Abby Nielson",
        email: "aa.nielson18@gmail.com",
        phone: 5555555555
    },
    {
        id: "b",
        name: "Mickey Mouse",
        email: "mMouse25@gmail.com",
        phone: 5555555556
    }
];
var waitlist = [
    {
        id: "c",
        name: "Donald Duck",
        email: "donalduckofficial@gmail.com",
        phone: 5555555567
    },
    {
        id: "d",
        name: "Scrooge McDuck",
        email: "moneymaker@gmail.com",
        phone: 5555555678       
    }
];

var customers = tables.concat(waitlist);

// Create a set of routes for getting and posting table data
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
// Create a set of routes for displaying the HTML pages
app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
} );

//Create a set of routes that then display this data as JSONs. Users should be given these JSONs if they visit the appropriate page 
//(i.e. if a user visits localhost:3000/api/tables they should see a JSON of table data).

//display all tables
app.get("/api/tables", function(req, res) {
    return res.json(tables);
});
//display waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});
//display all customers
app.get("/api/customers", function(req, res) {
    return res.json(customers);
});

// Use jQuery to run AJAX calls to GET and POST data from users to the Express server
//Create the logic that handles reservation requests. 
//Your code should work such that POST requests take in JSON objects,
//checks if there is any space left, then adds the JSON object to either the reservation array or the waitlist array. 
if (tables.length < 5) {
    app.post("/api/tables", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newReservation = req.body;
    
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    
        console.log(newReservation);
    
        tables.push(newReservation);
    
        res.json(newReservation);
    });
} else {
    app.post("/api/waitlist", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newReservation = req.body;
    
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    
        console.log(newReservation);
    
        waitlist.push(newReservation);
    
        res.json(newReservation);
    });
}
    //Your POST route should also respond to requests with a confirmation (true or false) of whether or not the requestor has a reservation 
    //(or is on the waiting list).


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });