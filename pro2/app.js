// const http = require("http");
// const fs = require("fs");
// const _ = require("lodash");

// let exp = _.fill([1, 2, 3, 4, 5], 3, 2, "12");
// console.log(exp);

// http.createServer((req, res) => {
//     const readStream = fs.createReadStream("./static/index.html");
//     res.writeHead(200, { "Content-type": "text/html" });
//     readStream.pipe(res);
// }).listen("3000");

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Joi = require("joi");

const app = express();

app.use("/public", express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/r1/:name/:age", (req, res) => {
    console.log(req.query);
    res.send(req.params.name + " : " + req.params.age);
});

app.post("/", (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(10).required(),
    });
    const x = schema.validate(req.body);
    x.error ? res.send("Unsuccessful!") : res.send("Successful!");
    console.log(x.value);
});

// app.get("q/:userQuery", (req, res) => {
//     res.render("index", {
//         data: {
//             userQuery: req.params.userQuery,
//             searchResults: ["book1", "book2", "book3"],
//         },
//     });
// });
app.get("/xyz", (req, res) => {
    res.writeHead(302, {
        location: "https://google.com",
    });
    res.end();
});
app.get("/xyz2", (req, res) => {
    res.writeHead(302, {
        location: "https://fb.com",
    });
    res.end();
});

//Middleware
app.use((req, res) => {
    res.send("<h1>404! Error!</h1>");
});
app.listen(3000);
