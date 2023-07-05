
import React, {ChangeEvent, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MdRemoveCircle} from "react-icons/md";

import Biquad, {AvailabeBiquadType} from './Biquad';
import BiquadPanel from './BiquadPanel';

import './BiquadControlBoard.css'

const createDefaultBiquad = () => {
    return new Biquad({
        type: 'HPF',
        gain_db: 0.0,
        freq_hz: 0.0,
        q: 1.0,
        });
}

type BcbSubmitFcn = (biquads: Biquad[]) => void;

type BiquadControlBoardProp = {
    isEditing: boolean,
    triggerAdd: number,
    onRefresh?: BcbSubmitFcn 
};

const BiquadControlBoard = ({
    isEditing,
    triggerAdd,
    onRefresh
}: BiquadControlBoardProp) => {
    const [biquads, setBiquads] = useState<Biquad[]>([]);

    const handleAddBiquad = () => {
        if (biquads.length < 5) {
            let newBiquads = biquads.slice();
            newBiquads.push(createDefaultBiquad());
            setBiquads(newBiquads);
        }
    };

    const handleRefresh = () => {
        let currBiquads = biquads.slice();
        onRefresh?.(currBiquads);
    }

    useEffect(() => {
        handleRefresh();
     }, [biquads]);

    useEffect(handleAddBiquad, [triggerAdd]);

    const getHandleRemoveOn = (idx: number) => {
        return () => {
            let newBiquads = biquads.slice();
            setBiquads(newBiquads.filter((v, _idx) => _idx !== idx))
        }
    }

    const getHandleTypeChangeOn = (idx: number) => {
        return (e: ChangeEvent<HTMLSelectElement>) => {
            // console.log('Type Change on ', idx)
            let newBiquads = biquads.slice();
            newBiquads[idx].prop.type = e.target.value as AvailabeBiquadType;
            setBiquads(newBiquads);
            };
        };

    const getHandleChangeOn = (key: 'freq_hz' | 'gain_db' | 'q', idx: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            let newBiquads = biquads.slice();
            newBiquads[idx].prop[key] = Number(e.target.value);
            setBiquads(newBiquads);
            };
        };

    const panels = biquads.map((e, idx) => {
        const editBtn = (isEditing) ? 
            (<Button 
                variant='light' className='circle-btn'
                onClick={getHandleRemoveOn(idx)}
             >
                    <MdRemoveCircle color='red' size={30}/>
             </Button>) : null;
        return (
            <Form.Group key={idx} className={'panel-row'}>
                {editBtn}
                <BiquadPanel prop={e.prop} 
                    onTypeChange={getHandleTypeChangeOn(idx)}
                    onFreqChange={getHandleChangeOn('freq_hz', idx)}
                    onQChange={getHandleChangeOn('q', idx)}
                    onGainChange={getHandleChangeOn('gain_db', idx)}
                />
            </Form.Group>
        )});

    return (
        <Form>
            {panels}
        </Form>
    );
}

export default BiquadControlBoard


