/*global $ */
$(document).ready(function () {
 $(".footer dl").hover(function(){$(this).find("dd").fadeIn()},function(){$(this).find("dd").fadeOut()}
 );
 
$(".kf").click(function(){
 $(".mask").show();	 
 $(".contact_pop").addClass("niu");	

})

$(".contact_pop .close,.mask,.close").click(function(){
 $(".mask").hide();	 
 $(".contact_pop").removeClass("niu");	
 $(".wechatbox").removeClass("niu"); 
  $(".wechatbox1").removeClass("niu");	

})
 
 
});

//返回顶部
$(function(){
	$(window).scroll(function(){
	if($(window).scrollTop()>120){
	$(".side-bar .gotop").fadeIn();
	}
	else{
	$(".side-bar .gotop").fadeOut();
	}
	});
	$(".side-bar .gotop").click(function(){
	$('html,body').animate({'scrollTop':0},500);
	});
});