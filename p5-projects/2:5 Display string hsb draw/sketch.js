// Random adjustment to location
// hsb color
let str = "The quick brown fox jumped over the lazy dog.";
let p;
let a_alpha = 0.02;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB)

  // Display string in paragraph element
  p = createP(str);
  textSize(48);
  textAlign(LEFT, TOP);

  frameRate(5)
}

function draw() {

  // Display string character by character
  let x = 0;
  let y = 0;
  let h = textAscent() + textDescent();
  
  line(0, y + h, width, y + h)
  
  while (y < height) {
    for (let c = 0; c < str.length; c++) {
      let char = str.charAt(c);

      push()
      translate(x, y)
      rotate(radians(random(-10, 10)))
      fill(x, 100, 100, a_alpha);
      text(char, 0, random(-1, 1));
      pop();

      x += textWidth(char);
      if (x > width - 50) {
        x = 10;
        y += h;
        line(0, y + h, width, y + h)
      }
    }
  }

}

// https://editor.p5js.org/icm4.0/sketches/dqWmqXO3-