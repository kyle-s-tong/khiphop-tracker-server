import superagent from 'superagent';

import SpotifyRequester from './base';

export default class ArtistSpotifyRequester extends SpotifyRequester {
  constructor() {
    super(...arguments);
    this.baseUrl += '/artists';
  }

  async getAllArtists(includeAlbums = true) {
    const token = await this.getCurrentToken();

    const ids = await this.fileSystem.readFileKey(this.file, 'ids');
    const formattedIds = ids.join();

    const response = await superagent
      .get(`${this.baseUrl}?ids=${formattedIds}`)
      .set('Authorization', `Bearer ${token}`);

    // TODO Make this error handling better.
    if (response.statusCode !== 200) {
      return null;
    }

    const artists = response.body.artists;

    if (!includeAlbums) {
      return artists;
    }

    const artistsWithAlbums = Promise.all(artists.map(async (artist) => {
      const mappedArtist = artist;
      const albums = await this.getArtistAlbums(artist.id);

      mappedArtist.albums = albums;

      return mappedArtist;
    }))

    return artistsWithAlbums;
  }

  async getArtist(artistId) {
    const token = await this.getCurrentToken();

    const response = await superagent
      .get(`${this.baseUrl}/${artistId}`)
      .set('Authorization', `Bearer ${token}`);

    // TODO Make this error handling better.
    if (response.statusCode !== 200) {
      return null;
    }

    return response.body;
  }

  async getArtistAlbums(artistId) {
    const token = await this.getCurrentToken();

    const response = await superagent
      .get(`${this.baseUrl}/${artistId}/albums`)
      .set('Authorization', `Bearer ${token}`);

    // TODO Make this error handling better.
    if (response.statusCode !== 200) {
      return null;
    }

    return response.body.items;
  }

  async addArtist(artistId) {
    try {
      await this.fileSystem.updateFileKey(this.file, 'ids', artistId, true);
      const response = await this.getArtist(artistId);

      return response;
    } catch (error) {
      return null;
    }
  }
}
