function evaluateHash(toParse) {
    if(toParse.length !== 0) {
        // Parsing Hash
        var hash = toParse.substring(1);
        var token = {}
        // eslint-disable-next-line
        hash.split('&').map(hk => { 
          let temp = hk.split('='); 
            token[temp[0]] = temp[1] 
        });

        // Parsing Date
        var expDate = parseInt(new Date().getTime()) + 3600000
        token["expDate"] = expDate

        // Caching the Data
        window.localStorage.setItem("spotifyToken", JSON.stringify(token))
        window.location = window.location.origin
    }
}

export default evaluateHash