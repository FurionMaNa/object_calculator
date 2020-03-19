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
	scrollCanvas.scrollTop=1200; 
	scrollCanvas.scrollLeft=900;
	ctx.strokeStyle = 'white';
	for(var i=0;i<200;i++){ 
        maps[i]=new Array(); 
        for(var j=0;j<200;j++){ 
        	maps[i][j]=0;
        }
    } 
	imgMapsPonton.src = 'img/pontoonbutton.png'; 
	imgMapsSkhodnya.src = 'img/photo-objects-png/skhodnya/skhodnya_blue.png'; 
	imgMapsStairs.src='img/photo-objects-png/stairs/stairs-blue.png';
	imgMapsBench.src='img/bench.png';
	imgMapsRack.src='img/rack.png';
	imgMapsDuck.src='img/connector.png';
	draw(); 
	canvas.onmousemove = function(evt) {canvasMoveMouse(evt)};
	canvas.onclick=function(evt){canvasClick(evt)};
	canvas.onmousewheel=function(evt){
		if(direction==3) direction=-1;
		direction++;
		canvasMoveMouse(evt);
	};
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
}

function area(){
	var up=0;
	for(var i=0;i<200;i++){
		for(var j=0;j<200;j++){
			if(maps[i][j]!=0){
				up=i;
				i=300;
				break;
			}		
		}
	}
	var left=0;
	for(var i=0;i<200;i++){
		for(var j=0;j<200;j++){
			if(maps[j][i]!=0){
				left=i;
				i=300;
				break;
			}		
		}
	}
	var bottom=0;
	for(var i=199;i>=0;i--){
		for(var j=199;j>=0;j--){
			if(maps[i][j]!=0){
				bottom=i;
				i=0;
				break;
			}		
		}
	}
	var right=0;
	for(var j=199;j>=0;j--){
		for(var i=0;i<200;i++){
			if(maps[i][j]!=0){
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
	document.getElementById('connector').innerHTML = connector.col;
	document.getElementById('gangway').innerHTML = gangway.col;
	document.getElementById('stays').innerHTML = stays.col;
	document.getElementById('connector').innerHTML = sitconnect.col;
	document.getElementById('duck').innerHTML = duck.col;
	document.getElementById('stairs').innerHTML = stairs.col;
}


function clearCanvas(){
	for(var i=0;i<200;i++){ 
        for(var j=0;j<200;j++){ 
        	maps[i][j]=0;
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
			if(maps[i][j]!=0){ 
				return false;
			}
		}
	}
	return true;
}

function CutObjMaps(x,y){
	var i=y;
	var j=x;
	var leftI=0;
	var leftJ=0;
	var sizeObjX=0;
	var sizeObjY=0;
	while(j<200){
		if((j!=x)&&((maps[i][j]==0)||(maps[i][j]==1)||(maps[i][j]==2)||((i>0)&&(maps[i-1][j]==1))||((i>0)&&(maps[i-1][j]==2))||((i>1)&&(maps[i-2][j]==1))||((i>1)&&(maps[i-2][j]==2))||((i>2)&&(maps[i-3][j]==1))||((i>2)&&(maps[i-3][j]==2))||(maps[i][j]==-1)||(maps[i][j]==-2)||((i>0)&&(maps[i-1][j]==-1))||((i>0)&&(maps[i-1][j]==-2))||((i>1)&&(maps[i-2][j]==-1))||((i>1)&&(maps[i-2][j]==-2))||((i>2)&&(maps[i-3][j]==-1))||((i>2)&&(maps[i-3][j]==-2)))){
			break;
		}
		if((j!=x)&&((maps[i][j]==0)||(maps[i][j]==10)||(maps[i][j]==20)||((i>0)&&(maps[i-1][j]==10))||((i>0)&&(maps[i-1][j]==20))||(maps[i][j]==-10)||(maps[i][j]==-20)||((i>0)&&(maps[i-1][j]==-10))||((i>0)&&(maps[i-1][j]==-20)))){
			break;
		}
		j++;
	}
	j--;
	if((j<200)&&(((maps[i][j+1]!=11)&&(maps[i][j+1]!=22)&&(maps[i][j+1]!=0)&&(maps[i][j+1]!=1)&&(maps[i][j+1]!=-1)&&(maps[i][j+1]!=10)&&(maps[i][j+1]!=-10)&&(maps[i][j+1]!=2)&&(maps[i][j+1]!=-2)&&(maps[i][j+1]!=20)&&(maps[i][j+1]!=-20))||((i>2)&&(maps[i-3][j+1]!=11)&&(maps[i-3][j+1]!=22)&&(maps[i-3][j+1]!=0)&&(maps[i-3][j+1]!=1)&&(maps[i-3][j+1]!=-1)&&(maps[i-3][j+1]!=10)&&(maps[i-3][j+1]!=-10))||((maps[i-2][j+1]!=11)&&(maps[i-2][j+1]!=22)&&(maps[i-2][j+1]!=0)&&(maps[i-2][j+1]!=1)&&(maps[i-2][j+1]!=-1)&&(maps[i-2][j+1]!=10)&&(maps[i-2][j+1]!=-10))||((maps[i-1][j+1]!=11)&&(maps[i-1][j+1]!=22)&&(maps[i-1][j+1]!=0)&&(maps[i-1][j+1]!=1)&&(maps[i-1][j+1]!=-1)&&(maps[i-1][j+1]!=10)&&(maps[i-1][j+1]!=-10)) ||((maps[i+3][j+1]!=11)&&(maps[i+3][j+1]!=22)&&(maps[i+3][j+1]!=0)&&(maps[i+3][j+1]!=1)&&(maps[i+3][j+1]!=-1)&&(maps[i+3][j+1]!=10)&&(maps[i+3][j+1]!=-10))||((maps[i+2][j+1]!=11)&&(maps[i+2][j+1]!=22)&&(maps[i+2][j+1]!=0)&&(maps[i+2][j+1]!=1)&&(maps[i+2][j+1]!=-1)&&(maps[i+2][j+1]!=10)&&(maps[i+2][j+1]!=-10))||((maps[i+1][j+1]!=11)&&(maps[i+1][j+1]!=22)&&(maps[i+1][j+1]!=0)&&(maps[i+1][j+1]!=1)&&(maps[i+1][j+1]!=-1)&&(maps[i+1][j+1]!=10)&&(maps[i+1][j+1]!=-10)))){
		j++;
	}
	while(j>=0){
		sizeObjX++;
		if((maps[i][j]==1)||(maps[i][j]==2)||((i>0)&&(maps[i-1][j]==1))||((i>0)&&(maps[i-1][j]==2))||((i>1)&&(maps[i-2][j]==1))||((i>1)&&(maps[i-2][j]==2))||((i>2)&&(maps[i-3][j]==1))||((i>2)&&(maps[i-3][j]==2))||(maps[i][j]==-1)||(maps[i][j]==-2)||((i>0)&&(maps[i-1][j]==-1))||((i>0)&&(maps[i-1][j]==-2))||((i>1)&&(maps[i-2][j]==-1))||((i>1)&&(maps[i-2][j]==-2))||((i>2)&&(maps[i-3][j]==-1))||((i>2)&&(maps[i-3][j]==-2))){
			break;
		}
		if((maps[i][j]==10)||(maps[i][j]==20)||((i>0)&&(maps[i-1][j]==10))||((i>0)&&(maps[i-1][j]==20))||(maps[i][j]==-10)||(maps[i][j]==-20)||((i>0)&&(maps[i-1][j]==-10))||((i>0)&&(maps[i-1][j]==-20))){
			break;
		}
		j--;
	}
	if((j>0)&&(((maps[i][j-1]!=11)&&(maps[i][j-1]!=22)&&(maps[i][j-1]!=0)&&(maps[i][j-1]!=1)&&(maps[i][j-1]!=-1)&&(maps[i][j-1]!=10)&&(maps[i][j-1]!=-10)&&(maps[i][j-1]!=2)&&(maps[i][j-1]!=-2)&&(maps[i][j-1]!=20)&&(maps[i][j-1]!=-20))||((i>2)&&(maps[i-3][j-1]!=11)&&(maps[i-3][j-1]!=22)&&(maps[i-3][j-1]!=0)&&(maps[i-3][j-1]!=1)&&(maps[i-3][j-1]!=-1)&&(maps[i-3][j-1]!=10)&&(maps[i-3][j-1]!=-10))||((maps[i-2][j-1]!=11)&&(maps[i-2][j-1]!=22)&&(maps[i-2][j-1]!=0)&&(maps[i-2][j-1]!=1)&&(maps[i-2][j-1]!=-1)&&(maps[i-2][j-1]!=10)&&(maps[i-2][j-1]!=-10))||((maps[i-1][j-1]!=11)&&(maps[i-1][j-1]!=22)&&(maps[i-1][j-1]!=0)&&(maps[i-1][j-1]!=1)&&(maps[i-1][j-1]!=-1)&&(maps[i-1][j-1]!=10)&&(maps[i-1][j-1]!=-10)) ||((maps[i+3][j+1]!=11)&&(maps[i+3][j+1]!=22)&&(maps[i+3][j+1]!=0)&&(maps[i+3][j+1]!=1)&&(maps[i+3][j+1]!=-1)&&(maps[i+3][j+1]!=10)&&(maps[i+3][j+1]!=-10))||((maps[i+2][j+1]!=11)&&(maps[i+2][j+1]!=22)&&(maps[i+2][j+1]!=0)&&(maps[i+2][j+1]!=1)&&(maps[i+2][j+1]!=-1)&&(maps[i+2][j+1]!=10)&&(maps[i+2][j+1]!=-10))||((maps[i+1][j+1]!=11)&&(maps[i+1][j+1]!=22)&&(maps[i+1][j+1]!=0)&&(maps[i+1][j+1]!=1)&&(maps[i+1][j+1]!=-1)&&(maps[i+1][j+1]!=10)&&(maps[i+1][j+1]!=-10)))){
		j--;
		sizeObjX++;
	}
	leftJ=j;

	j=x;
	while(i<200){
		if((i!=y)&&((maps[i][j]==0)||(maps[i][j]==1)||(maps[i][j]==2)||((j>0)&&(maps[i][j-1]==1))||((j>0)&&(maps[i][j-1]==2))||(maps[i][j]==-1)||(maps[i][j]==-2)||((j>0)&&(maps[i][j-1]==-1))||((j>0)&&(maps[i][j-1]==-2)))){
			break;
		}
		if((i!=y)&&((maps[i][j]==0)||(maps[i][j]==10)||(maps[i][j]==20)||((j>0)&&(maps[i][j-1]==10))||((j>0)&&(maps[i][j-1]==20))||(maps[i][j]==-10)||(maps[i][j]==-20)||((j>0)&&(maps[i][j-1]==-10))||((j>0)&&(maps[i][j-1]==-20)) ||((j>1)&&(maps[i][j-2]==10))||((j>1)&&(maps[i][j-2]==20))||((j>1)&&(maps[i][j-2]==-10))||((j>1)&&(maps[i][j-2]==-20)) ||((j>2)&&(maps[i][j-3]==10))||((j>2)&&(maps[i][j-3]==20))||((j>2)&&(maps[i][j-3]==-10))||((j>2)&&(maps[i][j-3]==-20)))){
			break;
		}
		i++;
	}
	i--;
	if((i<200)&&(((maps[i+1][j]!=11)&&(maps[i+1][j]!=22)&&(maps[i+1][j]!=0)&&(maps[i+1][j]!=1)&&(maps[i+1][j]!=-1)&&(maps[i+1][j]!=10)&&(maps[i+1][j]!=-10)&&(maps[i+1][j]!=2)&&(maps[i+1][j]!=-2)&&(maps[i+1][j]!=20)&&(maps[i+1][j]!=-20))||((maps[i+1][j-3]!=11)&&(maps[i+1][j-3]!=22)&&(maps[i+1][j-3]!=0)&&(maps[i+1][j-3]!=1)&&(maps[i+1][j-3]!=-1)&&(maps[i+1][j-3]!=10)&&(maps[i+1][j-3]!=-10))||((maps[i+1][j-2]!=11)&&(maps[i+1][j-2]!=22)&&(maps[i+1][j-2]!=0)&&(maps[i+1][j-2]!=1)&&(maps[i+1][j-2]!=-1)&&(maps[i+1][j-2]!=10)&&(maps[i+1][j-2]!=-10))||((maps[i+1][j-1]!=11)&&(maps[i+1][j-1]!=22)&&(maps[i+1][j-1]!=0)&&(maps[i+1][j-1]!=1)&&(maps[i+1][j-1]!=-1)&&(maps[i+1][j-1]!=10)&&(maps[i+1][j-1]!=-10)) ||((maps[i+1][j+3]!=11)&&(maps[i+1][j+3]!=22)&&(maps[i+1][j+3]!=0)&&(maps[i+1][j+3]!=1)&&(maps[i+1][j+3]!=-1)&&(maps[i+1][j+3]!=10)&&(maps[i+1][j+3]!=-10))||((maps[i+1][j+2]!=11)&&(maps[i+1][j+2]!=22)&&(maps[i+1][j+2]!=0)&&(maps[i+1][j+2]!=1)&&(maps[i+1][j+2]!=-1)&&(maps[i+1][j+2]!=10)&&(maps[i+1][j+2]!=-10))||((maps[i+1][j+1]!=11)&&(maps[i+1][j+1]!=22)&&(maps[i+1][j+1]!=0)&&(maps[i+1][j+1]!=1)&&(maps[i+1][j+1]!=-1)&&(maps[i+1][j+1]!=10)&&(maps[i+1][j+1]!=-10)))){
		i++;
	}
	while(i>=0){
		sizeObjY++;
		if((maps[i][j]==1)||(maps[i][j]==2)||((j>0)&&(maps[i][j-1]==1))||((j>0)&&(maps[i][j-1]==2))||(maps[i][j]==-1)||(maps[i][j]==-2)||((j>0)&&(maps[i][j-1]==-1))||((j>0)&&(maps[i][j-1]==-2))){
			break;
		}
		if((maps[i][j]==10)||(maps[i][j]==20)||((j>0)&&(maps[i][j-1]==10))||((j>0)&&(maps[i][j-1]==20))||(maps[i][j]==-10)||(maps[i][j]==-20)||((j>0)&&(maps[i][j-1]==-10))||((j>0)&&(maps[i][j-1]==-20)) ||((j>1)&&(maps[i][j-2]==10))||((j>1)&&(maps[i][j-2]==20))||((j>1)&&(maps[i][j-2]==-10))||((j>1)&&(maps[i][j-2]==-20)) ||((j>2)&&(maps[i][j-3]==10))||((j>2)&&(maps[i][j-3]==20))||((j>2)&&(maps[i][j-3]==-10))||((j>2)&&(maps[i][j-3]==-20))){
			break;
		}
		i--;
	}
	if((i>0)&&(((maps[i-1][j]!=11)&&(maps[i-1][j]!=22)&&(maps[i-1][j]!=0)&&(maps[i-1][j]!=1)&&(maps[i-1][j]!=-1)&&(maps[i-1][j]!=10)&&(maps[i-1][j]!=-10)&&(maps[i-1][j]!=2)&&(maps[i-1][j]!=-2)&&(maps[i-1][j]!=20)&&(maps[i-1][j]!=-20))||((maps[i-1][j-3]!=11)&&(maps[i-1][j-3]!=22)&&(maps[i-1][j-3]!=0)&&(maps[i-1][j-3]!=1)&&(maps[i-1][j-3]!=-1)&&(maps[i-1][j-3]!=10)&&(maps[i-1][j-3]!=-10))||((maps[i-1][j-2]!=11)&&(maps[i-1][j-2]!=22)&&(maps[i-1][j-2]!=0)&&(maps[i-1][j-2]!=1)&&(maps[i-1][j-2]!=-1)&&(maps[i-1][j-2]!=10)&&(maps[i-1][j-2]!=-10))||((maps[i-1][j-1]!=11)&&(maps[i-1][j-1]!=22)&&(maps[i-1][j-1]!=0)&&(maps[i-1][j-1]!=1)&&(maps[i-1][j-1]!=-1)&&(maps[i-1][j-1]!=10)&&(maps[i-1][j-1]!=-10)) ||((maps[i+1][j+3]!=11)&&(maps[i+1][j+3]!=22)&&(maps[i+1][j+3]!=0)&&(maps[i+1][j+3]!=1)&&(maps[i+1][j+3]!=-1)&&(maps[i+1][j+3]!=10)&&(maps[i+1][j+3]!=-10))||((maps[i+1][j+2]!=11)&&(maps[i+1][j+2]!=22)&&(maps[i+1][j+2]!=0)&&(maps[i+1][j+2]!=1)&&(maps[i+1][j+2]!=-1)&&(maps[i+1][j+2]!=10)&&(maps[i+1][j+2]!=-10))||((maps[i+1][j+1]!=11)&&(maps[i+1][j+1]!=22)&&(maps[i+1][j+1]!=0)&&(maps[i+1][j+1]!=1)&&(maps[i+1][j+1]!=-1)&&(maps[i+1][j+1]!=10)&&(maps[i+1][j+1]!=-10)))){
		i--;
		sizeObjY++;
	}
	leftI=i;
	var b=leftJ;
	mapsBuff=new Array();
	for(var i=0;i<sizeObjY;i++){
		mapsBuff[i]=new Array();
		leftJ=b;
		for(var j=0;j<sizeObjX;j++){
			mapsBuff[i][j]=maps[leftI][leftJ];
			maps[leftI][leftJ]=0;
			leftJ++;
		}
		leftI++;
	}
	alert(sizeObjX);
	alert(sizeObjY);
}

function PastObjMaps(x,y){
	var f=true;
	for(var i=y;i<y+mapsBuff.length;i++){
		for(var j=x;j<x+mapsBuff[0].length;j++){
			try{
				if(maps[i][j]!=0){
					f=false;
				}
			}catch{
				f=false;
			}
		}
	}
	if(f){
		var ii=0;
		for(var i=y;i<y+mapsBuff.length;i++){
			var jj=0;
			for(var j=x;j<x+mapsBuff[0].length;j++){
				maps[i][j]=mapsBuff[ii][jj];
				jj++;
			}
			ii++;
		}
		return true;
	}else{
		return false;
	}
}

function canvasClick(evt){
	var x,y;
	x=Math.trunc((evt.offsetX)/(45+scale));
	y=Math.trunc((evt.offsetY)/(45+scale));
	if((isArrange(x,y,model,direction))||(model==3)||(model==7)||(model==4)){
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
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=12;break;
							case 'blue':maps[y][x]=1;break;
							case 'green':maps[y][x]=13;break;
							case 'white':maps[y][x]=14;break;
							case 'gray':maps[y][x]=15;break;
						}
						break;
					case 1:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=-102;break;
							case 'blue':maps[y][x]=-10;break;
							case 'green':maps[y][x]=-103;break;
							case 'white':maps[y][x]=-104;break;
							case 'gray':maps[y][x]=-105;break;
						}
						break;
					case 2:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=-12;break;
							case 'blue':maps[y][x]=-1;break;
							case 'green':maps[y][x]=-13;break;
							case 'white':maps[y][x]=-14;break;
							case 'gray':maps[y][x]=-15;break;
						}
						break;
					case 3:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=11;
							}
						}
						switch (color){
							case 'red':maps[y][x]=102;break;
							case 'blue':maps[y][x]=10;break;
							case 'green':maps[y][x]=103;break;
							case 'white':maps[y][x]=104;break;
							case 'gray':maps[y][x]=105;break;
						}
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
								maps[i][j]=22;
							}
						}
						maps[y][x]=2;
						maps[y][x+1]=1222;
						break;
					case 1:
						x-=2;y--;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=22;
							}
						}

						maps[y+1][x]=1222;
						maps[y][x]=-20;
						break;
					case 2:
						x--;y-=2;
						for (var i=y;i<y+4;i++){
							for(var j=x;j<x+2;j++){
								maps[i][j]=22;
							}
						}
						maps[y][x+1]=1222;
						maps[y][x]=-2;
						break;
					case 3:
						x-=2;
						for (var i=y;i<y+2;i++){
							for(var j=x;j<x+4;j++){
								maps[i][j]=22;
							}
						}
						maps[y+1][x]=1222;
						maps[y][x]=20;
						break;
				}
				break;
			case 3:
				stairs.col++;
				ArrangeStairs(x,y,direction,evt.offsetX,evt.offsetY);
				break;
			case 4:
				connector.col++;
				ArrangeConnector(x,y,direction,evt.offsetX,evt.offsetY);
				break;
			case 5:
				stays.col++;
				ArrangeRack(x,y,direction,evt.offsetX,evt.offsetY);
				break;
			case 6:
				sitconnect.col++;
				ArrangeBench(x,y,direction,evt.offsetX,evt.offsetY);
				break;
			case 7:
				duck.col++;
				ArrangeDuck(x,y,direction,evt.offsetX,evt.offsetY);
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
				case 'blue':imgGhost.src='img/photo-objects-png/stairs/stairs-blue.png';imgMouse.src = 'img/photo-objects-png/stairs/stairs-blue.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
			switch (direction){
				case 0:
					ctx.save();
					ctx.translate(evt.offsetX,evt.offsetY);
					ctx.rotate(0*Math.PI/180);
					ctx.drawImage(imgMouse, 0-(45+scale+15)/2, 0-(45+scale+15), (45+scale)+15, (45+scale)+15);
					ctx.restore();
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
				case 'blue':imgGhost.src='img/connector.png';imgMouse.src = 'img/connector.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
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
				case 'blue':imgGhost.src='img/rack.png';imgMouse.src = 'img/rack.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
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
		case 6:
			switch (color){
				case 'red':imgMouse.src = 'img/pontoon-redbutton.png';break;
				case 'blue':imgGhost.src='img/photo-objects-png/stairs/stairs-blue.png';imgMouse.src = 'img/bench.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
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
				case 'blue':imgGhost.src='img/connector.png';imgMouse.src = 'img/connector.png';break;
				case 'green':imgMouse.src = 'img/pontoon-green.png';break;
				case 'white':imgMouse.src = 'img/pontoonbutton.png';break;
				case 'gray':imgMouse.src = 'img/pontoon-gray.png';break;
			}
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
	if(((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=1))&&((y<1)||(maps[y][x-2]!=-1))&&((y<1)||(maps[y][x-2]!=-10))&&((y<1)||(maps[y][x-2]!=10))&&((y<1)||(maps[y][x-2]!=2))&&((y<1)||(maps[y][x-2]!=-2))&&((y<1)||(maps[y][x-2]!=-20))&&((y<1)||(maps[y][x-2]!=20))&&((y<1)||(maps[y][x-2]!=22))&&((y<1)||(maps[y][x+2]!=11))&&((y>198)||(maps[y][x+2]!=1))&&((y>198)||(maps[y][x+2]!=-1))&&((y>198)||(maps[y][x+2]!=-10))&&((y>198)||(maps[y][x+2]!=10))&&((y>198)||(maps[y][x+2]!=2))&&((y>198)||(maps[y][x+2]!=-2))&&((y>198)||(maps[y][x+2]!=-20))&&((y>198)||(maps[y][x+2]!=20))&&((y>198)||(maps[y][x+2]!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1]==11)||(maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x+1]==11))&&(maps[y+1][x]==11)){
				maps[y-1][x]=957;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y-1][x]==1)||(maps[y-1][x]==-1)||(maps[y-1][x]==10)||(maps[y-1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=955;
				}else{
					if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
						maps[y][x+1]=956;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=955;
				}
				if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
					maps[y][x+1]=956;
				}
			}else{
				if(((maps[y-4][x]==1)||(maps[y-4][x]==-1)||((maps[y][x]==11)&&((maps[y][x+1]==11)||(maps[y][x-1]==11))))&&((maps[y][x+1]==11)||(maps[y][x-1]==11))&&(maps[y+1][x]==0)){
		 			maps[y+1][x]=958;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1]==11)||(maps[y][x+1]==11))&&(maps[y+1][x]==11)){
				maps[y-1][x]=957;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=955;
				}else{
					if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
						maps[y][x+1]=956;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y-1][x]==1)||(maps[y-1][x]==-1)||(maps[y-1][x]==10)||(maps[y-1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=955;
				}
				if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
					maps[y][x+1]=956;
				}
			}else{
				if(((maps[y-4][x]==10)||(maps[y-4][x]==-10)||((maps[y][x]==11)&&((maps[y][x+1]==11)||(maps[y][x-1]==11))))&&((maps[y][x+1]==11)||(maps[y][x-1]==11))&&(maps[y+1][x]==0)){
		 			maps[y+1][x]=958;
		 		}
			}
		}	
	}
	if((maps[y][x]==2)||((maps[y][x]==1222)&&(maps[y][x-1]==2))){
		if((y>0)&&(maps[y-1][x]==0)){
			switch (maps[y][x]){
				case 2:
					maps[y-1][x]=957;
					break;
				case 1222:
					maps[y-1][x]=957;
					break;
			}
		}
	}
	if((maps[y][x]==-20)||((maps[y][x]==1222)&&(maps[y-1][x]==-20))){
		if((x>0)&&(maps[y][x-1]==0)){
			switch (maps[y][x]){
				case -20:
					maps[y][x-1]=955;
					break;
				case 1222:
					maps[y][x-1]=955;
					break;
			}
		}
	}
	if((maps[y-3][x]==-2)||((maps[y-3][x]==1222)&&(maps[y-3][x-1]==-2))){
		if((y<199)&&(maps[y+1][x]==0)){
			switch (maps[y-3][x]){
				case -2:
					maps[y+1][x]=958;
					break;
				case 1222:
					maps[y+1][x]=958;
					break;
			}
		}
	}
	if((maps[y][x-3]==20)||((maps[y][x-3]==1222)&&(maps[y-1][x-3]==20))){
		if((x<199)&&(maps[y][x+1]==0)){
			switch (maps[y][x-3]){
				case 20:
					maps[y][x+1]=956;
					break;
				case 1222:
					maps[y][x+1]=956;
					break;
			}
		}
	}
}

function ArrangeRack(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=1))&&((y<1)||(maps[y][x-2]!=-1))&&((y<1)||(maps[y][x-2]!=-10))&&((y<1)||(maps[y][x-2]!=10))&&((y<1)||(maps[y][x-2]!=2))&&((y<1)||(maps[y][x-2]!=-2))&&((y<1)||(maps[y][x-2]!=-20))&&((y<1)||(maps[y][x-2]!=20))&&((y<1)||(maps[y][x-2]!=22))&&((y<1)||(maps[y][x+2]!=11))&&((y>198)||(maps[y][x+2]!=1))&&((y>198)||(maps[y][x+2]!=-1))&&((y>198)||(maps[y][x+2]!=-10))&&((y>198)||(maps[y][x+2]!=10))&&((y>198)||(maps[y][x+2]!=2))&&((y>198)||(maps[y][x+2]!=-2))&&((y>198)||(maps[y][x+2]!=-20))&&((y>198)||(maps[y][x+2]!=20))&&((y>198)||(maps[y][x+2]!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1]==11)||(maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x+1]==11))&&(maps[y+1][x]==11)){
				maps[y-1][x]=857;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y-1][x]==1)||(maps[y-1][x]==-1)||(maps[y-1][x]==10)||(maps[y-1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=855;
				}else{
					if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
						maps[y][x+1]=856;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=855;
				}
				if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
					maps[y][x+1]=856;
				}
			}else{
				if(((maps[y-4][x]==1)||(maps[y-4][x]==-1)||((maps[y][x]==11)&&((maps[y][x+1]==11)||(maps[y][x-1]==11))))&&((maps[y][x+1]==11)||(maps[y][x-1]==11))&&(maps[y+1][x]==0)){
		 			maps[y+1][x]=858;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1]==11)||(maps[y][x+1]==11))&&(maps[y+1][x]==11)){
				maps[y-1][x]=857;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=855;
				}else{
					if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
						maps[y][x+1]=856;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y-1][x]==1)||(maps[y-1][x]==-1)||(maps[y-1][x]==10)||(maps[y-1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=855;
				}
				if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
					maps[y][x+1]=856;
				}
			}else{
				if(((maps[y-4][x]==10)||(maps[y-4][x]==-10)||((maps[y][x]==11)&&((maps[y][x+1]==11)||(maps[y][x-1]==11))))&&((maps[y][x+1]==11)||(maps[y][x-1]==11))&&(maps[y+1][x]==0)){
		 			maps[y+1][x]=858;
		 		}
			}
		}	
	}
	if((maps[y][x]==2)||((maps[y][x]==1222)&&(maps[y][x-1]==2))){
		if((y>0)&&(maps[y-1][x]==0)){
			switch (maps[y][x]){
				case 2:
					maps[y-1][x]=857;
					break;
				case 1222:
					maps[y-1][x]=857;
					break;
			}
		}
	}
	if((maps[y][x]==-20)||((maps[y][x]==1222)&&(maps[y-1][x]==-20))){
		if((x>0)&&(maps[y][x-1]==0)){
			switch (maps[y][x]){
				case -20:
					maps[y][x-1]=855;
					break;
				case 1222:
					maps[y][x-1]=855;
					break;
			}
		}
	}
	if((maps[y-3][x]==-2)||((maps[y-3][x]==1222)&&(maps[y-3][x-1]==-2))){
		if((y<199)&&(maps[y+1][x]==0)){
			switch (maps[y-3][x]){
				case -2:
					maps[y+1][x]=858;
					break;
				case 1222:
					maps[y+1][x]=858;
					break;
			}
		}
	}
	if((maps[y][x-3]==20)||((maps[y][x-3]==1222)&&(maps[y-1][x-3]==20))){
		if((x<199)&&(maps[y][x+1]==0)){
			switch (maps[y][x-3]){
				case 20:
					maps[y][x+1]=856;
					break;
				case 1222:
					maps[y][x+1]=856;
					break;
			}
		}
	}
}

function ArrangeConnector(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=1))&&((y<1)||(maps[y][x-2]!=-1))&&((y<1)||(maps[y][x-2]!=-10))&&((y<1)||(maps[y][x-2]!=10))&&((y<1)||(maps[y][x-2]!=2))&&((y<1)||(maps[y][x-2]!=-2))&&((y<1)||(maps[y][x-2]!=-20))&&((y<1)||(maps[y][x-2]!=20))&&((y<1)||(maps[y][x-2]!=22))&&((y<1)||(maps[y][x+2]!=11))&&((y>198)||(maps[y][x+2]!=1))&&((y>198)||(maps[y][x+2]!=-1))&&((y>198)||(maps[y][x+2]!=-10))&&((y>198)||(maps[y][x+2]!=10))&&((y>198)||(maps[y][x+2]!=2))&&((y>198)||(maps[y][x+2]!=-2))&&((y>198)||(maps[y][x+2]!=-20))&&((y>198)||(maps[y][x+2]!=20))&&((y>198)||(maps[y][x+2]!=22))){
		console.log(mY-y*(45+scale)<(45+scale)/2);
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1]==11)||(maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x+1]==11))&&(maps[y+1][x]==11)){
				maps[y-1][x]=757;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y-1][x]==1)||(maps[y-1][x]==-1)||(maps[y-1][x]==10)||(maps[y-1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=755;
				}else{
					if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
						maps[y][x+1]=756;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=755;
				}
				if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
					maps[y][x+1]=756;
				}
			}else{
				if(((maps[y-4][x]==1)||(maps[y-4][x]==-1)||((maps[y][x]==11)&&((maps[y][x+1]==11)||(maps[y][x-1]==11))))&&((maps[y][x+1]==11)||(maps[y][x-1]==11))&&(maps[y+1][x]==0)){
		 			maps[y+1][x]=758;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if(((maps[y][x-1]==11)||(maps[y][x+1]==11))&&(maps[y+1][x]==11)){
				maps[y-1][x]=757;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=755;
				}else{
					if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
						maps[y][x+1]=756;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y-1][x]==11)||(maps[y-1][x]==1)||(maps[y-1][x]==-1)||(maps[y-1][x]==10)||(maps[y-1][x]==-10))&&(maps[y][x-1]==0)){
					maps[y][x-1]=755;
				}
				if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&((maps[y-1][x]==11)||(maps[y+1][x]==11))&&(maps[y][x+1]==0)){
					maps[y][x+1]=756;
				}
			}else{
				if(((maps[y-4][x]==10)||(maps[y-4][x]==-10)||((maps[y][x]==11)&&((maps[y][x+1]==11)||(maps[y][x-1]==11))))&&((maps[y][x+1]==11)||(maps[y][x-1]==11))&&(maps[y+1][x]==0)){
		 			maps[y+1][x]=758;
		 		}
			}
		}	
	}
	if((maps[y][x]==2)||((maps[y][x]==1222)&&(maps[y][x-1]==2))){
		if((y>0)&&(maps[y-1][x]==0)){
			switch (maps[y][x]){
				case 2:
					maps[y-1][x]=757;
					break;
				case 1222:
					maps[y-1][x]=757;
					break;
			}
		}
	}
	if((maps[y][x]==-20)||((maps[y][x]==1222)&&(maps[y-1][x]==-20))){
		if((x>0)&&(maps[y][x-1]==0)){
			switch (maps[y][x]){
				case -20:
					maps[y][x-1]=755;
					break;
				case 1222:
					maps[y][x-1]=755;
					break;
			}
		}
	}
	if((maps[y-3][x]==-2)||((maps[y-3][x]==1222)&&(maps[y-3][x-1]==-2))){
		if((y<199)&&(maps[y+1][x]==0)){
			switch (maps[y-3][x]){
				case -2:
					maps[y+1][x]=758;
					break;
				case 1222:
					maps[y+1][x]=758;
					break;
			}
		}
	}
	if((maps[y][x-3]==20)||((maps[y][x-3]==1222)&&(maps[y-1][x-3]==20))){
		if((x<199)&&(maps[y][x+1]==0)){
			switch (maps[y][x-3]){
				case 20:
					maps[y][x+1]=756;
					break;
				case 1222:
					maps[y][x+1]=756;
					break;
			}
		}
	}
}

function ArrangeStairs(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=1))&&((y<1)||(maps[y][x-2]!=-1))&&((y<1)||(maps[y][x-2]!=-10))&&((y<1)||(maps[y][x-2]!=10))&&((y<1)||(maps[y][x-2]!=2))&&((y<1)||(maps[y][x-2]!=-2))&&((y<1)||(maps[y][x-2]!=-20))&&((y<1)||(maps[y][x-2]!=20))&&((y<1)||(maps[y][x-2]!=22))&&((y<1)||(maps[y][x+2]!=11))&&((y>198)||(maps[y][x+2]!=1))&&((y>198)||(maps[y][x+2]!=-1))&&((y>198)||(maps[y][x+2]!=-10))&&((y>198)||(maps[y][x+2]!=10))&&((y>198)||(maps[y][x+2]!=2))&&((y>198)||(maps[y][x+2]!=-2))&&((y>198)||(maps[y][x+2]!=-20))&&((y>198)||(maps[y][x+2]!=20))&&((y>198)||(maps[y][x+2]!=22))){
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y-1][x+1]==0)&&(maps[y][x-1]!=555)&&(maps[y][x+2]!=556)&&(maps[y][x-1]!=655)&&(maps[y][x+2]!=656)){
				maps[y-1][x]=557;
				maps[y-1][x+1]=-557;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==0)||(maps[y-1][x]!=657))&&(maps[y+2][x]!=558)&&(maps[y+2][x]!=658)){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}else{
					if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&(maps[y-1][x]!=-557)&&(maps[y+2][x]!=-558)&&(maps[y-1][x]!=-657)&&(maps[y+2][x]!=-658)){
						maps[y][x+1]=556;
						maps[y+1][x+1]=-556;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if(((maps[y][x+1]==11)||(maps[y-1][x]==1)||(maps[y][x-1]==-1))&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==0)||(maps[y-1][x]!=657))&&((y==199)||(maps[y+2][x]!=558))&&((y==199)||(maps[y+2][x]!=658))){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}
				if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&((y==0)||(maps[y-1][x]!=-557))&&((y==0)||(maps[y-1][x]!=-657))&&((y==199)||(maps[y+2][x]!=-558))&&((y==199)||(maps[y+2][x]!=-658))){
					maps[y][x+1]=556;
					maps[y+1][x+1]=-556;
				}
			}else{
				if(((maps[y-4][x]==1)||(maps[y-4][x]==-1)||(maps[y][x+1]==11))&&(maps[y][x+1]==11)&&(maps[y+1][x+1]==0)&&(maps[y+1][x]==0)&&(maps[y][x-1]!=-555)&&(maps[y][x-1]!=-655)&&(maps[y][x-1]!=-556)&&(maps[y][x-1]!=-656)){
		 			maps[y+1][x]=558;
		 			maps[y+1][x+1]=-558;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y-1][x+1]==0)&&(maps[y][x-1]!=555)&&(maps[y][x+2]!=556)&&(maps[y][x-1]!=655)&&(maps[y][x+2]!=656)){
				maps[y-1][x]=557;
				maps[y-1][x+1]=-557;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=657))&&((y==0)||(maps[y-1][x]!=557))&&(maps[y+2][x]!=558)&&(maps[y+2][x]!=658)){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}else{
					if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&(maps[y-1][x]!=-557)&&(maps[y+2][x]!=-558)&&(maps[y-1][x]!=-657)&&(maps[y+2][x]!=-658)){
						maps[y][x+1]=556;
						maps[y+1][x+1]=-556;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if(((maps[y][x+1]==11)||(maps[y-1][x]==10)||(maps[y][x-1]==-10))&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==0)||(maps[y-1][x]!=657))&&((y==199)||(maps[y+2][x]!=558))&&((y==199)||(maps[y+2][x]!=658))){
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
				}
				if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&((y==0)||(maps[y-1][x]!=-557))&&((y==199)||(maps[y+2][x]!=-558))&&((y==0)||(maps[y-1][x]!=-657))&&((y==199)||(maps[y+2][x]!=-658))){
					maps[y][x+1]=556;
					maps[y+1][x+1]=-556;
				}
			}else{
				if(((maps[y-4][x]==10)||(maps[y-4][x]==-10)||(maps[y][x+1]==11))&&(maps[y][x+1]==11)&&(maps[y+1][x+1]==0)&&(maps[y+1][x]==0)&&(maps[y][x-1]!=-555)&&(maps[y][x-1]!=-556)&&(maps[y][x-1]!=-655)&&(maps[y][x-1]!=-656)){
		 			maps[y+1][x]=558;
		 			maps[y+1][x+1]=-558;
		 		}
			}
		}	
	}
	if((maps[y][x]==2)||((maps[y][x]==1222)&&(maps[y][x-1]==2))){
		if((y>0)&&(maps[y-1][x]==0)){
			switch (maps[y][x]){
				case 2:
					maps[y-1][x]=557;
					maps[y-1][x+1]=-557;
					break;
				case 1222:
					maps[y-1][x-1]=557;
					maps[y-1][x]=-557;
					break;
			}
		}
	}
	if((maps[y][x]==-20)||((maps[y][x]==1222)&&(maps[y-1][x]==-20))){
		if((x>0)&&(maps[y][x-1]==0)){
			switch (maps[y][x]){
				case -20:
					maps[y][x-1]=555;
					maps[y+1][x-1]=-555;
					break;
				case 1222:
					maps[y-1][x-1]=555;
					maps[y][x-1]=-555;
					break;
			}
		}
	}
	if((maps[y-3][x]==-2)||((maps[y-3][x]==1222)&&(maps[y-3][x-1]==-2))){
		if((y<199)&&(maps[y+1][x]==0)){
			switch (maps[y-3][x]){
				case -2:
					maps[y+1][x]=558;
					maps[y+1][x+1]=-558;
					break;
				case 1222:
					maps[y+1][x-1]=558;
					maps[y+1][x]=-558;
					break;
			}
		}
	}
	if((maps[y][x-3]==20)||((maps[y][x-3]==1222)&&(maps[y-1][x-3]==20))){
		if((x<199)&&(maps[y][x+1]==0)){
			switch (maps[y][x-3]){
				case 20:
					maps[y][x+1]=556;
					maps[y+1][x+1]=-555;
					break;
				case 1222:
					maps[y-1][x+1]=555;
					maps[y][x+1]=-555;
					break;
			}
		}
	}
}

function ArrangeBench(x,y,direction,mX,mY){
	if(((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=11))&&((y<1)||(maps[y][x-2]!=1))&&((y<1)||(maps[y][x-2]!=-1))&&((y<1)||(maps[y][x-2]!=-10))&&((y<1)||(maps[y][x-2]!=10))&&((y<1)||(maps[y][x-2]!=2))&&((y<1)||(maps[y][x-2]!=-2))&&((y<1)||(maps[y][x-2]!=-20))&&((y<1)||(maps[y][x-2]!=20))&&((y<1)||(maps[y][x-2]!=22))&&((y<1)||(maps[y][x+2]!=11))&&((y>198)||(maps[y][x+2]!=1))&&((y>198)||(maps[y][x+2]!=-1))&&((y>198)||(maps[y][x+2]!=-10))&&((y>198)||(maps[y][x+2]!=10))&&((y>198)||(maps[y][x+2]!=2))&&((y>198)||(maps[y][x+2]!=-2))&&((y>198)||(maps[y][x+2]!=-20))&&((y>198)||(maps[y][x+2]!=20))&&((y>198)||(maps[y][x+2]!=22))){
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y-1][x+1]==0)&&(maps[y][x-1]!=555)&&(maps[y][x+2]!=556)&&(maps[y][x-1]!=655)&&(maps[y][x+2]!=656)){
				maps[y-1][x]=657;
				maps[y-1][x+1]=-657;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==0)||(maps[y-1][x]!=657))&&(maps[y+2][x]!=558)&&(maps[y+2][x]!=658)){
					maps[y][x-1]=655;
					maps[y+1][x-1]=-655;
				}else{
					if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&(maps[y-1][x]!=-557)&&(maps[y+2][x]!=-558)&&(maps[y-1][x]!=-657)&&(maps[y+2][x]!=-658)){
						
						maps[y][x+1]=656;
						maps[y+1][x+1]=-656;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if(((maps[y][x+1]==11)||(maps[y-1][x]==1)||(maps[y][x-1]==-1))&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==0)||(maps[y-1][x]!=657))&&((y==199)||(maps[y+2][x]!=558))&&((y==199)||(maps[y+2][x]!=658))){
					maps[y][x-1]=655;
					maps[y+1][x-1]=-655;
				}
				if(((maps[y][x-1]==1)||(maps[y][x-1]==-1)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&((y==0)||(maps[y-1][x]!=-557))&&((y==0)||(maps[y-1][x]!=-657))&&((y==199)||(maps[y+2][x]!=-558))&&((y==199)||(maps[y+2][x]!=-658))){
					maps[y][x+1]=656;
					maps[y+1][x+1]=-656;
				}
			}else{
				if(((maps[y-4][x]==1)||(maps[y-4][x]==-1)||(maps[y][x+1]==11))&&(maps[y][x+1]==11)&&(maps[y+1][x+1]==0)&&(maps[y+1][x]==0)&&(maps[y][x-1]!=-555)&&(maps[y][x-1]!=-655)&&(maps[y][x-1]!=-556)&&(maps[y][x-1]!=-656)){
		 			maps[y+1][x]=658;
		 			maps[y+1][x+1]=-658;
		 		}
			}
		}	
	}else{
		if((y>0)&&(maps[y-1][x]==0)&&(mY-y*(45+scale)<(45+scale)/2)){
			if((maps[y][x+1]==11)&&(maps[y+1][x]==11)&&(maps[y-1][x+1]==0)&&(maps[y][x-1]!=555)&&(maps[y][x+2]!=556)&&(maps[y][x-1]!=655)&&(maps[y][x+2]!=656)){
				maps[y-1][x]=657;
				maps[y-1][x+1]=-657;
			}else{
				if((maps[y][x+1]==11)&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=657))&&((y==0)||(maps[y-1][x]!=557))&&(maps[y+2][x]!=558)&&(maps[y+2][x]!=658)){
					maps[y][x-1]=655;
					maps[y+1][x-1]=-655;
				}else{
					if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&(maps[y-1][x]!=-557)&&(maps[y+2][x]!=-558)&&(maps[y-1][x]!=-657)&&(maps[y+2][x]!=-658)){
						maps[y][x+1]=656;
						maps[y+1][x+1]=-656;
					}
				}
			}
		}else{
			if(((mY-y*(45+scale)>(45+scale)/2)||(maps[y-1][x]!=0)||(maps[y+1][x]!=0))&&(maps[y+1][x]!=0)){
				if(((maps[y][x+1]==11)||(maps[y-1][x]==10)||(maps[y][x-1]==-10))&&((maps[y+1][x]==11)||(maps[y+1][x]==1)||(maps[y+1][x]==-1)||(maps[y+1][x]==10)||(maps[y+1][x]==-10))&&(maps[y+1][x-1]==0)&&(maps[y][x-1]==0)&&(maps[y+1][x-1]==0)&&((y==0)||(maps[y-1][x]!=557))&&((y==0)||(maps[y-1][x]!=657))&&((y==199)||(maps[y+2][x]!=558))&&((y==199)||(maps[y+2][x]!=658))){
					maps[y][x-1]=655;
					maps[y+1][x-1]=-655;
				}
				if(((maps[y][x-1]==10)||(maps[y][x-1]==-10)||(maps[y][x-1]==11))&&(maps[y+1][x]==11)&&(maps[y][x+1]==0)&&(maps[y+1][x+1]==0)&&((y==0)||(maps[y-1][x]!=-557))&&((y==199)||(maps[y+2][x]!=-558))&&((y==0)||(maps[y-1][x]!=-657))&&((y==199)||(maps[y+2][x]!=-658))){
					maps[y][x+1]=656;
					maps[y+1][x+1]=-656;
				}
			}else{
				if(((maps[y-4][x]==10)||(maps[y-4][x]==-10)||(maps[y][x+1]==11))&&(maps[y][x+1]==11)&&(maps[y+1][x+1]==0)&&(maps[y+1][x]==0)&&(maps[y][x-1]!=-555)&&(maps[y][x-1]!=-556)&&(maps[y][x-1]!=-655)&&(maps[y][x-1]!=-656)){
		 			maps[y+1][x]=658;
		 			maps[y+1][x+1]=-658;
		 		}
			}
		}	
	}
	if((maps[y][x]==2)||((maps[y][x]==1222)&&(maps[y][x-1]==2))){
		if((y>0)&&(maps[y-1][x]==0)){
			switch (maps[y][x]){
				case 2:
					maps[y-1][x]=657;
					maps[y-1][x+1]=-657;
					break;
				case 1222:
					maps[y-1][x-1]=657;
					maps[y-1][x]=-657;
					break;
			}
		}
	}
	if((maps[y][x]==-20)||((maps[y][x]==1222)&&(maps[y-1][x]==-20))){
		if((x>0)&&(maps[y][x-1]==0)){
			switch (maps[y][x]){
				case -20:
					maps[y][x-1]=655;
					maps[y+1][x-1]=-655;
					break;
				case 1222:
					maps[y-1][x-1]=655;
					maps[y][x-1]=-655;
					break;
			}
		}
	}
	if((maps[y-3][x]==-2)||((maps[y-3][x]==1222)&&(maps[y-3][x-1]==-2))){
		if((y<199)&&(maps[y+1][x]==0)){
			switch (maps[y-3][x]){
				case -2:
					maps[y+1][x]=658;
					maps[y+1][x+1]=-658;
					break;
				case 1222:
					maps[y+1][x-1]=658;
					maps[y+1][x]=-658;
					break;
			}
		}
	}
	if((maps[y][x-3]==20)||((maps[y][x-3]==1222)&&(maps[y-1][x-3]==20))){
		if((x<199)&&(maps[y][x+1]==0)){
			switch (maps[y][x-3]){
				case 20:
					maps[y][x+1]=656;
					maps[y+1][x+1]=-655;
					break;
				case 1222:
					maps[y-1][x+1]=655;
					maps[y][x+1]=-655;
					break;
			}
		}
	}
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
				if(maps[i][j]!=0){
					ctx.save();
					ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
				}
				switch(maps[i][j]){
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
						if((j>0)&&(maps[i][j-1]==555)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0+(45+scale), (45+scale)+15, (45+scale)+15);
						}
						if((i>0)&&(maps[i-1][j]==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}
						if((j>0)&&(maps[i][j-1]==655)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(0*Math.PI/180);
							ctx.drawImage(imgMapsBench, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale), (45+scale)*2);
						}
						if((i>0)&&(maps[i-1][j]==657)){
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
						if((j>0)&&(maps[i][j-1]==555)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(90*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0-(45+scale)*4, 0+(45+scale), (45+scale)+15, (45+scale)+15);
						}
						if((i>0)&&(maps[i+1][j]==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}
						if((j>0)&&(maps[i][j-1]==655)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(0*Math.PI/180);
							ctx.drawImage(imgMapsBench, 0-(45+scale)*2, 0-(45+scale)*4, (45+scale), (45+scale)*2);
						}
						if((i>0)&&(maps[i+1][j]==657)){
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
						if((i>0)&&(maps[i-1][j]==557)){
							ctx.restore();
							ctx.save();
							ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
							ctx.rotate(180*Math.PI/180);
							ctx.drawImage(imgMapsStairs, 0, 0+(45+scale)*3, (45+scale)+15, (45+scale)+15);
						}

						if((i>0)&&(maps[i-1][j]==657)){
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
						if((j>0)&&(maps[i][j-1]==555)){
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
				if(maps[i][j]!=0){
					ctx.restore();
				}
			}
		}
	}
	for(var i=iStart-10;i<iEnd+10;i++){
		for(var j=jStart-10;j<jEnd+10;j++){
			if((i>=0)&&(j>=0)&&(i<200)&&(j<200)){
				if(maps[i][j]!=0){
					ctx.save();
					ctx.translate(sizeX*j+((45+scale)*4/2),sizeY*i+((45+scale)*8/2));
				}
				switch(maps[i][j]){
					case 1:case -1:
 						imgMaps.src = 'img/connector.png';
						for (var ii=i;ii<i+4;ii++){
							if((j>0)&&(maps[ii][j-1]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((j>3)&&(((maps[ii][j-4]==20)||(maps[ii][j-4]==1222))&&((maps[ii+1][j-4]==20)||(maps[ii+1][j-4]==1222)||(maps[ii-1][j-4]==1222)||(maps[ii-1][j-4]==20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j+2]==-20)||(maps[ii][j+2]==1222))&&((maps[ii+2][j+1]==-20)||(maps[ii+1][j+2]==1222)||(maps[ii-1][j+2]==1222)||(maps[ii-1][j+2]==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+2),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}

						}
						for (var jj=j;jj<j+2;jj++){
							if((i>0)&&(maps[i-1][jj]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i>3)&&(((maps[i-4][jj]==-2)||(maps[i-4][jj]==1222))&&((maps[i-4][jj-1]==-2)||(maps[i-4][jj-1]==1222)||(maps[i-4][jj+1]==1222)||(maps[i-4][jj+1]==-2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i<199)&&(((maps[i+4][jj]==2)||(maps[i+4][jj]==1222))&&((maps[i+4][jj-1]==2)||(maps[i+4][jj-1]==1222)||(maps[i+4][jj+1]==1222)||(maps[i+4][jj+1]==2)))){
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
							if((j>0)&&(maps[ii][j-1]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j+4]==-20)||(maps[ii][j+4]==1222))&&((maps[ii+2][j+4]==-20)||(maps[ii+1][j+4]==1222)||(maps[ii-1][j+4]==1222)||(maps[ii-1][j+4]==-20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+4),sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
							if((j<199)&&(((maps[ii][j-4]==20)||(maps[ii][j-4]==1222))&&((maps[ii+2][j-4]==20)||(maps[ii+1][j-4]==1222)||(maps[ii-1][j-4]==1222)||(maps[ii-1][j-4]==20)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*j,sizeY*(i+(ii-i)));
								ctx.rotate(90*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);	
								sitconnect.col++;
							}
						}
						for (var jj=j;jj<j+4;jj++){
							if((i>0)&&(maps[i-1][jj]==11)){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j)+1),sizeY*i);
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);
								sitconnect.col++;
							}
							if((i<198)&&(((maps[i+2][jj]==2)||((maps[i+2][jj]==1222)&&(maps[i+2][jj-1]==2)))&&((maps[i+2][jj-1]==2)||(maps[i+2][jj-1]==1222)||(maps[i+2][jj+1]==1222)||(maps[i+2][jj+1]==2)))){
								ctx.restore();
								ctx.save();
								ctx.translate(sizeX*(j+(jj-j+1)),sizeY*(i+2));
								ctx.rotate(180*Math.PI/180);
 								ctx.drawImage(imgMaps, 0, 0-sizeY/2, sizeX, sizeY);		
								sitconnect.col++;
							}
							if((i<199)&&(i>3)&&(((maps[i-4][jj]==-2)||((maps[i-4][jj]==1222)&&(maps[i-4][jj-1]==-2)))&&((maps[i-4][jj-1]==-2)||(maps[i-4][jj-1]==1222)||(maps[i-4][jj+1]==1222)||(maps[i-4][jj+1]==-2)))){
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
							if((i<195)&&((maps[i+4][jj]==2)||((maps[i+4][jj]==1222)&&(maps[i+4][jj-1]==2)))){
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
							if((j<195)&&((maps[ii][j+4]==-20)||((maps[ii][j+4]==1222)&&(maps[ii-1][j+4]==-20)))){
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
				if(maps[i][j]!=0){
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

function model1onClick(){  
	model=1;
} 

function model2onClick(){ 
	model=2;
} 

function model3onClick(){
	model=3;
} 

function model4onClick(){
	model=4;
} 

function model5onClick(){
	model=5;
} 

function model6onClick(){ 
	model=6;
} 

function model7onClick(){
	model=7;
} 

document.addEventListener('DOMContentLoaded', init)