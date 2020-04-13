import { Serializer } from 'jsonapi-serializer';

const ArtistSerializer = new Serializer('artist', {
  attributes: ['name', 'images', 'genres', 'albums'],
  albums: {
    ref: 'id',
    included: false,
    attributes: ['name'],
  }
});

export default ArtistSerializer;
