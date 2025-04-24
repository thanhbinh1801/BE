import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required : true
    },
    age : {
      type : Number,
      min : 0
    },
    gender : {
      type : String,
      required : true
    },
    email : {
      type: String,
      required: true,
      unique : true
    },
    phone : {
      type : String,
      required : true,
      unique : true
    }
  },
  {
    timestamps : true
  }
)

const UserModels = mongoose.model('User', UserSchema);
export default UserModels;