import { Router } from 'express';

import ArtistRequester from '../resources/spotify/artists';
import ArtistSerializer from '../serializers/artists';

const router = new Router();
const spotifyRequester = new ArtistRequester();

router.get('/', async (req, res) => {
  const spotifyResponse = await spotifyRequester.getAllArtists();
  const response = ArtistSerializer.serialize(spotifyResponse.artists);

  res.send(response);
});

router.get('/:id', async (req, res) => {
  const spotifyResponse = await spotifyRequester.getArtist(req.params.id);
  const response = ArtistSerializer.serialize(spotifyResponse);

  res.send(response);
});

export default router;
