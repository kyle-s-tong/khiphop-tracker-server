import { Serializer } from 'jsonapi-serializer';

const ArtistSerializer = new Serializer('album', {
  attributes: ['name', 'images', 'release_date']
});

export default ArtistSerializer;
