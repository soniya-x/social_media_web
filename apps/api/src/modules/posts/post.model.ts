import mongoose, { Schema, Document, Types } from "mongoose";

// Defines the structure of a post document
export interface IPost extends Document {
  user: Types.ObjectId;
  image: string;
  caption: string;
  location?:string;

}

// Post schema
const postSchema = new Schema<IPost>(
  {
    // Reference to the user who created this post
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // URL of the post image stored on Cloudinary
    image: {
      type: String,
      required: true,
    },

    // Text caption written by the user
    caption: {
      type: String,
      trim: true,
      maxlength: 2200,
      default: "",
    },

    //Location where the post was created
    location:{
      type:String,
      trim:true,
      default:""

    }
  },
  

  {
    // Automatically creates createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create or reuse the Post model
const Post =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;