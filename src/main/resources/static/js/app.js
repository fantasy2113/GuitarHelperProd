'use strict';
var btnIdArr = [];
var strBtnId = [];
var currentTuning = [];
var currentScale = [];
var scalesArr = [];
var tuningsArr = [];
var scalesArrVal = [];
var tuningsArrVal = [];
var fretBoard = [[]];
var savedTones = [];
var colorMap = {};
var isClickAllowed = true;
var currentFrets = 0;
var keytone = '';
const DEFAULT_GRAY = '#F6F6F6';
const DEFAULT_RGB = 'rgb(246, 246, 246)';
const MAX_STR = 9;
const MAX_FRETS = 28;
const TONE_COLOR_ARR = ['#FFFF00', '#F4FA16', '#E9F62D', '#DEF144', '#D3ED5A', '#C8E871', '#BDE488', '#B2DF9F', '#A7DBB5', '#9CD6CC', '#91D2E3', '#87CEFA'];
const SCALE_COLOR_ARR = ['#FFFF00', '#EBF629', '#D7EE53', '#C3E67D', '#AFDEA6', '#9BD6D0', '#87CEFA'];
const BLUES_COLOR_ARR = ['#FFFF00', '#E7F532', '#CFEB64', '#B7E196', '#9FD7C8', '#87CEFA'];
const PENTA_COLOR_ARR = ['#FFFF00', '#E1F23E', '#C3E67D', '#A5DABB', '#87CEFA'];
const CHORD7_COLOR_ARR = ['#FFFF00', '#D7EE53', '#AFDEA6', '#87CEFA'];
const CHORD_COLOR_ARR = ['#FFFF00', '#C3E67D', '#87CEFA'];
const CHORD5_COLOR_ARR = ['#FFFF00', '#87CEFA'];

// asp.net generated content - start
const MAX_NOTE_LEN = 5;
const FRET_WIRES_ARR = ["12", "18", "21", "22", "24", "27"];
const STEPS = ["I", "II", "III", "IV", "V", "VI", "VII"];

const A = "A";
const B_FLAT = "A#/Bb";
const B = "B";
const C = "C";
const C_SHARP = "C#/Db";
const D = "D";
const D_SHARP = "D#/Eb";
const E = "E";
const F = "F";
const F_SHARP = "F#/Gb";
const G = "G";
const G_SHARP = "G#/Ab";

const MAJOR_STEPS_DICT = {
  "I" : "Major",
  "II" : "Minor",
  "III" : "Minor",
  "IV" : "Major",
  "V" : "Major",
  "VI" : "Minor",
  "VII" : "Dim"
};

const MINOR_STEPS_DICT = {
  "I" : "Minor",
  "II" : "Dim",
  "III" : "Major",
  "IV" : "Minor",
  "V" : "Minor",
  "VI" : "Major",
  "VII" : "Major"
};

const HARMONIC_STEPS_DICT = {
  "I" : "Minor",
  "II" : "Dim",
  "III" : "Aug",
  "IV" : "Minor",
  "V" : "Major",
  "VI" : "Major",
  "VII" : "Dim"
};

const MELODIC_STEPS_DICT = {
  "I" : "Minor",
  "II" : "Minor",
  "III" : "Aug",
  "IV" : "Major",
  "V" : "Major",
  "VI" : "Dim",
  "VII" : "Dim"
};

const PY_DOM_STEPS_DICT = {
};

const PY_STEPS_DICT = {
};

const MIXLYDIAN_STEPS_DICT = {
};

const LYDIAN_STEPS_DICT = {
};

const DORIC_STEPS_DICT = {
};

const HUNGARIAN_STEPS_DICT = {
};

const ARABIC_STEPS_DICT = {
};

const BLUES_STEPS_DICT = {
};

const TONES_ARR = [A,B_FLAT,B,C,C_SHARP,D,D_SHARP,E,F,F_SHARP,G,G_SHARP];

const KEYTONES_ARR = ["No keytone",A,B_FLAT,B,C,C_SHARP,D,D_SHARP,E,F,F_SHARP,G,G_SHARP];

const SCALES_MAP = {
  "No scale": [],
  "A 5 Chord": [A,E],
  "A +5 Chord": [A,C_SHARP,F],
  "A 7+5 Chord": [A,C_SHARP,F,G],
  "A 7-5 Chord": [A,C_SHARP,D_SHARP,G],
  "A 6 Chord": [A,C_SHARP,E,F_SHARP],
  "A 7 Chord": [A,C_SHARP,E,G],
  "A 9/6 Chord": [A,B,C_SHARP,E,F_SHARP],
  "A 9 Chord": [A,B,C_SHARP,E,G],
  "A Major Chord": [A,C_SHARP,E],
  "A Slash Major Chord": [A,D,F_SHARP],
  "A Major 7 Chord": [A,C_SHARP,E,G_SHARP],
  "A Major 9 Chord": [A,B,C_SHARP,E,G_SHARP],
  "A Add 2 Chord": [A,B,C_SHARP,E],
  "A Aug Chord": [A,C_SHARP,F],
  "A Sus 2 Chord": [A,B,E],
  "A Sus 4 Chord": [A,D,E],
  "A Sus 4/7 Chord": [A,D,E,G],
  "A Major Scale": [A,B,C_SHARP,D,E,F_SHARP,G_SHARP],
  "A Major Pentatonic": [A,B,C_SHARP,E,F_SHARP],
  "A Phrygian Dominant Scale": [A,B_FLAT,C_SHARP,D,E,F,G],
  "A Lydian Scale": [A,B,C_SHARP,D_SHARP,E,F_SHARP,G_SHARP],
  "A Mixolydian Scale": [A,B,C_SHARP,D,E,F_SHARP,G],
  "A Arabic Scale": [A,B_FLAT,C_SHARP,D,E,F,G_SHARP],
  "A Minor Chord": [A,C,E],
  "A Minor 6 Chord": [A,C,E,F_SHARP],
  "A Minor 7 Chord": [A,C,E,G],
  "A Minor 7-5 Chord": [A,C,D_SHARP,G],
  "A Minor 9 Chord": [A,B,C,E,G],
  "A Dim Chord": [A,C,D_SHARP],
  "A Dim 7 Chord": [A,C,D_SHARP,G_SHARP],
  "A Blues": [A,C,D,D_SHARP,E,G],
  "A Minor Scale": [A,B,C,D,E,F,G],
  "A Minor Pentatonic": [A,C,D,E,G],
  "A Minor Harmonic Scale": [A,B,C,D,E,F,G_SHARP],
  "A Minor Melodic Scale": [A,B,C,D,E,F_SHARP,G_SHARP],
  "A Phrygian Scale": [A,B_FLAT,C,D,E,F,G],
  "A Doric Scale": [A,B,C,D,E,F_SHARP,G],
  "A Hungarian Scale": [A,B,C,D_SHARP,E,F,G_SHARP],

  "A#/Bb 5 Chord": [B_FLAT,F],
  "A#/Bb +5 Chord": [B_FLAT,D,F_SHARP],
  "A#/Bb 7+5 Chord": [B_FLAT,D,F_SHARP,G_SHARP],
  "A#/Bb 7-5 Chord": [B_FLAT,D,E,G_SHARP],
  "A#/Bb 6 Chord": [B_FLAT,D,F,G],
  "A#/Bb 7 Chord": [B_FLAT,D,F,G_SHARP],
  "A#/Bb 9/6 Chord": [B_FLAT,C,D,F,G],
  "A#/Bb 9 Chord": [B_FLAT,C,D,F,G_SHARP],
  "A#/Bb Major Chord": [B_FLAT,D,F],
  "A#/Bb Slash Major Chord": [B_FLAT,D_SHARP,G],
  "A#/Bb Major 7 Chord": [B_FLAT,D,F,A],
  "A#/Bb Major 9 Chord": [B_FLAT,C,D,F,A],
  "A#/Bb Add 2 Chord": [B_FLAT,C,D,F],
  "A#/Bb Aug Chord": [B_FLAT,D,F_SHARP],
  "A#/Bb Sus 2 Chord": [B_FLAT,C,F],
  "A#/Bb Sus 4 Chord": [B_FLAT,D_SHARP,F],
  "A#/Bb Sus 4/7 Chord": [B_FLAT,D_SHARP,F,G_SHARP],
  "A#/Bb Major Scale": [B_FLAT,C,D,D_SHARP,F,G,A],
  "A#/Bb Major Pentatonic": [B_FLAT,C,D,F,G],
  "A#/Bb Phrygian Dominant Scale": [B_FLAT,B,D,D_SHARP,F,F_SHARP,G_SHARP],
  "A#/Bb Lydian Scale": [B_FLAT,C,D,E,F,G,A],
  "A#/Bb Mixolydian Scale": [B_FLAT,C,D,D_SHARP,F,G,G_SHARP],
  "A#/Bb Arabic Scale": [B_FLAT,B,D,D_SHARP,F,F_SHARP,A],
  "A#/Bb Minor Chord": [B_FLAT,C_SHARP,F],
  "A#/Bb Minor 6 Chord": [B_FLAT,C_SHARP,F,G],
  "A#/Bb Minor 7 Chord": [B_FLAT,C_SHARP,F,G_SHARP],
  "A#/Bb Minor 7-5 Chord": [B_FLAT,C_SHARP,E,G_SHARP],
  "A#/Bb Minor 9 Chord": [B_FLAT,C,C_SHARP,F,G_SHARP],
  "A#/Bb Dim Chord": [B_FLAT,C_SHARP,E],
  "A#/Bb Dim 7 Chord": [B_FLAT,C_SHARP,E,A],
  "A#/Bb Blues": [B_FLAT,C_SHARP,D_SHARP,E,F,G_SHARP],
  "A#/Bb Minor Scale": [B_FLAT,C,C_SHARP,D_SHARP,F,F_SHARP,G_SHARP],
  "A#/Bb Minor Pentatonic": [B_FLAT,C_SHARP,D_SHARP,F,G_SHARP],
  "A#/Bb Minor Harmonic Scale": [B_FLAT,C,C_SHARP,D_SHARP,F,F_SHARP,A],
  "A#/Bb Minor Melodic Scale": [B_FLAT,C,C_SHARP,D_SHARP,F,G,A],
  "A#/Bb Phrygian Scale": [B_FLAT,B,C_SHARP,D_SHARP,F,F_SHARP,G_SHARP],
  "A#/Bb Doric Scale": [B_FLAT,C,C_SHARP,D_SHARP,F,G,G_SHARP],
  "A#/Bb Hungarian Scale": [B_FLAT,C,C_SHARP,E,F,F_SHARP,A],

  "B 5 Chord": [B,F_SHARP],
  "B +5 Chord": [B,D_SHARP,G],
  "B 7+5 Chord": [B,D_SHARP,G,A],
  "B 7-5 Chord": [B,D_SHARP,F,A],
  "B 6 Chord": [B,D_SHARP,F_SHARP,G_SHARP],
  "B 7 Chord": [B,D_SHARP,F_SHARP,A],
  "B 9/6 Chord": [B,C_SHARP,D_SHARP,F_SHARP,G_SHARP],
  "B 9 Chord": [B,C_SHARP,D_SHARP,F_SHARP,A],
  "B Major Chord": [B,D_SHARP,F_SHARP],
  "B Slash Major Chord": [B,E,G_SHARP],
  "B Major 7 Chord": [B,D_SHARP,F_SHARP,B_FLAT],
  "B Major 9 Chord": [B,C_SHARP,D_SHARP,F_SHARP,B_FLAT],
  "B Add 2 Chord": [B,C_SHARP,D_SHARP,F_SHARP],
  "B Aug Chord": [B,D_SHARP,G],
  "B Sus 2 Chord": [B,C_SHARP,F_SHARP],
  "B Sus 4 Chord": [B,E,F_SHARP],
  "B Sus 4/7 Chord": [B,E,F_SHARP,A],
  "B Major Scale": [B,C_SHARP,D_SHARP,E,F_SHARP,G_SHARP,B_FLAT],
  "B Major Pentatonic": [B,C_SHARP,D_SHARP,F_SHARP,G_SHARP],
  "B Phrygian Dominant Scale": [B,C,D_SHARP,E,F_SHARP,G,A],
  "B Lydian Scale": [B,C_SHARP,D_SHARP,F,F_SHARP,G_SHARP,B_FLAT],
  "B Mixolydian Scale": [B,C_SHARP,D_SHARP,E,F_SHARP,G_SHARP,A],
  "B Arabic Scale": [B,C,D_SHARP,E,F_SHARP,G,B_FLAT],
  "B Minor Chord": [B,D,F_SHARP],
  "B Minor 6 Chord": [B,D,F_SHARP,G_SHARP],
  "B Minor 7 Chord": [B,D,F_SHARP,A],
  "B Minor 7-5 Chord": [B,D,F,A],
  "B Minor 9 Chord": [B,C_SHARP,D,F_SHARP,A],
  "B Dim Chord": [B,D,F],
  "B Dim 7 Chord": [B,D,F,B_FLAT],
  "B Blues": [B,D,E,F,F_SHARP,A],
  "B Minor Scale": [B,C_SHARP,D,E,F_SHARP,G,A],
  "B Minor Pentatonic": [B,D,E,F_SHARP,A],
  "B Minor Harmonic Scale": [B,C_SHARP,D,E,F_SHARP,G,B_FLAT],
  "B Minor Melodic Scale": [B,C_SHARP,D,E,F_SHARP,G_SHARP,B_FLAT],
  "B Phrygian Scale": [B,C,D,E,F_SHARP,G,A],
  "B Doric Scale": [B,C_SHARP,D,E,F_SHARP,G_SHARP,A],
  "B Hungarian Scale": [B,C_SHARP,D,F,F_SHARP,G,B_FLAT],

  "C 5 Chord": [C,G],
  "C +5 Chord": [C,E,G_SHARP],
  "C 7+5 Chord": [C,E,G_SHARP,B_FLAT],
  "C 7-5 Chord": [C,E,F_SHARP,B_FLAT],
  "C 6 Chord": [C,E,G,A],
  "C 7 Chord": [C,E,G,B_FLAT],
  "C 9/6 Chord": [C,D,E,G,A],
  "C 9 Chord": [C,D,E,G,B_FLAT],
  "C Major Chord": [C,E,G],
  "C Slash Major Chord": [C,F,A],
  "C Major 7 Chord": [C,E,G,B],
  "C Major 9 Chord": [C,D,E,G,B],
  "C Add 2 Chord": [C,D,E,G],
  "C Aug Chord": [C,E,G_SHARP],
  "C Sus 2 Chord": [C,D,G],
  "C Sus 4 Chord": [C,F,G],
  "C Sus 4/7 Chord": [C,F,G,B_FLAT],
  "C Major Scale": [C,D,E,F,G,A,B],
  "C Major Pentatonic": [C,D,E,G,A],
  "C Phrygian Dominant Scale": [C,C_SHARP,E,F,G,G_SHARP,B_FLAT],
  "C Lydian Scale": [C,D,E,F_SHARP,G,A,B],
  "C Mixolydian Scale": [C,D,E,F,G,A,B_FLAT],
  "C Arabic Scale": [C,C_SHARP,E,F,G,G_SHARP,B],
  "C Minor Chord": [C,D_SHARP,G],
  "C Minor 6 Chord": [C,D_SHARP,G,A],
  "C Minor 7 Chord": [C,D_SHARP,G,B_FLAT],
  "C Minor 7-5 Chord": [C,D_SHARP,F_SHARP,B_FLAT],
  "C Minor 9 Chord": [C,D,D_SHARP,G,B_FLAT],
  "C Dim Chord": [C,D_SHARP,F_SHARP],
  "C Dim 7 Chord": [C,D_SHARP,F_SHARP,B],
  "C Blues": [C,D_SHARP,F,F_SHARP,G,B_FLAT],
  "C Minor Scale": [C,D,D_SHARP,F,G,G_SHARP,B_FLAT],
  "C Minor Pentatonic": [C,D_SHARP,F,G,B_FLAT],
  "C Minor Harmonic Scale": [C,D,D_SHARP,F,G,G_SHARP,B],
  "C Minor Melodic Scale": [C,D,D_SHARP,F,G,A,B],
  "C Phrygian Scale": [C,C_SHARP,D_SHARP,F,G,G_SHARP,B_FLAT],
  "C Doric Scale": [C,D,D_SHARP,F,G,A,B_FLAT],
  "C Hungarian Scale": [C,D,D_SHARP,F_SHARP,G,G_SHARP,B],

  "C#/Db 5 Chord": [C_SHARP,G_SHARP],
  "C#/Db +5 Chord": [C_SHARP,F,A],
  "C#/Db 7+5 Chord": [C_SHARP,F,A,B],
  "C#/Db 7-5 Chord": [C_SHARP,F,G,B],
  "C#/Db 6 Chord": [C_SHARP,F,G_SHARP,B_FLAT],
  "C#/Db 7 Chord": [C_SHARP,F,G_SHARP,B],
  "C#/Db 9/6 Chord": [C_SHARP,D_SHARP,F,G_SHARP,B_FLAT],
  "C#/Db 9 Chord": [C_SHARP,D_SHARP,F,G_SHARP,B],
  "C#/Db Major Chord": [C_SHARP,F,G_SHARP],
  "C#/Db Slash Major Chord": [C_SHARP,F_SHARP,B_FLAT],
  "C#/Db Major 7 Chord": [C_SHARP,F,G_SHARP,C],
  "C#/Db Major 9 Chord": [C_SHARP,D_SHARP,F,G_SHARP,C],
  "C#/Db Add 2 Chord": [C_SHARP,D_SHARP,F,G_SHARP],
  "C#/Db Aug Chord": [C_SHARP,F,A],
  "C#/Db Sus 2 Chord": [C_SHARP,D_SHARP,G_SHARP],
  "C#/Db Sus 4 Chord": [C_SHARP,F_SHARP,G_SHARP],
  "C#/Db Sus 4/7 Chord": [C_SHARP,F_SHARP,G_SHARP,B],
  "C#/Db Major Scale": [C_SHARP,D_SHARP,F,F_SHARP,G_SHARP,B_FLAT,C],
  "C#/Db Major Pentatonic": [C_SHARP,D_SHARP,F,G_SHARP,B_FLAT],
  "C#/Db Phrygian Dominant Scale": [C_SHARP,D,F,F_SHARP,G_SHARP,A,B],
  "C#/Db Lydian Scale": [C_SHARP,D_SHARP,F,G,G_SHARP,B_FLAT,C],
  "C#/Db Mixolydian Scale": [C_SHARP,D_SHARP,F,F_SHARP,G_SHARP,B_FLAT,B],
  "C#/Db Arabic Scale": [C_SHARP,D,F,F_SHARP,G_SHARP,A,C],
  "C#/Db Minor Chord": [C_SHARP,E,G_SHARP],
  "C#/Db Minor 6 Chord": [C_SHARP,E,G_SHARP,B_FLAT],
  "C#/Db Minor 7 Chord": [C_SHARP,E,G_SHARP,B],
  "C#/Db Minor 7-5 Chord": [C_SHARP,E,G,B],
  "C#/Db Minor 9 Chord": [C_SHARP,D_SHARP,E,G_SHARP,B],
  "C#/Db Dim Chord": [C_SHARP,E,G],
  "C#/Db Dim 7 Chord": [C_SHARP,E,G,C],
  "C#/Db Blues": [C_SHARP,E,F_SHARP,G,G_SHARP,B],
  "C#/Db Minor Scale": [C_SHARP,D_SHARP,E,F_SHARP,G_SHARP,A,B],
  "C#/Db Minor Pentatonic": [C_SHARP,E,F_SHARP,G_SHARP,B],
  "C#/Db Minor Harmonic Scale": [C_SHARP,D_SHARP,E,F_SHARP,G_SHARP,A,C],
  "C#/Db Minor Melodic Scale": [C_SHARP,D_SHARP,E,F_SHARP,G_SHARP,B_FLAT,C],
  "C#/Db Phrygian Scale": [C_SHARP,D,E,F_SHARP,G_SHARP,A,B],
  "C#/Db Doric Scale": [C_SHARP,D_SHARP,E,F_SHARP,G_SHARP,B_FLAT,B],
  "C#/Db Hungarian Scale": [C_SHARP,D_SHARP,E,G,G_SHARP,A,C],

  "D 5 Chord": [D,A],
  "D +5 Chord": [D,F_SHARP,B_FLAT],
  "D 7+5 Chord": [D,F_SHARP,B_FLAT,C],
  "D 7-5 Chord": [D,F_SHARP,G_SHARP,C],
  "D 6 Chord": [D,F_SHARP,A,B],
  "D 7 Chord": [D,F_SHARP,A,C],
  "D 9/6 Chord": [D,E,F_SHARP,A,B],
  "D 9 Chord": [D,E,F_SHARP,A,C],
  "D Major Chord": [D,F_SHARP,A],
  "D Slash Major Chord": [D,G,B],
  "D Major 7 Chord": [D,F_SHARP,A,C_SHARP],
  "D Major 9 Chord": [D,E,F_SHARP,A,C_SHARP],
  "D Add 2 Chord": [D,E,F_SHARP,A],
  "D Aug Chord": [D,F_SHARP,B_FLAT],
  "D Sus 2 Chord": [D,E,A],
  "D Sus 4 Chord": [D,G,A],
  "D Sus 4/7 Chord": [D,G,A,C],
  "D Major Scale": [D,E,F_SHARP,G,A,B,C_SHARP],
  "D Major Pentatonic": [D,E,F_SHARP,A,B],
  "D Phrygian Dominant Scale": [D,D_SHARP,F_SHARP,G,A,B_FLAT,C],
  "D Lydian Scale": [D,E,F_SHARP,G_SHARP,A,B,C_SHARP],
  "D Mixolydian Scale": [D,E,F_SHARP,G,A,B,C],
  "D Arabic Scale": [D,D_SHARP,F_SHARP,G,A,B_FLAT,C_SHARP],
  "D Minor Chord": [D,F,A],
  "D Minor 6 Chord": [D,F,A,B],
  "D Minor 7 Chord": [D,F,A,C],
  "D Minor 7-5 Chord": [D,F,G_SHARP,C],
  "D Minor 9 Chord": [D,E,F,A,C],
  "D Dim Chord": [D,F,G_SHARP],
  "D Dim 7 Chord": [D,F,G_SHARP,C_SHARP],
  "D Blues": [D,F,G,G_SHARP,A,C],
  "D Minor Scale": [D,E,F,G,A,B_FLAT,C],
  "D Minor Pentatonic": [D,F,G,A,C],
  "D Minor Harmonic Scale": [D,E,F,G,A,B_FLAT,C_SHARP],
  "D Minor Melodic Scale": [D,E,F,G,A,B,C_SHARP],
  "D Phrygian Scale": [D,D_SHARP,F,G,A,B_FLAT,C],
  "D Doric Scale": [D,E,F,G,A,B,C],
  "D Hungarian Scale": [D,E,F,G_SHARP,A,B_FLAT,C_SHARP],

  "D#/Eb 5 Chord": [D_SHARP,B_FLAT],
  "D#/Eb +5 Chord": [D_SHARP,G,B],
  "D#/Eb 7+5 Chord": [D_SHARP,G,B,C_SHARP],
  "D#/Eb 7-5 Chord": [D_SHARP,G,A,C_SHARP],
  "D#/Eb 6 Chord": [D_SHARP,G,B_FLAT,C],
  "D#/Eb 7 Chord": [D_SHARP,G,B_FLAT,C_SHARP],
  "D#/Eb 9/6 Chord": [D_SHARP,F,G,B_FLAT,C],
  "D#/Eb 9 Chord": [D_SHARP,F,G,B_FLAT,C_SHARP],
  "D#/Eb Major Chord": [D_SHARP,G,B_FLAT],
  "D#/Eb Slash Major Chord": [D_SHARP,G_SHARP,C],
  "D#/Eb Major 7 Chord": [D_SHARP,G,B_FLAT,D],
  "D#/Eb Major 9 Chord": [D_SHARP,F,G,B_FLAT,D],
  "D#/Eb Add 2 Chord": [D_SHARP,F,G,B_FLAT],
  "D#/Eb Aug Chord": [D_SHARP,G,B],
  "D#/Eb Sus 2 Chord": [D_SHARP,F,B_FLAT],
  "D#/Eb Sus 4 Chord": [D_SHARP,G_SHARP,B_FLAT],
  "D#/Eb Sus 4/7 Chord": [D_SHARP,G_SHARP,B_FLAT,C_SHARP],
  "D#/Eb Major Scale": [D_SHARP,F,G,G_SHARP,B_FLAT,C,D],
  "D#/Eb Major Pentatonic": [D_SHARP,F,G,B_FLAT,C],
  "D#/Eb Phrygian Dominant Scale": [D_SHARP,E,G,G_SHARP,B_FLAT,B,C_SHARP],
  "D#/Eb Lydian Scale": [D_SHARP,F,G,A,B_FLAT,C,D],
  "D#/Eb Mixolydian Scale": [D_SHARP,F,G,G_SHARP,B_FLAT,C,C_SHARP],
  "D#/Eb Arabic Scale": [D_SHARP,E,G,G_SHARP,B_FLAT,B,D],
  "D#/Eb Minor Chord": [D_SHARP,F_SHARP,B_FLAT],
  "D#/Eb Minor 6 Chord": [D_SHARP,F_SHARP,B_FLAT,C],
  "D#/Eb Minor 7 Chord": [D_SHARP,F_SHARP,B_FLAT,C_SHARP],
  "D#/Eb Minor 7-5 Chord": [D_SHARP,F_SHARP,A,C_SHARP],
  "D#/Eb Minor 9 Chord": [D_SHARP,F,F_SHARP,B_FLAT,C_SHARP],
  "D#/Eb Dim Chord": [D_SHARP,F_SHARP,A],
  "D#/Eb Dim 7 Chord": [D_SHARP,F_SHARP,A,D],
  "D#/Eb Blues": [D_SHARP,F_SHARP,G_SHARP,A,B_FLAT,C_SHARP],
  "D#/Eb Minor Scale": [D_SHARP,F,F_SHARP,G_SHARP,B_FLAT,B,C_SHARP],
  "D#/Eb Minor Pentatonic": [D_SHARP,F_SHARP,G_SHARP,B_FLAT,C_SHARP],
  "D#/Eb Minor Harmonic Scale": [D_SHARP,F,F_SHARP,G_SHARP,B_FLAT,B,D],
  "D#/Eb Minor Melodic Scale": [D_SHARP,F,F_SHARP,G_SHARP,B_FLAT,C,D],
  "D#/Eb Phrygian Scale": [D_SHARP,E,F_SHARP,G_SHARP,B_FLAT,B,C_SHARP],
  "D#/Eb Doric Scale": [D_SHARP,F,F_SHARP,G_SHARP,B_FLAT,C,C_SHARP],
  "D#/Eb Hungarian Scale": [D_SHARP,F,F_SHARP,A,B_FLAT,B,D],

  "E 5 Chord": [E,B],
  "E +5 Chord": [E,G_SHARP,C],
  "E 7+5 Chord": [E,G_SHARP,C,D],
  "E 7-5 Chord": [E,G_SHARP,B_FLAT,D],
  "E 6 Chord": [E,G_SHARP,B,C_SHARP],
  "E 7 Chord": [E,G_SHARP,B,D],
  "E 9/6 Chord": [E,F_SHARP,G_SHARP,B,C_SHARP],
  "E 9 Chord": [E,F_SHARP,G_SHARP,B,D],
  "E Major Chord": [E,G_SHARP,B],
  "E Slash Major Chord": [E,A,C_SHARP],
  "E Major 7 Chord": [E,G_SHARP,B,D_SHARP],
  "E Major 9 Chord": [E,F_SHARP,G_SHARP,B,D_SHARP],
  "E Add 2 Chord": [E,F_SHARP,G_SHARP,B],
  "E Aug Chord": [E,G_SHARP,C],
  "E Sus 2 Chord": [E,F_SHARP,B],
  "E Sus 4 Chord": [E,A,B],
  "E Sus 4/7 Chord": [E,A,B,D],
  "E Major Scale": [E,F_SHARP,G_SHARP,A,B,C_SHARP,D_SHARP],
  "E Major Pentatonic": [E,F_SHARP,G_SHARP,B,C_SHARP],
  "E Phrygian Dominant Scale": [E,F,G_SHARP,A,B,C,D],
  "E Lydian Scale": [E,F_SHARP,G_SHARP,B_FLAT,B,C_SHARP,D_SHARP],
  "E Mixolydian Scale": [E,F_SHARP,G_SHARP,A,B,C_SHARP,D],
  "E Arabic Scale": [E,F,G_SHARP,A,B,C,D_SHARP],
  "E Minor Chord": [E,G,B],
  "E Minor 6 Chord": [E,G,B,C_SHARP],
  "E Minor 7 Chord": [E,G,B,D],
  "E Minor 7-5 Chord": [E,G,B_FLAT,D],
  "E Minor 9 Chord": [E,F_SHARP,G,B,D],
  "E Dim Chord": [E,G,B_FLAT],
  "E Dim 7 Chord": [E,G,B_FLAT,D_SHARP],
  "E Blues": [E,G,A,B_FLAT,B,D],
  "E Minor Scale": [E,F_SHARP,G,A,B,C,D],
  "E Minor Pentatonic": [E,G,A,B,D],
  "E Minor Harmonic Scale": [E,F_SHARP,G,A,B,C,D_SHARP],
  "E Minor Melodic Scale": [E,F_SHARP,G,A,B,C_SHARP,D_SHARP],
  "E Phrygian Scale": [E,F,G,A,B,C,D],
  "E Doric Scale": [E,F_SHARP,G,A,B,C_SHARP,D],
  "E Hungarian Scale": [E,F_SHARP,G,B_FLAT,B,C,D_SHARP],

  "F 5 Chord": [F,C],
  "F +5 Chord": [F,A,C_SHARP],
  "F 7+5 Chord": [F,A,C_SHARP,D_SHARP],
  "F 7-5 Chord": [F,A,B,D_SHARP],
  "F 6 Chord": [F,A,C,D],
  "F 7 Chord": [F,A,C,D_SHARP],
  "F 9/6 Chord": [F,G,A,C,D],
  "F 9 Chord": [F,G,A,C,D_SHARP],
  "F Major Chord": [F,A,C],
  "F Slash Major Chord": [F,B_FLAT,D],
  "F Major 7 Chord": [F,A,C,E],
  "F Major 9 Chord": [F,G,A,C,E],
  "F Add 2 Chord": [F,G,A,C],
  "F Aug Chord": [F,A,C_SHARP],
  "F Sus 2 Chord": [F,G,C],
  "F Sus 4 Chord": [F,B_FLAT,C],
  "F Sus 4/7 Chord": [F,B_FLAT,C,D_SHARP],
  "F Major Scale": [F,G,A,B_FLAT,C,D,E],
  "F Major Pentatonic": [F,G,A,C,D],
  "F Phrygian Dominant Scale": [F,F_SHARP,A,B_FLAT,C,C_SHARP,D_SHARP],
  "F Lydian Scale": [F,G,A,B,C,D,E],
  "F Mixolydian Scale": [F,G,A,B_FLAT,C,D,D_SHARP],
  "F Arabic Scale": [F,F_SHARP,A,B_FLAT,C,C_SHARP,E],
  "F Minor Chord": [F,G_SHARP,C],
  "F Minor 6 Chord": [F,G_SHARP,C,D],
  "F Minor 7 Chord": [F,G_SHARP,C,D_SHARP],
  "F Minor 7-5 Chord": [F,G_SHARP,B,D_SHARP],
  "F Minor 9 Chord": [F,G,G_SHARP,C,D_SHARP],
  "F Dim Chord": [F,G_SHARP,B],
  "F Dim 7 Chord": [F,G_SHARP,B,E],
  "F Blues": [F,G_SHARP,B_FLAT,B,C,D_SHARP],
  "F Minor Scale": [F,G,G_SHARP,B_FLAT,C,C_SHARP,D_SHARP],
  "F Minor Pentatonic": [F,G_SHARP,B_FLAT,C,D_SHARP],
  "F Minor Harmonic Scale": [F,G,G_SHARP,B_FLAT,C,C_SHARP,E],
  "F Minor Melodic Scale": [F,G,G_SHARP,B_FLAT,C,D,E],
  "F Phrygian Scale": [F,F_SHARP,G_SHARP,B_FLAT,C,C_SHARP,D_SHARP],
  "F Doric Scale": [F,G,G_SHARP,B_FLAT,C,D,D_SHARP],
  "F Hungarian Scale": [F,G,G_SHARP,B,C,C_SHARP,E],

  "F#/Gb 5 Chord": [F_SHARP,C_SHARP],
  "F#/Gb +5 Chord": [F_SHARP,B_FLAT,D],
  "F#/Gb 7+5 Chord": [F_SHARP,B_FLAT,D,E],
  "F#/Gb 7-5 Chord": [F_SHARP,B_FLAT,C,E],
  "F#/Gb 6 Chord": [F_SHARP,B_FLAT,C_SHARP,D_SHARP],
  "F#/Gb 7 Chord": [F_SHARP,B_FLAT,C_SHARP,E],
  "F#/Gb 9/6 Chord": [F_SHARP,G_SHARP,B_FLAT,C_SHARP,D_SHARP],
  "F#/Gb 9 Chord": [F_SHARP,G_SHARP,B_FLAT,C_SHARP,E],
  "F#/Gb Major Chord": [F_SHARP,B_FLAT,C_SHARP],
  "F#/Gb Slash Major Chord": [F_SHARP,B,D_SHARP],
  "F#/Gb Major 7 Chord": [F_SHARP,B_FLAT,C_SHARP,F],
  "F#/Gb Major 9 Chord": [F_SHARP,G_SHARP,B_FLAT,C_SHARP,F],
  "F#/Gb Add 2 Chord": [F_SHARP,G_SHARP,B_FLAT,C_SHARP],
  "F#/Gb Aug Chord": [F_SHARP,B_FLAT,D],
  "F#/Gb Sus 2 Chord": [F_SHARP,G_SHARP,C_SHARP],
  "F#/Gb Sus 4 Chord": [F_SHARP,B,C_SHARP],
  "F#/Gb Sus 4/7 Chord": [F_SHARP,B,C_SHARP,E],
  "F#/Gb Major Scale": [F_SHARP,G_SHARP,B_FLAT,B,C_SHARP,D_SHARP,F],
  "F#/Gb Major Pentatonic": [F_SHARP,G_SHARP,B_FLAT,C_SHARP,D_SHARP],
  "F#/Gb Phrygian Dominant Scale": [F_SHARP,G,B_FLAT,B,C_SHARP,D,E],
  "F#/Gb Lydian Scale": [F_SHARP,G_SHARP,B_FLAT,C,C_SHARP,D_SHARP,F],
  "F#/Gb Mixolydian Scale": [F_SHARP,G_SHARP,B_FLAT,B,C_SHARP,D_SHARP,E],
  "F#/Gb Arabic Scale": [F_SHARP,G,B_FLAT,B,C_SHARP,D,F],
  "F#/Gb Minor Chord": [F_SHARP,A,C_SHARP],
  "F#/Gb Minor 6 Chord": [F_SHARP,A,C_SHARP,D_SHARP],
  "F#/Gb Minor 7 Chord": [F_SHARP,A,C_SHARP,E],
  "F#/Gb Minor 7-5 Chord": [F_SHARP,A,C,E],
  "F#/Gb Minor 9 Chord": [F_SHARP,G_SHARP,A,C_SHARP,E],
  "F#/Gb Dim Chord": [F_SHARP,A,C],
  "F#/Gb Dim 7 Chord": [F_SHARP,A,C,F],
  "F#/Gb Blues": [F_SHARP,A,B,C,C_SHARP,E],
  "F#/Gb Minor Scale": [F_SHARP,G_SHARP,A,B,C_SHARP,D,E],
  "F#/Gb Minor Pentatonic": [F_SHARP,A,B,C_SHARP,E],
  "F#/Gb Minor Harmonic Scale": [F_SHARP,G_SHARP,A,B,C_SHARP,D,F],
  "F#/Gb Minor Melodic Scale": [F_SHARP,G_SHARP,A,B,C_SHARP,D_SHARP,F],
  "F#/Gb Phrygian Scale": [F_SHARP,G,A,B,C_SHARP,D,E],
  "F#/Gb Doric Scale": [F_SHARP,G_SHARP,A,B,C_SHARP,D_SHARP,E],
  "F#/Gb Hungarian Scale": [F_SHARP,G_SHARP,A,C,C_SHARP,D,F],

  "G 5 Chord": [G,D],
  "G +5 Chord": [G,B,D_SHARP],
  "G 7+5 Chord": [G,B,D_SHARP,F],
  "G 7-5 Chord": [G,B,C_SHARP,F],
  "G 6 Chord": [G,B,D,E],
  "G 7 Chord": [G,B,D,F],
  "G 9/6 Chord": [G,A,B,D,E],
  "G 9 Chord": [G,A,B,D,F],
  "G Major Chord": [G,B,D],
  "G Slash Major Chord": [G,C,E],
  "G Major 7 Chord": [G,B,D,F_SHARP],
  "G Major 9 Chord": [G,A,B,D,F_SHARP],
  "G Add 2 Chord": [G,A,B,D],
  "G Aug Chord": [G,B,D_SHARP],
  "G Sus 2 Chord": [G,A,D],
  "G Sus 4 Chord": [G,C,D],
  "G Sus 4/7 Chord": [G,C,D,F],
  "G Major Scale": [G,A,B,C,D,E,F_SHARP],
  "G Major Pentatonic": [G,A,B,D,E],
  "G Phrygian Dominant Scale": [G,G_SHARP,B,C,D,D_SHARP,F],
  "G Lydian Scale": [G,A,B,C_SHARP,D,E,F_SHARP],
  "G Mixolydian Scale": [G,A,B,C,D,E,F],
  "G Arabic Scale": [G,G_SHARP,B,C,D,D_SHARP,F_SHARP],
  "G Minor Chord": [G,B_FLAT,D],
  "G Minor 6 Chord": [G,B_FLAT,D,E],
  "G Minor 7 Chord": [G,B_FLAT,D,F],
  "G Minor 7-5 Chord": [G,B_FLAT,C_SHARP,F],
  "G Minor 9 Chord": [G,A,B_FLAT,D,F],
  "G Dim Chord": [G,B_FLAT,C_SHARP],
  "G Dim 7 Chord": [G,B_FLAT,C_SHARP,F_SHARP],
  "G Blues": [G,B_FLAT,C,C_SHARP,D,F],
  "G Minor Scale": [G,A,B_FLAT,C,D,D_SHARP,F],
  "G Minor Pentatonic": [G,B_FLAT,C,D,F],
  "G Minor Harmonic Scale": [G,A,B_FLAT,C,D,D_SHARP,F_SHARP],
  "G Minor Melodic Scale": [G,A,B_FLAT,C,D,E,F_SHARP],
  "G Phrygian Scale": [G,G_SHARP,B_FLAT,C,D,D_SHARP,F],
  "G Doric Scale": [G,A,B_FLAT,C,D,E,F],
  "G Hungarian Scale": [G,A,B_FLAT,C_SHARP,D,D_SHARP,F_SHARP],

  "G#/Ab 5 Chord": [G_SHARP,D_SHARP],
  "G#/Ab +5 Chord": [G_SHARP,C,E],
  "G#/Ab 7+5 Chord": [G_SHARP,C,E,F_SHARP],
  "G#/Ab 7-5 Chord": [G_SHARP,C,D,F_SHARP],
  "G#/Ab 6 Chord": [G_SHARP,C,D_SHARP,F],
  "G#/Ab 7 Chord": [G_SHARP,C,D_SHARP,F_SHARP],
  "G#/Ab 9/6 Chord": [G_SHARP,B_FLAT,C,D_SHARP,F],
  "G#/Ab 9 Chord": [G_SHARP,B_FLAT,C,D_SHARP,F_SHARP],
  "G#/Ab Major Chord": [G_SHARP,C,D_SHARP],
  "G#/Ab Slash Major Chord": [G_SHARP,C_SHARP,F],
  "G#/Ab Major 7 Chord": [G_SHARP,C,D_SHARP,G],
  "G#/Ab Major 9 Chord": [G_SHARP,B_FLAT,C,D_SHARP,G],
  "G#/Ab Add 2 Chord": [G_SHARP,B_FLAT,C,D_SHARP],
  "G#/Ab Aug Chord": [G_SHARP,C,E],
  "G#/Ab Sus 2 Chord": [G_SHARP,B_FLAT,D_SHARP],
  "G#/Ab Sus 4 Chord": [G_SHARP,C_SHARP,D_SHARP],
  "G#/Ab Sus 4/7 Chord": [G_SHARP,C_SHARP,D_SHARP,F_SHARP],
  "G#/Ab Major Scale": [G_SHARP,B_FLAT,C,C_SHARP,D_SHARP,F,G],
  "G#/Ab Major Pentatonic": [G_SHARP,B_FLAT,C,D_SHARP,F],
  "G#/Ab Phrygian Dominant Scale": [G_SHARP,A,C,C_SHARP,D_SHARP,E,F_SHARP],
  "G#/Ab Lydian Scale": [G_SHARP,B_FLAT,C,D,D_SHARP,F,G],
  "G#/Ab Mixolydian Scale": [G_SHARP,B_FLAT,C,C_SHARP,D_SHARP,F,F_SHARP],
  "G#/Ab Arabic Scale": [G_SHARP,A,C,C_SHARP,D_SHARP,E,G],
  "G#/Ab Minor Chord": [G_SHARP,B,D_SHARP],
  "G#/Ab Minor 6 Chord": [G_SHARP,B,D_SHARP,F],
  "G#/Ab Minor 7 Chord": [G_SHARP,B,D_SHARP,F_SHARP],
  "G#/Ab Minor 7-5 Chord": [G_SHARP,B,D,F_SHARP],
  "G#/Ab Minor 9 Chord": [G_SHARP,B_FLAT,B,D_SHARP,F_SHARP],
  "G#/Ab Dim Chord": [G_SHARP,B,D],
  "G#/Ab Dim 7 Chord": [G_SHARP,B,D,G],
  "G#/Ab Blues": [G_SHARP,B,C_SHARP,D,D_SHARP,F_SHARP],
  "G#/Ab Minor Scale": [G_SHARP,B_FLAT,B,C_SHARP,D_SHARP,E,F_SHARP],
  "G#/Ab Minor Pentatonic": [G_SHARP,B,C_SHARP,D_SHARP,F_SHARP],
  "G#/Ab Minor Harmonic Scale": [G_SHARP,B_FLAT,B,C_SHARP,D_SHARP,E,G],
  "G#/Ab Minor Melodic Scale": [G_SHARP,B_FLAT,B,C_SHARP,D_SHARP,F,G],
  "G#/Ab Phrygian Scale": [G_SHARP,A,B,C_SHARP,D_SHARP,E,F_SHARP],
  "G#/Ab Doric Scale": [G_SHARP,B_FLAT,B,C_SHARP,D_SHARP,F,F_SHARP],
  "G#/Ab Hungarian Scale": [G_SHARP,B_FLAT,B,D,D_SHARP,E,G],

};

const TUNING_MAP = {
  "4. E A D g": [G,D,A,E],
  "4. G C A e": [E,A,C,G],
  "5. B E A D g": [G,D,A,E,B],
  "6. E A D G B e": [E,B,G,D,A,E],
  "6. D A D G B e": [E,B,G,D,A,D],
  "6. C G C F A d": [D,A,F,C,G,C],
  "6. D G D G B d": [D,B,G,D,G,D],
  "6. C# G# C# F# Bb d#": [D_SHARP,B_FLAT,F_SHARP,C_SHARP,G_SHARP,C_SHARP],
  "6. D# G# C# F# Bb d#": [D_SHARP,B_FLAT,F_SHARP,C_SHARP,G_SHARP,D_SHARP],
  "7. B E A D G B e": [E,B,G,D,A,E,B],
  "7. A E A D G B e": [E,B,G,D,A,E,A],
  "8. F# B E A D G B e": [E,B,G,D,A,E,B,F_SHARP],
  "8. G D G C F Bb D g": [G,D,B_FLAT,F,C,G,D,G],
  "9. C# F# B E A D G B e": [E,B,G,D,A,E,B,F_SHARP,C_SHARP]
}

// asp.net generated content - end

$(function () {
  scalesArr = Object.keys(SCALES_MAP);
  tuningsArr = Object.keys(TUNING_MAP);
  scalesArrVal = Object.values(SCALES_MAP);
  tuningsArrVal = Object.values(TUNING_MAP);
  currentScale = SCALES_MAP[scalesArr[0]];
  keytone = KEYTONES_ARR[0];
  savedTones = [];
  initColorMap();
  initSelectList('#tunings', tuningsArr);
  initSelectList('#frets', FRET_WIRES_ARR);
  initSelectList('#scales', scalesArr);
  initSelectList('#key', KEYTONES_ARR);
  initGlobal();
  setBtnEvent();
  $('#frets').on('selectmenuchange', function () {
    currentFrets = this.value;
    setCookie(scalesArrVal.indexOf(currentScale), tuningsArrVal.indexOf(currentTuning), FRET_WIRES_ARR.indexOf(currentFrets), savedTones, KEYTONES_ARR.indexOf(keytone));
    updateProgram();
    initRestoreSavedTones();
  });
  $('#tunings').on('selectmenuchange', function () {
    currentTuning = TUNING_MAP[this.value];
    setCookie(scalesArrVal.indexOf(currentScale), tuningsArrVal.indexOf(currentTuning), FRET_WIRES_ARR.indexOf(currentFrets), savedTones, KEYTONES_ARR.indexOf(keytone));
    updateProgram();
    initRestoreSavedTones();
  });
  $('#scales').on('selectmenuchange', function () {
    currentScale = SCALES_MAP[this.value];
    savedTones = [];
    setCookie(scalesArrVal.indexOf(currentScale), tuningsArrVal.indexOf(currentTuning), FRET_WIRES_ARR.indexOf(currentFrets), savedTones, KEYTONES_ARR.indexOf(keytone));
    updateScale();
  });
  $('#key').on('selectmenuchange', function () {
    keytone = this.value;
    savedTones = [];
    if (keytone !== 'No keytone' && currentScale.length === 0) {
      updateKey(keytone);
      resetScale();
      updateButton(keytone, '#FFFF00');
      isClickAllowed = false;
    } else if (keytone !== 'No keytone' && currentScale.length !== 0) {
      var newScale = getModifiedDictKey(SCALES_MAP, currentScale, keytone);
      currentScale = SCALES_MAP[newScale];
      updateKey(keytone);
      updateScale();
      $('#scales').val(newScale);
      $('#scales').selectmenu('refresh');
    } else if (keytone === 'No keytone' && currentScale.length === 0) {
      initScalesStart();
      resetScale();
      isClickAllowed = true;
      initScalesEnd();
    } else {
      initScalesStart();
      initScalesEnd();
    }
    setCookie(scalesArrVal.indexOf(currentScale), tuningsArrVal.indexOf(currentTuning), FRET_WIRES_ARR.indexOf(currentFrets), savedTones, KEYTONES_ARR.indexOf(keytone));
  });

  $(document).ready(function () {
    var du = 1500;
    $(document).tooltip({
      show: {
        effect: 'slideDown'
      },
      track: true,
      open: function (event, ui) {
        setTimeout(function () {
          $(ui.tooltip).hide();
        }, du);
      }
    });
  });
});

function isContains(note, myArray) {
  var retVal = false;
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i] === note) {
      retVal = true;
      break;
    }
  }
  return retVal;
}

function getDictKey(dict, val) {
  var retVal = '';
  for (var key in dict) {
    if (dict[key] === val) {
      retVal = key;
      break;
    }
  }
  return retVal;
}

function getModifiedDictKey(dict, val, keyTone) {
  var retVal = getDictKey(dict, val);
  if (retVal.charAt(1) === ' ') {
    retVal = retVal.replace(retVal.charAt(0), keyTone);
  } else {
    retVal = retVal.replace(getNewKeyTone(retVal), keyTone);
  }
  return retVal;
}

function getNewKeyTone(retVal) {
  var newRetVal = '';
  for (var i = 0; i < MAX_NOTE_LEN; i++) {
    newRetVal += retVal.charAt(i);
  }
  return newRetVal;
}

function setBtnEvent() {
  for (var i = 0; i < btnIdArr.length; i++) {
    document.getElementById(btnIdArr[i]).onclick = clickButton;
  }
}

function setCookie(scaleIndex, tuningsIndex, fretsIndex, savedTones, keytoneIndex) {
  document.cookie = '';
  var sb = [];
  sb[0] = scaleIndex;
  sb[1] = tuningsIndex;
  sb[2] = fretsIndex;
  sb[3] = keytoneIndex;
  var index = 4;
  if (savedTones !== undefined && savedTones.length > 0) {
    for (var i = 0; i < savedTones.length; i++) {
      sb[index] = savedTones[i];
      index++;
    }
  }
  document.cookie = sb.join().toString();
}

function setColor(btnId, note) {
  var len = currentScale.length;
  switch (len) {
    case 2:
      document.getElementById(btnId).style.backgroundColor = CHORD5_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 3:
      document.getElementById(btnId).style.backgroundColor = CHORD_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 4:
      document.getElementById(btnId).style.backgroundColor = CHORD7_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 5:
      document.getElementById(btnId).style.backgroundColor = PENTA_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 6:
      document.getElementById(btnId).style.backgroundColor = BLUES_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 7:
      document.getElementById(btnId).style.backgroundColor = SCALE_COLOR_ARR[currentScale.indexOf(note)];
      break;
    case 12:
      document.getElementById(btnId).style.backgroundColor = TONE_COLOR_ARR[currentScale.indexOf(note)];
      break;
    default:
      document.getElementById(btnId).style.backgroundColor = TONE_COLOR_ARR[currentScale.indexOf(note)];
  }
}

function initScalesStart() {
  $('#scales').find('option').remove().end();
  $('#scales').selectmenu('destroy').selectmenu({ style: 'dropdown' });
  initSelectList('#scales', scalesArr);
}

function initScalesEnd() {
  $('#scales').val(scalesArr[scalesArrVal.indexOf(currentScale)]);
  $('#scales').selectmenu('refresh');
}

function initScales(tone) {
  $('#scales').find('option').remove().end();
  $('#scales').selectmenu('destroy').selectmenu({ style: 'dropdown' });
  $('#scales').append($('<option></option>').attr('value', scalesArr[0]).text(scalesArr[0]));
  for (var i = 1; i < scalesArr.length; i++) {
    if (tone.length === 1) {
      if (tone === scalesArr[i].charAt(0) && scalesArr[i].charAt(1) === ' ') {
        $('#scales').append($('<option></option>').attr('value', scalesArr[i]).text(scalesArr[i]));
      }
    } else if (tone.length === MAX_NOTE_LEN) {
      if (tone === getNewKeyTone(scalesArr[i])) {
        $('#scales').append($('<option></option>').attr('value', scalesArr[i]).text(scalesArr[i]));
      }
    }
  }
  $('#scales').selectmenu().selectmenu('menuWidget').addClass('overflow');
  $('#scales').selectmenu();
  $('#scales').selectmenu('refresh');
}

function initGlobal() {
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookies = decodedCookie.split(',');
  if (cookies !== undefined && cookies.length === 4) {
    initGUISearchPanels(Number(cookies[0]), Number(cookies[1]), Number(cookies[2]), Number(cookies[3]));
    initDefault();
    initWithKeytone(Number(cookies[0]), Number(cookies[3]));
    initWithScale(Number(cookies[0]));
  } else if (cookies !== undefined && cookies.length > 4) {
    initGUISearchPanels(0, Number(cookies[1]), Number(cookies[2]), Number(cookies[3]));
    initDefault();
    initSavedToneFromCookie(cookies);
    initRestoreSavedTones();
  } else {
    initGUISearchPanels(0, 3, 0, 0);
    initDefault();
  }
}

function initWithKeytone(scaleIndex, keytoneIndex) {
  if (keytoneIndex !== 0) {
    initScales(KEYTONES_ARR[keytoneIndex]);
    $('#scales').val(scalesArr[scaleIndex]);
    $('#scales').selectmenu('refresh');
    if (scaleIndex === 0) {
      updateButton(keytone, '#FFFF00');
    }
  }
}

function initRestoreSavedTones() {
  if (savedTones.length > 0) {
    for (var i = 0; i < savedTones.length; i++) {
      for (var j = 0; j < btnIdArr.length; j++) {
        if (document.getElementById(btnIdArr[j]).value === savedTones[i]) {
          document.getElementById(btnIdArr[j]).style.backgroundColor = colorMap[savedTones[i]];
        }
      }
    }
  }
}

function initSelectList(element, arr) {
  for (var i = 0; i < arr.length; i++) {
    $(element).append($('<option></option>').attr('value', arr[i]).text(arr[i]));
  }
  $(element).selectmenu().selectmenu('menuWidget').addClass('overflow');
  $(element).selectmenu();
}

function initColorMap() {
  for (var i = 0; i < TONES_ARR.length; i++) {
    colorMap[TONES_ARR[i]] = TONE_COLOR_ARR[i];
  }
}

function initGUISearchPanels(scaleIndex, tuningsIndex, fretsIndex, keytoneIndex) {
  $('#scales').val(scalesArr[scaleIndex]);
  $('#tunings').val(tuningsArr[tuningsIndex]);
  $('#frets').val(FRET_WIRES_ARR[fretsIndex]);
  $('#key').val(KEYTONES_ARR[keytoneIndex]);
  $('#scales').selectmenu('refresh');
  $('#tunings').selectmenu('refresh');
  $('#frets').selectmenu('refresh');
  $('#key').selectmenu('refresh');
  currentTuning = TUNING_MAP[tuningsArr[tuningsIndex]];
  currentFrets = FRET_WIRES_ARR[fretsIndex];
  currentScale = SCALES_MAP[scalesArr[scaleIndex]];
  keytone = KEYTONES_ARR[keytoneIndex];
}

function initSavedToneFromCookie(cookies) {
  for (var i = 4; i < cookies.length; i++) {
    savedTones.push(cookies[i]);
  }
}

function initDefault() {
  initFretBoard(TONES_ARR, currentTuning, currentFrets);
  createFretBoard();
  checkButtons();
  checkUserInfo();
  updateLegendBtn();
}

function initFretBoard(tones, tuning, frets) {
  var strings = tuning.length;
  frets++;
  var fretboard = initFretBoardMatrix();
  for (var i = 0; i < MAX_STR; i++) {
    if (i < strings) {
      fretboard[i][0] = tuning[i];
    }
    var startToneIndex = tones.indexOf(fretboard[i][0]);
    startToneIndex++;
    for (var j = 1; j < MAX_FRETS; j++) {
      if (startToneIndex >= 12) {
        startToneIndex = 0;
      }
      if (i < strings && j < frets) {
        fretboard[i][j] = tones[startToneIndex];
      } else {
        fretboard[i][j] = '';
      }
      startToneIndex++;
    }
  }
  fretBoard = fretboard;
}

function initFretBoardMatrix() {
  var arr = [];
  for (var i = 0; i < MAX_STR; i++) {
    arr[i] = [];
    for (var j = 0; j < MAX_FRETS; j++) {
      arr[i][j] = '';
    }
  }
  return arr;
}

function initScale() {
  for (var i = 0; i < btnIdArr.length; i++) {
    var note = document.getElementById(btnIdArr[i]).value;
    if (isContains(note, currentScale) && !document.getElementById(btnIdArr[i]).hidden) {
      setColor(btnIdArr[i], note);
    }
  }
}

function initWithScale(scaleIndex) {
  if (scaleIndex > 0) {
    isClickAllowed = false;
    savedTones = [];
    updateScale();
  }
}

function updateKey(tone) {
  initScales(tone);
}

function updateButton(target, color) {
  for (var i = 0; i < btnIdArr.length; i++) {
    var note = document.getElementById(btnIdArr[i]).value;
    if (note === target) {
      if (document.getElementById(btnIdArr[i]).style.backgroundColor === DEFAULT_RGB) {
        if (color.length === 0) {
          document.getElementById(btnIdArr[i]).style.backgroundColor = colorMap[note];
        } else {
          document.getElementById(btnIdArr[i]).style.backgroundColor = color;
        }
      } else {
        document.getElementById(btnIdArr[i]).style.backgroundColor = DEFAULT_GRAY;
      }
    }
  }
}

function updateSavedTones(target) {
  if (!isContains(target, savedTones)) {
    savedTones.push(target);
  } else if (isContains(target, savedTones)) {
    savedTones.splice(savedTones.indexOf(target), 1);
  }
}

function updateProgram() {
  initFretBoard(TONES_ARR, currentTuning, currentFrets);
  updateButtons();
  checkButtons();
  checkUserInfo();
  updateScale();
}

function updateScale() {
  if (currentScale.length === 0 && keytone === 'No keytone') {
    resetScale();
    hideLegendBtn();
    isClickAllowed = true;
  } else if (currentScale.length === 0 && keytone !== 'No keytone') {
    resetScale();
    hideLegendBtn();
    updateButton(keytone, '#FFFF00');
    isClickAllowed = false;
  } else {
    isClickAllowed = false;
    resetScale();
    initScale();
    updateLegendBtn();
  }
}

function updateButtons() {
  var btnId = 0;
  for (var i = 0; i < MAX_STR; i++) {
    for (var j = 0; j < MAX_FRETS + 1; j++) {
      if (j > 0) {
        document.getElementById(btnIdArr[btnId]).value = fretBoard[i][j - 1];
      }
      btnId++;
    }
  }
}

function updateLegendBtn() {
  var len = currentScale.length;
  if (len > 0) {
    document.getElementById('legendButtons').hidden = false;
    for (var i = 0; i < 7; i++) {
      var btn = 'buttonLegend'.concat('', i);
      if (i < len) {
        document.getElementById(btn).hidden = false;
        document.getElementById(btn).value = currentScale[i];
        setColor(btn, currentScale[i]);
      } else {
        document.getElementById(btn).hidden = true;
        document.getElementById(btn).style.backgroundColor = DEFAULT_GRAY;
        document.getElementById(btn).value = '';
      }
    }
  } else {
    hideLegendBtn();
  }
}

function resetScale() {
  for (var i = 0; i < btnIdArr.length; i++) {
    if (!document.getElementById(btnIdArr[i]).disabled) {
      document.getElementById(btnIdArr[i]).style.backgroundColor = DEFAULT_GRAY;
    }
  }
}

function resetFretboard() {
  document.cookie = '';
  location.reload(true);
}

function clearFretboard() {
  initScalesStart();
  initScalesEnd();
  resetScale();
  hideLegendBtn();
  isClickAllowed = true;
  currentScale = SCALES_MAP[scalesArr[0]];
  keytone = KEYTONES_ARR[0];
  $('#scales').val(scalesArr[0]);
  $('#scales').selectmenu('refresh');
  $('#key').val('No keytone');
  $('#key').selectmenu('refresh');
  savedTones = [];
  setCookie(0, tuningsArrVal.indexOf(currentTuning), FRET_WIRES_ARR.indexOf(currentFrets), savedTones, KEYTONES_ARR.indexOf(keytone));
}

function checkButtons() {
  for (var i = 0; i < btnIdArr.length; i++) {
    if (document.getElementById(btnIdArr[i]).value === '') {
      document.getElementById(btnIdArr[i]).hidden = true;
    } else {
      document.getElementById(btnIdArr[i]).hidden = false;
    }
  }
}

function checkUserInfo() {
  enablerStrBtn();
  enablerFretBtn();
}

function clickButton(e) {
  e = e || window.event;
  var target = e.target.value;
  if (isClickAllowed) {
    updateSavedTones(target);
    updateButton(target, '');
  }
  setCookie(scalesArrVal.indexOf(currentScale), tuningsArrVal.indexOf(currentTuning), FRET_WIRES_ARR.indexOf(currentFrets), savedTones, KEYTONES_ARR.indexOf(keytone));
}

function createFretBoard() {
  var btnId = 0;
  createFretBtn();
  createLegendBtn();
  disablerFretBtn();
  hideLegendBtn();
  for (var i = 0; i < MAX_STR; i++) {
    $('#pageButtons').append('<div>');
    btnId = createNoteBtnRow(i, btnId);
    $('#pageButtons').append('</div>');
  }
  disablerStrBtn();
}

function getBtn(style, btnId, row, i) {
  var retVal = '<input type="button" tabindex="-1" ';
  switch (style) {
    case 'tuning':
      retVal += 'style="font-weight:bold;border:none;background-color:Transparent;text-align:center;height:30px;border-style:none;margin-bottom:2px;margin-right:10px;" id="button' + btnId + '" value="' + (row + 1) + ' -';
      break;
    case 'note':
      retVal += 'style="font-weight:bold;text-align:center;height:30px;width:50px;margin-bottom:2px;margin-right:2px;border-style:solid;border-width:1px;border-color:#C5C5C5;background-color:#F6F6F6;" id="button' + btnId + '" value="' + fretBoard[row][i - 1];
      break;
    case 'legend':
      retVal += 'style="font-weight:bold;border:none;text-align:center;height:30px;width:50px;border-style:none;" id="buttonLegend' + i + '" value="' + i;
      break;
    case 'fret':
      retVal += 'style="font-weight:bold;border:none;background-color:Transparent;text-align:center;height:30px;width:50px;border-style:none;margin-bottom:2px;margin-right:2px;" id="buttonFret' + i + '" value="' + (i - 1);
      break;
    default:
      retVal += 'value="';
      break;
  }
  return retVal + '"/>';
}

function createNoteBtnRow(row, btnId) {
  for (var i = 0; i < MAX_FRETS + 1; i++) {
    if (i === 0) {
      $('#pageButtons').append(getBtn('tuning', btnId, row, i));
      strBtnId.push('button'.concat('', btnId));
    } else {
      $('#pageButtons').append(getBtn('note', btnId, row, i));
    }
    btnIdArr.push('button'.concat('', btnId));
    btnId++;
  }
  return btnId;
}

function createLegendBtn() {
  $('#legendButtons').append('<strong>Sequence: </strong>');
  for (var i = 0; i < 7; i++) {
    $('#legendButtons').append(getBtn('legend', 0, 0, i));
  }
}

function createFretBtn() {
  for (var i = 0; i < MAX_FRETS + 1; i++) {
    $('#fretsButtons').append(getBtn('fret', 0, 0, i));
  }
}

function hideLegendBtn() {
  for (var i = 0; i < 7; i++) {
    var btn = 'buttonLegend'.concat('', i);
    document.getElementById(btn).hidden = true;
    document.getElementById(btn).style.backgroundColor = DEFAULT_GRAY;
    document.getElementById(btn).value = '';
    document.getElementById('legendButtons').hidden = true;
  }
}

function disablerFretBtn() {
  for (var i = 0; i < MAX_FRETS + 1; i++) {
    document.getElementById('buttonFret'.concat('', i)).disabled = true;
    if (i - 1 === -1) {
      document.getElementById('buttonFret'.concat('', i)).value = '';
    }
  }
}

function disablerStrBtn() {
  for (var i = 0; i < strBtnId.length; i++) {
    document.getElementById(strBtnId[i]).disabled = true;
  }
}

function enablerStrBtn() {
  for (var i = 0; i < strBtnId.length; i++) {
    if (i < currentTuning.length) {
      document.getElementById(strBtnId[i]).hidden = false;
    } else {
      document.getElementById(strBtnId[i]).hidden = true;
    }
  }
}

function enablerFretBtn() {
  var end = currentFrets;
  end++;
  for (var i = 0; i < MAX_FRETS + 1; i++) {
    if (i <= end) {
      document.getElementById('buttonFret'.concat('', i)).hidden = false;
    } else {
      document.getElementById('buttonFret'.concat('', i)).hidden = true;
    }
  }
}