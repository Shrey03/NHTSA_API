//Author - Shrey Patel
var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// *********  List of URLs to get data *********
const baseUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/";
const endUrl = "?format=json";
const allMakeUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json";
const allManufacturerUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?ManufacturerType=Intermediate&format=json";
//***********************************************/
app.use(express.static(__dirname + '/public'));

// ROUTE PART  , form will be display to enter vin number
app.get("/", function(req, res) {

    res.render("index");
});

//This route part will display the output based on user input
app.get("/results", function(req, res) {
    var query = req.query.vin;
    var url = baseUrl + query + endUrl;
    console.log(url);
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body)
            res.render("results", data = results);
        }
    });
});

//This route will display ALL MAKE
app.get("/make", function(req, res) {
    request(allMakeUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body)
            res.render("make", data = results);
        }
    });
});

//This route will display ALL Manufacturer
app.get("/manufacturer", function(req, res) {
    request(allManufacturerUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body)
            res.render("manufacturer", data = results);
        }
    });
});


app.listen(process.env.PORT || 3000, function() {
    console.log("NHTSA API is running......!!!", this.address().port, app.settings.env);
});