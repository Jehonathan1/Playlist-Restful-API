import express from "express"
import log from '@ajar/marker'
import raw from "../../middleware/route.async.wrapper.mjs"
import * as playlist_service from "./playlist.service.mjs"

const router = express.Router()
router.use(express.json())

// router.post(   "/"              , raw( _.create_playlist)    )       
// router.get(    "/"              , raw( _.get_all_playlists)  )

// router.post(   "/:mid/artist/:uid", raw( _.add_song_to_playlist) )       
// router.get(    "/artist/:id"      , raw( _.get_artist_playlists) ) 

// router.get(    "/:id"           , raw( _.get_playlist_by_id) ) 
// router.put(    "/:id"           , raw( _.update_playlist)      )
// router.delete( "/:id"           , raw( _.delete_playlist)      ) 

router.route("/")
        .post(raw( async (req, res) => {
            log.obj(req.body, "create a playlist, req.body:");
            let playlist = await playlist_service.create_playlist(req.body);
            res.status(200).json(playlist);
        })) 
        .get(raw(async ( _ , res) => {
            const playlists = await playlist_service.get_all_playlists();
            res.status(200).json(playlists);
        }))

// ADD artist TO playlist
router.patch("/:playlist_id/artist/:artist_id", raw(async (req, res) => {
    const { playlist_id, artist_id } = req.params;
    const playlist = await playlist_service.add_song_to_playlist(playlist_id, artist_id);
    res.status(200).json(playlist);
}))  
// GET artist playlistS
router.get("/artist/:artist_id", raw(async (req, res) => {
    const playlists = await playlist_service.get_artist_playlists(req.params.artist_id);
    res.status(200).json(playlists);
}));

router.route("/:id")
        .get(raw(async (req, res) => { // GET playlist BY ID
            const playlist = await playlist_service.get_playlist_by_id(req.params.id)
            if (!playlist) return res.status(404).json({ status: "No playlist found." });
            res.status(200).json(playlist);
        })) 
        .put(raw(async (req, res) => { // UPDATE playlist BY ID
            const playlist = await playlist_service.update_playlist_by_id(req.params.id,req.body)
            if (!playlist) return res.status(404).json({ status: "No playlist found to update." });
            res.status(200).json(playlist);
        } )      )
        .delete(raw(async (req, res) => { // DELETE playlist BY ID
            const playlist = await playlist_service.delete_playlist_by_id(req.params.id)
            if (!playlist) return res.status(404).json({ status: "No playlist found to delete." });
            res.status(200).json(playlist);
        }))    

export default router;