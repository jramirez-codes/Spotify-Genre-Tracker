const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '0px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
  
      // const table = document.createElement('table');
      const table = document.createElement('div')
      table.style.margin = '0px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
  
const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {
      // Data from the chart
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map(b => b.lines);
  
      const mainBody = document.createElement('div');
      titleLines.forEach(title => {
        // Top Header
        const headTitle = document.createElement('div')
        headTitle.innerHTML = "<h4>"+title+"</h4>"
        headTitle.style.textAlign = 'center'
        headTitle.style.marginTop = "-20px"
        mainBody.appendChild(headTitle)

        // For Tracks
        var spotifyTracks = window.localStorage.getItem("toolTipInfo")
        if(spotifyTracks !== null) {
          var tracks = JSON.parse(spotifyTracks)
  
          // Image
          const img = document.createElement('img');
          img.src = tracks.images[title][2].url
          img.style.display = 'block'
          img.style.margin = '0 auto'
      
          // Track name
          const trackName = document.createElement('div');
          trackName.innerHTML = '<p>'+tracks.trackNames[title]+'</p>'
          trackName.style.textAlign = 'center'
  
          // Artist
          const artistName = document.createElement('div');
          artistName.innerHTML = '<p>'+tracks.artistNames[title]+'</p>'
          artistName.style.textAlign = 'center'
          artistName.style.marginTop = '-20px'
          
          // Adding to the document
          mainBody.appendChild(img);
          mainBody.appendChild(trackName);
          mainBody.appendChild(artistName);
        }
      })
  
      // const tableRoot = tooltipEl.querySelector('table');
      const tableRoot = tooltipEl.querySelector('div');
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
  
      // Add new children
      tableRoot.appendChild(mainBody)
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export default externalTooltipHandler