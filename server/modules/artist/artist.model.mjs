import mongoose from 'mongoose'

const { Schema, model } = mongoose

export const ArtistSchema = new Schema({
    first_name  : { type : String, required : true },
    last_name   : { type : String, required : true },
    email       : { type : String, required : true },
    password    : { type : String, required : true },
    image       : { type : String, required : true },

    playlists     : [ { type: Schema.Types.ObjectId, ref:'playlist'} ],
    songs    : [ { type: Schema.Types.ObjectId, ref:'song'} ],
}, 

{timestamps:true}); // created_at + updated_at as datetime
  
export default model('artist',ArtistSchema);