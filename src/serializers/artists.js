import { Serializer } from 'jsonapi-serializer';

const ArtistSerializer = new Serializer('artist', {
  attributes: ['name', 'images', 'genres', 'albums', 'latest-releases'],
  albums: {
    ref: 'id',
    ignoreRelationshipData: true,
    relationshipLinks: {
      related: (record, current, parent) => {
        return `http://localhost:3000/artists/${parent.id}/albums`
      }
    }
  },
  'latest-releases': {
    ref: 'id',
    ignoreRelationshipData: true,
    relationshipLinks: {
      related: (record, current, parent) => {
        return `http://localhost:3000/artists/${parent.id}/albums?filter[releaseDate]=2020-05-23`
      }
    }
  }
});

export default ArtistSerializer;
