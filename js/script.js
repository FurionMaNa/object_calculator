let canvas,ctx; 
let workArea,divCanvas; 
let scrollCanvas;
var scale=-10; 
var width=3000; 
var height=3000; 
var visibleWeb=true; 
var fullScreen=false; 
var imgMouse = new Image();
var imgMaps=new Image(); 
var maps=new Array();
var direction=0;
var model=0;
var ponton = new Object();
ponton.width = 1000;
ponton.height = 2000;
ponton.price = 16800;
ponton.col = 0;
var gangway = new Object();
gangway.width = 1000;
gangway.height = 2000;
gangway.price = 9460;
gangway.col = 0;
var stairs = new Object();
stairs.price = 18560;
stairs.col = 0;
var connector = new Object();
connector.price = 280;
connector.col = 0;
var stays = new Object();
stays.price = 890;
stays.col = 0;
var sitconnect = new Object();
sitconnect.price = 12500;
sitconnect.col = 0;
var duck = new Object();
duck.col = 0;
duck.price = 0;

function init(){ 
	workArea = document.getElementById('workArea'); 
	divCanvas=document.getElementById('divCanvas'); 
	scrollCanvas=document.getElementById('scrollCanvas');
	canvas = document.getElementById('main'); 
	ctx = canvas.getContext('2d'); 
	scale=-10; 
	ctx.lineWidth = 2;
	visibleWeb=true; 
	fullScreen=false; 
	ctx.strokeStyle = 'white';
	for(var i=0;i<200;i++){ 
        maps[i]=new Array(); 
        for(var j=0;j<200;j++){ 
        	maps[i][j]=0;
        }
    } 
	draw(); 
	canvas.onmousemove = function(evt) {canvasMoveMouse(evt)};
	canvas.onclick=function(evt){canvasClick(evt)};
	canvas.onmousewheel=function(evt){
		if(direction==3) direction=-1;
		direction++;
		canvasMoveMouse(evt);
	};
} 

function onScrollCanvas(){
	draw();
}

function sum(){
	var sum = ponton.price * ponton.col + gangway.price * gangway.col + stairs.price * stairs.col + connector.price * connector.col + stays.price * stays.col + sitconnect.price * sitconnect.col;
	document.getElementById('summ').innerHTML = sum;
}

function area(){
	var width = ponton.width * ponton.col;
	var height = ponton.height *ponton.col;
	document.getElementById('gabarites').innerHTML = width + ' x ' + height +' м.';
}

function quantity(){
	document.getElementById('shetpont').innerHTML = ponton.col;
}

function clearCanvas(){
	for(var i=0;i<200;i++){ 
        for(var j=0;j<200;j++){ 
        	maps[i][j]=0;
        }
    } 
	draw();
}

function isArrange(x,y,model,direction){
	var countX, countY;
	switch (model){
		case 1:
			switch (direction){
				case 0:case 2:countX=4;countY=8;break;
				case 1:case 3:countX=8;countY=4;break;
			}
			break;
		case 2:
			switch (direction){
				case 0:case 2:countX=4;countY=8;break;
				case 1:case 3:countX=8;countY=4;break;
			}
			break;
		case 3:
			switch (direction){
				case 0:case 2:countX=1;countY=2;break;
				case 1:case 3:countX=2;countY=1;break;
			}
			break;
		case 4:
			switch (direction){
				case 0:case 2:countX=1;countY=2;break;
				case 1:case 3:countX=2;countY=1;break;
			}
			break;
	}
	for(var i=y;i<countY+y;i++){
		for(var j=x;j<countX+x;j++){
			if(maps[i][j]!=0){ 
				return false;
			}
		}
	}
	return true;
}

function canvasClick(evt){
	var x,y;
	x=Math.trunc((evt.offsetX)/(45+scale));
	y=Math.trunc((evt.offsetY)/(45+scale));
	console.log(y,x);
	console.log((evt.offsetY+scrollCanvas.scrollTop));
	console.log(evt.offsetY,scrollCanvas.scrollTop);
	console.log(evt.offsetX,evt.offsetY);
	if(isArrange(x,y,model,direction)){
		switch (model){
			case 1:
				ponton.col++;
				switch (direction){
					case 0:
						for (var i=y;i<y+8;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=1;
						break;
					case 1:
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+8;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-10;
						break;
					case 2:
						for (var i=y;i<y+8;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-1;
						break;
					case 3:
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+8;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=10;
						break;
				}
				break;
			case 2:
				switch (direction){
					case 0:
						for (var i=y;i<y+8;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=2;
						break;
					case 1:
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+8;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-20;
						break;
					case 2:
						for (var i=y;i<y+8;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-2;
						break;
					case 3:
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+8;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=20;
						break;
				}
				break;
			case 3:
				switch (direction){
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=3;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-30;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-3;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=30;
						break;
				}
				break;
			case 4:
				switch (direction){
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=4;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-40;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-4;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=40;
						break;
				}
				break;
			case 5:
				switch (direction){
					
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=5;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-50;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-5;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=50;
						break;
				}
				break;
			case 6:
				switch (direction){
					
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=6;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-60;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-6;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=60;
						break;
				}
				break;
			case 7:
				switch (direction){
					
					case 0:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=7;
						break;
					case 1:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-70;
						break;
					case 2:
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+1;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=-7;
						break;
					case 3:
						for (var i=y;i<y+1;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						maps[y][x]=70;
						break;
				}
				break;
		}
	}
	sum();
	area();
	draw();
	quantity()
}

function canvasMoveMouse(evt){
	draw();
	switch (model){
		case 1:
			ctx.save();
			ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
			imgMouse.src = 'img/pontoonbutton.png';
			switch (direction){
				case 0:
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);
					break;
				case 2:
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);
					break;
				case 1:
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);
					break;
				case 3:
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);
					break;
			} 
			ctx.restore();
			break;
		case 2:
			switch (direction){
				case 0:imgMouse.src = 'img/test2.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*4, (45+scale)*8); break;
				case 2:imgMouse.src = 'img/test2Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*4, (45+scale)*8); break;
				case 1:imgMouse.src = 'img/test2Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*8, (45+scale)*4);break;
				case 3:imgMouse.src = 'img/test2Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*8, (45+scale)*4);break;
			}
			break;
		case 3:
			switch (direction){
				case 0:imgMouse.src = 'img/test3.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test3Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test3Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test3Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			}
			break;
		case 4:
			switch (direction){
				case 0:imgMouse.src = 'img/test4.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test4Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test4Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test4Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			}
			break;
		case 5:
			switch (direction){
				case 0:imgMouse.src = 'img/test5.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test5Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test5Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test5Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			} 
			break;
		case 6:
			switch (direction){
				case 0:imgMouse.src = 'img/test6.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test6Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test6Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test6Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			}
			break;
		case 7:
			switch (direction){
				case 0:imgMouse.src = 'img/test7.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 2:imgMouse.src = 'img/test7Up.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale), (45+scale)*2); break;
				case 1:imgMouse.src = 'img/test7Left.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
				case 3:imgMouse.src = 'img/test7Right.png'; ctx.drawImage(imgMouse, evt.offsetX, evt.offsetY, (45+scale)*2, (45+scale));break;
			}
			break;
	}
}

function draw(){ 
	ctx.clearRect(0, 0, width, height); 
	if(visibleWeb){ 
		drawWeb(scale); 
	} 
	var sizeX=45+scale; 
	var sizeY=45+scale; 
	var iStart=Math.trunc(scrollCanvas.scrollTop/(45+scale));
	var jStart=Math.trunc(scrollCanvas.scrollLeft/(45+scale));
	var iEnd=Math.trunc((scrollCanvas.clientHeight+scrollCanvas.scrollTop)/(45+scale));
	var jEnd=Math.trunc((scrollCanvas.clientWidth+scrollCanvas.scrollLeft)/(45+scale));
	for(var i=iStart;i<iEnd;i++){
		for(var j=jStart;j<jEnd;j++){
			ctx.save();
			ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
			switch(maps[i][j]){
				case 1:imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
				case -1:imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
				case 10:imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
				case -10:imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
				case 2:imgMaps.src = 'img/test2.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*4, sizeY*8);break;
				case -2:imgMaps.src = 'img/test2Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*4, sizeY*8);break;
				case 20:imgMaps.src = 'img/test2Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*8, sizeY*4);break;
				case -20:imgMaps.src = 'img/test2Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*8, sizeY*4);break;	
				case 3:imgMaps.src = 'img/test3.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case -3:imgMaps.src = 'img/test3Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case 30:imgMaps.src = 'img/test3Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case -30:imgMaps.src = 'img/test3Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case 4:imgMaps.src = 'img/test4.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case -4:imgMaps.src = 'img/test4Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case 40:imgMaps.src = 'img/test4Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case -40:imgMaps.src = 'img/test4Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case 5:imgMaps.src = 'img/test5.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case -5:imgMaps.src = 'img/test5Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case 50:imgMaps.src = 'img/test5Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case -50:imgMaps.src = 'img/test5Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case 6:imgMaps.src = 'img/test6.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case -6:imgMaps.src = 'img/test6Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case 60:imgMaps.src = 'img/test6Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case -60:imgMaps.src = 'img/test6Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case 7:imgMaps.src = 'img/test7.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case -7:imgMaps.src = 'img/test7Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
				case 70:imgMaps.src = 'img/test7Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case -70:imgMaps.src = 'img/test7Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				case 11:break;
			}
			ctx.restore();
		}
	}
	
} 

function visibleWebClick(){ 
	visibleWeb=!visibleWeb; 
	draw(); 
} 

function scalePlusClick(){ 
	if(scale<20){ 
		scale+=10; 
		canvas.width=(30+scale)*200; 
		canvas.height=(30+scale)*200; 
		draw(); 
	} 
} 

function fullScreenStart(element) { 
	if(element.requestFullscreen) { 
		element.requestFullscreen(); 
	} else if(element.webkitrequestFullscreen) { 
		element.webkitRequestFullscreen(); 
	} else if(element.mozRequestFullscreen) { 
		element.mozRequestFullScreen(); 
	} 
} 


function fullScreenClick(){ 
	fullScreen=!fullScreen; 
	if(fullScreen){ 
		fullScreenStart(workArea); 
		workArea.style.backgroundColor="#FFF"; 
		draw(); 
	}else{ 
		document.exitFullscreen(); 
		draw(); 
	} 
} 

function scaleMinusClick(){ 
	if(scale>-20){ 
		scale-=10; 
		canvas.width=(30+scale)*200; 
		canvas.height=(30+scale)*200; 
		draw(); 
	} 
} 

function drawWeb(scale){ 
	var sizeX=45+scale; 
	var sizeY=45+scale; 
	var iStart=Math.trunc(scrollCanvas.scrollTop/(45+scale));
	var jStart=Math.trunc(scrollCanvas.scrollLeft/(45+scale));
	var iEnd=Math.trunc((scrollCanvas.clientHeight+scrollCanvas.scrollTop)/(45+scale));
	var jEnd=Math.trunc((scrollCanvas.clientWidth+scrollCanvas.scrollLeft)/(45+scale));
	for(var i=iStart;i<iEnd+2;i++ ){ 
		for(var j=jStart;j<jEnd+2;j++){ 
			ctx.beginPath();
			ctx.strokeStyle = "#FFFFFF";
			ctx.strokeRect(sizeX*j, sizeY*i, sizeX*(j+1), sizeY*(j+1)); 
			ctx.stroke(); 
		} 
	} 
}

function model1onClick(){  
	imgMouse.src = 'img/test.png'; 
	model=1;
} 

function model2onClick(){
	imgMouse.src = 'img/test2.png'; 
	model=2;
} 

function model3onClick(){
	imgMouse.src = 'img/test3.png'; 
	model=3;
} 

function model4onClick(){
	imgMouse.src = 'img/test4.png'; 
	model=4;

} 

function model5onClick(){
	imgMouse.src = 'img/test5.png'; 
	model=5;
} 

function model6onClick(){
	imgMouse.src = 'img/test6.png'; 
	model=6;
} 

function model7onClick(){
	imgMouse.src = 'img/test7.png'; 
	model=7;
} 

document.addEventListener('DOMContentLoaded', init)