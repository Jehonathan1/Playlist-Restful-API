import log from '@ajar/marker'
import song_model from "./song.model.mjs"
import artist_model from "../artist/artist.model.mjs"

// post - /api/songs/
export const create_song = async (payload,author_id) => {
    let song = await song_model.create(payload);
    log.obj(song, "created song:");
    const author = await artist_model.findById(author_id);
    author.songs.push(song);
    await author.save();
    return song;
}
// get - /api/songs/
export const get_all_songs = async () => {
    const artists = await song_model.find().populate('author')
    return artists;
}
// get - /api/songs/artist/:id
export const get_artist_songs = async (artist_id) => {
    const artist_with_songs = await artist_model.findById(artist_id);//.populate('songs')
    return artist_with_songs;
}
// get - /api/songs/:id
export const get_song_by_id = async (song_id) => {
    const song = await song_model.findById(song_id)
    return song;
}
// put - /api/songs/:id
export const update_song_by_id = async (song_id, payload) => {
    const song = await song_model.findByIdAndUpdate(song_id, payload, 
                                                     {new: true,upsert: true});
    // get author
    // find the song by the id in the songs field;
    const author = await artist_model.findById(song.author);
    const filtered = author.songs.filter((s)=> s._id !== song._id);
    filtered.push(song);
    author.songs = filtered;
    await author.save();

    return song;
}
// delete - /api/songs/:id
export const delete_song_by_id = async (song_id) => {
    const song = await song_model.findByIdAndRemove(song_id);
    return song;
}