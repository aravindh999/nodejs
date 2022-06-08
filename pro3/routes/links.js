const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const urlExists = require("url-exists");

const Link = require("../models/Link");
const { exists } = require("../models/Link");
const e = require("express");
const router = express.Router();

const randStr = Math.random().toString(36).substring(2, 7);

let show = false;
router.get("/add", ensureAuth, (req, res) => {
    if (show) {
        res.render("links/show", {
            randStr: req.protocol + "://" + req.get("host") + "/" + randStr,
        });
        show = false;
    } else res.render("links/add");
});

router.post("/", ensureAuth, async (req, res) => {
    try {
        let date = new Date();
        req.body.user = req.user.id;
        req.body.redirectString = randStr;
        urlExists(req.body.redirectLink, async (err, exists) => {
            if (exists) {
                req.body.createdAt = `${date.getDay()}/${
                    date.getMonth() + 1
                }/${date.getFullYear()} ${date.toTimeString().substring(0, 8)}`;
                await Link.create(req.body);
                show = true;
                res.redirect("links/add");
            } else {
                res.render("error/500", {
                    err: "Sorry, URL not Found!! Add valid URL.",
                });
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

router.get("/", ensureAuth, async (req, res) => {
    try {
        const links = await Link.find().lean();
        res.render("alllinks", {
            name: req.user.displayName,
            links,
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

module.exports = router;
