const { getPostsController } = require("../controllers/getallpost.js");
const { addCommentController, createPostController, likePostController, unlikePostController } =require( "../controllers/post.js");
const upload =  require("../middlewares/upload");
const express = require("express")



const router = express.Router();

router.post("/create", upload.single("image"), createPostController);
router.post("/comment", addCommentController);
router.post("/like", likePostController);
router.post("/unlike", unlikePostController);
router.get("/getposts", getPostsController);
module.exports = router;