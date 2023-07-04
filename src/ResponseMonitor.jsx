
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ResponseMonitor extends React.Component {	
    render() {
        const pts = this.props.response.map((e, idx) => {return {x: Math.log10(e.freq_hz), y:e.mag_db};});

        const options = {
            title: {
                text: "Frequency Response"
            },
            data: [{				
                type: "line",
                dataPoints: pts,
            }],
            axisX: {
                title: 'Frequency (Hz)',
                minimum: 1.5,
                maximum: Math.log10(24000.0),
                labelFormatter: (e) => {
                    var lable = Math.pow(10 ,e.value);
                    if(lable >= 1000.0)
                    {
                        lable = Math.round(lable/1000.0*10)/10;
                        lable = CanvasJS.formatNumber(lable) +"k";
                    }
                    else
                    {
                        lable = Math.round(lable*10)/10;
                        lable =  CanvasJS.formatNumber(lable);
                    }
                    return lable;
                },
                interval : 0.15,
                includeZero :false
            },
            axisY: {
                title: 'Magnitude (dB)',
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

