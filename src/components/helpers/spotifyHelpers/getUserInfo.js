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

    // Extranct Image url
    var images = await extractImages(userListened.items)

    // Extract Genres
    var genres = await extractGenres(artists)

    // Filter Genres
    genres = await filterGenres(genres, images, userListened.items)

    // Get Filtered Time for labels
    var time = await getTime(userListened.items)
    var timeFixed = configTime(time)

    // Stores images, artist name, and track name so tool tip can get the data
    images = {}
    var artistNames = {}
    var trackNames = {}
    for(var i  = 0; i < genres.length; i++) {
        trackNames[genres[i][2]] = genres[i][4].name
        artistNames[genres[i][2]] = genres[i][4].artists[0].name
        images[genres[i][2]] = genres[i][3]
    }
    var toolTipInfo = {
        images: images,
        trackNames: trackNames,
        artistNames: artistNames
    }
    window.localStorage.setItem("toolTipInfo", JSON.stringify(toolTipInfo))

    return [user, genres, timeFixed.reverse(), userListened.items]
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

async function filterGenres(genres, images, tracks) {
    var uniqueGenres = new Set()
    var allGenres = []
    var genreImages = []
    var filteredTracks = []

    for(var i = 0; i < genres.length; i++) {
        for(var j = 0; j < genres[i].length; j++) {
            // Check if it has genre
            if(!uniqueGenres.has(genres[i][j])) {
                // Add Genre to list
                uniqueGenres.add(genres[i][j])
                
                // Push new items 
                allGenres.push(genres[i][j])
                genreImages.push(images[i])
                filteredTracks.push(tracks[i].track)
            }
        }
    }

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
        allGenreData.push([totalCount, genreData.reverse(), allGenres[k], genreImages[k], filteredTracks[k]])
    }

    // Sort the date by least to greatest
    var allGenreDataSorted = allGenreData.sort((a,b)=> b[0]-a[0])

    // Comparing if two groups are the same and combining them
    var index = 1
    while(index !== allGenreDataSorted.length) {
        for(var inner = 0; inner < index; inner ++) {
            // Make upercase 
            allGenreDataSorted[inner][2] = capitalizeFirstLetter(allGenreDataSorted[inner][2])
            if( JSON.stringify(allGenreDataSorted[inner][1]) === JSON.stringify(allGenreDataSorted[index][1])) {
                // Combine Name
                allGenreDataSorted[inner][2] += " / " + capitalizeFirstLetter(allGenreDataSorted[index][2])
                // Remove item at index
                allGenreDataSorted.splice(index, 1)
                // Keep index the same
                index -= 1
            }
        }
        index += 1
    }

    // Only keeping the top 10 
    if(allGenreDataSorted.length > 10) {
        allGenreDataSorted.splice(10, allGenreDataSorted.length)
    }

    // console.log(allGenreDataSorted)
    // Filter names so it is shorter
    var newNames = []
    for(var m = 0; m < allGenreDataSorted.length; m++) {
        var names = allGenreDataSorted[m][2].split(" / ")
        if(names.length > 2) {
            // Array Splitting
            newNames = []
            for(var n = 0; n < names.length; n++) {
                newNames = newNames.concat(names[n].split(" "))
            }
            
            // Check is names dont have the same value
            // eslint-disable-next-line
            if(Object.keys(newNames).reduce((a, b) => newNames[a] > newNames[b] ? a : b) > 1) {
                allGenreDataSorted[m][2] = findMostFrequest(names)
            }
        }
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

function findMostFrequest(arr) {
    let compare = "";
    let mostFreq = "";
    
    arr.reduce((acc, val) => {
        if(val in acc){               // if key already exists
            acc[val]++;                // then increment it by 1
        }
        else{
            acc[val] = 1;      // or else create a key with value 1
        }      
        if(acc[val] > compare){   // if value of that key is greater than the compare value.
            compare = acc[val];    // than make it a new compare value.
            mostFreq = val;        // also make that key most frequent.
        }      
        
        return acc;
    }, {})    
    
    return (mostFreq)
}

async function extractImages(data) {
    var images = []
    for(var i = 0; i < data.length; i++) {
        images.push(data[i].track.album.images)
    }
    return images
}

export default getUserInfo