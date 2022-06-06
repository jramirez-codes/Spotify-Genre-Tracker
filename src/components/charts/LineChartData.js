import React, {useEffect, useState} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {View} from 'react-native-web'
import { Line } from 'react-chartjs-2';
import configChartData from '../helpers/chartHelpers/configChartData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

var labels = ["Loading", "Please", "Wait"]
const options = {
  responsive: true,
  maintainAspectRatio: true,
  tension: 0.3,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

function LineChartData(props) {
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [3,2,1],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })

  useEffect(() => {
    if(props.data.length !== 0) {
      // Configuring Data
      var labels = props.data[2]
      var genres = props.data[1]
      var genreSet = configChartData(genres)
      
      setChartData({
        labels,
        datasets: genreSet,
      })
    }

  }, [props])

  return(
    <View>
      <View style={{width:(window.innerWidth * 0.85) }}>
        <Line options={options} data={chartData} />
      </View>
    </View>
  )
}

export default LineChartData