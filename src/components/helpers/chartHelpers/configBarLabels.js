function configBarLabels(data) {
    var labels = []
    for(var i = 0; i < data.length; i++) {
        labels.push(data[i][2])
    }

    return labels
}

export default configBarLabels