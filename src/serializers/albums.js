import { Serializer } from 'jsonapi-serializer';

function extractArtists(artists, tracks) {
  const originalArtists = artists;
  let featuringArtists = [];

  tracks.forEach((track) => {
    featuringArtists.push(...track.artists);
  });

  const allArtists = [...originalArtists, ...featuringArtists].filter((artist, index, self) => {
    return index === self.findIndex(index => {
      return index.id === artist.id
    })
  });

  return allArtists;
}

const AlbumSerializer = new Serializer('album', {
  attributes: ['name', 'images', 'release_date', 'tracks', 'artists'],
  tracks: {
    ref: 'id',
    included: false,
  },
  artists: {
    ref: 'id',
    included: false,
  },
  transform: (record) => {
    const transformedRecord = record;

    const artistsIncludingFeatures = extractArtists(record.artists, record.tracks);
    transformedRecord.artists = artistsIncludingFeatures;

    return transformedRecord;
  }
});

export default AlbumSerializer;
