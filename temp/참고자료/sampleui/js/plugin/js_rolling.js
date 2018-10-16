var js_rolling = function(box){
	// 시간단위는 ms로 1000이 1초
	if(box.nodeType==1){
		this.box = box;
	}else{
		this.box = document.getElementById(box);
	}
	this.is_rolling = false;
	this.mouseover_pause = true;
	this.direction = 2; //1:top, 2:right, 3:bottom, 4:left (시계방향) // 1번과 4번만 됨
	this.children =	null;
	this.move_gap = 10;	//움직이는 픽셀단위
	this.time_dealy = 100; //10; //움직이는 타임딜레이
	this.time_dealy_pause = 0; //2000;//하나의 대상이 새로 시작할 때 멈추는 시간, 0 이면 적용 안함
	this.time_timer=null;
	this.time_timer_pause=null;
	this.mouseover=false;
	this.init();
	this.set_direction(this.direction);
	this.start();
}
js_rolling.prototype.init = function(){
	this.box.style.position='relative';
	this.box.style.overflow='hidden';
	var children = this.box.childNodes;
	for(var i=(children.length-1);0<=i;i--){
		if(children[i].nodeType==1){
			children[i].style.position='relative';
		}else{
			this.box.removeChild(children[i]);
		}
	}
	var thisC=this;

	this.box.onfocus=function(){
		thisC.pause();		
	}
	this.box.onblur=function(){
		thisC.pause();		
	}
	this.box.onmouseover=function(){
		if(!thisC.mouseover_pause){	return;	}
		thisC.mouseover=true;
		if(!thisC.time_timer_pause){
			thisC.pause();
		}
	}
	this.box.onmouseout=function(){
		if(!thisC.mouseover_pause){return;}
		thisC.mouseover=false;
		if(!thisC.time_timer_pause){
			thisC.resume();
		}
	}
}
js_rolling.prototype.set_direction = function(direction){
	this.direction=direction;
	if(this.direction==2 ||this.direction==4){
		this.box.style.whiteSpace='nowrap';
	}else{
		this.box.style.whiteSpace='normal';
	}
	var children = this.box.childNodes;
	for(var i=(children.length-1);0<=i;i--){
			if(this.direction==1){
				children[i].style.display='block';
			}else if(this.direction==2){
				children[i].style.textlign='right';
				children[i].style.display='inline';
			}else if(this.direction==3){
				children[i].style.display='block';
			}else if(this.direction==4){
				children[i].style.display='inline';
			}
	}

	if(this.children == null) {
		this.init_element_children();
	}

}
js_rolling.prototype.init_element_children = function(){
	var children = this.box.childNodes;
	this.children = children;
	for(var i=(children.length-1);0<=i;i--){
			if(this.direction==1){
				children[i].style.top='0px';
			}else if(this.direction==2){
				children[i].style.left='-'+this.box.firstChild.offsetWidth+'px';
			}else if(this.direction==3){
				children[i].style.top='-'+this.box.firstChild.offsetHeight+'px';
			}else if(this.direction==4){
				children[i].style.left='0px';
			}
	}
}
js_rolling.prototype.act_move_up = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.top=(parseInt(child.style.top)-this.move_gap)+'px';
	}
	if((this.children[0].offsetHeight+parseInt(this.children[0].style.top))<=0){
		this.box.appendChild(this.children[0]);
		this.init_element_children();
		this.pause_act();
	}
}
js_rolling.prototype.move_up = function(){
	if(this.direction!=1&&this.direction!=3){return false;}
	this.box.appendChild(this.children[0]);
	this.init_element_children();
	this.pause_act();
}
js_rolling.prototype.act_move_down = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.top=(parseInt(child.style.top)+this.move_gap)+'px';
	}
	if(parseInt(this.children[0].style.top)>=0){
		this.box.insertBefore(this.box.lastChild,this.box.firstChild);
		this.init_element_children();
		this.pause_act();
	}
}
js_rolling.prototype.move_down = function(){
	if(this.direction!=1&&this.direction!=3){return false;}
	this.box.insertBefore(this.box.lastChild,this.box.firstChild);
	this.init_element_children();
	this.pause_act();
}
js_rolling.prototype.act_move_left = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.left=(parseInt(child.style.left)-this.move_gap)+'px';
	}
	if((this.children[0].offsetWidth+parseInt(this.children[0].style.left))<=0){
		this.box.appendChild(this.box.firstChild);
		this.init_element_children();
		this.pause_act();
	}
}
js_rolling.prototype.move_left = function(){
	if(this.direction!=2&&this.direction!=4){return false;}
	this.box.appendChild(this.box.firstChild);
	this.init_element_children();
	this.pause_act();
}
js_rolling.prototype.act_move_right = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.left=(parseInt(child.style.left)+this.move_gap)+'px';
	}

	if(parseInt(this.box.lastChild.style.left)>=0){
		this.box.insertBefore(this.box.lastChild,this.box.firstChild);
		this.init_element_children();
		this.pause_act();
	}
}
js_rolling.prototype.move_right = function(){
	if(this.direction!=2&&this.direction!=4){return false;}
	this.box.insertBefore(this.box.lastChild,this.box.firstChild);
	this.init_element_children();
	this.pause_act();
}
js_rolling.prototype.start = function(){ //롤링 시작
	var thisC = this;
	this.stop();
	this.is_rolling = true;
	var act = function(){
		if(thisC.is_rolling){
			if(thisC.direction==1){thisC.act_move_up();}
			else if(thisC.direction==2){thisC.act_move_right();thisC.act_move_right();}
			else if(thisC.direction==3){thisC.act_move_down();}
			else if(thisC.direction==4){thisC.act_move_left();}
		}
	}
	this.time_timer = setInterval(act,this.time_dealy);
}
js_rolling.prototype.pause_act = function(){ //일시 동작
	if(this.time_dealy_pause){
		var thisC = this;
		var act = function(){thisC.resume();thisC.time_timer_pause=null;}
		if(this.time_timer_pause){clearTimeout(this.time_timer_pause);}
		this.time_timer_pause = setTimeout(act,this.time_dealy_pause);
		this.pause();
	}
}
js_rolling.prototype.pause = function(){ //일시 멈춤
	this.is_rolling = false;
}
js_rolling.prototype.resume = function(){ //일시 멈춤 해제
	if(!this.mouseover){
		this.is_rolling = true;
	}
}
js_rolling.prototype.stop = function(){ //롤링을 끝냄
	this.is_rolling = false;
	if(!this.time_timer){
		clearInterval(this.time_timer);
	}
	this.time_timer = null
}