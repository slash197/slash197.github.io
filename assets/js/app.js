let
	pointer = {
		pos: {
			x: null,
			y: null
		},
		diff: {
			x: 0,
			y: 0
		},
		c: 0.015
	},
	App = function(){
		this.centerProjectItems = function(){
			$('.item .info').each(function(){
				let
					parentHeight = $(this).parent().height(),
					height = $(this).height(),
					padding = (parentHeight - height) / 2;

				if (padding > 0) $(this).css({'padding-top': padding});
			});

			$('.item .assets img').each(function(){
				let
					top = $(this).data('top') ? $(this).data('top') : '50%',
					left = $(this).data('left') ? $(this).data('left') : '50%',
					width = $(this).width(),
					height = $(this).height(),
					margin = {
						v: (top === '50%') ? height / 2 * -1 : 0,
						h: (left === '50%') ? width / 2 * -1 : 0
					};

				$(this).css({
					'top': top,
					'left': left,
					'margin-left': margin.h,
					'margin-top': margin.v
				});
			});
		};
		
		this.resizeWindow = function(){
			this.centerProjectItems();
		};
		
		this.init = function(){
			$('.app').fullpage({
				menu: '.menu',
				autoScrolling: true,
				scrollHorizontally: false,
				afterRender: function(){
					this.resizeWindow();
				}.bind(this),
				afterResize: function(){
					this.resizeWindow();
				}.bind(this)
			});
				
			$(document).on('mousemove', 'body', function(e){		
				$('.hasTransition:inViewport').parallax(30, e);
			});

			$(window).resize(this.resizeWindow.bind(this));

			$.fn.parallax = function(resistance, mouse){
				let
					i = 0,
					nodes = $(this),
					factor = null;
			
				for (i = 0; i < nodes.length; i++)
				{
					factor = $(nodes[i]).hasClass('reverse') ? 1 : -1;

					TweenLite.to(nodes[i], 0.2, {
						x: ((mouse.clientX - window.innerWidth / 2) / resistance) * factor,
						y: ((mouse.clientY - window.innerHeight / 2) / resistance) * factor
					});
				}
			};				
		};
		
		this.init();
	},
	SWD = new App();
	
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