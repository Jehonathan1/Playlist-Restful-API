import express from 'express'
import morgan from 'morgan'
import log from '@ajar/marker'
import cors from 'cors'

import {connect_db} from './db/mongoose.connection.mjs'
import {error_handler,not_found} from './middleware/errors.handler.mjs'

import song_controller from './modules/song/song.controller.mjs'
import artist_controller from './modules/artist/artist.controller.mjs'
import playlist_controller from './modules/playlist/playlist.controller.mjs'

const { PORT,HOST, DB_URI } = process.env;

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'))

// routing
app.use('/api/artists', artist_controller);
app.use('/api/songs', song_controller);
app.use('/api/playlists', playlist_controller);

// central error handling
app.use(error_handler);
app.use('*', not_found);

//start the express api server
(async ()=> {
  await connect_db(DB_URI);  
  await app.listen(PORT,HOST);
  log.magenta(`api is live on`,` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`);  
})().catch(log.error)