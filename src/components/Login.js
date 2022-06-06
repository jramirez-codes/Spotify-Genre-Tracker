import React, {useEffect, useState} from 'react'
import {View} from 'react-native-web'
import Button from '@mui/material/Button'
import evaluateHash from './helpers/evaluateHash'
import tokenIsCached from './helpers/checkToken'
import getToken from './helpers/getToken'
import MainApp from './MainApp'

function Login() {
  // For Token
  const [token, setToken] = useState({})

  // Reading cache on windowload
  useEffect(()=> {
    // Check Hash if token now found / expired
    if(tokenIsCached()) {
      // Set Token
      console.log("Token was set")
      setToken(JSON.parse(window.localStorage.getItem("spotifyToken")))
    }
    else {
      // Check to see if we hash
      evaluateHash(window.location.hash)
    }
  }, [])

  function onButtonTest() {
    // Getting User Token
    getToken()
  }

  return (
    <View style={{backgroundColor: '#191414', height: "100%"}}>
      {Object.keys(token).length === 0? 
      (
        <View style={{alignItems:'center', marginTop: 20}}>
          <Button sx={{backgroundColor: '#1DB954',
          '&:hover': {
            backgroundColor: '#1DB954',
            borderColor: '#1DB954',
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: '#1DB954',
            borderColor: '#1DB954',
          },
          '&:focus': {
            boxShadow: '0 0 0 0.2rem #43bf6f',
          }
          }} variant='contained' onClick={() => onButtonTest()}>Login Spotify</Button>
        </View>
      ) 
      : 
      (
        <MainApp/>
      )
      }
    </View>
  );
}

export default Login;
