const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide book title"]
    },
    author: {
        type: String,
        required: [true, "Please provide author name"]
    },
    year: {
        type: Number,
    },
    genre: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Book", BookSchema);