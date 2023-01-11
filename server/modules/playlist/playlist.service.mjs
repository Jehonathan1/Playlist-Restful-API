import log from '@ajar/marker'
import playlist_model from "./playlist.model.mjs"
import artist_model from "../artist/artist.model.mjs"

// post - /api/playlists/
export const create_playlist = async (payload) => {
    let playlist = await playlist_model.create(payload);

    if('songs' in payload){
        const pending = payload.songs.map(async participant => {
            const artist = await artist_model.findById(participant);
            artist.playlists.push(playlist);
            await artist.save();
        } )
        await Promise.all(pending);
    }

    return playlist;
}
// get - /api/playlists/
export const get_all_playlists = async () => {
    const playlists = await playlist_model.find();//.populate('songs')
    return playlists;
}
// post - /api/playlists/:mid/artist/:uid
export const add_participant_to_playlist = async (playlist_id, artist_id) => {
    const playlist = await playlist_model.findById(playlist_id);
    const artist = await artist_model.findById(artist_id);
    if(!playlist.songs.includes(artist_id)){
        playlist.songs.push(artist)
        await playlist.save()
    }
    if(!artist.playlists.includes(playlist_id)){
        artist.playlists.push(playlist)
        await artist.save()
    }
    return playlist;
}
// get - /api/playlists/artist/:id
export const get_artist_playlists = async (artist_id) => {
    const artist = await artist_model.findById(artist_id).populate('playlists')
    return artist.playlists;
}
// get - /api/playlists/:id
export const get_playlist_by_id = async (playlist_id) => {
    const playlist = await playlist_model.findById(playlist_id).populate('songs');
    return playlist;
}
// put - /api/playlists/:id
export const update_playlist_by_id = async (playlist_id,payload) => {
    const playlist = await playlist_model.findByIdAndUpdate(playlist_id, payload, 
                                                     {new: true,upsert: false});
    return playlist;
}
// delete - /api/playlists/:id
export const delete_playlist_by_id = async (playlist_id) => {
    const playlist = await playlist_model.findByIdAndRemove(playlist_id);
    return playlist;
}