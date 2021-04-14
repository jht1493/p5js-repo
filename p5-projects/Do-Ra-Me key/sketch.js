let a_files = [
  'media/Do.m4a', // 0
  'media/Ra.m4a', // 1
  'media/Me.m4a', // 2
  'media/Fa.m4a', // 3
  'media/So.m4a', // 4
  'media/La.m4a', // 5
  'media/Te.m4a', // 6
  'media/Do-2.m4a', // 7
];
let a_sounds = [];

function preload() {
  for (let item of a_files) {
    a_sounds.push(loadSound(item))
  }
}

let a_keys = {};
let snd_active = {};
let a_fft;
let a_volume = 0.1;

function setup() {
  createCanvas(640, 300);
  a_fft = new p5.FFT();
  sketch_ui();
}

function draw() {
  background(200);
  show_value('a_keys', a_keys)
  show_fft();
}

let a_start = 0; // Window onto fft data
let a_end = 100;

function show_fft() {
  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = a_fft.analyze();
  // spectrum.length = 1024

  let i_start = Math.round(spectrum.length * a_start / 1000)
  let i_end = Math.round(spectrum.length * a_end / 1000)
  let b_len = width / (i_end - i_start);
  // print('i_start', i_start, 'i_end', i_end, 'blen', blen);

  for (let i = i_start; i < i_end; i++) {
    fill(spectrum[i], 0, 0);
    let x = map(i, i_start, i_end, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height - h, b_len, h);
  }
}

// Create a new oscillator on each keypress
function keyPressed() {
  let index = a_notes[key];
  if (index !== undefined) {
    a_keys[key] = index;
    let snd = a_sounds[index % a_sounds.length];
    let mod = Math.trunc( index / a_sounds.length)
    let rate = 1 + mod/5;
    // print('index', index, 'mod', mod);
    
    // loop([startTime], [rate], [amp], [cueStart], [cueEnd])
    snd.loop(0, rate, a_volume, 0.2, 0.6);
    snd_active[key] = snd;
    
    show_num('rate', rate);
  }
  // prevent any default behavior
  return false;
}

function keyReleased() {
  // print('keyReleased', key);
  delete a_keys[key];
  let snd = snd_active[key];
  if (snd) {
    delete snd_active[key];
    snd.stop();
  }
  // prevent any default behavior
  return false;
}