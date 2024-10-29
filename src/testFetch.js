require("dotenv").config();
const mongoose = require("mongoose");
const Request = require("@/models/Request").default; // Adjust path as necessary

const fetchRequests = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const requests = await Request.find();
  console.log("Fetched requests:", requests);
  mongoose.connection.close();
};

fetchRequests().catch(console.error);
