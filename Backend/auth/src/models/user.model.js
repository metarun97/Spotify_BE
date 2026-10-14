import mongoose from "mongoose";


/* user schema created */
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },

  fullname: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },

  googleId: { type: String },

  password: {
    type: String,
    required: function () { !this.googleId }
  },

  role: {
    type: String,
    enum: ["user", "artist"],
    default: "user",
  }
}, { timestamps: true })


/* User model created */
const userModel = mongoose.model("user",userSchema);

export default userModel;
