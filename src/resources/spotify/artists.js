import superagent from 'superagent';

import SpotifyRequester from './base';

export default class ArtistSpotifyRequester extends SpotifyRequester {
  constructor() {
    super(...arguments);
    this.baseUrl += '/artists';
  }

  async getAllArtists() {
    const token = await this.getCurrentToken();

    const response = await superagent
      .get(`${this.baseUrl}?ids=0Q5XzDpn7DCI5jlubok4xb,7IWshUcKfJyDWrbiF2XT8J`)
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
}
