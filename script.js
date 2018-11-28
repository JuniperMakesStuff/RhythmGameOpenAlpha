function distort(tX,tY,tWIDTH,tHEIGHT,cpx,cpy){
var ctx = document.getElementById("canvas").getContext("2d")  
  
  var imgData = ctx.getImageData(tX, tY, tWIDTH, tHEIGHT);
var newImgData = ctx.getImageData(tX, tY, tWIDTH, tHEIGHT);

    // invert colors
    var iii;
    for (iii = 0; iii < imgData.data.length; iii += 4) {
      var iiix = (iii%(4*tWIDTH))/4;
      var iiiy = Math.floor(iii/(4*tWIDTH));
      iiix-=tWIDTH/2;
      iiiy-=tHEIGHT/2;
      
      var rX = 5*Math.sin((iiiy+2)/40);
      var gX = 5*Math.sin((iiiy+4)/40);
      var bX = 5*Math.sin((iiiy+6)/40);
      var rY = 5*Math.sin((iiix+8)/40);
      var gY = 5*Math.sin((iiix+10)/40);
      var bY = 5*Math.sin((iiix+12)/40);
      newImgData.data[iii] = imgData.data[iii+(-4*Math.round(rX))+(Math.round(rY)*(-4*tWIDTH))];
        newImgData.data[iii+1] = imgData.data[iii+(-4*Math.round(gX))+(Math.round(gY)*(-4*tWIDTH))+1];
        newImgData.data[iii+2] = imgData.data[iii+(-4*Math.round(bX))+(Math.round(bY)*(-4*tWIDTH))+2];
        newImgData.data[iii+3] = 255;
    }
    ctx.putImageData(newImgData, tX, tY);
}









var quality = 0.5;



var mmx = 0;
var combo = 0;
var mmy = 0;
var ddxx = 0;
var dddxxx = 0;
var totalsize = 0;
var rott = 0;

var totalsize2 = 0;
var files = [];
var scoretext = " "
var tochoosefrom = "X       Nice    Good    Great   Amazing Perfect Perfect "
var direct = 0;
var scoreeffect = 0;
var scoreeffect2 = 0;
var scoreeffect3 = 0;
var totalnum = 0;
var effecttime = 0;
var effecttime2 = 0;
var effecttime3 = 0;
var score = 0;
  document.addEventListener("mousemove", updatePosition, false);

function updatePosition(e) {
  mmx += e.movementX/1;
  mmy += e.movementY/1;
  var dist = Math.sqrt(Math.pow(mmx,2)+Math.pow(mmy,2))
  if (dist>0){
    if (dist>50){
    mmx = mmx/(dist/50);
  mmy = mmy/(dist/50);
  }
  }
  
}


  var playinggame = 0;  
var dirlist = [0];
var diditwork = [0];
var totalhits = [0];

window.onload = function() {
  
  var file = document.getElementById("thefile");
  
  
  var audio = document.getElementById("audio");
  
 
  file.onchange = function filechanged() {
    
    document.getElementById("button").onclick = function(){
      filechanged();
    }
    
    dirlist = [0];
    combo = 0;
    diditwork = [0];
    totalhits = [0];
    totalnum = 0;
    ddxx = -500;
    dddxxx = -1000;
    
    score = 0;
    playinggame = 0;
    if (this.files.length>0){
      files = this.files;
    }
    
    
    //console.log(files[0])
    audio.src = URL.createObjectURL(files[0]);
    
    audio.load();
    audio.play();
    audio.currentTime = 0;
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
   
    var canvas = document.getElementById("canvas");
    
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
       canvas.onclick = function() {
  canvas.requestPointerLock();
         
}
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0;
    var bufferLength = analyser.frequencyBinCount;
    

    var dataArray = new Uint8Array(bufferLength);
  var dataArray2 = new Uint8Array(bufferLength); 
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    
    var barWidth = (WIDTH / bufferLength) * 2;
    var barHeight;
    var x = 0;

    function renderFrame() {
      
      var gamepadsa = navigator.getGamepads()
    
      
      if(gamepadsa.length>0){
        if (gamepadsa[0].connected == true){
        gamepadsa[0].vibrationActuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 100,
    weakMagnitude: (totalsize-40000)/40000,
    strongMagnitude: (totalsize-40000)/40000
});
        
        mmx = 10*(gamepadsa[0].axes[0]+gamepadsa[0].axes[2])
        mmy = 10*(gamepadsa[0].axes[1]+gamepadsa[0].axes[3])
        
        
        var dist = Math.sqrt(Math.pow(mmx,2)+Math.pow(mmy,2))
  if (dist>0){
    if (dist>50){
    mmx = mmx/(dist/50);
  mmy = mmy/(dist/50);
  }
  }
      }}
      
      
      
      var quality2 = quality+(1-quality)/3
      totalsize2+=(1.5*(totalsize-28000)-totalsize2)/10;
      canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
      requestAnimationFrame(renderFrame);
      scoreeffect/=1.5;
      scoreeffect2/=1.02;
      scoreeffect3/=2;
      ctx.globalCompositeOperation = 'screen';
      x = 0;
      rott++;
      if (playinggame == 1){
        document.documentElement.style.setProperty("--c",(100+totalsize/1000)+"%")
      document.documentElement.style.setProperty("--blur",(0+totalsize/75000)+"px")
      } else {
        document.documentElement.style.setProperty("--c",100+"%")
      document.documentElement.style.setProperty("--blur",0+"px")
      }
      
      
      
      document.documentElement.style.setProperty("--rot",(3*(Math.sin(rott/25)))+"deg");
      
     if (playinggame == 1){
       audio.playbackRate = 1;
       audio.volume = 1;
       
       if (audio.currentTime>=audio.duration - 0.5)
       {
         ddxx += (0-ddxx)/5
         dddxxx += (0-dddxxx)/10
       }else{
         
         
         ddxx += (-500-ddxx)/5
         dddxxx += (-1000-dddxxx)/10
       }
       
       
       
       
     }else{
       audio.playbackRate = 15;
       if (audio.currentTime>=audio.duration - 0.5)
       {
         
         audio.currentTime = 0;
         
         totalnum = diditwork.reduce(function(total, num){return total + num;})
         
         
         
         playinggame = 1;
         audio.play();
       }
     }
     
     audio.volume = 1; analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0,0,WIDTH,HEIGHT)
      ctx.fillStyle = "#000000"
      ctx.fillRect(0,0,WIDTH,HEIGHT)
      ctx.fillStyle = "rgba(0,255,127,"+(0.1/quality2)+")"
      if(playinggame==1){
      for (var i = 250;i<=500;i+=(50/quality)){
         ctx.beginPath();
      ctx.arc(WIDTH/2,HEIGHT/2,totalsize/i,0,Math.PI*2)
      
      ctx.fill();
        for(var i2 = 0; i2<=3; i2++){
        ctx.beginPath();
        ctx.arc(WIDTH/2,HEIGHT/2,100,effecttime3+(i2*(Math.PI/2))+Math.PI/(6)+(100/i),effecttime3+(i2*(Math.PI/2))+0-(100/i),true);
        ctx.arc(WIDTH/2,HEIGHT/2,2000,effecttime3+(i2*(Math.PI/2))+0-(100/i)+(totalsize2/50000),effecttime3+(i2*(Math.PI/2))+Math.PI/(6)+(100/i)+(totalsize2/50000));
        ctx.closePath();
        ctx.fill();
        }
      }
     }
      
      ctx.fillStyle = "rgba(255,255,128,"+(0.075/quality2)+")";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff"
      ctx.beginPath();
      ctx.moveTo(WIDTH/2,HEIGHT/2);
      ctx.arc(WIDTH/2,HEIGHT/2,50,direct-Math.PI/8,direct+Math.PI/8);
      ctx.closePath();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(WIDTH/2+mmx,HEIGHT/2+mmy,10,0,Math.PI*2);
      ctx.stroke();
      
      //ctx.fillRect(0,0,WIDTH,HEIGHT)
     var bufferLength2 = bufferLength - 200;
      totalsize = 0;
      for (var i =1; i < bufferLength-1; i+=1) {
        dataArray[i]-=100;
        dataArray[i]*=2;
        totalsize += dataArray[i];
        if (playinggame==0){
          dataArray2[i]+=((dataArray[i]-dataArray2[i])/1.5)
        }else{
          dataArray2[i]+=((dataArray[i]-dataArray2[i])/4)
          
          
          
        }
        
        
      }
      var avgx = WIDTH/2;
      var avgy = HEIGHT/2;
      for (var i =1; i <= bufferLength2; i+=1) {
      
        barHeight = 1.5*dataArray2[i];
      var barHeight2 = 1.5*dataArray2[i+1];
        if (i>=bufferLength2){
          barHeight2 = 1.5*dataArray2[1];
        }
      var gotoy = barHeight;
      var gotoy2 = barHeight2;
        var dy=gotoy2-gotoy;
        var x2 = x+(Math.PI*2)/bufferLength2;
        //ctx.fillRect(x,0,barWidth,barHeight);
      ctx.strokeStyle = "#ffffff"
        ctx.beginPath();
        var t1 = x;
        var r1 = gotoy;
        var t2 = x+((Math.PI*2)/bufferLength2)/3;
        var r2 = gotoy+dy/10;
        var t3 = x2-((Math.PI*2)/bufferLength2)/3;
        var r3 = gotoy2-dy/10;
        var t4 = x2;
        var r4 = gotoy2;
        
        
        ctx.moveTo((WIDTH/2)+r1*Math.cos(t1),(HEIGHT/2)+r1*Math.sin(t1))
        
  ctx.lineTo((WIDTH/2)+r4*Math.cos(t4),(HEIGHT/2)+r4*Math.sin(t4));      
        avgx+=(WIDTH/2)+r1*Math.cos(t1);
        avgy+=(HEIGHT/2)+r1*Math.sin(t1);
        //ctx.bezierCurveTo((WIDTH/2)+r2*Math.cos(t2),(HEIGHT/2)+r2*Math.sin(t2),(WIDTH/2)+r3*Math.cos(t3),(HEIGHT/2)+r3*Math.sin(t3),(WIDTH/2)+r4*Math.cos(t4),(HEIGHT/2)+r4*Math.sin(t4))
        ctx.stroke();
        
        
        x += (Math.PI*2)/bufferLength2;
      }
      
      
      
      
      avgx=avgx/bufferLength2;
      avgy= avgy/bufferLength2;
      avgx-=WIDTH/2
      avgy-=HEIGHT/2
      effecttime+=(scoreeffect2)/500
      effecttime2+=((scoreeffect)/100+0.05)
      
      effecttime3-=totalsize2/1000000;
    if (playinggame == 1){  
    for(var i=0;i<8;i++){
      for(var i2 = 0.5;i2<=1.5;i2+=(0.1/quality)){
      ctx.beginPath()
        ctx.arc(WIDTH/2+350*Math.cos(0.5*effecttime2+i*(Math.PI/2)),HEIGHT/2+350*Math.sin(0.5*effecttime2+i*(Math.PI/2)),200*i2,0,Math.PI*2)
        ctx.fill();
      }
    }
      }
      ctx.fillStyle = "rgba(255,0,128,"+(0.15/quality2)+")";
      if(playinggame == 1){
      for(var i=0;i<8;i++){
        for(var i2 = 0.5;i2<=1.5;i2+=(0.1/quality)){
        ctx.beginPath()
        ctx.arc(WIDTH/2+150*Math.cos(effecttime+i*(Math.PI/4)),HEIGHT/2+150*Math.sin(effecttime+i*(Math.PI/4)),50*i2,0,Math.PI*2)
        ctx.fill();
        
        ctx.beginPath()
        ctx.arc(WIDTH/2+350*Math.cos(-effecttime+i*(Math.PI/4)),HEIGHT/2+350*Math.sin(-effecttime+i*(Math.PI/4)),100*i2,0,Math.PI*2)
        ctx.fill();
        ctx.beginPath()
        ctx.arc(WIDTH/2+650*Math.cos(0.5*effecttime+i*(Math.PI/4)),HEIGHT/2+650*Math.sin(0.5*effecttime+i*(Math.PI/4)),150*i2,0,Math.PI*2)
        ctx.fill();
      }
      }
      }
      document.documentElement.style.setProperty("--x",(totalsize/100000)*avgx*((scoreeffect/10)+1)+"px");
      document.documentElement.style.setProperty("--y",(totalsize/100000)*avgy*((scoreeffect/10)+1)+"px");
      
      document.documentElement.style.setProperty("--toppp",(HEIGHT/2)+"px");
      
      ctx.beginPath();
      ctx.arc(WIDTH/2+avgx,HEIGHT/2+avgy,5,0,Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(WIDTH/2,HEIGHT/2,8+(scoreeffect/2),0,Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(WIDTH/2,HEIGHT/2,12+(scoreeffect2/2),0,Math.PI*2);
      ctx.stroke();
      if (playinggame == 0){
        
        
        
        
          ctx.strokeStyle = "#ffffff"
          ctx.font = "100px Verdana"
          ctx.strokeText("Analyzing",WIDTH/2-250,HEIGHT/2+150);
        
      if (Math.sqrt(Math.pow(avgx,2)+Math.pow(avgy,2))>0.25){
        var dir = (Math.atan(avgy/avgx))
        dir = dir/(Math.PI*2)*360
        dir = 45*Math.round(dir/45)
        if (avgx<0){
          dir+=180
        }
        if (dir<0){
          dir+=360
        }
        
        dir = dir/360*(Math.PI*2)
       diditwork[Math.round(audio.currentTime*10)]=1
        dirlist[Math.round(audio.currentTime*10)]=dir
        totalhits[Math.round(audio.currentTime*10)]=0
        ctx.beginPath();
        ctx.moveTo(WIDTH/2,HEIGHT/2)
        ctx.arc(WIDTH/2,HEIGHT/2,50,dir-Math.PI/8,dir+Math.PI/8)
        ctx.closePath();
        
        ctx.stroke();
      }else{
        dirlist[Math.round(audio.currentTime*10)]="no"
        totalhits[Math.round(audio.currentTime*10)]="0"
        
      }
      }else{
        
        var dir2 = (Math.atan(mmy/mmx))
        dir2 = dir2/(Math.PI*2)*360
        dir2 = 45*Math.round(dir2/45)
        if (mmx<0){
          dir2+=180
        }
        if (dir2<0){
          dir2+=360
        }
        
        dir2 = dir2/360*(Math.PI*2)
        ctx.font = (30+scoreeffect).toString()+"px Georgia"
        ctx.strokeText(Math.round(score),WIDTH/2+100,HEIGHT/2)
        
        
        var rat = 1-((diditwork.reduce(function(total, num){return total + num;}))/totalnum)
        ctx.strokeText(Math.round(rat*100)+"% Accuracy",50+ddxx,HEIGHT/2)
        ctx.strokeText("Rank "+"FFFFFDDCBAS".substring(Math.ceil(rat*10+0.1)-1,Math.ceil(rat*10+0.1)),75+dddxxx,HEIGHT/2+50)
        ctx.strokeText(combo+"x combo",WIDTH/2+100,HEIGHT/2-50)
        
        
        ctx.font = (25+scoreeffect3*3).toString()+"px Georgia"
        ctx.fillStyle = "#ffffff"
        if (scoretext=="X       "){
          ctx.strokeStyle = "#ff0000";
          
        } else if (scoretext=="Nice    "){
          ctx.strokeStyle = "#ffff00";
        } else if (scoretext=="Good    "){
          ctx.strokeStyle = "#00ff00";
        } else if (scoretext=="Great   "){
          ctx.strokeStyle = "#00ffff";
        } else if (scoretext=="Amazing "){
          ctx.strokeStyle = "#0000ff";
        } else {
          ctx.strokeStyle = "#ff00ff";
        }
        
        ctx.strokeText(scoretext,WIDTH/2+100,HEIGHT/2+50)
        ctx.fillText(scoretext,WIDTH/2+100,HEIGHT/2+50)
        
        
        
        if (isNaN(dir2)==false){
          direct = dir2;
        }
  
        ctx.strokeStyle = "#ffffff"
        
        
        
        ctx.strokeStyle = "#00ff77";
        ctx.lineWidth = 15;
        
        
        
        //bookmark:notes
        for(var i=1;i<=100;i++){
          
          var time = Math.round(audio.currentTime*10)
          var realtime = (audio.currentTime*10)-time
          
          if (i==1){
            if (direct == dirlist[i+time]){
              score+=5*(1+combo/10);
              if (diditwork[i+time]!= 0){
                diditwork[i+time]=0;
                combo++;
              }
              
              scoreeffect+=10;
              scoreeffect2+=2;
            }
            if (dirlist[i+time]!="no" && isNaN(dirlist[i+time])==false){
              if (totalhits[i+time]<5)
              if (direct == dirlist[i+time]){
              totalhits[i+time]+=1;
              scoreeffect3+=20;
              }
              scoretext = tochoosefrom.substring(8*totalhits[i+time],8*totalhits[i+time]+8)
              
            }
          }
          
          ctx.strokeStyle = "#00ff77";
        ctx.lineWidth = 15;
        
          
          ctx.beginPath();
          ctx.arc(WIDTH/2,HEIGHT/2,(15+scoreeffect2)*(i/1.25)+(-(15+scoreeffect2)*realtime)+10,dirlist[i+time]-Math.PI/8,dirlist[i+time]+Math.PI/8)
          ctx.stroke();
          
          ctx.fillStyle = "rgba(255,000,127,"+(100-i)/2000+")"
          ctx.strokeStyle = "rgba(255,255,127,"+(100-i)/100+")"
          
        ctx.lineWidth = 3;
        
          
          if((((20+scoreeffect2)*i+(-(20+scoreeffect2)*realtime)))>=100){
            ctx.beginPath();
          //ctx.moveTo(WIDTH/2,HEIGHT/2);
          if ((((20+scoreeffect2)*i+(-(20+scoreeffect2)*realtime))-250)>100){
          ctx.arc(WIDTH/2,HEIGHT/2,(((20+scoreeffect2)*i+(-(20+scoreeffect2)*realtime))-250),dirlist[i+time]+Math.PI/8,dirlist[i+time]-Math.PI/8,true)
          }else{
            ctx.arc(WIDTH/2,HEIGHT/2,100,dirlist[i+time]+Math.PI/8,dirlist[i+time]-Math.PI/8,true)
          }
          ctx.arc(WIDTH/2,HEIGHT/2,(20+scoreeffect2)*i+(-(20+scoreeffect2)*realtime),dirlist[i+time]-Math.PI/8,dirlist[i+time]+Math.PI/8)
          
          ctx.closePath();
          ctx.fill();
          
          
          
          
          }
          
          ctx.strokeStyle = "rgba(255,255,127,"+(25-i)/40+")"
          
        ctx.lineWidth = 3;
          
          ctx.beginPath();
          ctx.arc(WIDTH/2,HEIGHT/2,15+scoreeffect2/2+(i/7),dirlist[i+time]-Math.PI/8+(i/50),dirlist[i+time]+Math.PI/8-(i/50))
          ctx.arc(WIDTH/2,HEIGHT/2,45-(i/7),dirlist[i+time]+Math.PI/8-(i/50),dirlist[i+time]-Math.PI/8+(i/50),true)
          ctx.closePath();
          ctx.stroke();
          ctx.lineWidth = 2;
          
          ctx.beginPath();
          ctx.arc(WIDTH/2,HEIGHT/2,15+scoreeffect2/2+(i/7),dirlist[i+time]-Math.PI/8+(i/50),dirlist[i+time]+Math.PI/8-(i/50))
          ctx.arc(WIDTH/2,HEIGHT/2,45-(i/7),dirlist[i+time]+Math.PI/8-(i/50),dirlist[i+time]-Math.PI/8+(i/50),true)
          ctx.closePath();
          ctx.stroke();
          
          
        }
        if (diditwork[time]==1){
          combo = 0;
        }
        
        var ts2 = totalsize-45000;
        ctx.fillStyle = "rgba(255,255,255,"+(ts2/55000)+")"
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        
      }
      
      
      
      //distort(WIDTH/2-100,HEIGHT/2-100,200,200)
      
      
    }
    
    audio.play();
    renderFrame();
  };
};

