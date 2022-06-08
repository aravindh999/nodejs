const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mangoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const Link = require("./models/Link");

dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport);

connectDB();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/links", require("./routes/links"));

app.get("/:link", async (req, res) => {
    try {
        let urlOb = await Link.find({ redirectString: req.params.link });
        res.writeHead(302, {
            location: urlOb[0].redirectLink,
        });
        res.end();
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(
        `Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
