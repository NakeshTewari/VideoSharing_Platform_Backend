import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      // "mongodb+srv://nakesh1107:FEPjnJWI15zcjyJA@cluster0.0s6qtmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      process.env.MONGODB_URI
    );
    console.log(
      `Mongodb connected!! Db Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection Failed", error);
    process.exit(1);
  }
};
export { connectDB };

//password : FEPjnJWI15zcjyJA
