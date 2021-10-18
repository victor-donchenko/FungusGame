var e;
function setup() {
  createCanvas(400, 400);
  var a = new Fungus();
  e = new Environment(40, 40);
}

function draw() {
  //background(220);
  e.Show();
}
class Fungus{
  constructor(x,y){
    this.state = "spore";
    this.indexX = x;
    this.indexY = y;
  }
  Show(){
    fill(255,0,0);
    rect(1+this.indexX*10, 1+this.indexY*10, 8,8);
  }
}
class Environment{
  constructor(r, c){
    this.rows = r;
    this.columns = c;
    this.matrix = new Array(40);
    for (var i = 0; i < this.matrix.length; i++) {
      this.matrix[i] = new Array(40);
    }
    for(var j = 0; j < 40; j++){
      for(var k = 0; k < 40; k++){
        this.matrix[j][k] = new Fungus(j,k);
        this.matrix[j][k].Show();
      }
    }
  }
  Show(){
    for(var i = 1; i < this.columns; i++){
      line(i*10,0, i*10,400);
    }
    for(var j = 1; j < this.rows; j++){
      line(0, j*10,400, j*10);
    }
  }
}
