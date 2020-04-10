import superagent from 'superagent';

import FileSystemWriter from '../system/base';

export default class SpotifyRequester {
  constructor() {
    this.baseUrl = `https://api.spotify.com/v1`;
    this.fileSystem = new FileSystemWriter();
    this.file = process.env.SPOTIFY_STORAGE_PATH;
  }

  async getCurrentToken() {
    // TODO Only do this call if we don't already have a token.
    const response = await superagent
    .post('https://accounts.spotify.com/api/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET_KEY}`).toString('base64')}`)
    .send('grant_type=client_credentials')

    if (response.statusCode !== 200) {
      return null;
    }

    return response.body.access_token;
  }
}
