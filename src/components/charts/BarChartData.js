import React, {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {View} from 'react-native-web'
import { Bar } from 'react-chartjs-2';
import configBarLabels from '../helpers/chartHelpers/configBarLabels';
import configBarChartData from '../helpers/chartHelpers/configBarChartData';
import externalTooltipHandler from '../helpers/chartHelpers/BarToolTip';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      yAlign: 'top',
      external: externalTooltipHandler
    }
  },
};

function BarChartData(props) {
  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  useEffect(() => {
    if(props.data.length !== 0) {
      // Configuring Data
      var genres = props.data[1]
      var labels = configBarLabels(genres)
      var genreSet = configBarChartData(genres, labels)

      // Setting Data
      setChartData({
        labels,
        datasets: genreSet,
      })
    }

  }, [props])

  return(
    <View>
      <View style={{width:(window.innerWidth * 0.85) }}>
        <Bar options={options} data={chartData} />
      </View>
    </View>
  )
}

export default BarChartData