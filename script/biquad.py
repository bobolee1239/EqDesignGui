import numpy as np 
from scipy import signal

class BiquadDesign:
    LPF = 0
    HPF = 1
    PeakEQ = 2
    # -----

    def __init__(self, sr=48000):
        self._sr = sr
        return 
    
    def design(self, type, cutoff_freq, q, gain_db):
        def db(x):
            return 10.0**(x/20.0)
        w0 = 2.0*np.pi*cutoff_freq/self._sr

        if type == BiquadDesign.LPF:
            return BiquadDesign._designLpf(w0, q)
        elif type == BiquadDesign.HPF:
            return BiquadDesign._designHpf(w0, q)
        elif type == BiquadDesign.PeakEQ:
            A = np.sqrt(db(gain_db))
            return BiquadDesign._designPeakEq(w0, A, q)
        else:
            return None, None

    @staticmethod
    def _designLpf(w0, q):
        alpha = np.sin(w0) / (2.0 * q)
        b = np.array([
                (1.0 - np.cos(w0))/2.0,
                (1.0 - np.cos(w0)),
                (1.0 - np.cos(w0))/2.0,
            ], dtype=np.float32
            )
        a = np.array([
                1.0 + alpha,
                -2.0*np.cos(w0),
                1.0 - alpha
            ], dtype=np.float32
            )
        b = b / a[0]
        a = a / a[0]
        return b, a

    @staticmethod
    def _designHpf(w0, q):
        alpha = np.sin(w0) / (2.0 * q)
        b = np.array([
                (1.0 + np.cos(w0))/2.0,
               -(1.0 + np.cos(w0)),
                (1.0 + np.cos(w0))/2.0,
            ], dtype=np.float32
            )
        a = np.array([
                1.0 + alpha,
                -2.0*np.cos(w0),
                1.0 - alpha
            ], dtype=np.float32
            )
        b = b / a[0]
        a = a / a[0]
        return b, a

    @staticmethod
    def _designPeakEq(w0, A, q):
        alpha = np.sin(w0) / (2.0 * q)
        b = np.array([
                1.0 + alpha*A,
               -2.0*np.cos(w0),
                1.0 - alpha*A,
            ], dtype=np.float32
            )
        a = np.array([
                1.0 + alpha/A,
                -2.0*np.cos(w0),
                1.0 - alpha/A,
            ], dtype=np.float32
            )
        b = b / a[0]
        a = a / a[0]
        return b, a
