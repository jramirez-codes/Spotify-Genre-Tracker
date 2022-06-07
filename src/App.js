import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {View} from 'react-native-web'
import Login from './components/Login';
import Redirect from './components/Redirect';

function App() {
  return (
    // style={{backgroundColor: '#191414', height: window.innerHeight}}
    <View >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/redirect" element={<Redirect/>}/>
        </Routes>
      </BrowserRouter>
    </View>
  );
}

export default App;
