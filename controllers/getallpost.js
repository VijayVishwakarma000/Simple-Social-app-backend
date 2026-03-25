const { getDB } = require("../db")

 const getPostsController = async (req, res) => {
  try {
    let { index = 0, limit = 10 } = req.query;

    index = parseInt(index);
    limit = parseInt(limit);

    const db = await getDB();
    const posts = db.collection("posts");

    const data = await posts
      .find({})
      .sort({ createdAt: -1 })
      .skip(index)
      .limit(limit)
      .toArray();

    return res.json({
      code: 0,
      posts: data,
    });
  } catch (e) {
    return res.json({
      code: -500,
      msg: "Server error",
    });
  }
};

module.exports = {getPostsController}