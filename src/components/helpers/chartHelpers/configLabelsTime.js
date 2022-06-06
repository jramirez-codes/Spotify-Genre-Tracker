// Takes an array on UNIX Time strings in ms
// and converts the data to string
function configTime(dates) {
    var label = []
    for(var i = 0; i < dates.length; i++) {
        var time = new Date(parseInt(dates[i]))
        label.push(time.toDateString())
    }

    return label
}

export default configTime