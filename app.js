const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/b70fff0a31";

    const options = {
        method: "POST",
        auth: "nuha:fd0ceeea9b298ffa09bd533ddae50fa9-us18"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");

        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000");
})

//api key //fd0ceeea9b298ffa09bd533ddae50fa9-us18 
//List id //b70fff0a31