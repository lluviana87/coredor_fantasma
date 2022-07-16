var imagenTorre, torre;
var imagenPuerta, puerta, grupoPuertas;
var trepador, imagenTrepador, grupoTrepadores;
var ghost, imagenFantasma;
var bloqueInvisible, grupoBloqueInvisible;
var estadoJuego = "play";
var sonido;

function preload(){
  
  imagenTorre = loadImage("tower.png");
  imagenPuerta = loadImage("door.png");
  imagenTrepador =loadImage("climber.png");
  imagenFantasma  = loadImage("ghost-standing.png");
  sonido = loadSound("spooky.wav");
  
}

 function setup(){
   
   createCanvas(600,600);
   torre = createSprite(300,300);
   torre.addImage("tower", imagenTorre);
   torre.velocityY = 1;
   sonido.loop();
   
    ghost = createSprite(200,200,50,50);
   ghost.scale = 0.3;
   ghost.addImage("ghost", imagenFantasma);
   
   //grupos
    grupoPuertas = new Group();
  grupoTrepadores = new Group();
   grupoBloqueInvisible = new Group();
   
 }



function draw(){
  background(0);

  if(estadoJuego === "play"){
    
  if(keyDown("left_arrow")){
    
     ghost.x =  ghost.x -3;
    
  }
  
    
  if(keyDown("right_arrow")){
    
     ghost.x =  ghost.x +3;
    
  }
    
  if(keyDown("space")){
    
    ghost.velocityY = -10;
   //  fantasma.velocityY =  fantasma.velocityY + 0.8; 
  
  }
    
   
        
      ghost.velocityY = ghost.velocityY + 0.8  
    mostrarPuertas();
  if(grupoTrepadores.isTouching(ghost)){
    
     ghost.velocityY = 0;
  }
     if(torre.y > 400){
    
    torre.y = 300;
  }
  
if(grupoBloqueInvisible.isTouching(ghost)  || ghost.y > 600){
  
  
  ghost.destroy();
  estadoJuego = "end";
}
    
 
   drawSprites();
    
     }
  
  
  if(estadoJuego === "end"){
    
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over",230,250);
  }
  
  
  
}

function mostrarPuertas(){
  
  if(frameCount % 240 === 0){
    
    puerta = createSprite(200, -50);
    puerta.addImage(imagenPuerta);
    
    puerta.x = Math.round(random(120,400));
    puerta.velocityY = 1;
    
    trepador = createSprite(200,10);
    trepador.addImage(imagenTrepador);
    trepador.x = puerta.x;
    trepador.velocityY = 1;
    
    bloqueInvisible = createSprite(200,15);
    bloqueInvisible.width = trepador.width;
    bloqueInvisible.height = 2;
    
    
    bloqueInvisible.x = puerta.x;
    bloqueInvisible.velocityY = 1;
    
    ghost.depth = puerta.depth;
     ghost.depth +=1;
    
    //ciclo de vida
    
    puerta.litefime = 800;
    trepador.lifetime = 800;
    
    grupoPuertas.add(puerta);
    grupoTrepadores.add(trepador);
    bloqueInvisible.debug = true;
    grupoBloqueInvisible.add(bloqueInvisible);
  }
  
  
  
}
