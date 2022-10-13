import mongoose from "mongoose";

const connectMongo = async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
