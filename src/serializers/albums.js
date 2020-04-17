import { Serializer } from 'jsonapi-serializer';

function extractArtists(artists, tracks) {
  const originalArtists = artists;
  let featuringArtists = [];

  tracks.forEach((track) => {
    featuringArtists.push(...track.artists);
  });

  // Merge the original artists and featuring artists, then dedupe them.
  const allArtists = [...originalArtists, ...featuringArtists].filter((artist, index, self) => {
    return index === self.findIndex(index => {
      return index.id === artist.id
    })
  });

  return allArtists;
}

const AlbumSerializer = new Serializer('album', {
  attributes: ['name', 'images', 'release_date', 'tracks', 'artists', 'album-artists', 'album_group', 'album_type'],
  tracks: {
    ref: 'id',
    included: false,
  },
  artists: {
    ref: 'id',
    included: false,
  },
  'album-artists': {
    ref: 'id',
    type: 'artists',
    attributes: ['name'],
    included: true,
  },
  typeForAttribute: function (type) {
    if (type === 'album-artists') { return 'artists'; }
    return undefined;
  },
  transform: (record) => {
    const transformedRecord = record;

    const artistsIncludingFeatures = extractArtists(record.artists, record.tracks);
    transformedRecord.artists = artistsIncludingFeatures;

    console.log(transformedRecord);
    return transformedRecord;
  }
});

export default AlbumSerializer;
