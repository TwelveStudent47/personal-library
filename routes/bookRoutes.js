const express = require("express");
const bookControllers = require("../controllers/bookControllers");

const router = express.Router();

router.get("/health", bookControllers.getApiHealth);

router.get("/books", bookControllers.getAllBooks);

router.get("/books/:id", bookControllers.getSingleBookByID);

router.post("/books", bookControllers.postAddBook);

router.patch("/books/:id", bookControllers.patchEditBookByID);

router.delete("/books/:id", bookControllers.deleteBookByID);

module.exports = router;