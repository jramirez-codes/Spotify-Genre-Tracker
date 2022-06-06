import React, {useEffect, useState} from 'react'
import {View} from 'react-native-web'
import getUserInfo from './helpers/spotifyHelpers/getUserInfo';
import LineChartData from './charts/LineChartData';
import BarChartData from './charts/BarChartData';
function MainApp() {
  const [user, setUser] = useState({display_name: ""})
  const [userData, setUserData] = useState([])

  // eslint-disable-next-line
  useEffect(()=>{
    async function userInfo() {
      var token = await JSON.parse(window.localStorage.getItem("spotifyToken"))
      if(token !== null) {
        // Get User info
        var data = await getUserInfo(token.access_token)
        setUser(data[0])
        setUserData(data)
      }
    }

    userInfo()
  },[]) 


  return (
    <View style={{alignItems:'center', color:'white', backgroundColor: '#191414'}}>
      <h1>Welcome {user.display_name}!</h1>
      <View style={{marginBottom: 20, alignItems:'center'}}>
        <h2>Genres Played Played vs. Time</h2>
        <LineChartData data = {userData}></LineChartData>
      </View>
      <View style={{marginBottom: 20, alignItems:'center'}}>
        <h2>Genres Recently Played</h2>
        <BarChartData data = {userData}></BarChartData>
      </View>
    </View>
  );
}

export default MainApp