// For Auth Call
var spotifyAuthUrl = "https://accounts.spotify.com/authorize"
var client_id = "f4a2d71495c44658bffe04de914ae403"
var scope = "user-read-private user-read-recently-played streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state"

// Note this is an Implicit Grant Flow 
function getToken() {
    console.log(window.location.origin)
    window.location = `${spotifyAuthUrl}?client_id=${client_id}&redirect_uri=${window.location.origin}&scope=${scope}&response_type=token&show_dialog=true`
}

export default getToken