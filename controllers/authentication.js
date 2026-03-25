const { createuser, loginuser } = require("../models/authmodel");

 const registerController = async (req, res) => {
  try {
    const result = await createuser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error("🔥 SERVICE ERROR:", {
    message: error.message,
    stack: error.stack,
  });
    return res.status(500).json({ code: -500, msg: "Server error",err:error.message,stack:error.stack });
  }
};

 const loginController = async (req, res) => {
  try {
    const result = await loginuser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ code: -500, msg: "Server error" });
  }
};

module.exports = {
  loginController,registerController
}
