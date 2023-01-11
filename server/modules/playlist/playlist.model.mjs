import mongoose from 'mongoose'

const { Schema, model } = mongoose

export const PlaylistSchema = new Schema({
    name  : { type : String, required : true },
    author : [{ type: Schema.Types.ObjectId, ref:'artist'}],
    songs : [{ type: Schema.Types.ObjectId, ref:'song'}],
  
}, 
{timestamps:true});
  
export default model('playlist',PlaylistSchema);