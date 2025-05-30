const mongoose = require("mongoose");

exports.dbConnection = async () => {
  try {
   
    mongoose
      .connect('mongodb+srv://s03369916:VNnSLstZIwukgslL@cluster0.hbjcccn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
      .then(() => {console.log("successfully connected with database");})
      .catch((err) => console.log(err, "error while connecting to db"));
      } catch (error) {
    console.log("error while connecting to db");
  }
};
