import express from "express"
import * as artist_service from "./artist.service.mjs"
import raw from "../../middleware/route.async.wrapper.mjs"

const router = express.Router()
router.use(express.json())

// CREATES A NEW artist
router.post("/", raw (async (req, res) => {
     const artist = await artist_service.create_artist(req.body);
     res.status(200).json(artist);
}))

// GET ALL artistS       
router.get("/"    , raw( async (req, res) => { 
  const artists = await artist_service.get_all_artists();
  res.status(200).json(artists);
}))

// GETS artist BY ID
router.get("/:id" , raw( async (req, res) => {
  const artist = await artist_service.get_artist_by_id(req.params.id)
  if (!artist) return res.status(404).json({ status: "No artist found." });
  res.status(200).json(artist);
})) 

// UPDATE artist BY ID
router.put("/:id" , raw( async (req, res) => {
  const artist = await artist_service.update_artist_by_id(req.params.id,req.body);
  res.status(200).json(artist);
}))

// DELETE artist BY ID
router.delete( "/:id" , raw( async (req, res) => {
  const artist = await artist_service.delete_artist_by_id(req.params.id);
  if (!artist) return res.status(404).json({ status: "No artist found." });
  res.status(200).json(artist);
}))

// alternatively you could write:
//----------------------------------

router.route("/") 
    // CREATES A NEW artist
    .post(raw(async (req, res) => {
      const artist = await artist_service.create_artist(req.body);
      res.status(200).json(artist);
    }))
    // GET ALL artistS    
    .get(raw(async (req, res) => { 
      const artists = await artist_service.get_all_artists();
      res.status(200).json(artists);
    }))

router.route("/:id") 
    // GETS artist BY ID
    .get(raw(async (req, res) => {
      const artist = await artist_service.get_artist_by_id(req.params.id)
      if (!artist) return res.status(404).json({ status: "No artist found." });
      res.status(200).json(artist);
    })) 
    // UPDATE artist BY ID 
    .put(raw(async (req, res) => {
      const artist = await artist_service.update_artist_by_id(req.params.id,req.body);
      res.status(200).json(artist);
    }))
    // DELETE artist BY ID
    .delete(raw(async (req, res) => {
      const artist = await artist_service.delete_artist_by_id(req.params.id);
      if (!artist) return res.status(404).json({ status: "No artist found." });
      res.status(200).json(artist);
    }))


export default router;
