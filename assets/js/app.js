let
	lg = console.log,
	pointer = {
		pos: {
			x: null,
			y: null
		},
		diff: {
			x: 0,
			y: 0
		},
		c: 0.05
	};

$(document).ready(function(){
	$('.portfolio .item .info').each(function(){
		let
			parentHeight = $(this).parent().height(),
			height = $(this).height();
			
		$(this).css({
			'padding-top': (parentHeight - height) / 2
		});
	});
	
	$('.portfolio .item .assets img').each(function(){
		let
			width = $(this).width(),
			height = $(this).height();
			
		$(this).css({
			'margin': '-' + (height / 2) + 'px 0px 0px -' + (width / 2) + 'px'
		});
	});
});

$(document).on('mousemove', '.hasTransition', function(e){
	if (!pointer.diff.x) pointer.diff.x = e.pageX;
	if (!pointer.diff.y) pointer.diff.y = e.pageY;
	
	pointer.diff.x = e.pageX - pointer.pos.x;
	pointer.diff.y = e.pageY - pointer.pos.y;
	pointer.pos.x = e.pageX;
	pointer.pos.y = e.pageY;

	let 
		pos = $(this).position(),
		top = pos.top + pointer.diff.y * pointer.c,
		left = pos.left + pointer.diff.x * pointer.c;
	
	lg(pointer.diff);
	$(this).css({
		top: top + 'px',
		left: left + 'px'
	});
});