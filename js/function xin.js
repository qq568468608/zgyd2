/* 
getClass("one"),
获取带有指定class名元素的集合
one  指定class名


思路：
1、 判断浏览器 document.getElementsByClassName
2、用指定的方法
   document.getElementsByClassName("one")
3、没有，用兼容（用已有的方法模拟）
   在所有的元素进行挑选 
   通过类名  all[i].className==指定的class
   all[i].className是否包含指定的className

   classname: 所要找的类名
   father: 通过父元素来找这个类名
*/

function getclass(classname,father){
	//father初始化
	var father=father||document;
	// var father=father?father:document;
	if(document.getElementsByClassName){
		return father.getElementsByClassName(classname);
	}else{
		var all=father.getElementsByTagName("*");
		var newarr=[];
		for(var i=0;i<all.length;i++){
        //当前元素的classname是否包含指定的classname
			if(checkclass(all[i].className,classname)){
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
/*
 "one two three"   "one" "two" "three"
 checkClass(str,classname)
 检查str里面是否包含classname
 思路：
 1、将str进行分割，转换成数组
 2、遍历数组，检查是否存在某个元素等于指定的classname
 3、相等 返回false   不相等 返回true
*/
function checkclass(str,classname){
	var arr=str.split(" ");
	for(var i = 0; i < all.length;i++){
		if(arr[i]==classname){
			return true;
		}
	}
	return false;
}

//获取和设置文本
/*
getContent(obj,[val])
获取或设置元素文本 
思路：
1、判断浏览器
2、判断val参数
3、获取或设置文本
*/
function getContent(obj,val){
    if(obj.textContent){
    	if(val){
    		obj.textContent=val;
    	}else{
    		return obj.textContent;
    	}
}else{
     if(val){
     	obj.innerText=val;
     }else{
         return obj.innerText;
     }
}
}

/*
//获取样式属性
getStyle(obj,attr)
思路：
1、判断浏览器 obj.currentStyle
2、IE6-8 obj.currentStyle.attr
3、w3c getComputedStyle(obj,null).attr 
*/
function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,null)[attr];
		}
	}

/*
//获取元素的兼容函数
$(select) 
$(".one") 通过classname获取元素
$("#one") 通过id获取元素
$("div")  通过标签获取元素
$("<div>")创建div
函数 window.onload=function(){}
思路：
1、判断参数的第一个字符  str.charAt(0)
2、根据字符执行相应的分支
   返回相应元素
*/
function $(select,content){
	content=content||document;
	var first=select.charAt(0);
	if(first=="."){
    return getclass(select.substring(1),content)
	}else if(first=="#"){
     return content.getElementById(select.slice(1));
	}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
    return content.getElementsByTagName(select);
	}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
		return document.createElement(select.slice(1,-1));
	}
}

function $(select,content){
	if(typeof select=="string"){
    content=content||document;
	var first=select.charAt(0);
	if(first=="."){
    return getclass(select.substring(1),content)
	}else if(first=="#"){
     return content.getElementById(select.slice(1));
	}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
    return content.getElementsByTagName(select);
	}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
		return document.createElement(select.slice(1,-1));
	}
	}else if(typeof select=="function"){
		window.onload=function(){
			select();

		}
	}
}


/*
getChild(obj,[type])
获取指定元素的子元素的集合
obj 指定的元素
type 指定获取元素类型
ture 获取元素节点
false 获取元素节点和有意义的文本
1、获取obj的所有的子元素
2、挑选 obj.nodeType==1
*/
function getChild(obj,type){
	//初始化type
	type=type==undefined?true:type;
   var arr=[];
   var child=obj.childNodes;
   if(type){
   for(var i=0;i<child.length;i++){
   	if(child[i].nodeType==1){
   		arr.push(child[i]);
   	}
   	
   }
   return arr;
   }else{
   	for(var i=0;i<child.length;i++){
   	if(child[i].nodeType==1||(child[i].nodeType==3&&child[i].nodeValue.replace(/^\s+|\s+$/g,""))){
   		arr.push(child[i]);
   	}
   	
   }
   return arr;
   }
}

//获取子节点中的第一个
function firstChild(obj){
	return getChild(obj)[0];
}

//获取子节点中的最后一个
function lastChild(obj){
	return getChild(obj)[getChild(obj).length-1];
}

//通过下标获取子节点中的任意一个
function numChild(obj,type,num){
	return getChild(obj,type)[num];
}

/*
beforeChild(obj,div)
给元素的最前面插入一个元素
obj 父元素
div 要插入的元素
思路：
1、获取obj第一个子元素
2、obj.insertBefore(div,firstChild)
*/
function beforeChild(obj,child){
	var first=firstChild(obj);
	 return obj.insertBefore(child,first);
}

/*
 insertAfter(obj,div,true)
 obj 要插入的位置
 div 要插入的元素
 type 类型 true 忽略文本
           false 不能忽略文本
 思路：
 1、是否有下一个兄弟节点
 2、往下一个兄弟节点的前面插入元素
 3、没有兄弟节点 直接在父元素的后面插入
*/
function insertAfter(obj,ele,type){
	type=type==underfined?true:type;
	var next=getNext(obj,type);
	var parent=obj.parentNode;
	if(next){
      parent.insertBefore(ele,next);
	}else{
		parent.appendChild(ele);
	}
}

/*
getNext(obj,true)
获取obj的下一个兄弟节点，如果有兄弟节点则返回该节点，没有返回false
obj 指定的对象
type 类型 true 忽略文本
          false 不能忽略文本
思路：
1、判断是否有下一个兄弟节点
2、如果没有返回false，有则判断next是否是元素节点或（有意义的文本）
3、更新next，继续寻找下一个兄弟节点
4、判断next是否为空，如果为空返回false，不为空则重复步骤2
*/
function getNext(obj,type){
     type=type==undefined?true:type;
     if(true){
       //忽略文本
       var next=obj.nextSibling;
       if(next==null){
       	return false;
       }
       //next的类型是注释或文本
       while(next.nodeType==8||next.nodeType==3){
       	next=next.nextSibling;
       	if(next==null){
       		return false;
       	}
       }
       return next;
     }else{
     	var next=obj.nextSibling;
       if(next==null){
       	return false;
       }
       //next的类型是注释或文本
       while(next.nodeType==8||next.nodeType==3&&(!next.nodeValue(/^\s+|\s+$/g,""))){
       	next=next.nextSibling;
       	if(next==null){
       		return false;
       	}
       }
       return next;

     }
}

/*
getNext(obj,true)
获取obj的下一个兄弟节点，如果有兄弟节点则返回该节点，没有返回false
*/
function getLast(obj,type){
     type=type==undefined?true:type;
     if(true){
       //忽略文本
       var next=obj.previousSibling;
       if(next==null){
       	return false;
       }
       //next的类型是注释或文本
       while(next.nodeType==8||next.nodeType==3){
       	next=next.previousSibling;
       	if(next==null){
       		return false;
       	}
       }
       return next;
     }else{
     	var next=obj.previousSibling;
       if(next==null){
       	return false;
       }
       //next的类型是注释或文本
       while(next.nodeType==8||next.nodeType==3&&(!next.nodeValue(/^\s+|\s+$/g,""))){
       	next=next.previousSibling;
       	if(next==null){
       		return false;
       	}
       }
       return next;

     }
}