import React, {useEffect, useState} from 'react'
import {View} from 'react-native-web'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from '@mui/material/Tooltip'

export default function PlayedRecently(props) {
  const [songs, setSongs] = useState([])
  useEffect(()=>{
    if(props.data.length !== 0) {
      var songs = props.data[3]
      var uniqueSongsSet = new Set()
      var uniqueSongsArr = []
      for(var i = 0; i < songs.length; i++) {
        if(!uniqueSongsSet.has(songs[i].track.album.id)) {
          uniqueSongsSet.add(songs[i].track.album.id)
          uniqueSongsArr.push({img: songs[i].track.album.images[1].url, title: songs[i].track.name, artist: songs[i].track.artists[0].name})
        }
      }
      setSongs(uniqueSongsArr)

      console.log(uniqueSongsArr)
    }
  },[props])

  const StandarImageList = () => {
    return(
      <ImageList sx={{ width: (window.innerWidth * 0.85), height: ((window.innerWidth * 0.85) / 2) }} cols={4} rowHeight={(window.innerWidth * 0.81)/4}>
      {songs.map((item) => (
        <ImageListItem key={item.img}>
          <Tooltip followCursor={true} title={item.title}>
            <img
              width={parseInt((window.innerWidth * 0.81)/4).toFixed(0)}
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
          </Tooltip>
        </ImageListItem>
      ))}
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
            <StandarImageList/>
          ):
          (null)
          }
        </View>
      </CardContent>
    </Card>
  )
} 