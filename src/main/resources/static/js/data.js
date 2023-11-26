'use strict';
let btnIdArr = [];
let strBtnId = [];
let currentTuning = [];
let currentScale = [];
let scalesArr = [];
let tuningsArr = [];
let scalesArrVal = [];
let tuningsArrVal = [];
let fretBoard = [[]];
let savedTones = [];
let colorMap = {};
let isClickAllowed = true;
let currentFrets = 0;
let keytone = '';
const NO_KEYTONE = 'No leading-tone';
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
const MAX_NOTE_LEN = 5;
const FRET_WIRES_ARR = ["12", "18", "21", "22", "24", "27"];
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
const TONES_ARR = [A, B_FLAT, B, C, C_SHARP, D, D_SHARP, E, F, F_SHARP, G, G_SHARP];
const KEYTONES_ARR = [NO_KEYTONE, A, B_FLAT, B, C, C_SHARP, D, D_SHARP, E, F, F_SHARP, G, G_SHARP];
const TUNING_MAP = {
  "E-A-D-g": [G, D, A, E],
  "G-C-A-e": [E, A, C, G],
  "B-E-A-D-g": [G, D, A, E, B],
  "E-A-D-G-B-e": [E, B, G, D, A, E],
  "D-A-D-G-B-e": [E, B, G, D, A, D],
  "C-G-C-F-A-d": [D, A, F, C, G, C],
  "D-G-D-G-B-d": [D, B, G, D, G, D],
  "C#-G#-C#-F#-Bb-d#": [D_SHARP, B_FLAT, F_SHARP, C_SHARP, G_SHARP, C_SHARP],
  "D#-G#-C#-F#-Bb-d#": [D_SHARP, B_FLAT, F_SHARP, C_SHARP, G_SHARP, D_SHARP],
  "B-E-A-D-G-B-e": [E, B, G, D, A, E, B],
  "A-E-A-D-G-B-e": [E, B, G, D, A, E, A],
  "F#-B-E-A-D-G-B-e": [E, B, G, D, A, E, B, F_SHARP],
  "G-D-G-C-F-Bb-D-g": [G, D, B_FLAT, F, C, G, D, G],
  "C#-F#-B-E-A-D-G-B-e": [E, B, G, D, A, E, B, F_SHARP, C_SHARP]
}
const SCALES_MAP = {
  "No scale / chord": [],
  "A 5 Chord": [A, E],
  "A Major Chord": [A, C_SHARP, E],
  "A Major Scale": [A, B, C_SHARP, D, E, F_SHARP, G_SHARP],
  "A Major Pentatonic": [A, B, C_SHARP, E, F_SHARP],
  "A Minor Chord": [A, C, E],
  "A Minor Scale": [A, B, C, D, E, F, G],
  "A Minor Pentatonic": [A, C, D, E, G],

  "A#/Bb 5 Chord": [B_FLAT, F],
  "A#/Bb Major Chord": [B_FLAT, D, F],
  "A#/Bb Major Scale": [B_FLAT, C, D, D_SHARP, F, G, A],
  "A#/Bb Major Pentatonic": [B_FLAT, C, D, F, G],
  "A#/Bb Minor Chord": [B_FLAT, C_SHARP, F],
  "A#/Bb Minor Scale": [B_FLAT, C, C_SHARP, D_SHARP, F, F_SHARP, G_SHARP],
  "A#/Bb Minor Pentatonic": [B_FLAT, C_SHARP, D_SHARP, F, G_SHARP],

  "B 5 Chord": [B, F_SHARP],
  "B Major Chord": [B, D_SHARP, F_SHARP],
  "B Major Scale": [B, C_SHARP, D_SHARP, E, F_SHARP, G_SHARP, B_FLAT],
  "B Major Pentatonic": [B, C_SHARP, D_SHARP, F_SHARP, G_SHARP],
  "B Minor Chord": [B, D, F_SHARP],
  "B Minor Scale": [B, C_SHARP, D, E, F_SHARP, G, A],
  "B Minor Pentatonic": [B, D, E, F_SHARP, A],

  "C 5 Chord": [C, G],
  "C Major Chord": [C, E, G],
  "C Major Scale": [C, D, E, F, G, A, B],
  "C Major Pentatonic": [C, D, E, G, A],
  "C Minor Chord": [C, D_SHARP, G],
  "C Minor Scale": [C, D, D_SHARP, F, G, G_SHARP, B_FLAT],
  "C Minor Pentatonic": [C, D_SHARP, F, G, B_FLAT],

  "C#/Db 5 Chord": [C_SHARP, G_SHARP],
  "C#/Db Major Chord": [C_SHARP, F, G_SHARP],
  "C#/Db Major Scale": [C_SHARP, D_SHARP, F, F_SHARP, G_SHARP, B_FLAT, C],
  "C#/Db Major Pentatonic": [C_SHARP, D_SHARP, F, G_SHARP, B_FLAT],
  "C#/Db Minor Chord": [C_SHARP, E, G_SHARP],
  "C#/Db Minor Scale": [C_SHARP, D_SHARP, E, F_SHARP, G_SHARP, A, B],
  "C#/Db Minor Pentatonic": [C_SHARP, E, F_SHARP, G_SHARP, B],

  "D 5 Chord": [D, A],
  "D Major Chord": [D, F_SHARP, A],
  "D Major Scale": [D, E, F_SHARP, G, A, B, C_SHARP],
  "D Major Pentatonic": [D, E, F_SHARP, A, B],
  "D Minor Chord": [D, F, A],
  "D Minor Scale": [D, E, F, G, A, B_FLAT, C],
  "D Minor Pentatonic": [D, F, G, A, C],

  "D#/Eb 5 Chord": [D_SHARP, B_FLAT],
  "D#/Eb Major Chord": [D_SHARP, G, B_FLAT],
  "D#/Eb Major Scale": [D_SHARP, F, G, G_SHARP, B_FLAT, C, D],
  "D#/Eb Major Pentatonic": [D_SHARP, F, G, B_FLAT, C],
  "D#/Eb Minor Chord": [D_SHARP, F_SHARP, B_FLAT],
  "D#/Eb Minor Scale": [D_SHARP, F, F_SHARP, G_SHARP, B_FLAT, B, C_SHARP],
  "D#/Eb Minor Pentatonic": [D_SHARP, F_SHARP, G_SHARP, B_FLAT, C_SHARP],

  "E 5 Chord": [E, B],
  "E Major Chord": [E, G_SHARP, B],
  "E Major Scale": [E, F_SHARP, G_SHARP, A, B, C_SHARP, D_SHARP],
  "E Major Pentatonic": [E, F_SHARP, G_SHARP, B, C_SHARP],
  "E Minor Chord": [E, G, B],
  "E Minor Scale": [E, F_SHARP, G, A, B, C, D],
  "E Minor Pentatonic": [E, G, A, B, D],

  "F 5 Chord": [F, C],
  "F Major Chord": [F, A, C],
  "F Major Scale": [F, G, A, B_FLAT, C, D, E],
  "F Major Pentatonic": [F, G, A, C, D],
  "F Minor Chord": [F, G_SHARP, C],
  "F Minor Scale": [F, G, G_SHARP, B_FLAT, C, C_SHARP, D_SHARP],
  "F Minor Pentatonic": [F, G_SHARP, B_FLAT, C, D_SHARP],

  "F#/Gb 5 Chord": [F_SHARP, C_SHARP],
  "F#/Gb Major Chord": [F_SHARP, B_FLAT, C_SHARP],
  "F#/Gb Major Scale": [F_SHARP, G_SHARP, B_FLAT, B, C_SHARP, D_SHARP, F],
  "F#/Gb Major Pentatonic": [F_SHARP, G_SHARP, B_FLAT, C_SHARP, D_SHARP],
  "F#/Gb Minor Chord": [F_SHARP, A, C_SHARP],
  "F#/Gb Minor Scale": [F_SHARP, G_SHARP, A, B, C_SHARP, D, E],
  "F#/Gb Minor Pentatonic": [F_SHARP, A, B, C_SHARP, E],

  "G 5 Chord": [G, D],
  "G Major Chord": [G, B, D],
  "G Major Scale": [G, A, B, C, D, E, F_SHARP],
  "G Major Pentatonic": [G, A, B, D, E],
  "G Minor Chord": [G, B_FLAT, D],
  "G Minor Scale": [G, A, B_FLAT, C, D, D_SHARP, F],
  "G Minor Pentatonic": [G, B_FLAT, C, D, F],

  "G#/Ab 5 Chord": [G_SHARP, D_SHARP],
  "G#/Ab Major Chord": [G_SHARP, C, D_SHARP],
  "G#/Ab Major Scale": [G_SHARP, B_FLAT, C, C_SHARP, D_SHARP, F, G],
  "G#/Ab Major Pentatonic": [G_SHARP, B_FLAT, C, D_SHARP, F],
  "G#/Ab Minor Chord": [G_SHARP, B, D_SHARP],
  "G#/Ab Minor Scale": [G_SHARP, B_FLAT, B, C_SHARP, D_SHARP, E, F_SHARP],
  "G#/Ab Minor Pentatonic": [G_SHARP, B, C_SHARP, D_SHARP, F_SHARP],
};