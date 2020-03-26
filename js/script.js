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
var imgGhost=new Image(); 
var imgMapsPonton=new Image();
var imgMapsSkhodnya=new Image();
var imgMapsStairs=new Image();
var imgMapsBench=new Image();
var imgMapsRack=new Image();
var imgMapsDuck=new Image();
var maps=new Array();
var mapsBuff=new Array();
var direction=0;
var model=0;
var ponton = new Object();
var color='blue';
var mouseX=0;
var mouseY=0;
var id=0;
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
sitconnect.price = 280;
sitconnect.col = 0;
var bench = new Object();
bench.price = 12500;
bench.col = 0;
var duck = new Object();
duck.col = 0;
duck.price = 0;
var rotateArr=new Array();
var buffEvt;

function init(){ 
	workArea = document.getElementById('workArea'); 
	divCanvas=document.getElementById('divCanvas'); 
	scrollCanvas=document.getElementById('scrollCanvas');
	canvas = document.getElementById('main'); 
	ctx = canvas.getContext('2d'); 
	rotateArr[0]=0;
	rotateArr[1]=0;
	rotateArr[2]=0;
	rotateArr[3]=0;
	rotateArr[4]=0;
	rotateArr[5]=0;
	rotateArr[6]=0;
	scale=-10; 
	ctx.lineWidth = 2;
	visibleWeb=true; 
	fullScreen=false; 
	scrollCanvas.scrollTop=1200; 
	scrollCanvas.scrollLeft=900;
	ctx.strokeStyle = 'white';
	for(var i=0;i<200;i++){ 
        maps[i]=new Array(); 
        for(var j=0;j<200;j++){ 
        	maps[i][j]=new Object( {code:0, id:-1} );
        }
    } 
	imgMapsPonton.src = 'img/pontoonbutton.png'; 
	imgMapsSkhodnya.src = 'img/photo-objects-png/skhodnya/skhodnya_blue.png'; 
	imgMapsStairs.src='img/photo-objects-png/stairs/stairs-blue.png';
	imgMapsBench.src='img/bench.png';
	imgMapsRack.src='img/rack.png';
	imgMapsDuck.src='img/connector.png';
	draw(); 
	canvas.onmousemove = function(evt) {buffEvt=evt;canvasMoveMouse(evt)};
	canvas.onclick=function(evt){canvasClick(evt)};
} 


function model1onClick(){  
	direction=rotateArr[0];
	model=1;
} 

function model2onClick(){ 
	direction=rotateArr[1];
	model=2;
} 

function model3onClick(){
	direction=rotateArr[2];
	model=3;
} 

function model4onClick(){
	direction=rotateArr[3];
	model=4;
} 

function model5onClick(){
	direction=rotateArr[4];
	model=5;
} 

function model6onClick(){ 
	direction=rotateArr[6];
	model=6;
} 

function model7onClick(){
	direction=rotateArr[5];
	model=7;
} 

function onRotate(id){
	switch (id){
		case 1:
			if(model==1){
				direction=rotateArr[0];
				if(direction==3) direction=-1;
					direction++;
				rotateArr[0]=direction;
			}else{
				if(rotateArr[0]==3){
					rotateArr[0]=-1;
				}
				rotateArr[0]++;
			}
			break;
		case 2:
			if(model==2){
				direction=rotateArr[1];
				if(direction==3) direction=-1;
					direction++;
				rotateArr[1]=direction;
			}else{
				if(rotateArr[1]==3){
					rotateArr[1]=-1;
				}
				rotateArr[1]++;
			}
			break;
		case 3:
			if(model==3){
				direction=rotateArr[2];
				if(direction==3) direction=-1;
					direction++;
				rotateArr[2]=direction;
			}else{
				if(rotateArr[2]==3){
					rotateArr[2]=-1;
				}
				rotateArr[2]++;
			}
			break;
		case 4:
			if(model==4){
				direction=rotateArr[3];
				if(direction==3) direction=-1;
					direction++;
				rotateArr[3]=direction;
			}else{
				if(rotateArr[3]==3){
					rotateArr[3]=-1;
				}
				rotateArr[3]++;
			}
			break;
		case 5:
			if(model==5){
				direction=rotateArr[4];
				if(direction==3) direction=-1;
					direction++;
				rotateArr[4]=direction;
			}else{
				if(rotateArr[4]==3){
					rotateArr[4]=-1;
				}
				rotateArr[4]++;
			}
			break;
		case 6:
			if(model==7){
				direction=rotateArr[5];
				if(direction==3) direction=-1;
					direction++;
				rotateArr[5]=direction;
			}else{
				if(rotateArr[5]==3){
					rotateArr[5]=-1;
				}
				rotateArr[5]++;
			}
			break;
		case 7:
			if(model==6){
				direction=rotateArr[6];
				if(direction==3) direction=-1;
					direction++;
				rotateArr[6]=direction;
			}else{
				if(rotateArr[6]==3){
					rotateArr[6]=-1;
				}
				rotateArr[6]++;
			}
			break;
	}
	canvasMoveMouse(buffEvt);
}

function change_color(id, colors){
	adress = "img/pontoon-" + id + ".png";
	color=id;
	document.getElementById('red').src = adress;
	document.getElementById('ch_c').style.background = colors;
	document.getElementById('ch_c').style.color = colors;
}

function onScrollCanvas(){
	draw();
}

function sum(){
	var sum = ponton.price * ponton.col + gangway.price * gangway.col + stairs.price * stairs.col + connector.price * connector.col + stays.price * stays.col + sitconnect.price * sitconnect.col;
	document.getElementById('summ').innerHTML = sum ,'руб.';
	return sum;
}

function area(){
	var up=0;
	for(var i=0;i<200;i++){
		for(var j=0;j<200;j++){
			if(maps[i][j].code!=0){
				up=i;
				i=300;
				break;
			}		
		}
	}
	var left=0;
	for(var i=0;i<200;i++){
		for(var j=0;j<200;j++){
			if(maps[j][i].code!=0){
				left=i;
				i=300;
				break;
			}		
		}
	}
	var bottom=0;
	for(var i=199;i>=0;i--){
		for(var j=199;j>=0;j--){
			if(maps[i][j].code!=0){
				bottom=i;
				i=0;
				break;
			}		
		}
	}
	var right=0;
	for(var j=199;j>=0;j--){
		for(var i=0;i<200;i++){
			if(maps[i][j].code!=0){
				right=j;
				j=0;
				break;
			}		
		}
	}
	console.log("up",up,"left",left,"botton",bottom,"right",right);
	//var width = ponton.width * ponton.col;
	//var height = ponton.height *ponton.col;
	var width = (right/2-left/2)+0.5;
	var height = ((bottom-up)+1)/2;
	document.getElementById('gabarites').innerHTML = width + ' x ' + height +' м.';
}

function quantity(){
	document.getElementById('shetpon').innerHTML = ponton.col;
	document.getElementById('connector').innerHTML = connector.col+sitconnect.col;
	document.getElementById('gangway').innerHTML = gangway.col;
	document.getElementById('stays').innerHTML = stays.col;
	document.getElementById('bench').innerHTML = bench.col;
	document.getElementById('duck').innerHTML = duck.col;
	document.getElementById('stairs').innerHTML = stairs.col;
}


function clearCanvas(){
	for(var i=0;i<200;i++){ 
        for(var j=0;j<200;j++){ 
        	maps[i][j].code=0;
        	maps[i][j].id=0;
        }
	} 
	document.getElementById('summ').innerHTML = '0 руб.';
	document.getElementById('gabarites').innerHTML =  '0,0 x 0,0 м.'; 
	document.getElementById('shetpon').innerHTML = 0 ;
	draw();
}

function isArrange(x,y,model,direction){
	var countX, countY;
	switch (model){
		case 1:
			switch (direction){
				case 0:case 2:x--;y-=2;countX=2;countY=4;break;
				case 1:case 3:x-=2;countX=4;countY=2;break;
			}
			break;
		case 2:
			switch (direction){
				case 0:case 2:x--;y-=2;countX=2;countY=4;break;
				case 1:x-=2;y--;countX=4;countY=2;break;
				case 3:x-=2;countX=4;countY=2;break;
			}
			console.log(x,y);
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
			if(maps[i][j].code!=0){ 
				return false;
			}
		}
	}
	return true;
}

function CutObjMaps(x,y){
	if(maps[y][x].code!=0){
		var ii=-1;
		var idM=maps[y][x].id;
		console.log(maps[y][x].code,maps[y][x].id);
		for(var i=0;i<200;i++){
			var f=true;
			var jj=0;
			for(var j=0;j<200;j++){
				if(idM==maps[i][j].id){
					if(f){
						ii++;
						mapsBuff[ii]=new Array();
					}
					f=false;
					mapsBuff[ii][jj]=new Object( {code:maps[i][j].code, id:maps[i][j].id,i:i,j:j} );
					switch(maps[i][j].code){
						case 555:case 556:case 557:case 558:
							stairs.col--;
							break;
						case 655:case 656:case 657:case 658:
							bench.col--;
							break;
						case 755:case 756:case 757:case 758:
							connector.col--;
							break;
						case 855:case 856:case 857:case 858:
							stays.col--;
							break;
						case 955:case 956:case 957:case 958:
							duck.col--;
							break;
					}
					jj++;
					maps[i][j]=new Object( {code:0, id:-1} );
				}
			}
		}	
	}
	sitconnect.col=0;
}

function PastObjMaps(x,y){
	var maxWidth=0;
	var startJ=0;
	for(var i=0;i<mapsBuff.length;i++){
		if(mapsBuff[i].length>maxWidth){
			maxWidth=mapsBuff[i].length
			startJ=mapsBuff[i][0].j;
		}
	}
	var xx=x;
	var yy=y;
	for(var i=0;i<mapsBuff.length;i++){
		var j=0;
		var xx=x;
		var s=startJ;
		while(j<mapsBuff[i].length){
			if(mapsBuff[i][j].j==s){
				if(maps[yy][xx].code!=0){
					return true;
				}
				j++;
			}
			xx++;
			s++;
		}
		yy++;
	}
	var xx=x;
	var yy=y;
	for(var i=0;i<mapsBuff.length;i++){
		var j=0;
		var xx=x;
		var s=startJ;
		while(j<mapsBuff[i].length){
			if(mapsBuff[i][j].j==s){
				maps[yy][xx].code=mapsBuff[i][j].code;
				maps[yy][xx].id=mapsBuff[i][j].id;
				switch(mapsBuff[i][j].code){
					case 555:case 556:case 557:case 558:
						stairs.col++;
						break;
					case 655:case 656:case 657:case 658:
						bench.col++;
						break;
					case 755:case 756:case 757:case 758:
						connector.col++;
						break;
					case 855:case 856:case 857:case 858:
						stays.col++;
						break;
					case 955:case 956:case 957:case 958:
						duck.col++;
						break;
				}
				j++;
			}
			xx++;
			s++;
		}
		yy++;
	}
	return false;
}

function canvasClick(evt){
	var x,y;
	x=Math.trunc((evt.offsetX)/(45+scale));
	y=Math.trunc((evt.offsetY)/(45+scale));
	if((isArrange(x,y,model,direction))||(model==3)||(model==7)||(model==4)||(model==6)){
		console.log("past");
		switch (model){
			case 0:
				if(mapsBuff.length==0){
					CutObjMaps(x,y);
				}else{
					if(!PastObjMaps(x,y)){
						mapsBuff=new Array();
					}
				}
				break;
			case 1:
				ponton.col++;
				switch (direction){
					case 0:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j].code=11;
								maps[i][j].id=id;
							}
						}
						switch (color){
							case 'red':maps[y][x].code=12;break;
							case 'blue':maps[y][x].code=1;break;
							case 'green':maps[y][x].code=13;break;
							case 'white':maps[y][x].code=14;break;
							case 'gray':maps[y][x].code=15;break;
						}
						id++;
						break;
					case 1:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j].code=11;
								maps[i][j].id=id;
							}
						}
						switch (color){
							case 'red':maps[y][x].code=-102;break;
							case 'blue':maps[y][x].code=-10;break;
							case 'green':maps[y][x].code=-103;break;
							case 'white':maps[y][x].code=-104;break;
							case 'gray':maps[y][x].code=-105;break;
						}
						id++;
						break;
					case 2:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j].code=11;
								maps[i][j].id=id;
							}
						}
						switch (color){
							case 'red':maps[y][x].code=-12;break;
							case 'blue':maps[y][x].code=-1;break;
							case 'green':maps[y][x].code=-13;break;
							case 'white':maps[y][x].code=-14;break;
							case 'gray':maps[y][x].code=-15;break;
						}
						id++;
						break;
					case 3:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j].code=11;
								maps[i][j].id=id;
							}
						}
						switch (color){
							case 'red':maps[y][x].code=102;break;
							case 'blue':maps[y][x].code=10;break;
							case 'green':maps[y][x].code=103;break;
							case 'white':maps[y][x].code=104;break;
							case 'gray':maps[y][x].code=105;break;
						}

						id++;
						break;
				}
				break;
			case 2:
				gangway.col++;
				switch (direction){
					case 0:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j].code=22;
								maps[i][j].id=id;
							}
						}
						maps[y][x].code=2;
						maps[y][x+1].code=1222;
						id++;
						break;
					case 1:
						x-=2;y--;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j].code=22;
								maps[i][j].id=id;
							}
						}

						maps[y+1][x].code=1222;
						maps[y][x].code=-20;

						id++;
						break;
					case 2:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j].code=22;
								maps[i][j].id=id;
							}
						}
						maps[y][x+1].code=1222;
						maps[y][x].code=-2;

						id++;
						break;
					case 3:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j].code=22;
								maps[i][j].id=id;
							}
						}
						maps[y+1][x].code=1222;
						maps[y][x].code=20;
						id++;
						break;
				}
				break;
			case 3:
				if(ArrangeStairs(x,y,direction,evt.offsetX,evt.offsetY)){
					stairs.col++;
				}
				break;
			case 4:
				if(ArrangeConnector(x,y,direction,evt.offsetX,evt.offsetY)){
					connector.col++;
				}
				break;
			case 5:
				if(ArrangeRack(x,y,direction,evt.offsetX,evt.offsetY)){
					stays.col++;
				}
				break;
			case 6:
				if(ArrangeBench(x,y,direction,evt.offsetX,evt.offsetY)){
					bench.col++;
				}
				break;
			case 7:
				if(ArrangeDuck(x,y,direction,evt.offsetX,evt.offsetY)){	
					duck.col++;
				}
				break;
		}
	}
	sum();
	area();
	draw();
	quantity();
}

function canvasMoveMouse(evt){
	draw();
	var x,y;
	x=Math.trunc((evt.offsetX)/(45+scale))*(45+scale);
	y=Math.trunc((evt.offsetY)/(45+scale))*(45+scale);
	switch (model){
		case 1:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/photo-objects-png/ponton/blue-opacity.png';imgMouse.src = 'img/pontoonbutton.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			switch (direction){
				case 0:case 2:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0+(45+scale), 0+(45+scale)*2, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 1:case 3:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgGhost, 0, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*5, 0, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
			} 
			break;
		case 2:
			
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/photo-objects-png/skhodnya/skhodnya_blue_ghost.png';imgMouse.src = 'img/photo-objects-png/skhodnya/skhodnya_blue.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			switch (direction){
				case 0:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(0*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*3, 0-(45+scale)*6, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 2:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0+(45+scale), 0+(45+scale)*2, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 1:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0+(45+scale)*3,0-(45+scale)*4, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
				case 3:
					if(isArrange(x/(45+scale),y/(45+scale),model,direction)){
						ctx.save();
						ctx.translate(x,y);
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgGhost, 0, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						ctx.restore();
					}
					ctx.save();
					ctx.translate(evt.offsetX+((45+scale)*4/2),evt.offsetY+((45+scale)*8/2));
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*5, 0, (45+scale)*2, (45+scale)*4);
					ctx.restore();
					break;
			} 
			break;
		case 3:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/photo-objects-png/stairs/stairs-blue-ghost.png';imgMouse.src = 'img/photo-objects-png/stairs/stairs-blue.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			ArrangeStairsGhost(x,y,evt.offsetX,evt.offsetY);
			switch (direction){
				case 0:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale+15)/2, 0-(45+scale+15), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					ArrangeStairsGhost(x,y,evt.offsetX,evt.offsetY);
					break;
				case 2:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale+15)+(45+scale)/2, 0-(45+scale+15), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 1:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale),0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 3:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale+15), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
			} 
			break;
		case 4:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/connector-ghost.png';imgMouse.src = 'img/connector.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			ArrangeConnectorGhost(x,y,direction,evt.offsetX,evt.offsetY);
			switch (direction){
				case 2:case 0:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 3:case 1:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)+(45+scale)/2,0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
			} 
			break;
		case 5:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/rack_ghost.png';imgMouse.src = 'img/rack.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			ArrangeRackGhost(x,y,direction,evt.offsetX,evt.offsetY);
			switch (direction){
				case 0:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)+(45+scale)/2,0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 2:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 3:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
			} 
			break;
		case 6:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/bench-ghost.png';imgMouse.src = 'img/bench.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			ArrangeBenchGhost(x,y,direction,evt.offsetX,evt.offsetY);
			switch (direction){
				case 0:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale+15)/2, 0-(45+scale+15), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
				case 2:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale+15)+(45+scale)/2, 0-(45+scale+15), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
				case 1:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale),0-(45+scale), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
				case 3:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale+15), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
			} 
			break;
		case 7:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/connector-ghost.png';imgMouse.src = 'img/connector.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			ArrangeConnectorGhost(x,y,direction,evt.offsetX,evt.offsetY);
			switch (direction){
				case 2:case 0:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 3:case 1:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)+(45+scale)/2,0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
			} 
			break;
	}
}

function ArrangeDuck(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				maps[y-1][x].code=957;
				maps[y-1][x].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=955;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						maps[y][x+1].code=956;
						maps[y][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=955;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					maps[y][x+1].code=956;
					maps[y][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			maps[y+1][x].code=958;
		 			maps[y+1][x].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				maps[y-1][x].code=957;
				maps[y-1][x].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=955;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						maps[y][x+1].code=956;
						maps[y][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=955;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					maps[y][x+1].code=956;
					maps[y][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==10)||(maps[y-4][x].code==-10)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			maps[y+1][x].code=958;
		 			maps[y+1][x].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					maps[y-1][x].code=957;
					maps[y-1][x].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y-1][x].code=957;
					maps[y-1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					maps[y][x-1].code=955;
					maps[y][x-1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y][x-1].code=955;
					maps[y][x-1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					maps[y+1][x].code=958;
					maps[y+1][x].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y+1][x].code=958;
					maps[y+1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					maps[y][x+1].code=956;
					maps[y][x+1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y][x+1].code=956;
					maps[y][x+1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	return false;
}

function ArrangeRackGhost(x,y,direction,mX,mY){
	var xx=x;
	var yy=y;
	x/=(45+scale);
	y/=(45+scale);
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				ctx.save();//857
				ctx.translate(xx,yy);
				ctx.rotate(90*Math.PI/180);
				ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
				ctx.restore();
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();//855
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0, (45+scale), (45+scale));
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						ctx.save();//856
						ctx.translate(xx,yy);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
						ctx.restore();
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();//855
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0, (45+scale), (45+scale));
					ctx.restore();
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					ctx.save();//856
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
					ctx.restore();
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			ctx.save();//858
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2,0, (45+scale), (45+scale));
					ctx.restore();
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				ctx.save();//857
				ctx.translate(xx,yy);
				ctx.rotate(90*Math.PI/180);
				ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
				ctx.restore();
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();//855
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0, (45+scale), (45+scale));
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						ctx.save();//856
						ctx.translate(xx,yy);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
						ctx.restore();
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();//855
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0, (45+scale), (45+scale));
					ctx.restore();
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					ctx.save();//856
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
					ctx.restore();
				}
			}else{
				if(((maps[y-4][x].code==10)||(maps[y-4][x].code==-10)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			ctx.save();//858
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2,0, (45+scale), (45+scale));
					ctx.restore();
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					ctx.save();//857
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();//857
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					ctx.save();//855
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();//855
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)/2, 0, (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					ctx.save();//858
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2,0, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();//858
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2,0, (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					ctx.save();//856
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();//856
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale)*2+(45+scale)/2, 0-(45+scale), (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
	return false;
}

function ArrangeRack(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				maps[y-1][x].code=857;
				maps[y-1][x].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=855;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						maps[y][x+1].code=856;
						maps[y][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=855;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					maps[y][x+1].code=856;
					maps[y][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			maps[y+1][x].code=858;
		 			maps[y+1][x].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				maps[y-1][x].code=857;
				maps[y-1][x].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=855;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						maps[y][x+1].code=856;
						maps[y][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=855;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					maps[y][x+1].code=856;
					maps[y][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==10)||(maps[y-4][x].code==-10)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			maps[y+1][x].code=858;
		 			maps[y+1][x].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					maps[y-1][x].code=857;
					maps[y-1][x].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y-1][x].code=857;
					maps[y-1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					maps[y][x-1].code=855;
					maps[y][x-1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y][x-1].code=855;
					maps[y][x-1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					maps[y+1][x].code=858;
					maps[y+1][x].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y+1][x].code=858;
					maps[y+1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					maps[y][x+1].code=856;
					maps[y][x+1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y][x+1].code=856;
					maps[y][x+1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	return false;
}

function ArrangeConnector(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				maps[y-1][x].code=757;
				maps[y-1][x].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=755;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						maps[y][x+1].code=756;
						maps[y][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=755;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					maps[y][x+1].code=756;
					maps[y][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			maps[y+1][x].code=758;
		 			maps[y+1][x].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				maps[y-1][x].code=757;
				maps[y-1][x].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=755;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						maps[y][x+1].code=756;
						maps[y][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					maps[y][x-1].code=755;
					maps[y][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					maps[y][x+1].code=756;
					maps[y][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==10)||(maps[y-4][x].code==-10)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			maps[y+1][x].code=758;
		 			maps[y+1][x].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}
	if((maps[y][x]==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					maps[y-1][x].code=757;
					maps[y-1][x].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y-1][x].code=757;
					maps[y-1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					maps[y][x-1].code=755;
					maps[y][x-1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y][x-1].code=755;
					maps[y][x-1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					maps[y+1][x].code=758;
					maps[y+1][x].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y+1][x].code=758;
					maps[y+1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					maps[y][x+1].code=756;
					maps[y][x+1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y][x+1].code=756;
					maps[y][x+1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	return false;
}

function ArrangeConnectorGhost(x,y,direction,mX,mY){
	var xx=x;
	var yy=y;
	x/=(45+scale);
	y/=(45+scale);
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				ctx.save();//57 58
				ctx.translate(xx,yy);
				ctx.rotate(0*Math.PI/180);
				ctx.drawImage(imgGhost, 0,0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
				ctx.restore();

			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						ctx.save();// 55 56
						ctx.translate(xx,yy);
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0+(45+scale)/2, (45+scale), (45+scale));
						ctx.restore();
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			ctx.save();//57 58
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0,0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1].code==11)||(maps[y][x+1].code==11))&&(maps[y+1][x].code==11)){
				ctx.save();//57 58
				ctx.translate(xx,yy);
				ctx.rotate(0*Math.PI/180);
				ctx.drawImage(imgGhost, 0,0-(45+scale)+(45+scale)/2, (45+scale), (45+scale));
				ctx.restore();
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
						ctx.save();// 55 56
						ctx.translate(xx,yy);
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0+(45+scale)/2, (45+scale), (45+scale));
						ctx.restore();
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y-1][x].code==11)||(maps[y-1][x].code==1)||(maps[y-1][x].code==-1)||(maps[y-1][x].code==10)||(maps[y-1][x].code==-10))&&(maps[y][x-1].code==0)){
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&((maps[y-1][x].code==11)||(maps[y+1][x].code==11))&&(maps[y][x+1].code==0)){
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
				}
			}else{
				if(((maps[y-4][x].code==10)||(maps[y-4][x].code==-10)||((maps[y][x].code==11)&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))))&&((maps[y][x+1].code==11)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==0)){
		 			ctx.save();//57 58
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0,0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					ctx.save();//57 
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0,0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();//57 
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0,0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					ctx.save();//57 58
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0,0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();//57 58
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0,0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
				case 1222:
					ctx.save();// 55 56
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0+(45+scale)/2, (45+scale), (45+scale));
					ctx.restore();
					break;
			}
		}
	}
}

function ArrangeStairsGhost(x,y,mX,mY){
	var xx=x;
	var yy=y;
	x/=(45+scale);
	y/=(45+scale);
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				ctx.save();//557
				ctx.translate(xx,yy);
				ctx.rotate(180*Math.PI/180);
				ctx.drawImage(imgGhost, 0-(45+scale)*2, 0-(45+scale), (45+scale)+15, (45+scale)+15);
				ctx.restore();
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					ctx.save();//555
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						ctx.save();//556
						ctx.translate(xx,yy);
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgGhost,0-(45+scale)*2, 0, (45+scale)+15, (45+scale)+15);
						ctx.restore();
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==1)||(maps[y][x-1].code==-1))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					ctx.save();//555
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==199)||(maps[y+2][x].code!=-658))){
					ctx.save();//556
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost,0-(45+scale)*2, 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-656)){
		 			ctx.save();//558
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();

		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				ctx.save();//557
				ctx.translate(xx,yy);
				ctx.rotate(180*Math.PI/180);
				ctx.drawImage(imgGhost, 0-(45+scale)*2, 0-(45+scale), (45+scale)+15, (45+scale)+15);
				ctx.restore();
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=657))&&((y==0)||(maps[y-1][x].code!=557))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					ctx.save();//555
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						ctx.save();//556
						ctx.translate(xx,yy);
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgGhost,0-(45+scale)*2, 0, (45+scale)+15, (45+scale)+15);
						ctx.restore();
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==10)||(maps[y][x-1].code==-10))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					ctx.save();//555
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-658))){
					ctx.save();//556
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost,0-(45+scale)*2, 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();
				}
			}else{
				if((((maps[y-4][x].code==10)||(maps[y-4][x].code==-10))&&(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-656)){
		 			ctx.save();//558
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					ctx.save();//557
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale)*2, 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//557
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					ctx.save();//555
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//555
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost,0-(45+scale), 0-(45+scale), (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					ctx.save();//558
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost,0, 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//558
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost,0-(45+scale), 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					ctx.save();//556
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost,0-(45+scale)*2, 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//556
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost,0-(45+scale), 0, (45+scale)+15, (45+scale)+15);
					ctx.restore();
					break;
			}
		}
	}
}

function ArrangeStairs(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				maps[y-1][x].code=557;
				maps[y-1][x].id=maps[y][x].id;
				maps[y-1][x+1].id=maps[y][x].id;
				maps[y-1][x+1].code=-557;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					maps[y][x-1].code=555;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					maps[y+1][x-1].code=-555;
					return true;
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						maps[y][x+1].code=556;
						maps[y][x+1].id=maps[y][x].id;
						maps[y+1][x+1].id=maps[y][x].id;
						maps[y+1][x+1].code=-556;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==1)||(maps[y][x-1].code==-1))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					maps[y][x-1].code=555;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					maps[y+1][x-1].code=-555;
					return true;
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==199)||(maps[y+2][x].code!=-658))){
					maps[y][x+1].code=556;
					maps[y][x+1].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					maps[y+1][x+1].code=-556;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-656)){
		 			maps[y+1][x].code=558;
		 			maps[y+1][x].id=maps[y][x].id;
		 			maps[y+1][x+1].id=maps[y][x].id;
		 			maps[y+1][x+1].code=-558;
		 			return true;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				maps[y-1][x].code=557;
				maps[y-1][x].id=maps[y][x].id;
				maps[y-1][x+1].id=maps[y][x].id;
				maps[y-1][x+1].code=-557;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=657))&&((y==0)||(maps[y-1][x].code!=557))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					maps[y][x-1].code=555;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					maps[y+1][x-1].code=-555;
					return true;
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						maps[y][x+1].code=556;
						maps[y][x+1].id=maps[y][x].id;
						maps[y][x+1].id=maps[y][x].id;
						maps[y+1][x+1].code=-556;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==10)||(maps[y][x-1].code==-10))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					maps[y][x-1].code=555;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					maps[y+1][x-1].code=-555;
					return true;
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-658))){
					maps[y][x+1].code=556;
					maps[y][x+1].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					maps[y+1][x+1].code=-556;
					return true;
				}
			}else{
				if((((maps[y-4][x].code==10)||(maps[y-4][x].code==-10))&&(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-656)){
		 			maps[y+1][x].code=558;
		 			maps[y+1][x].id=maps[y][x].id;
		 			maps[y+1][x+1].id=maps[y][x].id;
		 			maps[y+1][x+1].code=-558;
		 			return true;
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					maps[y-1][x].code=557;
					maps[y-1][x].id=maps[y][x].id;
					maps[y-1][x+1].id=maps[y][x].id;
					maps[y-1][x+1].code=-557;
					return true;
					break;
				case 1222:
					maps[y-1][x-1].code=557;
					maps[y-1][x-1].id=maps[y][x].id;
					maps[y-1][x].id=maps[y][x].id;
					maps[y-1][x].code=-557;
					return true;
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					maps[y][x-1].code=555;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					maps[y+1][x-1].code=-555;
					return true;
					break;
				case 1222:
					maps[y-1][x-1].code=555;
					maps[y-1][x-1].id=maps[y][x].id;
					maps[y][x-1].id=maps[y][x].id;
					maps[y][x-1].code=-555;
					return true;
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					maps[y+1][x].code=558;
					maps[y+1][x].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					maps[y+1][x+1].code=-558;
					return true;
					break;
				case 1222:
					maps[y+1][x-1].code=558;
					maps[y+1][x-1].id=maps[y][x].id;
					maps[y+1][x].id=maps[y][x].id;
					maps[y+1][x].code=-558;
					return true;
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					maps[y][x+1].code=556;
					maps[y][x+1].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					maps[y+1][x+1].code=-556;
					return true;
					break;
				case 1222:
					maps[y-1][x+1].code=556;
					maps[y-1][x+1].id=maps[y][x].id;
					maps[y][x+1].id=maps[y][x].id;
					maps[y][x+1].code=-556;
					return true;
					break;
			}
		}
	}
	return false;
}

function ArrangeBench(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				maps[y-1][x].code=657;
				maps[y-1][x+1].code=-657;
				maps[y-1][x].id=maps[y][x].id;
				maps[y-1][x+1].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					maps[y][x-1].code=655;
					maps[y+1][x-1].code=-655;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						maps[y][x+1].code=656;
						maps[y+1][x+1].code=-656;
						maps[y][x+1].id=maps[y][x].id;
						maps[y+1][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==1)||(maps[y][x-1].code==-1))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					maps[y][x-1].code=655;
					maps[y+1][x-1].code=-655;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==199)||(maps[y+2][x].code!=-658))){
					maps[y][x+1].code=656;
					maps[y+1][x+1].code=-656;
					maps[y][x+1].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-656)){
		 			maps[y+1][x].code=658;
		 			maps[y+1][x+1].code=-658;
		 			maps[y+1][x].id=maps[y][x].id;
		 			maps[y+1][x+1].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				maps[y-1][x].code=657;
				maps[y-1][x+1].code=-657;
				maps[y-1][x].id=maps[y][x].id;
				maps[y-1][x+1].id=maps[y][x].id;
				return true;
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=657))&&((y==0)||(maps[y-1][x].code!=557))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					maps[y][x-1].code=655;
					maps[y+1][x-1].code=-655;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					return true;
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						maps[y][x+1].code=656;
						maps[y+1][x+1].code=-656;
						maps[y][x+1].id=maps[y][x].id;
						maps[y+1][x+1].id=maps[y][x].id;
						return true;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==10)||(maps[y][x-1].code==-10))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					maps[y][x-1].code=655;
					maps[y+1][x-1].code=-655;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					return true;
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-658))){
					maps[y][x+1].code=656;
					maps[y+1][x+1].code=-656;
					maps[y][x+1].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					return true;
				}
			}else{
				if((((maps[y-4][x].code==10)||(maps[y-4][x].code==-10))&&(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-656)){
		 			maps[y+1][x].code=658;
		 			maps[y+1][x+1].code=-658;
		 			maps[y+1][x].id=maps[y][x].id;
		 			maps[y+1][x+1].id=maps[y][x].id;
		 			return true;
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					maps[y-1][x].code=657;
					maps[y-1][x+1].code=-657;
					maps[y-1][x].id=maps[y][x].id;
					maps[y-1][x+1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y-1][x-1].code=657;
					maps[y-1][x].code=-657;
					maps[y-1][x-1].id=maps[y][x].id;
					maps[y-1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					maps[y][x-1].code=655;
					maps[y+1][x-1].code=-655;
					maps[y][x-1].id=maps[y][x].id;
					maps[y+1][x-1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y-1][x-1].code=655;
					maps[y][x-1].code=-655;
					maps[y-1][x-1].id=maps[y][x].id;
					maps[y][x-1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					maps[y+1][x].code=658;
					maps[y+1][x+1].code=-658;
					maps[y+1][x].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y+1][x-1].code=658;
					maps[y+1][x].code=-658;
					maps[y+1][x-1].id=maps[y][x].id;
					maps[y+1][x].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					maps[y][x+1].code=656;
					maps[y+1][x+1].code=-655;
					maps[y][x+1].id=maps[y][x].id;
					maps[y+1][x+1].id=maps[y][x].id;
					return true;
					break;
				case 1222:
					maps[y-1][x+1].code=655;
					maps[y][x+1].code=-655;
					maps[y-1][x+1].id=maps[y][x].id;
					maps[y][x+1].id=maps[y][x].id;
					return true;
					break;
			}
		}
	}
	return false;
}

function ArrangeBenchGhost(x,y,direction,mX,mY){
	x/=(45+scale);
	y/=(45+scale);
	var xx=x*(45+scale);
	var yy=y*(45+scale);
	if(((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=11))&&((y<1)||(maps[y][x-2].code!=1))&&((y<1)||(maps[y][x-2].code!=-1))&&((y<1)||(maps[y][x-2].code!=-10))&&((y<1)||(maps[y][x-2].code!=10))&&((y<1)||(maps[y][x-2].code!=2))&&((y<1)||(maps[y][x-2].code!=-2))&&((y<1)||(maps[y][x-2].code!=-20))&&((y<1)||(maps[y][x-2].code!=20))&&((y<1)||(maps[y][x-2].code!=22))&&((y<1)||(maps[y][x+2].code!=11))&&((y>198)||(maps[y][x+2].code!=1))&&((y>198)||(maps[y][x+2].code!=-1))&&((y>198)||(maps[y][x+2].code!=-10))&&((y>198)||(maps[y][x+2].code!=10))&&((y>198)||(maps[y][x+2].code!=2))&&((y>198)||(maps[y][x+2].code!=-2))&&((y>198)||(maps[y][x+2].code!=-20))&&((y>198)||(maps[y][x+2].code!=20))&&((y>198)||(maps[y][x+2].code!=22))){
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				ctx.save();//657
				ctx.translate(xx,yy);
				ctx.rotate(90*Math.PI/180);
				ctx.drawImage(imgGhost, 0, 0-(45+scale)*2, (45+scale), (45+scale)*2);
				ctx.restore();
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					ctx.save();//655
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0, (45+scale), (45+scale)*2);
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						ctx.save();//656
						ctx.translate(xx,yy);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale), (45+scale)*2);
						ctx.restore();

					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==1)||(maps[y][x-1].code==-1))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					ctx.save();//655
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0, (45+scale), (45+scale)*2);
					ctx.restore();
				}
				if(((maps[y][x-1].code==1)||(maps[y][x-1].code==-1)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==199)||(maps[y+2][x].code!=-658))){
					ctx.save();//656
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale), (45+scale)*2);
					ctx.restore();
				}
			}else{
				if(((maps[y-4][x].code==1)||(maps[y-4][x].code==-1)||(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-656)){
		 			ctx.save();//658
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale),0, (45+scale), (45+scale)*2);
					ctx.restore();
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x].code==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1].code==11)&&(maps[y+1][x].code==11)&&(maps[y-1][x+1].code==0)&&(maps[y][x-1].code!=555)&&(maps[y][x+2].code!=556)&&(maps[y][x-1].code!=655)&&(maps[y][x+2].code!=656)){
				ctx.save();//657
				ctx.translate(xx,yy);
				ctx.rotate(90*Math.PI/180);
				ctx.drawImage(imgGhost, 0, 0-(45+scale)*2, (45+scale), (45+scale)*2);
				ctx.restore();
			}else{
				if((maps[y][x+1].code==11)&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=657))&&((y==0)||(maps[y-1][x].code!=557))&&(maps[y+2][x].code!=558)&&(maps[y+2][x].code!=658)){
					ctx.save();//655
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0, (45+scale), (45+scale)*2);
					ctx.restore();
				}else{
					if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&(maps[y-1][x].code!=-557)&&(maps[y+2][x].code!=-558)&&(maps[y-1][x].code!=-657)&&(maps[y+2][x].code!=-658)){
						ctx.save();//656
						ctx.translate(xx,yy);
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale), (45+scale)*2);
						ctx.restore();
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x].code!=0)||(maps[y+1][x].code!=0))&&(maps[y+1][x].code!=0)){
				if(((maps[y][x+1].code==11)||(maps[y-1][x].code==10)||(maps[y][x-1].code==-10))&&((maps[y+1][x].code==11)||(maps[y+1][x].code==1)||(maps[y+1][x].code==-1)||(maps[y+1][x].code==10)||(maps[y+1][x].code==-10))&&(maps[y+1][x-1].code==0)&&(maps[y][x-1].code==0)&&(maps[y+1][x-1].code==0)&&((y==0)||(maps[y-1][x].code!=557))&&((y==0)||(maps[y-1][x].code!=657))&&((y==199)||(maps[y+2][x].code!=558))&&((y==199)||(maps[y+2][x].code!=658))){
					ctx.save();//655
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0, (45+scale), (45+scale)*2);
					ctx.restore();
				}
				if(((maps[y][x-1].code==10)||(maps[y][x-1].code==-10)||(maps[y][x-1].code==11))&&(maps[y+1][x].code==11)&&(maps[y][x+1].code==0)&&(maps[y+1][x+1].code==0)&&((y==0)||(maps[y-1][x].code!=-557))&&((y==199)||(maps[y+2][x].code!=-558))&&((y==0)||(maps[y-1][x].code!=-657))&&((y==199)||(maps[y+2][x].code!=-658))){
					ctx.save();//656
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale), (45+scale)*2);
					ctx.restore();
				}
			}else{
				if((((maps[y-4][x].code==10)||(maps[y-4][x].code==-10))&&(maps[y][x+1].code==11))&&(maps[y][x+1].code==11)&&(maps[y+1][x+1].code==0)&&(maps[y+1][x].code==0)&&(maps[y][x-1].code!=-555)&&(maps[y][x-1].code!=-556)&&(maps[y][x-1].code!=-655)&&(maps[y][x-1].code!=-656)){
		 			ctx.save();//658
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale),0, (45+scale), (45+scale)*2);
					ctx.restore();
		 		}
			}
		}	
	}
	if((maps[y][x].code==2)||((maps[y][x].code==1222)&&(maps[y][x-1].code==2))){
		if((y>0)&&(maps[y-1][x].code==0)){
			switch (maps[y][x].code){
				case 2:
					ctx.save();//657
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0-(45+scale)*2, (45+scale), (45+scale)*2);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//657
					ctx.translate(xx,yy);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0-(45+scale), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x].code==-20)||((maps[y][x].code==1222)&&(maps[y-1][x].code==-20))){
		if((x>0)&&(maps[y][x-1].code==0)){
			switch (maps[y][x].code){
				case -20:
					ctx.save();//655
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0, (45+scale), (45+scale)*2);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//655
					ctx.translate(xx,yy);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgGhost, 0, 0-(45+scale), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y-3][x].code==-2)||((maps[y-3][x].code==1222)&&(maps[y-3][x-1].code==-2))){
		if((y<199)&&(maps[y+1][x].code==0)){
			switch (maps[y-3][x].code){
				case -2:
					ctx.save();//658
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale),0, (45+scale), (45+scale)*2);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//658
					ctx.translate(xx,yy);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale),0-(45+scale), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
			}
		}
	}
	if((maps[y][x-3].code==20)||((maps[y][x-3].code==1222)&&(maps[y-1][x-3].code==20))){
		if((x<199)&&(maps[y][x+1].code==0)){
			switch (maps[y][x-3].code){
				case 20:
					ctx.save();//656
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale)*2, (45+scale), (45+scale)*2);
					ctx.restore();
					break;
				case 1222:
					ctx.save();//656
					ctx.translate(xx,yy);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(imgGhost, 0-(45+scale), 0-(45+scale), (45+scale), (45+scale)*2);
					ctx.restore();
					break;
			}
		}
	}
}

function rot(id){
	var getr = document.getElementById(id);
	if (getr.style.WebkitTransform == "rotate(-90deg)")
		getr.style.WebkitTransform = "rotate(-180deg)"
	else
		if (getr.style.WebkitTransform == "rotate(-180deg)")
			getr.style.WebkitTransform = "rotate(-270deg)"
		else
			if (getr.style.WebkitTransform == "rotate(-270deg)")
				getr.style.WebkitTransform = "rotate(0deg)"
			else
				getr.style.WebkitTransform = "rotate(-90deg)";
	return false;
}

function deleteObjectFromMouse(){
	mapsBuff=new Array();
	model=0;
	draw();
}

function draw(){ 
	ctx.clearRect(0, 0, width, height); 
	var sizeX=45+scale; 
	var sizeY=45+scale; 
	var iStart=Math.trunc(scrollCanvas.scrollTop/(45+scale));
	var jStart=Math.trunc(scrollCanvas.scrollLeft/(45+scale));
	var iEnd=Math.trunc((scrollCanvas.clientHeight+scrollCanvas.scrollTop)/(45+scale));
	var jEnd=Math.trunc((scrollCanvas.clientWidth+scrollCanvas.scrollLeft)/(45+scale));
	sitconnect.col=0;
	for(var i=iStart-10;i<iEnd+10;i++){
		for(var j=jStart-10;j<jEnd+10;j++){
			if((i>=0)&&(j>=0)&&(i<200)&&(j<200)){
				if(maps[i][j].code!=0){
					ctx.save();
					ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
				}
				switch(maps[i][j].code){
					case 11:break;
					case 0:
						if(visibleWeb){
							ctx.beginPath();
							ctx.strokeStyle = "#FFFFFF";
							ctx.strokeRect(sizeX*j, sizeY*i, sizeX, sizeY); 
							ctx.stroke(); 
						}
						break;
					case 1:case -1: 
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMapsPonton, 0, 0, (45+scale)*2, (45+scale)*4);
						if((j>0)&&(maps[i][j-1].code==555)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0+(45+scale), (45+scale)+15, (45+scale)+15);
						}
						if((i>0)&&(maps[i-1][j].code==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}
						if((j>0)&&(maps[i][j-1].code==655)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(0*Math.PI/180);
							ctx.drawImage(imgMapsBench, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale), (45+scale)*2);
						}
						if((i>0)&&(maps[i-1][j].code==657)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsBench, 0-(45+scale)*4, 0, (45+scale), (45+scale)*2);
						}
						break;
					case 10:case -10: 
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgMapsPonton, 0-(45+scale)*4, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						if((j>0)&&(maps[i][j-1].code==555)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0+(45+scale), (45+scale)+15, (45+scale)+15);
						}
						if((i>0)&&(maps[i+1][j].code==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}
						if((j>0)&&(maps[i][j-1].code==655)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(0*Math.PI/180);
							ctx.drawImage(imgMapsBench, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale), (45+scale)*2);
						}
						if((i>0)&&(maps[i+1][j].code==657)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsBench, 0-(45+scale)*4, 0, (45+scale), (45+scale)*2);
						}
						break;
					case 12:case -12: imgMaps.src = 'img/pontoon-redbutton.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 102:case -102:imgMaps.src = 'img/pontoon-redbutton.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 13:case -13: imgMaps.src = 'img/pontoon-green.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 103:case -103:imgMaps.src = 'img/pontoon-green.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 14:case -14: imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 104:case -104:imgMaps.src = 'img/pontoonbutton.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 15:case -15: imgMaps.src = 'img/pontoon-gray.png'; ctx.rotate(180*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*4, (45+scale)*8);break;
					case 105:case -105:imgMaps.src = 'img/pontoon-gray.png'; ctx.rotate(90*Math.PI/180);ctx.drawImage(imgMaps, 0-(45+scale)*4, 0-(45+scale)*6, (45+scale)*4, (45+scale)*8);break;
					case 2:   
						ctx.rotate(0*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale)*2, (45+scale)*4);
						if((i>0)&&(maps[i-1][j].code==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}

						if((i>0)&&(maps[i-1][j].code==657)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsBench, 0-(45+scale)*4, 0, (45+scale), (45+scale)*2);
						}
						break;
					case -2:  
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0, 0, (45+scale)*2, (45+scale)*4);
						break;
					case 20:   
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0-(45+scale)*4, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						if((j>0)&&(maps[i][j-1].code==555)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0+(45+scale), (45+scale)+15, (45+scale)+15);
						}
						break;
					case -20: 
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgMapsSkhodnya, 0+(45+scale)*2, 0-(45+scale)*2, (45+scale)*2, (45+scale)*4);
						break;	
					case 4:   imgMaps.src = 'img/test4.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -4:  imgMaps.src = 'img/test4Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 40:  imgMaps.src = 'img/test4Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -40: imgMaps.src = 'img/test4Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case 5:   imgMaps.src = 'img/test5.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -5:  imgMaps.src = 'img/test5Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 50:  imgMaps.src = 'img/test5Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -50: imgMaps.src = 'img/test5Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case 6:   imgMaps.src = 'img/test6.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -6:  imgMaps.src = 'img/test6Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 60:  imgMaps.src = 'img/test6Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -60: imgMaps.src = 'img/test6Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case 7:   imgMaps.src = 'img/test7.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case -7:  imgMaps.src = 'img/test7Up.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX, sizeY*2);break;
					case 70:  imgMaps.src = 'img/test7Right.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
					case -70: imgMaps.src = 'img/test7Left.png'; ctx.drawImage(imgMaps, sizeX*j, sizeY*i, sizeX*2, sizeY);break;
				}
				if(maps[i][j].code!=0){
					ctx.restore();
				}
			}
		}
	}
	for(var i=iStart-10;i<iEnd+10;i++){
		for(var j=jStart-10;j<jEnd+10;j++){
			if((i>=0)&&(j>=0)&&(i<200)&&(j<200)){
				if(maps[i][j].code!=0){
					ctx.save();
					ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
				}
				switch(maps[i][j].code){
					case 1:case -1:
 						imgMaps.src = 'img/connector.png';
						for (var ii=i;ii<i+4;ii++){
							if((j>0)&&(maps[ii][j-1].code==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((j>3)&&(((maps[ii][j-4].code==20)||(maps[ii][j-4].code==1222))&&((maps[ii+1][j-4].code==20)||(maps[ii+1][j-4].code==1222)||(maps[ii-1][j-4].code==1222)||(maps[ii-1][j-4].code==20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j+2].code==-20)||(maps[ii][j+2].code==1222))&&((maps[ii+2][j+1].code==-20)||(maps[ii+1][j+2].code==1222)||(maps[ii-1][j+2].code==1222)||(maps[ii-1][j+2].code==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+2),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}

						}
						for (var jj=j;jj<j+2;jj++){
							if((i>0)&&(maps[i-1][jj].code==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i>3)&&(((maps[i-4][jj].code==-2)||(maps[i-4][jj].code==1222))&&((maps[i-4][jj-1].code==-2)||(maps[i-4][jj-1].code==1222)||(maps[i-4][jj+1].code==1222)||(maps[i-4][jj+1].code==-2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i<199)&&(((maps[i+4][jj].code==2)||(maps[i+4][jj].code==1222))&&((maps[i+4][jj-1].code==2)||(maps[i+4][jj-1].code==1222)||(maps[i+4][jj+1].code==1222)||(maps[i+4][jj+1].code==2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*(i+4));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
						}
						break;
					case 10:case -10: 
						imgMaps.src = 'img/connector.png';
						for (var ii=i;ii<i+2;ii++){
							if((j>0)&&(maps[ii][j-1].code==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j+4].code==-20)||(maps[ii][j+4].code==1222))&&((maps[ii+2][j+4].code==-20)||(maps[ii+1][j+4].code==1222)||(maps[ii-1][j+4].code==1222)||(maps[ii-1][j+4].code==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+4),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j-4].code==20)||(maps[ii][j-4].code==1222))&&((maps[ii+2][j-4].code==20)||(maps[ii+1][j-4].code==1222)||(maps[ii-1][j-4].code==1222)||(maps[ii-1][j-4].code==20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
						}
						for (var jj=j;jj<j+4;jj++){
							if((i>0)&&(maps[i-1][jj].code==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((i<198)&&(((maps[i+2][jj].code==2)||((maps[i+2][jj].code==1222)&&(maps[i+2][jj-1].code==2)))&&((maps[i+2][jj-1].code==2)||(maps[i+2][jj-1].code==1222)||(maps[i+2][jj+1].code==1222)||(maps[i+2][jj+1].code==2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j+1)),sizeY*(i+2));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i<199)&&(i>3)&&(((maps[i-4][jj].code==-2)||((maps[i-4][jj].code==1222)&&(maps[i-4][jj-1].code==-2)))&&((maps[i-4][jj-1].code==-2)||(maps[i-4][jj-1].code==1222)||(maps[i-4][jj+1].code==1222)||(maps[i-4][jj+1].code==-2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*(i));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
						}
						break;						
					case -2:
						imgMaps.src = 'img/connector.png';
						for (var jj=j;jj<j+2;jj++){
							if((i<195)&&((maps[i+4][jj].code==2)||((maps[i+4][jj].code==1222)&&(maps[i+4][jj-1].code==2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j+1)),sizeY*(i+4));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
						}
						break;						
					case 20:
						imgMaps.src = 'img/connector.png';
						for (var ii=i;ii<i+2;ii++){
							if((j<195)&&((maps[ii][j+4].code==-20)||((maps[ii][j+4].code==1222)&&(maps[ii-1][j+4].code==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+4),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
						}
						break;
						
					case 555:
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0, (45+scale)+15, (45+scale)+15);
						break;
					case 556:
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0+(45+scale)*2, 0-(45+scale)*3, (45+scale)+15, (45+scale)+15);
						break;
					case 558:
						ctx.rotate(0*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0-(45+scale)*2, 0-(45+scale)*5, (45+scale)+15, (45+scale)+15);
						break;
					case 557:
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*2, (45+scale)+15, (45+scale)+15);
						break;

					case 655:
						ctx.rotate(0*Math.PI/180);
						ctx.drawImage(imgMapsBench, 0-(45+scale), 0-(45+scale)*4, (45+scale), (45+scale)*2);
						break;
					case 656:
						ctx.rotate(180*Math.PI/180);
						ctx.drawImage(imgMapsBench, 0+(45+scale)*2, 0+(45+scale)*2, (45+scale), (45+scale)*2);
						break;
					case 658:
						ctx.rotate(270*Math.PI/180);
						ctx.drawImage(imgMapsBench, 0+(45+scale)*4, 0-(45+scale)*2, (45+scale), (45+scale)*2);
						break;
					case 657:
						ctx.rotate(90*Math.PI/180);
						ctx.drawImage(imgMapsBench, 0-(45+scale)*3, 0, (45+scale), (45+scale)*2);
						break;

					case 755:
						imgMaps.src = 'img/connector.png';
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*i);
						ctx.rotate(90*Math.PI/180);
 						ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
						break;
					case 756:
						imgMaps.src = 'img/connector.png';
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j),sizeY*i);
						ctx.rotate(90*Math.PI/180);
 						ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
						break;
					case 758:
						imgMaps.src = 'img/connector.png';
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*i);
						ctx.rotate(180*Math.PI/180);
 						ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
						break;
					case 757:
						imgMaps.src = 'img/connector.png';
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*(i+1));
						ctx.rotate(180*Math.PI/180);
 						ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
						break;

					case 855:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*i);
						ctx.rotate(0*Math.PI/180);
 						ctx.drawImage(imgMapsRack, 0-sizeX/2, 0, sizeX, sizeY);	
						break;
					case 856:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j),sizeY*i);
						ctx.rotate(180*Math.PI/180);
 						ctx.drawImage(imgMapsRack, 0-sizeY/2, 0-sizeY, sizeX, sizeY);	
						break;
					case 858:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*i);
						ctx.rotate(270*Math.PI/180);
 						ctx.drawImage(imgMapsRack, 0-sizeY/2, 0-sizeY, sizeX, sizeY);	
						break;
					case 857:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*(i+1));
						ctx.rotate(90*Math.PI/180);
 						ctx.drawImage(imgMapsRack, 0-sizeY/2, 0, sizeX, sizeY);	
						break;

					case 955:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*i);
						ctx.rotate(90*Math.PI/180);
 						ctx.drawImage(imgMapsDuck, 0, 0-sizeY/2, sizeX, sizeY);	
						break;
					case 956:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j),sizeY*i);
						ctx.rotate(90*Math.PI/180);
 						ctx.drawImage(imgMapsDuck, 0, 0-sizeY/2, sizeX, sizeY);	
						break;
					case 958:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*i);
						ctx.rotate(180*Math.PI/180);
 						ctx.drawImage(imgMapsDuck, 0, 0-sizeY/2, sizeX, sizeY);	
						break;
					case 957:
						ctx.restore();
						ctx.save();
						ctx.translate(sizeX*(j+1),sizeY*(i+1));
						ctx.rotate(180*Math.PI/180);
 						ctx.drawImage(imgMapsDuck, 0, 0-sizeY/2, sizeX, sizeY);	
						break;

				}
				if(maps[i][j].code!=0){
					ctx.restore();
				}
			}
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
		scrollCanvas.style.maxHeight=screen.height-(document.getElementById('footer').clientHeight+document.getElementById('header').clientHeight)+'px';
	}else{ 
		document.exitFullscreen(); 
		scrollCanvas.style.maxHeight=450+'px';
	} 
	draw(); 
} 

function scaleMinusClick(){ 
	if(scale>-20){ 
		scale-=10; 
		canvas.width=(30+scale)*200; 
		canvas.height=(30+scale)*200; 
		draw(); 
	} 
} 

document.addEventListener('DOMContentLoaded', init)