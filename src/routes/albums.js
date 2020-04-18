import { Router } from 'express';

import AlbumRequester from '../resources/spotify/albums';
import AlbumSerializer from '../serializers/albums';
import TrackSerializer from '../serializers/tracks';

const router = new Router();

const spotifyAlbumRequester = new AlbumRequester();

router.get('/:id', async (req, res) => {
  const spotifyResponse = await spotifyAlbumRequester.getAlbum(req.params.id);
  // TODO: Refactor this into a model kind of object
  const albumTracks = await spotifyAlbumRequester.getAlbumTracks(req.params.id);
  spotifyResponse['album-artists'] = spotifyResponse.artists;
  spotifyResponse.tracks = albumTracks;

  const response = AlbumSerializer.serialize(spotifyResponse);
  res.send(response);
});

router.get('/:id/tracks', async (req, res) => {
  const spotifyResponse = await spotifyAlbumRequester.getAlbumTracks(req.params.id);
  const response = TrackSerializer.serialize(spotifyResponse);

  res.send(response);
})

export default router;
