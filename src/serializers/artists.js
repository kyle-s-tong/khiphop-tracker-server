import { Serializer } from 'jsonapi-serializer';

const ArtistSerializer = new Serializer('artist', {
  attributes: ['name', 'images']
});

export default ArtistSerializer;
