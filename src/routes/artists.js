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

router.post('/add', async (req, res) => {
  const requestBody = req.body;

  if (!requestBody.id) {
    res.status(400).send('Request does not contain id.')
  }

  const spotifyResponse = await spotifyRequester.addArtist(requestBody.id);
  const response = ArtistSerializer.serialize(spotifyResponse);

  res.status(201).send(response);
})

export default router;
