const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    redirectLink: {
        type: String,
        required: true,
    },
    redirectString: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Link", LinkSchema);
