const mongoose = require("mongoose");
const { config } = require("../../config");
const Connect = async () => {
  try {
    //connect to cloud
    const con = await mongoose.connect(config.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


module.exports = Connect