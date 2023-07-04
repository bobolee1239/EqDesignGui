
import React, {ChangeEvent, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa";
import { MdRemoveCircle, MdModeEditOutline, MdDone} from "react-icons/md";

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
   onSubmit?: BcbSubmitFcn 
};

const BiquadControlBoard = ({
    onSubmit
}: BiquadControlBoardProp) => {
    const [biquads, setBiquads] = useState<Biquad[]>([createDefaultBiquad(), ]);
    const [isEditing, setEditing] = useState(false);

    const handleAddBiquad = () => {
        if (biquads.length < 5) {
            let newBiquads = biquads.slice();
            newBiquads.push(createDefaultBiquad());
            setBiquads(newBiquads);
        }
    };

    const handleSubmit = () => {
        let currBiquads = biquads.slice();
        console.log('submit on ', currBiquads);
        onSubmit?.(currBiquads);
    }

    const handleEnableEdit = () => {
        setEditing(!isEditing);
    }

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
            console.log('Change of ', key, ' on ', idx)
            let newBiquads = biquads.slice();
            newBiquads[idx].prop[key] = Number(e.target.value);
            setBiquads(newBiquads);
            console.log(newBiquads);
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
            <div className={'panel-row'}>
                {editBtn}
                <BiquadPanel key={idx} prop={e.prop} 
                    onTypeChange={getHandleTypeChangeOn(idx)}
                    onFreqChange={getHandleChangeOn('freq_hz', idx)}
                    onQChange={getHandleChangeOn('q', idx)}
                    onGainChange={getHandleChangeOn('gain_db', idx)}
                />
            </div>
        )});

    return (
        <div className={'board'}>
            <div className={'board-panels'}>
                {panels}
            </div>
            <div className={'board-control'}>
                <Button 
                    className={'board-control-container'} variant="outline-danger" 
                    onClick={handleEnableEdit}
                >
                    <MdModeEditOutline />
                </Button>
                <Button 
                    className={'board-control-container'} variant="outline-warning" 
                    onClick={handleAddBiquad}
                >
                    <FaPlus />
                </Button>
                <Button 
                    className={'board-control-container'} variant="outline-success" 
                    onClick={handleSubmit}
                >
                    <MdDone />
                </Button>
            </div>
        </div>
    );
}

export default BiquadControlBoard


