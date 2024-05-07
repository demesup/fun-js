function setup() {
  let myC = createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(width/2, height / 2);

  

  for (let r = 1; r< 10; r+=0.2) {
    noFill();
    stroke(255);
    beginShape();
    for (let a = 0; a <TWO_PI; a += 0.01) {
      let x = r * 16 * pow(sin(a), 3);
      let y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
      vertex(x,y);

    }
   endShape();

  }



}
