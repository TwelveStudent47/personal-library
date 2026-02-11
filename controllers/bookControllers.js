const Book = require("../models/Book");

exports.getApiHealth = (req, res) => {
    return res.status(200).json({message: "The API is healthy!"});
}

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({success: true, data: books});
    } catch (err) {
        return res.status(500).json({success: false, message: err});
    }
}

exports.getSingleBookByID = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({success: false, message: "Book not found with this id"});
        }

        return res.status(200).json({success: true, data: book});
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(404).json({ success: false, message: "Invalid ID format or Book not found" });
        }
        
        return res.status(500).json({success: false, message: err});
    }
}

exports.postAddBook = async (req, res) => {
    try {
        const { title, author, year, genre, isRead } = req.body;
        const book = await Book.create({title, author, year, genre, isRead});

        if (!book) {
            return res.status(404).json({success: false, message: "We cant create this book"});
        }

        return res.status(201).json({success: true, data: book});
    } catch (err) {
        return res.status(500).json({success: false, message: err});
    }
}

exports.patchEditBookByID = async (req, res) => {
    try {
        const { title, author, year, genre, isRead } = req.body;
        const book = await Book.findByIdAndUpdate(req.params.id, {title, author, year, genre, isRead}, {
            new: true,
            runValidators: true,   
            returnDocument: "after"
        });

        if (!book) {
            return res.status(404).json({success: false, message: "There is no book with this id!"});
        }

        return res.status(200).json({success: true, data: book});
    } catch (err) {
        return res.status(500).json({success: false, message: err});
    }
}

exports.deleteBookByID = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({success: false, message: "There is no book with this id!"});
        }

        return res.status(200).json({success: true, data: book});
    } catch (err) {
        return res.status(500).json({success: false, message: err});
    }
}