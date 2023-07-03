import React from 'react';
import BiquadPanel from './BiquadPanel';
// import './App.css';

function App() {
  return (
    <div className="App">
      <BiquadPanel type={"HPF"} freq_hz={1000} q={0.1} gain_db={1.0} />
    </div>
  );
}

export default App;
