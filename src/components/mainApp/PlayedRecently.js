import React, {useEffect, useState} from 'react'
import {View, TouchableHighlight} from 'react-native-web'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from '@mui/material/Tooltip'
import WebPlayer from '../helpers/spotifyHelpers/spotifyWebPlayer'

export default function PlayedRecently(props) {
  const [songs, setSongs] = useState([])
  const [token, setToken] = useState("")
  const [songIndex, setSongIndex] = useState(0)
  useEffect(()=>{
    if(props.data.length !== 0) {
      var songs = props.data[3]
      var uniqueSongsSet = new Set()
      var uniqueSongsArr = []

      for(var i = 0; i < songs.length; i++) {
        if(!uniqueSongsSet.has(songs[i].track.album.id)) {
          uniqueSongsSet.add(songs[i].track.album.id)
          uniqueSongsArr.push({
            img: songs[i].track.album.images[1].url, 
            title: songs[i].track.name, 
            artist: songs[i].track.artists[0].name,
            uri: songs[i].track.uri
          })
        }
      }

      setSongs(uniqueSongsArr)
      setToken(props.token)
    }
  },[props])

  const playSong = (index) => {
    setSongIndex(index)
  }

  const StandarImageList = () => {
    return(
      <ImageList sx={{ width: (window.innerWidth * 0.85), height: ((window.innerWidth * 0.85) / 2) }} cols={4} rowHeight={(window.innerWidth * 0.81)/4}>
      {songs.map((item, i) => 
        {
          return (
            <ImageListItem key={item.img}>
              <TouchableHighlight onPress={() => playSong(i)}>
                <Tooltip followCursor={true} title={item.title + " - " + item.artist }>
                  <img
                    width={parseInt((window.innerWidth * 0.81)/4).toFixed(0)}
                    src={`${item.img}`}
                    srcSet={`${item.img}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </Tooltip>
              </TouchableHighlight>
            </ImageListItem>
          )
        })
      }
      </ImageList>
    );
  }
  
  return (
    <Card>
      <CardContent>
        <h2 style={{textAlign:'center'}}>Recently Played Songs</h2>
        <View>
          {songs.length !== 0? 
          (
            <>
              <StandarImageList/>
              <WebPlayer token={token} songs={songs} index={songIndex}/>
            </>
          ):
          (null)
          }
        </View>
      </CardContent>
    </Card>
  )
} 