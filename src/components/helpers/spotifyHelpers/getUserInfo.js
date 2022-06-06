import SpotifyWebApi from 'spotify-web-api-js'
import configTime from '../chartHelpers/configLabelsTime'

var spotifyApi = new SpotifyWebApi()

async function getUserInfo(token) {
    // Setting Token for API
    spotifyApi.setAccessToken(token)

    // Get user
    var user = await spotifyApi.getMe()
    
    // Get RecentlyPlayed
    var currTime = new Date().getTime()
    var timeBefore = currTime
    var userListened = await spotifyApi.getMyRecentlyPlayedTracks({before: parseInt(timeBefore), limit: 50})

    // Extract Artist
    var artistsID = await extractArtistID(userListened)
    var artists = await spotifyApi.getArtists(artistsID)

    // Extract Genres
    var genres = await extractGenres(artists)

    // Filter Genres
    genres = await filterGenres(genres)

    // Get Filtered Time for labels
    var time = await getTime(userListened.items)
    var timeFixed = configTime(time)

    return [user, genres, timeFixed.reverse()]
}

async function extractArtistID(userListened) {
    var items = userListened.items

    // Getting Artist
    var artistsID = []
    for(var i = 0 ; i <  items.length; i++) {
        artistsID.push(items[i].track.artists[0].id)
    }

    return artistsID
}

async function extractGenres(artists) {
    var people = artists.artists

    var genres = []
    for(var i = 0; i < people.length; i++) {
        genres.push(people[i].genres)
    }

    return genres
}

async function filterGenres(genres) {
    var uniqueGenres = new Set()
    for(var i = 0; i < genres.length; i++) {
        for(var j = 0; j < genres[i].length; j++) {
            uniqueGenres.add(genres[i][j])
        }
    }

    var allGenres = []
    for (let item of uniqueGenres) allGenres.push(item)

    // Creating Graph
    var allGenreData = []
    for(var k = 0; k < allGenres.length; k++) {
        // For each genre scan trhough the data
        var genreData = []
        var count = 0
        var totalCount = 0
        for(var i2 = 0; i2 < genres.length; i2++) {
            for(var j2 = 0; j2 < genres[i2].length; j2++) {
                if(genres[i2][j2] === allGenres[k]) {
                    count += 1
                    totalCount += 1
                }
            }
            if((i2+1) % 5 === 0) {
                genreData.push(count)
                count = 0
            }
        }
        allGenreData.push([totalCount, genreData.reverse(), allGenres[k]])
    }

    // Sort the date by least to greatest
    var allGenreDataSorted = allGenreData.sort((a,b)=> b[0]-a[0])

    // Comparing if two groups are the same and combining them
    var index = 1
    while(index !== allGenreDataSorted.length) {
        for(var inner = 0; inner < index; inner ++) {
            if( JSON.stringify(allGenreDataSorted[inner][1]) === JSON.stringify(allGenreDataSorted[index][1])) {
                // Combine Name
                allGenreDataSorted[inner][2] += " / " + allGenreDataSorted[index][2]
                // Remove item at index
                allGenreDataSorted.splice(index, 1)
                // Keep index the same
                index -= 1
            }
        }
        index += 1
    }

    if(allGenreDataSorted.length > 10) {
        allGenreDataSorted.splice(10, allGenreDataSorted.length)
    }

    return allGenreDataSorted
}

async function getTime(userListened) {
    var avgTimeListened = []
    var avgTime = 0
    for(var i = 0; i < userListened.length; i++) {
        avgTime += new Date(userListened[i].played_at).getTime()
        if((i+1) % 5 === 0) {
            avgTimeListened.push((avgTime/5).toFixed(0))
            avgTime = 0
        }
    }
    return avgTimeListened
}

export default getUserInfo