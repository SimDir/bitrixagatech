/*global $ */
$(document).ready(function () {

    "use strict";

    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    //$('.menu > ul > li > ul:not(:has(dl))').addClass('normal-sub');
   
   
    //$(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");
  
    $(".menu > ul > li").hover(function (e) {
        if ($(window).width() > 768) {
            $(this).toggleClass("on").children("ul").stop(true, false).slideToggle();
            e.preventDefault();
        }
    });
    

    $(".menu > ul > li").on("click",function(e){
        if ($(window).width() <= 768) {
            //$(this).children("ul").fadeToggle(150);
			
			 if($(this).hasClass('open')){
		        $('.menu > ul > li  ul').slideUp();
		        $('.menu > ul > li').removeClass('open');
	         }else{
				$('.menu > ul > li').removeClass('open'); 
				$('.menu > ul > li ul').slideUp(); 
				$(this).addClass('open');
				$(this).find('ul').slideDown(); 
			} 
		    
			/*$('.menu > ul > li >a').removeAttr('href');*/
			
			//e.preventDefault();
		 
        }
    });
      
 $(window).scroll(function(){
 if($(window).scrollTop()>90){
	$(".header").addClass("lineb");
	}
	else{
	$(".header").removeClass("lineb");
	}	 
})

/*$(".searchbtn").click(function(e){

  $('.header .search').slideToggle()
  $(".menu > ul").hide();
  $(".menu-mobile").removeClass("close");
 })*/
 
/*if ($(window).width() <= 768) { 
 $(document).bind("click",function(e){
	var target  = $(e.target);
	if(target.closest(".header").length == 0){
	    $(".header .search").slideUp();
	};
   e.stopPropagation();
 })
}*/
 
 $(".menu-mobile").click(function () {
    $(this).toggleClass("close");
   $(".menu > ul").fadeToggle();
   $('.header .search').hide();
         
});
  
});


