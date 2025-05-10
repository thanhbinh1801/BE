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
    },
    username : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type: String
    }
  },
  {
    timestamps : true
  }
)

const UserModels = mongoose.model('User', UserSchema);
export default UserModels;