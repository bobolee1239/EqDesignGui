import numpy as np
import matplotlib.pyplot as plt

from flask import Flask, request, jsonify
from flask_cors import CORS

from biquad import BiquadDesign
from scipy import signal

app = Flask(__name__)
CORS(app)

@app.route('/biquads-response', methods=['POST'])
def postInput():
    def convertType(type: str):
        type = type.lower()
        ret = None
        if type == 'lpf':
            ret = BiquadDesign.LPF
        elif type == 'hpf':
            ret = BiquadDesign.HPF
        elif type == 'peq':
            ret = BiquadDesign.PeakEQ
        return ret

    data = request.get_json()
    print(data)
    biquad_props = data['biquads']
    sr = data['sr']

    ret = {
        'coef': [], 
        'response': []
        }
    biquad_design = BiquadDesign(sr)
    sos = []
    for prop in biquad_props:
        biquad_type = convertType(prop['type'])
        if biquad_type is not None:
            b, a = biquad_design.design(biquad_type, 
                                        prop['freq_hz'], prop['q'], prop['gain_db'])
            a = [float(v) for v in a]
            b = [float(v) for v in b]
            ret['coef'].append({'a': a, 'b': b})
            sos.append(b+a)

    sos = np.array(sos, dtype=np.float32)
    w, h = signal.sosfreqz(sos, worN=4096, fs=sr)
    mags_db = 20.0*np.log10(np.maximum(np.abs(h), 1e-9))
    freqs_hz = w
    for freq_hz, mag_db in zip(freqs_hz, mags_db):
        ret['response'].append({'freq_hz': float(freq_hz), 'mag_db': float(mag_db)})

    return jsonify(ret)


if __name__ == '__main__':
    app.run(host='localhost', port=3006, debug=True)
