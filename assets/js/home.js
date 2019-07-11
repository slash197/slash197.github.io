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
			VANTA.WAVES({
				el: '.hero',
				color: '#1f384b',
				waveHeight: 20,
				shininess: 10,
				waveSpeed: 0.5,
				zoom: 0.75
		  	});

			window.setTimeout(function(){
				$('.hero h1').css('opacity', 1);

				window.setTimeout(function(){
					$('.hero h2').css('opacity', 1);

					window.setTimeout(function(){
						$('.hero p').css('opacity', 1);
					}, 1000);
				}, 500);
			}, 500);

			$('.feedback').prepend(
				'<svg viewBox="0 0 500 50" preserveAspectRatio="xMinYMin meet">' +
					'<defs>' +
						'<clipPath id="path">' +
							'<path d="M0,20 C100,80 350,0 500,30 L500,00 L0,0 Z" style="stroke: none; fill: red" />' +
						'</clipPath>' +
					'</defs>' +
					'<rect width="100%" height="100" fill="#ffffff" clip-path="url(#path)" />' +
				'</svg>'
			);
		};

		this.init();
	},
	SWD = new App();

$(document).on('click', '.btn-send', function(){
	if (!$('input[name="name"]').val())
	{
		toastr(1, 'Please fill in your name');
		return false;
	}
	if (!$('input[name="project"]').val())
	{
		toastr(1, 'Please fill in your project');
		return false;
	}
	if (!$('input[name="email"]').val())
	{
		toastr(1, 'Please fill in your email address');
		return false;
	}

	$.ajax({
		url: 'send.php',
		type: 'post',
		data: {
			name: $('input[name="name"]').val(),
			project: $('input[name="project"]').val(),
			email: $('input[name="email"]').val()
		},
		success: function(r){
			lg(r);

			$('input[name="name"]').val('');
			$('input[name="project"]').val('');
			$('input[name="email"]').val('');

			toastr(0, 'Thank you, we will get back to you as soon as possible');
		}
	});
});

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

function toastr(cls, text)
{
	var ico = '', index = $('.toastr').length + 1;

	switch (cls)
	{
		case 0: ico = 'ico-check'; break;
		case 1: ico = 'ico-close'; break;
		case 2: ico = 'ico-info-outline'; break;
	}

	$('body').append('<div class="toastr" data-index="' + index + '" data-type="' + cls + '"><span class="ico ' + ico + '"></span><div>' + text + '</div></div>');
	toastrHandler($('.toastr[data-index="' + index + '"]'));
}

function toastrHandler(obj)
{
	obj.animate(
		{ opacity: 1 },
		350,
		function(){
			setTimeout(function(){
				obj.animate(
					{ opacity: 0 },
					250,
					function(){
						obj.remove();
						$('.toastr').each(function(){
							var index = parseInt($(this).attr('data-index'), 10);
							$(this).attr('data-index', index - 1);
						});
					}
				);
			}, 3000);
		}
	);
}
