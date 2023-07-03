import React, {ChangeEventHandler} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiquadProp, availableBiquadTypes } from './Biquad';

import 'bootstrap/dist/css/bootstrap.css';
import './BiquadPanel.css';

type NumberInputProp = {
    value: number,
    step: number, 
    onChange?: ChangeEventHandler<HTMLInputElement>,
}

const NumberInput = ({value, step, onChange}: NumberInputProp) => {
    return (
        <input className={'form-control'}
            type={'number'} step={`${step}`} value={`${value}`} onChange={onChange} />
    );
}

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
            <InputGroup className={['mb-3', 'input-type'].join(' ')}>
                <Form.Select onChange={onTypeChange}>
                    <option>{prop.type}</option>
                    {options}
                </Form.Select>
            </InputGroup>
            <InputGroup className={['mb-3', 'input-freq'].join(' ')}>
                <InputGroup.Text>Freq(Hz)</InputGroup.Text>
                <NumberInput value={prop.freq_hz} step={100} onChange={onFreqChange} />
            </InputGroup>
            <InputGroup className={['mb-3', 'input-q'].join(' ')}>
                <InputGroup.Text>Q</InputGroup.Text>
                <NumberInput value={prop.q} step={0.01} onChange={onQChange} />
            </InputGroup>
            <InputGroup className={['mb-3', 'input-gain'].join(' ')}>
                <InputGroup.Text>Gain(dB)</InputGroup.Text>
                <NumberInput value={prop.gain_db} step={0.1} onChange={onGainChange} />
            </InputGroup>
        </div>
    );
};

export default BiquadPanel;
