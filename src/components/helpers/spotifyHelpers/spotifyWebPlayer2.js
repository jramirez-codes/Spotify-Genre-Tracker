import React, {useState, useEffect} from 'react';
import { View } from 'react-native-web';

class WebPlayer2 extends React.Component {


  async componentDidMount() {
    const loadScript = async() => {
      var script = document.createElement('script');
      script.id = 'spotify-player';
      script.type = 'text/javascript';
      script.async = false;
      script.defer = true;
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.onload = (value) => Promise.resolve(value);
      script.onerror = (error) => Promise.reject(new Error(`loadScript: ${error.message}`));

      var body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
      console.log("DID SOMETHING PRINT")

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQCD_uCWd3h0hLzfmZlKIsW36-rHjfQXDEqH0X8q4GSZIReUYPvni3yewERjvo2yncbcaIkzI2xMtIOVNM9-_untSv5EDggDSj8g6cwN5tTIHZmBiInADaazhKPWPrQvDfVBXUHEpXr6j8USX-ow4HTp0o3HkEj19lZEtA';
        // const player = new Spotify.Player({
        //   name: 'Web Playback SDK Quick Start Player',
        //   getOAuthToken: cb => { cb(token); }
        // });
      }

    }

    await loadScript();
  }

  render() {
    return(
      <h1>Hello</h1>
    )
  }
}

// function WebPlayer2(props) {
//   const [gotInfo, setGotInfo] = useState(false)
//   const [token, setToken] = useState("")
//   const [songs, setSongs] = useState([])
//   const [songIndex, setSongIndex] = useState(0)

//   useEffect(()=>{
//     if(props.token.length !== 0) {
//       setToken(props.token)
//       // Extract Songs
//       var songList = []
//       for(var i = 0; i < props.songs.length; i++) {
//         songList.push(props.songs[i].uri)
//       }
//       setSongs(songList)
//       setSongIndex(props.index)
//       console.log(props.index)
//       setGotInfo(true)
//     }
//   },[props])

//   return (
//     <View>
//       {gotInfo?(null
//         /* <SpotifyPlayer offset={songIndex} token={token} uris={songs} initialVolume={0.5}/> */
//       ):(null)}
//     </View>
//   )
// }

export default WebPlayer2