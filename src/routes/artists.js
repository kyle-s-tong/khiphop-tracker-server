import { Router } from 'express';

import ArtistRequester from '../resources/spotify/artists';
import AlbumRequester from '../resources/spotify/albums';
import ArtistSerializer from '../serializers/artists';
import AlbumSerializer from '../serializers/albums';
import SearchRequester from '../resources/spotify/search';

const router = new Router();

const spotifyArtistRequester = new ArtistRequester();
const spotifyAlbumRequester = new AlbumRequester();
const spotifySearchRequester = new SearchRequester();

router.get('/', async (req, res) => {
  const spotifyResponse = await spotifyArtistRequester.getAllArtists();
  spotifyResponse.forEach(artist => {
    artist.albums = [];
    artist['latest-releases'] = [];
  })

  const response = ArtistSerializer.serialize(spotifyResponse);

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

router.post('/add', async (req, res) => {
  const requestBody = req.body;

  if (!requestBody.data.id) {
    res.status(400).send('Request does not contain id.')
  }

  const spotifyResponse = await spotifyArtistRequester.addArtist(requestBody.data.id);
  const response = ArtistSerializer.serialize(spotifyResponse);

  res.status(201).send(response);
})

router.get('/:id/albums', async (req, res) => {
  const spotifyResponse = await spotifyArtistRequester.getArtistAlbums(req.params.id);
  const query = req.query;

  let response;
  if (query && query.filter && query.filter.releaseDate) {
    const filteredResponse = spotifyResponse.filter(album => album.release_date > query.filter.releaseDate)

    if (filteredResponse.length > 0) {
      const spotifyAlbumsWithTracks = await Promise.all(filteredResponse.map(async (album) => {
        const mappedAlbum = album;
        const albumTracks = await spotifyAlbumRequester.getAlbumTracks(album.id);
        mappedAlbum.tracks = albumTracks;
        mappedAlbum['album-artists'] = album.artists;

        return mappedAlbum;
      }))

      response = AlbumSerializer.serialize(spotifyAlbumsWithTracks)
    } else {
      response = AlbumSerializer.serialize(filteredResponse);
    }
  } else {
    response = AlbumSerializer.serialize(spotifyResponse);
  }
  res.send(response);
})

router.get('/:id', async (req, res) => {
  const spotifyResponse = await spotifyArtistRequester.getArtist(req.params.id);
  // const artistAlbums = await spotifyArtistRequester.getArtistAlbums(req.params.id);
  spotifyResponse.albums = [];
  spotifyResponse['latest-releases'] = [];

  const response = ArtistSerializer.serialize(spotifyResponse);
  res.send(response);
});



export default router;
