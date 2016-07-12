//banner
var bannerbox=$(".banner")[0];
  var as=$("a",bannerbox);
  // alert(as.length)
  var btn=$(".btn",bannerbox);
  var left=$(".banner-left",bannerbox)[0];
  var right=$(".banner-right",bannerbox)[0];
  var flag=true;
  var now=0;
   var next=0;
  for (var i = 1; i < as.length; i++) {
    as[i].style.left="740px"
   };

   
   function moveLeft(){
      next++;
      if(next>=as.length){
        next=0;
      }
      as[next].style.left="740px";
      animate(as[now],{left:-740});
      animate(as[next],{left:0},function(){flag=true});
      for (var i = 0; i < btn.length; i++) {
        btn[i].style.background="#ced1ce";
        as[i].style.zIndex=0
      };
      btn[next].style.background="#e22386";
      as[next].style.zIndex=1
      now=next;
   }
   var t=setInterval(moveLeft,2000);

   bannerbox.onmouseover=function(){
      clearInterval(t);
      left.style.display="block";
      right.style.display="block";
   }
   bannerbox.onmouseout=function(){
      t=setInterval(moveLeft,2000);
      left.style.display="none";
      right.style.display="none";
   }

   right.onclick=function(){
    if(flag){
    flag=false;
       moveLeft();
        }
   }

   left.onclick=function(){
      if(flag){
    flag=false;
      moveRight();
    }
   }
  function moveRight(){
    next--;
      if(next<=-1){
         next=as.length-1;
      }
      as[next].style.left="-740px";
      animate(as[now],{left:740});
      animate(as[next],{left:0},function(){flag=true});
      for (var i = 0; i < btn.length; i++) {
        btn[i].style.background="#ced1ce";
        as[i].style.zIndex=0;
      };
      btn[next].style.background="#e22386";
      as[next].style.zIndex=1;
      now=next;
  }

   for (var i = 0; i < btn.length; i++) {
      btn[i].index=i;
      btn[i].onclick=function(){
        if(now==this.index){
             return;
    }
  
        as[this.index].style.left="740px";
        btn[now].style.background="#ced1ce";
        btn[this.index].style.background="#e22386";
        animate(as[now],{left:-740});
        animate(as[this.index],{left:0});
        next=this.index;
        now=this.index;
      }
    };




//下拉
var yiji=$(".yiji");
var erji=$(".erji");
for (var i = 0; i < yiji.length; i++) {
  yiji[i].index=i
  hover(yiji[i],function(){
        var lis=$("li",erji[this.index]);
        var h=getStyle(lis[0],"height")
        erji[this.index].style.height=40+"px";
        //animate(erji[this.index],{height:40},300)
  },function(){
        erji[this.index].style.height="0px";
        //animate(erji[this.index],{height:0},300)
  })
};


//下轮播
 $(function(){
       var win=$(".lunbobox")[0];
       var imgbox=$(".top-column")[0];
    var as=$(".topcolumn-main",imgbox);
    var widths=parseInt(getStyle(as[0],"width"));
    var btnL=$(".main-left")[0];
    var btnR=$(".main-right")[0];
    var flag=true;    
    /*
       设置imgbox宽度
    */
    // imgbox.style.width=widths*as.length+"px";
 
    var t=setInterval(moveL,1500);
    /*
         先移动imgbox，然后把第一张图片移到最后
    */
    function moveL(){
          animate(imgbox,{left:-widths},function(){
            flag=true;
            var first=firstChild(imgbox);
            imgbox.appendChild(first);
            imgbox.style.left=0;
          })
      }
    /*
    先扒图，后动画
    1、把最后一张图片插入到最前面
    2、移动imgbox
  */
    function moveR(){
    var last=lastChild(imgbox);
        beforeChild(imgbox,last);
        imgbox.style.left=-widths+"px";
        animate(imgbox,{left:0},function(){flag=true});
      }
  

     win.onmouseover=function(){
     clearInterval(t);
       }
       win.onmouseout=function(){
     t=setInterval(moveL,1500);
       }

    btnL.onclick=function(){
  if(flag){
    flag=false;
  moveL();
    }
    }

    btnR.onclick=function(){
  if(flag){
    flag=false;
  moveR();
    }
    }

  })
