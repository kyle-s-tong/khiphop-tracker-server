import { Router } from 'express';

import AlbumRequester from '../resources/spotify/albums';
import AlbumSerializer from '../serializers/albums';

const router = new Router();

const spotifyAlbumRequester = new AlbumRequester();

router.get('/:id', async (req, res) => {
  const spotifyResponse = await spotifyAlbumRequester.getAlbum(req.params.id);
  const response = AlbumSerializer.serialize(spotifyResponse);

  res.send(response);
});

export default router;
