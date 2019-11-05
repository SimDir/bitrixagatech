(function($){
	var defaults = {
		'container' : '#container', 
		'sections' : '.section', 
		'easing' : 'cubic-bezier(.17,.67,.52,.98)', 
		'duration' : 1000, 
		'pagination' : true,
		'loop' : true,
		'keyboard' : true,
		'direction' : 'vertical',//滑动的方向 horizontal,vertical,
		'onpageSwitch' : function(pagenum){}
	};

	var win = $(window),
		container,sections;

	var opts = {},
		canScroll = true;

	var iIndex = 0;

	var arrElement = [];

	var SP = $.fn.switchPage = function(options){
		opts = $.extend({}, defaults , options||{});

		container = $(opts.container),
		sections = container.find(opts.sections);

		sections.each(function(){
			arrElement.push($(this));
		});

		return this.each(function(){
			if(opts.direction == "horizontal"){
			initLayout();
			}

			if(opts.pagination){
				initPagination();
			}

			if(opts.keyboard){
				keyDown();
			}
		});
	}
	
	

	//滚轮向上滑动事件
	SP.moveSectionUp = function(){
		if(iIndex){
			iIndex--;
		}else if(opts.loop){
			iIndex = arrElement.length-1;
		}
		scrollPage(arrElement[iIndex]);
	};

	//滚轮向下滑动事件
	SP.moveSectionDown = function(){
		
		if(iIndex<(arrElement.length-1)){
			iIndex++;
		}else if(opts.loop){
			iIndex = 0;
		}
		scrollPage(arrElement[iIndex]);
	};
	 

	//私有方法
	//页面滚动事件
	function scrollPage(element){
		var dest = element.position();
		if(typeof dest === 'undefined'){ return; }
		initEffects(dest,element);
	}
    
	
	
	//重写鼠标滑动事件
	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if(canScroll){
			if (delta < 0) {
				SP.moveSectionDown();
			}else {
				SP.moveSectionUp();
			}
		}
		return false;
	}
    //点击左右切换	
   $(function(){
    $(".b1").click(function(){ 
	  SP.moveSectionUp(); 
	 })
	 
	 $(".b2").click(function(){ 
		SP.moveSectionDown();
	})
	 
	 
	//新增左右拖动 
	var obj = document.getElementById('container');
	var tpagex = 0;
	var tpagexmove = 0;
	obj.addEventListener('touchstart', function(event) {
			var touch = event.targetTouches[0];
			tpagex = touch.pageX;
	}, false); 
	   
	obj.addEventListener('touchend', function(event) {
		console.log(event);
			var touch = event.changedTouches[0];
			tpagexmove = touch.pageX;
		    
		    if(tpagexmove<tpagex && (tpagex-tpagexmove)>10 ){  
				
				console.log(1);
				SP.moveSectionDown();
				tpagex = 0;
				tpagexmove = 0;
				
			}else if(tpagexmove>tpagex && (tpagexmove-tpagex)>10){
				console.log(2);
				SP.moveSectionUp(); 
				
			}
		
	}, false);    
   
 //下面导航点击
	$(document).on('click','#pages li',function(){
		
		iIndex = $(this).index()
		scrollPage(arrElement[iIndex]);
		
		
	})  
	
	
	window.setInterval(SP.moveSectionDown,1200011); 
	   
   });
   
 
   
	//横向布局初始化
	function initLayout(){
		var length = sections.length,
			width = (length*100)+"%",
			cellWidth = (100/length).toFixed(2)+"%";
		container.width(width).addClass("left");
		sections.width(cellWidth).addClass("left");
	}

	//初始化分页
	function initPagination(){
		var length = sections.length; 
		if(length){

		}
		var pageHtml = '<ul id="pages"><li class="active"></li>';
		for(var i=1;i<length;i++){
			pageHtml += '<li></li>';
		}
		pageHtml += '</ul>';
		$("body").append(pageHtml);
	}

	//分页事件
	function paginationHandler(){
		var pages = $("#pages li");
		var pages1 = $(".menu>ul>li>a")
		pages.eq(iIndex).addClass("active").siblings().removeClass("active");
		var num=iIndex
		pages1.removeClass("active");
		if(iIndex==1){
		  pages1.eq(3).addClass("active");
		 } else if(iIndex>1){
		pages1.eq(1).addClass("active")
		}
		//pages1.removeClass("active");
		//pages1.eq(num).addClass("active");
		
	}
	
	

	//是否支持css的某个属性
	function isSuportCss(property){
		var body = $("body")[0];
		for(var i=0; i<property.length;i++){
			if(property[i] in body.style){
				return true;
			}
		}
		return false;
	}

	//渲染效果
	function initEffects(dest,element){
		var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
			transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

		canScroll = false;
		if(isSuportCss(transform) && isSuportCss(transition)){
			var traslate = "";
			if(opts.direction == "horizontal"){
				traslate = "-"+dest.left+"px, 0px, 0px";
			}else{
				traslate = "0px, -"+dest.top+"px, 0px";
			}
			container.css({
				"transition":"all "+opts.duration+"ms "+opts.easing,
				"transform":"translate3d("+traslate+")"
			});
			container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(){
				canScroll = true;
			});
		}else{
			var cssObj = (opts.direction == "horizontal")?{left: -dest.left}:{top: -dest.top};
			container.animate(cssObj, opts.duration, function(){
				canScroll = true;
			});
		}
		element.addClass("active").siblings().removeClass("active");
		if(opts.pagination){
			paginationHandler();
		}
	}

	//窗口Resize
	var resizeId;
	win.resize(function(){
		clearTimeout(resizeId);
		resizeId = setTimeout(function(){
			reBuild();
		},500);
	});

	function reBuild(){
		var currentHeight = win.height(),
			currentWidth = win.width();

		var element = arrElement[iIndex];
		if(opts.direction == "horizontal"){
			var offsetLeft = element.offset().left;
			if(Math.abs(offsetLeft)>currentWidth/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
			}
		}else{
			var offsetTop = element.offset().top;
			if(Math.abs(offsetTop)>currentHeight/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
			}
		}
		if(iIndex){
			paginationHandler();
			var cuerrentElement = arrElement[iIndex],
				dest = cuerrentElement.position();
			initEffects(dest,cuerrentElement);
		}
	}

	//绑定键盘事件
	function keyDown(){
		var keydownId;
		win.keydown(function(e){
			clearTimeout(keydownId);
			keydownId = setTimeout(function(){
				var keyCode = e.keyCode;
				if(keyCode == 37||keyCode == 38){
					SP.moveSectionUp();
				}else if(keyCode == 39||keyCode == 40){
					SP.moveSectionDown();
				}
			},150);
		});
	}
})(jQuery);