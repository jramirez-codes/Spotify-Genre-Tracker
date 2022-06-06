
const colors = [
    "rgb(158,1,66)",
    "rgb(213,62,79)",
    "rgb(244,109,67)",
    "rgb(253,174,97)",
    "rgb(253,224,139)",
    "rgb(230,245,152)",
    "rgb(171,221,164)",
    "rgb(102,194,165)",
    "rgb(50,136,189)",
    "rgb(94,79,162)",
]

function configBarChartData(data, label) {
    var chartData = []

    for(var i = 0; i < data.length; i++) {
        chartData.push(data[i][0])
    }

    var chartDataset = [{
        label: "Recently Played",
        data: chartData,
        backgroundColor: colors,
    }]

    return chartDataset
}

export default configBarChartData