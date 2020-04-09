import { Router, response } from 'express';

import ArtistRequester from '../resources/spotify/artists';
import ArtistSerializer from '../serializers/artists';
import SearchRequester from '../resources/spotify/search';

const router = new Router();

const spotifyArtistRequester = new ArtistRequester();
const spotifySearchRequester = new SearchRequester();

router.get('/', async (req, res) => {
  const spotifyResponse = await spotifyArtistRequester.getAllArtists();
  const response = ArtistSerializer.serialize(spotifyResponse.artists);

  res.send(response);
});

router.get('/search', async (req, res) => {
  if (!req.query || !req.query.q) {
    res.status(400).send(`Query or query param 'q' is required.`);
  }

  const spotifyResponse = await spotifySearchRequester.searchArtists(req.query.q);
  const response = ArtistSerializer.serialize(spotifyResponse);

  res.send(response);
})

router.get('/:id', async (req, res) => {
  const spotifyResponse = await spotifyArtistRequester.getArtist(req.params.id);
  const response = ArtistSerializer.serialize(spotifyResponse);

  res.send(response);
});

router.post('/add', async (req, res) => {
  const requestBody = req.body;

  if (!requestBody.id) {
    res.status(400).send('Request does not contain id.')
  }

  const spotifyResponse = await spotifyArtistRequester.addArtist(requestBody.id);
  const response = ArtistSerializer.serialize(spotifyResponse);

  res.status(201).send(response);
})

export default router;
