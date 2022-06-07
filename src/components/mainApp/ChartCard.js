import React, {useEffect, useState} from 'react'
import LineChartData from '../charts/LineChartData';
import BarChartData from '../charts/BarChartData';
import {View} from 'react-native-web'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import Tooltip from '@mui/material/Tooltip';

function ChartCard(props) {
  // Set Data
  const [userData, setUserData] = useState([])
  useEffect(()=>{
    if(props.data.length !== 0) {
      setUserData(props.data)
    }
  }, [props])

  // Toggle which chart
  const [charts, setcharts] = React.useState('line');
  const handlecharts = (event, newcharts) => {
    if (newcharts !== null) {
      setcharts(newcharts);
    }
  };

  return (
    <Card>
      <CardContent>
        {charts === 'line' ? (
          <View style={{marginBottom: 20, alignItems:'center'}}>
            <h2>Genres Played vs. Time</h2>
            <LineChartData data = {userData}></LineChartData>
          </View>
        ) 
        : 
        (
          <View style={{marginBottom: 20, alignItems:'center'}}>
            <h2>Genres Recently Played</h2>
            <BarChartData data = {userData}></BarChartData>
          </View>
        )}
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
              value={charts}
              exclusive
              onChange={handlecharts}
              aria-label="text charts"
            >
              <ToggleButton value="bar" aria-label="left aligned">
                <Tooltip title="Bar Chart">
                  <BarChartIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="line" aria-label="right aligned">
                <Tooltip title="Line Chart">
                  <TimelineIcon/>
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </CardActions>
    </Card>
  )
}

export default ChartCard