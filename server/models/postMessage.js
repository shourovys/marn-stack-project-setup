import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    position: String,
    sealery: String,
    employeeProfile:String,
    selectedFile: {
        type: Object,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;