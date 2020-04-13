import superagent from 'superagent';

import SpotifyRequester from './base';

export default class TrackSpotifyRequester extends SpotifyRequester {
  constructor() {
    super(...arguments);
    this.baseUrl += '/tracks';
  }

  async getTrack(trackId) {
    const token = await this.getCurrentToken();

    const response = await superagent
      .get(`${this.baseUrl}/${trackId}`)
      .set('Authorization', `Bearer ${token}`);

    // TODO Make this error handling better.
    if (response.statusCode !== 200) {
      return null;
    }

    return response.body;
  }

}
