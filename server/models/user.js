const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email:{type : String , required: true},
    password:{type : String , reqiured:true},
    isAdmin: { type: Boolean, default: false},
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})


module.exports = mongoose.model('User', userSchema);