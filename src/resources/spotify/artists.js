import superagent from 'superagent';

import SpotifyRequester from './base';

export default class ArtistSpotifyRequester extends SpotifyRequester {
  constructor() {
    super(...arguments);
    this.baseUrl += '/artists';
  }

  async getAllArtists() {
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

    return response.body;
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
