
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ResponseMonitor extends React.Component {	
    render() {
        const pts = this.props.response.map((e, idx) => {return {x: e.freq_hz, y:e.mag_db};});

        const options = {
            title: {
                text: "Frequency Response"
            },
            data: [{				
                type: "line",
                dataPoints: pts,
            }],
            axisX: {
                minimum: 0.0,
                maximum: 24000.0,
                // logarithmic: true,
                // logarithmBase: 10,
            },
            axisY: {
                minimum: -60.0,
                maximum: 6.0,
            }
        }
          
        return (
            <div>
            <CanvasJSChart options = {options} containerProps={{width: "100%"}}
                /* onRef = {ref => this.chart = ref} */
            />
            </div>
        );
    }
  }

export default ResponseMonitor;

