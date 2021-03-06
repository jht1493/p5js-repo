var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

var boxes = [];

let setup_done = false;

function setup() {
  noCanvas();
  pixelDensity(1);
  video = createCapture(VIDEO, video_ready);
  video.size(cols, rows);
  slider = createSlider(0, 255, 77);

  print('setup 1');
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    var linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }
  // print('setup 2');
  setup_done = true;
}

function video_ready() {
  print('video_ready');
}

function draw() {
  print('draw 1');
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + y * video.width) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      var threshold = slider.value();

      var checkIndex = x + y * cols;
      // print('checkIndex', checkIndex)
      if (bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
}