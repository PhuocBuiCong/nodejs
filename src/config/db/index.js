const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/phuocbc_educatin_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect successfully");
  } catch (er) {
    console.log("fail");
  }
}
 
module.exports = { connect };
