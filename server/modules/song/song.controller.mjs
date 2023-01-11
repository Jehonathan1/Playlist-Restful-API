import express from "express"
import log from '@ajar/marker'
import raw from "../../middleware/route.async.wrapper.mjs"
import * as song_service from "./song.service.mjs"

const router = express.Router()
router.use(express.json())

// router.post(   "/"          , song_service.create_song);           
// router.get(    "/"          , song_service.get_all_songs); 
     
// router.get(    "/artist/:id"  , song_service.get_artist_songs); 

// router.get(    "/:id"       , song_service.get_song_by_id);  
// router.put(    "/:id"       , song_service.update_song);    
// router.delete( "/:id"       , song_service.delete_song);        

router.route("/") 
    .post(raw(async (req, res) => { // CREATES A NEW song
      log.obj(req.body, "create a song, req.body:");
      const song = await song_service.create_song(req.body, req.body.author);
      res.status(200).json(song);
    }))
    .get(raw(async ( _ , res) => { // GET ALL songs
      const songs = await song_service.get_all_songs();
      res.status(200).json(songs);
    }))

router.get("/artist/:id", raw( async (req, res) => { // GET ALL songs OF A artist
  const artist = await song_service.get_artist_songs(req.params.id);
  res.status(200).json(artist);
})) 


router.route("/:id") 
    .get(raw(async (req, res) => { // GETS song BY ID
      const song = await song_service.get_song_by_id(req.params.id)
      if (!song) return res.status(404).json({ status: "No song found." });
      res.status(200).json(song);
    })) 
    .put(raw(async (req, res) => { // UPDATE song BY ID 
      const song = await song_service.update_song_by_id(req.params.id,req.body);
      res.status(200).json(song);
    }))
    .delete(raw(async (req, res) => { // DELETE song BY ID
      const song = await song_service.delete_song_by_id(req.params.id);
      if (!song) return res.status(404).json({ status: "No song found." });
      res.status(200).json(song);
    }))

export default router;