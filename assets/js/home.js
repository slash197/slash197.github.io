$.extend($.expr[':'],{
    inViewport: function(a){
		let 
			bounds = $(a).offset(),
			viewport = {
				top : $('body').scrollTop(),
				left : $('body').scrollLeft()
			};
		
		viewport.right = viewport.left + window.innerWidth;
		viewport.bottom = viewport.top + window.innerHeight;

		bounds.right = bounds.left + $(a).outerWidth();
		bounds.bottom = bounds.top + $(a).outerHeight();

		return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	}
});

let
	App = function(){		
		this.init = function(){
			$('.hero h1').css('opacity', 1);
			window.setTimeout(function(){
				$('.hero p').css('opacity', 1);
			}, 100);
		};
		
		this.init();
	},
	SWD = new App();
	
$(document).on('click', '[href="my-project"]', function(e){
	e.preventDefault();
	
	TweenLite.to(window, 1, {scrollTo: {y: $('.request').offset().top}});
});
	
$(document).on('click', '[href="feedback"]', function(e){
	e.preventDefault();
	
	TweenLite.to(window, 1, {scrollTo: {y: $('.feedback').offset().top}});
});
	
$(document).on('mousemove', 'body', function(e){		
	$('.hasTransition:inViewport').parallax(30, e);
});

$.fn.parallax = function(resistance, mouse){
	let
		factor = -1,
		bg = $('.hero .overlay');
	
	TweenLite.to(bg[0], 0.2, {
		'background-position': ((mouse.clientX - window.innerWidth / 2) / (resistance * 3)) * factor + 'px ' + ((mouse.clientY - window.innerHeight / 2) / (resistance * 3)) * factor + 'px'
	});
};