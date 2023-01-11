import log from "@ajar/marker";
import artist_model from "./artist.model.mjs";

export const create_artist = async (payload) => {
  const artist = await artist_model.create(payload);
  return artist;
};
export const get_all_artists = async () => {
  const artists = await artist_model.find();
  // .select(`first_name
  //         last_name
  //         email
  //         phone`);
  return artists;
};
export const get_artist_by_id = async (artist_id) => {
  const artist = await artist_model.findById(artist_id);
  // .select(`-_id
  //     first_name
  //     last_name
  //     email
  //     phone`);
  return artist;
};
export const update_artist_by_id = async (artist_id, payload) => {
  const artist = await artist_model.findByIdAndUpdate(artist_id, payload, {
    new: true,
    upsert: true,
  });
  return artist;
};
export const delete_artist_by_id = async (artist_id) => {
    const artist = await artist_model.findByIdAndRemove(artist_id);
    return artist;
};
