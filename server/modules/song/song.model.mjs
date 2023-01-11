import mongoose from 'mongoose'

const { Schema, model } = mongoose;

export const SongSchema = new Schema({
    title  : { type : String, required : true },
    length  : { type : String, required : true },
    disc  : { type : String, required : true },
    lyrics  : { type : String, required : true },
    playlists : { type: Schema.Types.ObjectId, ref:'playlist'},
    author : { type: Schema.Types.ObjectId, ref:'artist'},

}, {timestamps:true});
  
export default model('song',SongSchema);