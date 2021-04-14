const pix_len = 10;
const char_len = 8 * pix_len;
let x_pos = 0;
let y_pos = 0;
const start_char = 'A'.charCodeAt(0);
const end_char = 'Z'.charCodeAt(0);
let now_char = start_char;
let draw_op;

function setup() {
  createCanvas(400, 400);
  new_page();
  frameRate(1);
  draw_op = draw_next_char;
}

function draw() {
  draw_op();
}

function draw_next_char() {
  const a_char = String.fromCharCode(now_char);
  draw_char(a_char, x_pos, y_pos);
  if (y_pos + char_len > height) {
    y_pos = 0;
    draw_op = next_page;
    return;
  }
  now_char += 1;
  if (now_char > end_char) {
    now_char = start_char;
  }
  x_pos += char_len;
  if (x_pos + char_len > width) {
    x_pos = 0;
    y_pos += char_len;
  }
  // print('x_pos', x_pos, 'y_pos', y_pos);
}

function next_page() {
  new_page();
  draw_next_char();
  draw_op = draw_next_char;
}

function new_page() {
  background(220);
}

function draw_char(a_char, a_init_x, a_init_y) {
  const char_index = a_char.charCodeAt(0) - 'A'.charCodeAt(0);
  const a_bytes = font8x8[char_index];
  // print('a_bytes', a_bytes);
  let a_y = a_init_y;
  for (const a_byte of a_bytes) {
    // print('a_byte', a_byte);
    for (let a_x = 0; a_x < 8; a_x += 1) {
      if (a_byte & (1 << a_x)) {
        rect(a_init_x + (a_x * pix_len), a_y, pix_len, pix_len);
      }
    }
    a_y += pix_len;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

// https://github.com/jht1900/font8x8/blob/master/font8x8_basic.h

const font8x8 = [
  [0x0c, 0x1e, 0x33, 0x33, 0x3f, 0x33, 0x33, 0x00], // U+0041 (A)
  [0x3f, 0x66, 0x66, 0x3e, 0x66, 0x66, 0x3f, 0x00], // U+0042 (B)
  [0x3c, 0x66, 0x03, 0x03, 0x03, 0x66, 0x3c, 0x00], // U+0043 (C)
  [0x1f, 0x36, 0x66, 0x66, 0x66, 0x36, 0x1f, 0x00], // U+0044 (D)
  [0x7f, 0x46, 0x16, 0x1e, 0x16, 0x46, 0x7f, 0x00], // U+0045 (E)
  [0x7f, 0x46, 0x16, 0x1e, 0x16, 0x06, 0x0f, 0x00], // U+0046 (F)
  [0x3c, 0x66, 0x03, 0x03, 0x73, 0x66, 0x7c, 0x00], // U+0047 (G)
  [0x33, 0x33, 0x33, 0x3f, 0x33, 0x33, 0x33, 0x00], // U+0048 (H)
  [0x1e, 0x0c, 0x0c, 0x0c, 0x0c, 0x0c, 0x1e, 0x00], // U+0049 (I)
  [0x78, 0x30, 0x30, 0x30, 0x33, 0x33, 0x1e, 0x00], // U+004A (J)
  [0x67, 0x66, 0x36, 0x1e, 0x36, 0x66, 0x67, 0x00], // U+004B (K)
  [0x0f, 0x06, 0x06, 0x06, 0x46, 0x66, 0x7f, 0x00], // U+004C (L)
  [0x63, 0x77, 0x7f, 0x7f, 0x6b, 0x63, 0x63, 0x00], // U+004D (M)
  [0x63, 0x67, 0x6f, 0x7b, 0x73, 0x63, 0x63, 0x00], // U+004E (N)
  [0x1c, 0x36, 0x63, 0x63, 0x63, 0x36, 0x1c, 0x00], // U+004F (O)
  [0x3f, 0x66, 0x66, 0x3e, 0x06, 0x06, 0x0f, 0x00], // U+0050 (P)
  [0x1e, 0x33, 0x33, 0x33, 0x3b, 0x1e, 0x38, 0x00], // U+0051 (Q)
  [0x3f, 0x66, 0x66, 0x3e, 0x36, 0x66, 0x67, 0x00], // U+0052 (R)
  [0x1e, 0x33, 0x07, 0x0e, 0x38, 0x33, 0x1e, 0x00], // U+0053 (S)
  [0x3f, 0x2d, 0x0c, 0x0c, 0x0c, 0x0c, 0x1e, 0x00], // U+0054 (T)
  [0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x3f, 0x00], // U+0055 (U)
  [0x33, 0x33, 0x33, 0x33, 0x33, 0x1e, 0x0c, 0x00], // U+0056 (V)
  [0x63, 0x63, 0x63, 0x6b, 0x7f, 0x77, 0x63, 0x00], // U+0057 (W)
  [0x63, 0x63, 0x36, 0x1c, 0x1c, 0x36, 0x63, 0x00], // U+0058 (X)
  [0x33, 0x33, 0x33, 0x1e, 0x0c, 0x0c, 0x1e, 0x00], // U+0059 (Y)
  [0x7f, 0x63, 0x31, 0x18, 0x4c, 0x66, 0x7f, 0x00], // U+005A (Z)
];