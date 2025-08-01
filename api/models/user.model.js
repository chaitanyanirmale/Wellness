import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
      type: String,
      default: "https://www.pngmart.com/files/23/Profile-PNG-Photo.png",
    },
}, { 
    timestamps: true,
})

const User = mongoose.model('User', userSchema); 

export default User;