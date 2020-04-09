import superagent from 'superagent';

import SpotifyRequester from './base';

export default class SearchSpotifyRequester extends SpotifyRequester {
  constructor() {
    super(...arguments);
    this.baseUrl += '/search';
    this.genre = '+genre:"k-hop"'
  }

  async searchArtists(query) {
    const encodedQuery = encodeURIComponent(query);
    const token = await this.getCurrentToken();

    const response = await superagent
    .get(`${this.baseUrl}?type=artist&q=${encodedQuery}${this.genre}`)
    .set('Authorization', `Bearer ${token}`);
  
    // TODO Make this error handling better.
    if (response.statusCode !== 200) {
      return null;
    }

    if (!response.body || !response.body.artists || !response.body.artists.items) {
      return null;
    }

    return response.body.artists.items;
  }
}
