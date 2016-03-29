window.onload = function(){	
	var ctx = document.getElementById('example').getContext("2d");
	//максимум Х
	var maxX = 0;
	//максимум У
	var maxY = 0;
	//добавле дефолтных значений U V W
	// document.getElementById('u').value = 0.00018;
	// document.getElementById('v').value = 0.00042;
	// document.getElementById('w').value = 0.00259;
	// //коэффициент для определения значения одного пикселя
	var dx = 400;
	var dy = 10000;
	//количество строк таблицы
	//массив данных таблицы
	var arrayOfData = [[0,0]];
	//массив X и Y
	var xyArray = [[0,0]];

	//сбор данных в один массив
	var addDataToArray = function(){
		// var v = parseFloat(document.getElementById('v').value);
		// var u = parseFloat(document.getElementById('u').value);
		// var w = parseFloat(document.getElementById('w').value);
		var i=0;
		var dataString = document.getElementById('rawData').value;
		var a = dataString.split(/\s/);
		//for (i=0; i<a.length; i++){
		//	var n = Math.floor(i/2)+1;
		//	//console.log(a[i]);
		//	if (i%2 === 0){
		//		arrayOfData[n][0]= parseFloat(a[i]);	
		//	} else{
		//		b= parseFloat(a[i-1]);
		//		var atan = Math.tan(b*0.5*Math.PI/180);
		//		var bstd = Math.PI*0.5*Math.sqrt(w+v*atan+u*atan*atan);
		//		
		//		var s = parseFloat(a[i]) - bstd; 
		//		arrayOfData[n][1]=s;
		//	}
		//}
		for (i=0; i<a.length; i=i+2){
			var b = parseFloat(a[i+1]);
			//var atan = Math.tan(b*0.5*Math.PI/180);
			//b = b - Math.PI*0.5*Math.sqrt(w+v*atan+u*atan*atan);
			arrayOfData.push([a[i],b]);
			
		}

	};
	//добавление осей координат
	var  addCoord = function(ctx){
		ctx.beginPath();
		ctx.fillStyle="#fff";
		ctx.fillRect(0,0,500,500);

		ctx.fill();
		ctx.closePath();

		//рисование осей
		ctx.beginPath();
		ctx.moveTo(39.5,15)
		ctx.lineTo(39.5,440.5);
		ctx.lineTo(475,440.5);
		//рисование стрелки на горизонтальной оси
		ctx.lineTo(470,442.5);
		ctx.moveTo(475,440.5);
		ctx.lineTo(470,438.5);
		//рисование стрелки на вертикальной оси
		ctx.moveTo(41.5,20);
		ctx.lineTo(39.5,15);
		ctx.lineTo(37.5,20);
		//рисование рисок
		ctx.moveTo(35,40.5);
		ctx.lineTo(45,40.5);
		ctx.moveTo(439.5,435);
		ctx.lineTo(439.5,445);
		ctx.strokeStyle='#000';
		ctx.stroke();
		ctx.closePath();
		//рисование дополнительных линий
		ctx.beginPath();
		for (i=0.5; i<=400; i+=80){
			ctx.moveTo(40,360.5-i);
			ctx.lineTo(475,360.5-i);
			ctx.moveTo(119.5+i,440.5);
			ctx.lineTo(119.5+i,15);
		}
		ctx.strokeStyle="#eee"
		ctx.stroke();
		//написание максимальных значений
		ctx.fillStyle="black"
		ctx.font="normal 12px Verdana";
		var x = maxX.toFixed(3);
		var y = maxY.toFixed(3);
		ctx.textAlign="right";
		ctx.textBaseline = "bottom";
		ctx.fillText(y, 37, 39);
		ctx.textBaseline = "top";
		ctx.fillText(x, 455, 445);
		ctx.closePath();
	};
	//добавление точки на холсте. d - коэффициент для определения значения одного пикселя
	var addDot = function(x,y,dx,dy){
		ctx.beginPath();
		var a=39.5+Math.floor(x*dx);
		var b=440.5-Math.floor(y*dy)
		ctx.arc(a, b, 1, 0, 2*Math.PI, false);
		ctx.fillStyle="#000";
		ctx.fill();
		ctx.closePath();
	};
	//функция расчета игрека для построения Вильямсона - Холла
	var yWH = function(h,twoTheta){
		return h*Math.PI/180*Math.cos(twoTheta*Math.PI/360);
	};
	//функция расчета икса для построения Вильямсона - Холла
	var xWH = function(twoTheta){
		return 2*Math.sin(twoTheta*Math.PI/360);
	};
	//функция создания и возврата массива координат построения Вильямсона - Холла
	var xyArrayCreate = function(){
		addDataToArray();
		for (i=1; i<arrayOfData.length; i++){
			var x = xWH(arrayOfData[i][0]);
			var y = yWH(arrayOfData[i][1],arrayOfData[i][0]);
			xyArray.push([x,y]);
			if(maxX<x){maxX=x;}
			if(maxY<y){maxY=y;}
		}
		dx = 400/maxX;
		dy = 400/maxY;
	};
	//функция выводящая апроксимирующую линейную функцию
	var lineFunction = function(){
		var n = xyArray.length;
		var s1=0; var s2=0; var s3=0; s4=0;
		for (i=1; i<n; i++){
			s1= s1+xyArray[i][0];
			s2= s2+xyArray[i][1];
			s3= s3+xyArray[i][0]*xyArray[i][1];
			s4= s4+xyArray[i][0]*xyArray[i][0];
		}
		var a1 = ((n-1)*s3-s1*s2)/((n-1)*s4-s1*s1);
		var a0 = (s2-a1*s1)/(n-1);
		document.getElementById('info').innerHTML = '<p>a0='+a0+' a1='+a1+'</p> <p>размер ОКР равен '+(0.154056/a0).toFixed(3)+' нм </p><p>Максимальная микродеформация равна '+a1.toFixed(5)+'</p>';
		ctx.beginPath()
		ctx.moveTo(39.5,440.5-Math.floor(a0*dy))
		ctx.lineTo(39.5+Math.floor(maxX*dx),440.5-Math.floor((a0+a1*maxX)*dy));
		ctx.strokeStyle='#f00';
		ctx.stroke();
		ctx.closePath();
	};
	//функция сохранения рисунка
	var saveCanvas = function(){
    // Находим элемент <img>
	var imageCopy = document.getElementById("savedImageCopy");
	
	// Отображаем данные холста в элементе <img>
	imageCopy.src = document.getElementById("example").toDataURL();
	
	// Показываем элемент <div>, делая изображение видимым
	// делая изображение видимым
	// var imageContainer = document.getElementById("savedCopyContainer");
 //    imageContainer.style.display = "block";
	}


	addCoord(ctx);
	var go=function(){
		xyArrayCreate();
		ctx.clearRect(0,0,500,500);
		addCoord(ctx);
		for (i=1; i<xyArray.length; i++){
			var x = xyArray[i][0];
			var y = xyArray[i][1];
			addDot(x,y,dx,dy);
		}
		lineFunction();
		console.log('dy='+dy+' dx='+dx+' Xmax='+maxX+' Ymax='+maxY);
		saveCanvas();

	};

	var goSherrer = function () {

		addDataToArray();
		var s=0;
		var i=0;
		for (i=1; i<arrayOfData.length; i++) {
			var dSpace = 0.156054/(arrayOfData[i][1]*Math.PI/180*Math.cos(arrayOfData[i][0]*Math.PI/360));
			s=s+dSpace;
			console.log(s,' ',i);
		}

		console.log('s=', s, ' i=', i);
		document.getElementById('info').innerHTML = '<p>размер ОКР равен '+ (s/i).toFixed(3) +' нм </p>';
	};
	
	document.getElementById('goButton').addEventListener("click",go,false);
	document.getElementById('goSherrerButton').addEventListener("click",goSherrer,false);
};