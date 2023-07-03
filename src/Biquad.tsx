
export const availableBiquadTypes = ['LPF', 'HPF', 'PEQ'] as const;
export type AvailabeBiquadType = typeof availableBiquadTypes[number];

export type BiquadProp = {
    type: AvailabeBiquadType,
    freq_hz: number,
    gain_db: number,
    q: number,
}

class Biquad {
    prop: BiquadProp;
    constructor(prop: BiquadProp) 
    {
        this.prop = prop;
    }
};

export default Biquad;
