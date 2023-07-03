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

const BiquadPanel = ({
    type, 
    freq_hz,
    gain_db,
    q
}: BiquadProp) => {

    const options = availableBiquadTypes
                        .filter(e => e !== type)
                        .map(e => { return (
                            <option key={e} value={e}>{e}</option>
                        )});

    return (
        <div className={'biquad-panel'}>
            <InputGroup className={['mb-3', 'input-type'].join(' ')}>
                <Form.Select>
                    <option>{type}</option>
                    {options}
                </Form.Select>
            </InputGroup>
            <InputGroup className={['mb-3', 'input-freq'].join(' ')}>
                <InputGroup.Text>Freq(Hz)</InputGroup.Text>
                <NumberInput value={freq_hz} step={100} onChange={(e) => console.log('change cutoff freq')} />
            </InputGroup>
            <InputGroup className={['mb-3', 'input-q'].join(' ')}>
                <InputGroup.Text>Q</InputGroup.Text>
                <NumberInput value={q} step={0.01} onChange={(e) => console.log('change q value')} />
            </InputGroup>
            <InputGroup className={['mb-3', 'input-gain'].join(' ')}>
                <InputGroup.Text>Gain(dB)</InputGroup.Text>
                <NumberInput value={gain_db} step={0.1} onChange={(e) => console.log('change gain')} />
            </InputGroup>
        </div>
    );
};

export default BiquadPanel;
