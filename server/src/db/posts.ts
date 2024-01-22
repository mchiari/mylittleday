import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},
{
    timestamps: true,
});

export const PostModel = mongoose.model("Post", PostSchema);

export const getPosts = () => PostModel.find().populate('author mentions');
export const getPost = (id: string) => PostModel.findOne({"_id": id}).populate('author mentions');

export const createNewPost = (values: Record<string, any>) => new PostModel(values).save().then((post) => post.toObject());
export const updatePost = (id: string, values: Record<string, any>) => PostModel.findByIdAndUpdate({"_id": id, values})



// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({ "email": email });
// export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ "authentication.sessionToken": sessionToken });
// export const getUserById = (id: string) => UserModel.findById({ _id: id });

// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
// export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ id: id });
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate({ id, values });
