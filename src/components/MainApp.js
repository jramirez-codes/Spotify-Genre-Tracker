import React, {useEffect, useState} from 'react'
import {View} from 'react-native-web'
import getUserInfo from './helpers/spotifyHelpers/getUserInfo';
import ChartCard from './mainApp/ChartCard';
import PlayedRecently from './mainApp/PlayedRecently';

function MainApp() {
  const [user, setUser] = useState({display_name: ""})
  const [userData, setUserData] = useState([])
  const [userToken, setUserToken] = useState("")

  // eslint-disable-next-line
  useEffect(()=>{
    async function userInfo() {
      var token = await JSON.parse(window.localStorage.getItem("spotifyToken"))
      if(token !== null) {
        // Get User info
        setUserToken(token.access_token)
        var data = await getUserInfo(token.access_token)
        setUser(data[0])
        setUserData(data)
      }
    }

    userInfo()
  },[]) 

  // , color:'white', backgroundColor: '#191414'
  return (
    <>
      <View style={{alignItems:'center'}}>
        <h1>Welcome {user.display_name}!</h1>
        <View style={{marginBottom: 10}}>
          <ChartCard data={userData}/>
        </View>
        <View style={{marginBottom: 10}}>        
          <PlayedRecently data={userData} token={userToken}/>
        </View>
      </View>
    </>
  );
}

export default MainApp