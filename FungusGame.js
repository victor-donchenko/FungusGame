var e;
function setup() {
  createCanvas(400, 400);
  e = new Environment(400, 400, 10, 10, 7, 0);
}

function draw() {
  e.Show();  
}
class Environment{
  constructor(sW, sH, boxesOnWidth, boxesOnHeight, n, f){
    //Screen and box size variables
    this.screenWidth = sW;
    this.screenHeight = sH;
    this.rows = boxesOnHeight;
    this.columns = boxesOnWidth;
    this.boxDimX = this.screenWidth/this.columns;
    this.boxDimY = this.screenHeight/this.rows;
    
    //Storage for the grid
    this.matrix = [];
    this.matrix.length = boxesOnHeight;
      
    //Creating and setting the matrix to placeholder boxes
    for(var i = 0; i < this.matrix.length; i++){
      this.matrix[i] = [];
      this.matrix[i].length = boxesOnWidth
    }
    for(var r = 0; r < this.rows; r++){
      for(var c = 0; c < this.columns; c++){
        this.matrix[r][c] = new Placeholder(r,c,this.boxDimX, this.boxDimY);
      }
    }
    
    //Replaces some placeholders with nutrients in random places
    for(var nutrient = 0; nutrient < n; nutrient ++){
      var givenRow = Math.floor(random(0,this.rows));
      var givenColumn = Math.floor(random(0,this.columns));
      while (this.matrix[givenRow][givenColumn].type == "Nutrient"){
        givenRow = Math.floor(random(0,this.rows));
        givenColumn = Math.floor(random(0,this.columns));
      }
      this.matrix[givenRow][givenColumn] = new Nutrient(1,givenRow, givenColumn, this.boxDimX, this.boxDimY);
    }
    
    //Creates a fungus in a random square
    var randRow = Math.floor(random(0,this.rows));
    var randColumn = Math.floor(random(0,this.columns));
    while (this.matrix[randRow][randColumn].type != "Placeholder"){
      randRow = Math.floor(random(0,this.rows));
      randColumn = Math.floor(random(0,this.columns));
    }
    this.matrix[randRow][randColumn] = new Fungus(randRow, randColumn, this.boxDimX, this.boxDimY);
  }
  Show(){
    for(var k = 0; k < this.rows; k++){
      for(var l = 0; l < this.columns; l++){
        this.matrix[k][l].Show();  
      }
    }
  }
}
/*class FungalColony{
  constructor(numFungi){
    var lastRow;
    var lastColumn;
    for(var i = 0; i < this.colony.length; i++){
      var nextRow;
      var nextColumn;
      if(i == 0){

      } else {
        
      }
      this.colony[i] = new Fungi(lastRow, lastColumn)
      lastRow = nextRow;
      lastColumn = nextColumn;
    }
  }
}*/
class Fungus{
  constructor(r,c,w,h){
    this.state = "spore";
    this.row = r;
    this.column = c;
    this.myWidth = w;
    this.myHeight = h;
    this.type = "Fungus";
  }
  Show(){
    if(this.state == "spore"){
      fill(255,255,0);
    } else if(this.state == "maturing"){
      fill(255,162,0);
    } else if(this.state == "reproducing"){
      fill(255,0,0);
    }
    rect(this.column * this.myWidth, this.row*this.myHeight, this.myWidth, this.myHeight);
  }
}
class Nutrient{
  constructor(value, r, c, w, h){
    this.type = "Nutrient";
    this.nutrientValue = value;
    this.row = r;
    this.column = c;
    this.myWidth = w;
    this.myHeight = h;
  }
  Show(){
    fill(0,255,0);
    rect(this.column * this.myWidth, this.row*this.myHeight, this.myWidth, this.myHeight);
  }
}
class Placeholder{
  constructor(r,c,w,h){
    this.type = "Placeholder";
    this.row = r;
    this.column = c;
    this.myWidth = w;
    this.myHeight = h;   
  }
  Show(){
    fill(255,255,255);
    rect(this.column*this.myWidth, this.row*this.myHeight, this.myWidth, this.myHeight);
  }
}
