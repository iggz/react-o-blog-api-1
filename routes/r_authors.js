var express = require("express");
var router = express.Router();

var AuthorsModel = require("../models/m_authors");

// Get all authors
router.get("/allAuthors", async (req, res, next) => {
    const allAuthors = await AuthorsModel.getAllAuthors();
    res.json(allAuthors).status(200);
});

// Get one author by id
router.get("/author/:author_id?", async (req, res, next) => {
    const authorID = req.params.author_id;
    const theAuthor = await AuthorsModel.getAuthorByID(authorID);
    res.json(theAuthor).status(200);
});

// Delete an author
router.get("/deleteAuthor/:author_id?", async (req, res, next) => {
    const authorID = req.params.author_id;
    const response = await AuthorsModel.removeAuthor(authorID);
    console.log("response is", response);
    if (response.command === 'DELETE' && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not delete Author ID ${authorID}`).status(409);
    }
});

// Add author
router.post("/addAuthor", async (req, res) => {
    const { id, name, email } = req.body;
    console.log("req.body", req.body)
    const response = await AuthorsModel.addAuthor(id, name, email);

    if (response.command === 'INSERT' && response.rowCount >= 0) {
        res.sendStatus(200);
    } else {
        res.send(`Could not add new author ${name}`).status(409)
    }
});

// update author's information
router.put('/updateAuthor/:author_id?', async (req, res, next) => {
    const name = req.body.name;
    const authorID = req.params.author_id;
    const response = await AuthorsModel.updateAuthor(authorID, 'name', name)
    console.log("updateAuthor response: ", response)

    if (response.command === 'UPDATE' && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update Author ID ${authorID}`).status(409);
    }
});


module.exports = router;