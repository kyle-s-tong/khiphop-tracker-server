import superagent from 'superagent';

import SpotifyRequester from './base';

export default class AlbumSpotifyRequester extends SpotifyRequester {
  constructor() {
    super(...arguments);
    this.baseUrl += '/albums';
  }

  async getAlbum(albumId) {
    const token = await this.getCurrentToken();

    const response = await superagent
      .get(`${this.baseUrl}/${albumId}`)
      .set('Authorization', `Bearer ${token}`);

    // TODO Make this error handling better.
    if (response.statusCode !== 200) {
      return null;
    }

    return response.body;
  }

}
