const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    imageUrl:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    description:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdBy: String,

},{
    timestamps:true
})

module.exports = mongoose.model('Post',PostSchema);