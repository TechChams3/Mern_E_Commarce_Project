import mongoose from "mongoose";
import mongodb from "mongodb";
const Mo_Database = async () => {
  try {
    const uri =
      "mongodb+srv://sharashhasnine4:vDECv4YEpUwdoub1@cluster999.apqwk.mongodb.net/";
    const Db = await mongoose.connect(uri);
    console.log("Mogoose is connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default Mo_Database;
