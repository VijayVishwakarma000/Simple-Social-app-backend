const { getDB }  =  require("../db");
const { generateUsername, isValidEmail } = require("../utils/utils");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

 async function createuser(body) {
  try {
    let { email, password } = body;

    if (!email || !password) {
      return { code: -1, msg: "Please fill the details" };
    }

    if (!isValidEmail(email)) {
      return { code: -2, msg: "Invalid email address" };
    }

    const db = getDB();
    const users = db.collection("users");

    let finduser = await users.findOne({ email });

    if (finduser) {
      return { code: -3, msg: "User already exists" };
    }

    let hash = await bcrypt.hash(password, 10);
    let id = crypto.randomBytes(20).toString("hex");
    let sid = crypto.randomBytes(30).toString("hex");

    await users.insertOne({
      sessionid:sid,
      userid: id,
      email,
      username:generateUsername(),
      password: hash,
      createdAt: new Date(),
    });

    return { code: 0, msg: "User created successfully" };
  } catch (error) {
    return { code: -500, msg: "Server error",err:error };
  }
}

 async function loginuser(body) {
  try {
    let { email, password } = body;

    if (!email || !password) {
      return { code: -1, msg: "Please fill the details" };
    }

    if (!isValidEmail(email)) {
      return { code: -2, msg: "Invalid email address" };
    }

    const db = getDB();
    const users = db.collection("users");

    let user = await users.findOne({ email });

    if (!user) {
      return { code: -3, msg: "User not found" };
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { code: -4, msg: "Incorrect password" };
    }

    return { code: 0, msg: "Login successful", user };
  } catch (error) {
    return { code: -500, msg: "Server error" };
  }
}

module.exports = {
    createuser,loginuser
}
