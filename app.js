const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req, res)
{
    var query=req.body.cityName;
    var unit='metric';
    var apiKey= "API_key";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function(response)
    {
        response.on("data", function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" 
            res.write("<p>The weather today is " +description + "</p>");
            res.write( "<h1>The temperature in "+query+" is "+temp+" degree celcius</h1>" );
            res.write("<img src="+ iconURL +"> ")
            res.send();
        })
    })
})


   



app.listen(3000, function()
{
    console.log("Server is running on port 3000");
})
