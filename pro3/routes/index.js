const express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Link = require("../models/Link");
const router = express.Router();

router.get("/", ensureGuest, (req, res) => {
    res.render("login", {
        layout: "login",
    });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        const links = await Link.find({ user: req.user.id }).lean();
        res.render("dashboard", {
            name: req.user.displayName,
            orginUrl: req.protocol + "://" + req.get("host") + "/",
            links: links,
        });
    } catch (err) {
        console.log(err);
        res.render("erros/500");
    }
});

module.exports = router;
