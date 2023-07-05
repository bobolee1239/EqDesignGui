import React, {ChangeEventHandler} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiquadProp, availableBiquadTypes } from './Biquad';

import 'bootstrap/dist/css/bootstrap.css';
import './BiquadPanel.css';

type BiquadPanelProp = {
    prop: BiquadProp,
    onTypeChange?: ChangeEventHandler<HTMLSelectElement>,
    onFreqChange?: ChangeEventHandler<HTMLInputElement>,
    onGainChange?: ChangeEventHandler<HTMLInputElement>,
    onQChange?: ChangeEventHandler<HTMLInputElement>,
}

const BiquadPanel = ({
    prop,
    onTypeChange,
    onFreqChange,
    onGainChange,
    onQChange
}: BiquadPanelProp) => {

    const options = availableBiquadTypes
                        .filter(e => e !== prop.type)
                        .map(e => { return (
                            <option key={e} value={e}>{e}</option>
                        )});

    return (
        <div className={'biquad-panel'}>
            <InputGroup className={['mb-1', 'input-type'].join(' ')}>
                <Form.Select onChange={onTypeChange}>
                    <option>{prop.type}</option>
                    {options}
                </Form.Select>
            </InputGroup>
            <InputGroup className={['mb-1', 'input-freq'].join(' ')}>
                <InputGroup.Text>Freq(Hz)</InputGroup.Text>
                <Form.Control 
                    type={'number'} step={100} 
                    onChange={onFreqChange} defaultValue={prop.freq_hz}
                />
            </InputGroup>
            <InputGroup className={['mb-1', 'input-q'].join(' ')}>
                <InputGroup.Text>Q</InputGroup.Text>
                <Form.Control 
                    type={'number'} step={0.01} 
                    onChange={onQChange} defaultValue={prop.q}
                />
            </InputGroup>
            <InputGroup className={['mb-1', 'input-gain'].join(' ')}>
                <InputGroup.Text>Gain(dB)</InputGroup.Text>
                <Form.Control 
                    type={'number'} step={0.1} 
                    onChange={onGainChange} defaultValue={prop.gain_db}
                />
            </InputGroup>
        </div>
    );
};

export default BiquadPanel;
