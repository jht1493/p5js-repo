let robotImage;
let bots = [];  // Declare array to hold Robot objects

function preload() {
  robotImage = loadImage("robot1.svg");
}

function setup() {
  createCanvas(720, 480);

  let numRobots = 20;

  // Create each object
  for (let i = 0; i < numRobots; i++) {
    // Create a random x-coordinate
    let x = random(-40, width-40);
    // Assign the y-coordinate based on the order
    let y = map(i, 0, numRobots, -100, height-200);
    bots[i] = new Robot(robotImage, x, y);
  }
}

function draw() {
  background(204);
  // Update and display each bot in the array
  for (let i = 0; i < bots.length; i++) {
    bots[i].update();
    bots[i].display();
  }
}

function Robot(img, tempX, tempY) {
  // Set initial values for properties
  this.xpos = tempX;
  this.ypos = tempY;
  this.angle = random(0, TWO_PI);
  this.botImage = img;
  this.yoffset = 0.0;

 // Update the properties
  this.update = function() {
    this.angle += 0.05;
    this.yoffset = sin(this.angle) * 20;
  }

  // Draw the robot to the screen
  this.display = function() {
    image(this.botImage, this.xpos, this.ypos + this.yoffset);
  }
}

// https://editor.p5js.org/jht1493/sketches/dO-IXUHhr
// Ex_11_99 Robot Array

// https://github.com/lmccart/gswp5.js-code/blob/master/Robots/Robot09_Arrays.js
