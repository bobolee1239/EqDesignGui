import React, {useState, MouseEventHandler, ChangeEventHandler, ChangeEvent} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { MdOutlineAdd, MdModeEditOutline, MdOutlineDownloadDone, MdOutlineFileDownload} from "react-icons/md";
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

type FilterCoef = {
    a: number[],
    b: number[]
}

type UiToolBarProp = {
    onToggleEdit: MouseEventHandler<HTMLButtonElement>,
    onAdd: MouseEventHandler<HTMLButtonElement>,
    handleUpdateFilePath: ChangeEventHandler<HTMLInputElement>
    handleDownload: MouseEventHandler<HTMLButtonElement>,
};

const ToolBar = ({
    onAdd,
    onToggleEdit,
    handleUpdateFilePath,
    handleDownload
}: UiToolBarProp) => {
    const popover = (
        <Popover style={{maxWidth: 800}}>
          <Popover.Header as="h3">Download</Popover.Header>
          <Popover.Body>
            <Row>
                <InputGroup>
                    <Col xs={10}>
                        <Form.Control 
                            type="text" 
                            placeholder='example.txt'
                            onChange={handleUpdateFilePath}
                        />
                    </Col>
                    <Col xs={1}>
                        <Button 
                            className='download-btn'
                            variant="outline-success" 
                            onClick={handleDownload}
                        >
                            <MdOutlineDownloadDone size={25}/>
                        </Button>
                    </Col>
                </InputGroup>
            </Row>
          </Popover.Body>
        </Popover>
      );

    return (
        <ButtonToolbar className='toolbar'>
            <ButtonGroup className={'toolbar-add-btn'} >
                <Button 
                    variant="outline-warning" 
                    onClick={onAdd}
                >
                    <MdOutlineAdd size={30} />
                </Button>
            </ButtonGroup>
            <ButtonGroup className={'toolbar-btn'}>
                <Button 
                     variant="outline-danger" 
                    onClick={onToggleEdit}
                >
                    <MdModeEditOutline size={25}/>
                </Button>
                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                    <Button variant="outline-success" >
                        <MdOutlineFileDownload size={30} />
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
        </ButtonToolbar>
    );
}

const BiquadEqDesignUi = () => {

    const createResponsePoint = (freq_hz: number, mag_db: number) => {
        return ({freq_hz: freq_hz, mag_db: mag_db});
    };

    const [freqResponse, setFreqResponse] = useState<ResponsePoint[]>([
        createResponsePoint(1e-9, 0.0),
        createResponsePoint(24000.0, 0.0),
        ]);

    const [isEditing, setEditing] = useState(false);
    const [addingTrigger, setAddingTrigger] = useState(0);
    const [downloadFilePath, setDownloadFilePath] = useState('');
    const [biquadsCoef, setBiquadsCoef] = useState<FilterCoef[]>([]);

    const handleToggleEditing = () => {
        setEditing(!isEditing);
    }

    const handleTriggerAdd = () => {
        setAddingTrigger(addingTrigger+1);
    }

    const handleUpdateFilePath = (e: ChangeEvent<HTMLInputElement>) => {
        setDownloadFilePath(e.target.value);
    }

    const handleUpdateFrequencyResponse = (biquads: Biquad[]) => {
        const biquad_props = biquads.map((e) => e.prop).filter((e) => e.freq_hz > 10);
        if (!biquad_props.length)
        {
            setFreqResponse([]);
        }

        axios.post(
            'http://localhost:3006/design-biquads', {
                'biquads': biquad_props,
                'sr': 48000
            })
            .then(function (response) {
                console.log(response.data);
                const newResponse = response.data['response'];
                setFreqResponse(newResponse);
                setBiquadsCoef(response.data['coef']);
            })
            .catch(function (error) {
                console.log(error);
                setFreqResponse([]);
            });;
    }

    const handleDownload = () => {
        console.log('download to ', downloadFilePath);
        axios.post(
            'http://localhost:3006/download-biquads', {
                'path': downloadFilePath,
                'filters_coef': biquadsCoef
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });;
    }

    return (
        <div className="biquad-eq-design-ui">
            <ResponseMonitor response={freqResponse} />
            <ListGroup>
                <ListGroup.Item>
                    <BiquadControlBoard 
                        onRefresh={handleUpdateFrequencyResponse} 
                        isEditing={isEditing}
                        triggerAdd={addingTrigger}
                    />
                </ListGroup.Item>
            </ListGroup>
                <ToolBar 
                    onToggleEdit={handleToggleEditing} 
                    onAdd={handleTriggerAdd}
                    handleUpdateFilePath={handleUpdateFilePath}
                    handleDownload={handleDownload}
                />
        </div>
    );
}

export default BiquadEqDesignUi;
