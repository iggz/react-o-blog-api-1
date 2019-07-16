var express = require("express");
var router = express.Router();

var PostModel = require("../models/m_posts");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("Welcome to my API").status(200);
});

// Get all posts
router.get("/all", async (req, res, next) => {
  const allPosts = await PostModel.getAll();
  res.json(allPosts).status(200);
});

// get one post by its ID
router.get("/post/:post_id?", async (req, res, next) => {
  const postId = req.params.post_id;
  const thePost = await PostModel.getById(postId);
  res.json(thePost).status(200);
});

// delete a post
router.get("/delete/:post_id?", async (req, res, next) => {
  const postId = req.params.post_id;
  const response = await PostModel.removeEntry(postId);
  console.log("response is", response);
  if (response.command === "DELETE" && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not delete Post ID ${postId}`).status(409);
  }
});

// add a post
router.post("/add_post", async (req, res) => {
  const { title, author_id, content } = req.body;
  console.log("req.body", req.body)
  const response = await PostModel.addEntry(title, author_id, content);
  if (response.command === "INSERT" && response.rowCount >= 0) {
    res.sendStatus(200);
  } else {
    res.send(`Could not add new blog post ${title}`).status(409);
  }
});

// update a post
router.put("/update/:post_id?", async (req, res, next) => {
  const content = req.body.content;
  const postId = req.params.post_id;
  const response = await PostModel.updateEntry(postId, "content", content);
  console.log("update response: ", response)
  if (response.command === "UPDATE" && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not update Post ID ${postId}`).status(409);
  }
});


module.exports = router;
