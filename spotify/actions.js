const BASE_URL = "https://api.spotify.com/v1"

// uses Spotify's Search API to search tracks by track name and artist
const searchTracks = async (http, { track, artist }) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}/search?q=track:${track}+artist:${artist}&type=track`
  };
  
  return http(config)
    .then((res) => res.data);
}

/// uses Spotify's Browse API to get song recommendations
const getRecommendations = async (http, { trackId }) => {  
  const config = {
    method: 'get',
    url: `${BASE_URL}/recommendations?seed_tracks=${trackId}`,
  };

  return http(config)
    .then((res) => res.data);
}

module.exports = { searchTracks, getRecommendations }