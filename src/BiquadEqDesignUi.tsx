import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
// import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import Biquad from './Biquad';
import BiquadControlBoard from './BiquadControlBoard';
import ResponseMonitor from './ResponseMonitor';
import './BiquadEqDesignUi.css';

type ResponsePoint = {
    freq_hz: number,
    mag_db: number
};

// type FilterCoef = {
//     a: number[],
//     b: number[]
// }

// type BiquadDesignResponse = {
//     coef: FilterCoef[],
//     response: ResponsePoint[]
// };

function BiquadEqDesignUi() {

    const createResponsePoint = (freq_hz: number, mag_db: number) => {
        return ({freq_hz: freq_hz, mag_db: mag_db});
    };

    const [freqResponse, setFreqResponse] = useState<ResponsePoint[]>([
        createResponsePoint(1e-9, 0.0),
        createResponsePoint(24000.0, 0.0),
        ]);

    const handleUpdateFrequencyResponse = (biquads: Biquad[]) => {
        const biquad_props = biquads.map((e) => e.prop).filter((e) => e.freq_hz > 10);
        if (!biquad_props.length)
        {
            setFreqResponse([]);
        }

        axios.post(
            'http://localhost:3006/biquads-response', {
                'biquads': biquad_props,
                'sr': 48000
            })
            .then(function (response) {
                console.log(response.data);
                const newResponse = response.data['response'];
                setFreqResponse(newResponse);
            })
            .catch(function (error) {
                console.log(error);
                setFreqResponse([]);
            });;
    }

    return (
        <div className="biquad-eq-design-ui">
            <ResponseMonitor response={freqResponse} />
            {/* <Form.Text>Ab</Form.Text> */}
            <BiquadControlBoard onRefresh={handleUpdateFrequencyResponse}/>
        </div>
    );
}

export default BiquadEqDesignUi;
