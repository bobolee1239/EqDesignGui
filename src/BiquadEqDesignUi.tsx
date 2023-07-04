import React, {useDebugValue, useState} from 'react';
import Biquad from './Biquad';
import BiquadControlBoard from './BiquadControlBoard';
import ResponseMonitor from './ResponseMonitor';
// import './App.css';

type ReponsePoint = {
    freq_hz: number,
    mag_db: number
};

function BiquadEqDesignUi() {

    const createResponsePoint = (freq_hz: number, mag_db: number) => {
        return ({freq_hz: freq_hz, mag_db: mag_db});
    };

    const [freqResponse, setFreqResponse] = useState<ReponsePoint[]>([
        createResponsePoint(0.0, 0.0),
        createResponsePoint(24000.0, 0.0),
        ]);

    const handleUpdateFrequencyResponse = (biquads: Biquad[]) => {
        // const newReponse = xxxx;
        // setFreqResponse(newResponse);
    }

    return (
        <div className="biquad-eq-design-ui">
            <ResponseMonitor response={freqResponse} />
            <BiquadControlBoard onRefresh={handleUpdateFrequencyResponse}/>
        </div>
    );
}

export default BiquadEqDesignUi;
