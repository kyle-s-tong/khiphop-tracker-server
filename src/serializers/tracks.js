import { Serializer } from 'jsonapi-serializer';

const TrackSerializer = new Serializer('track', {
  attributes: ['name', 'duration', 'track_number']
});

export default TrackSerializer;
