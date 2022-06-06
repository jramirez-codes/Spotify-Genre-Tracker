import getToken from "./getToken"

function refreshToken() {
    alert("Token Has Expired")
    getToken()
}

function tokenIsCached() {
    // Check Cache for token
    var token = JSON.parse(window.localStorage.getItem("spotifyToken"))
    if(token === null) {
        return false
    }

    // Check if token is valid
    var nowMS  = parseInt(new Date().getTime());
    var tokenMS = parseInt(new Date(token.expDate).getTime());
    var expTime = (tokenMS - nowMS)
    // console.log(expTime)
    if(expTime > 0 && expTime <= 3600000) {
        // Getting time left
        setTimeout(refreshToken, expTime)
        return true
    }

    // Token has expired
    return false
}

export default tokenIsCached