function setup() {
  let myC = createCanvas(400, 400);
}

let layers = [
  { min: 0.5, step: 0.2, max: 5, color: 'red', rad: 3, dir: 1},
  { min: 2, step: 0.2, max: 7, color: '#6FC5E0', rad: 7, dir: 1},
  { min: 4, step: 0.2, max: 9, color: '#F27281', rad: 5, dir: 1},
  { min: 6, step: 0.1, max: 11, color: '#FFD700', rad: 9, dir: 1},
  { min: 8, step: 0.1, max: 13, color: '#7FFF00', rad: 10, dir: 1}
];

let dir = 1;


function draw() {
  background(0);
  translate(width/2, height / 2);

  for (let i = 0; i < layers.length; i++) {
    let layer = layers[i];
    drawLayeredHeart(layer);
  }


  
}

function drawLayeredHeart(layer) {
  if (layer.rad > layer.max || layer.rad < layer.min) {
    console.log("CHANGE")
    
    layer.dir = -layer.dir; 
  }
  if (random(30) > 20) {
    let ch = layer.rad + layer.step * layer.dir
    if (ch > 0) {
      layer.rad = ch;
    }
  }
  console.log(layer);
    noFill();
    stroke(layer.color);
    beginShape();

    for (let a = 0; a <TWO_PI; a += 0.01) {
      let x = layer.rad * 16 * pow(sin(a), 3);
      let y = -layer.rad * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
      vertex(x,y);

      if (random(5) > 3) {
        endShape();

        a += 0.03;

        beginShape();
      }
    }
   endShape();
}
