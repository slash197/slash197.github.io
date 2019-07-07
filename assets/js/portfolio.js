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

String.prototype.safe = function(){
	return this.replaceAll(' ', '-').stripDashes();
};

String.prototype.replaceAll = function(find, replace){
	function escapeRegExp(str)
	{
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	
	return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

String.prototype.stripDashes = function(){
	var str = this;
	
	str = str.replaceAll('-----', '-');
	str = str.replaceAll('----', '-');
	str = str.replaceAll('---', '-');
	
	return str.replaceAll('--', '-');
};

import Data from './data.js';

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
		this.loadAssets = function(parent){
			let assets = parent.querySelectorAll('img');
			
			for (let i = 0; i < assets.length; i++)
			{
				if ((window.innerWidth < 1099) && (i > 0)) break;
					
				let img = assets[i];
				
				img.src = img.getAttribute('data-url');
				img.onload = function(){
					let
						top = this.getAttribute('data-top') ? this.getAttribute('data-top') : '50%',
						left = this.getAttribute('data-left') ? this.getAttribute('data-left') : '50%',
						width = this.width,
						height = this.height,
						margin = {
							v: (top === '50%') ? height / 2 * -1 : (top === '100%') ? height * -1 : 0,
							h: (left === '50%') ? width / 2 * -1 : (left === '100%') ? width * -1 : 0
						};

					$(this).css({
						'top': window.innerWidth > 1099 ? top : '50%',
						'left': window.innerWidth > 1099 ? left : 'auto',
						'right': window.innerWidth > 1099 ? 'auto' : 10,
						'margin-left': margin.h,
						'margin-top': margin.v,
						'opacity': 1
					});
				};
			}
		};
		
		this.centerProjectItems = function(){
			$('.item .info').each(function(){
				let
					parentHeight = $(this).parent().height(),
					height = $(this).height(),
					padding = (parentHeight - height) / 2;

				if (padding > 0) $(this).css({'padding-top': padding});
			});
		};
		
		this.resizeWindow = function(){
			this.centerProjectItems();
		};
		
		this.init = function(){
			let
				i = 0,
				j = 0,
				left = null,
				top = null,
				bgIndex = 0,
				p = null,
				a = null,
				assets = '',
				html = '';
			
			for (i = 0; i < Data.Projects.length; i++)
			{
				p = Data.Projects[i];
				assets = '';
				
				if (!p.name) continue;
				
				for (j = 0; j < p.assets.length; j++)
				{
					a = p.assets[j];
					
					left = a.left ? a.left : 50;
					top = a.top ? a.top : 50;
					
					assets += '<img class="hasTransition ' + a.cls + '" data-url="assets/image/projects/' + a.src + '" alt="' + p.name + '" data-left="' + left + '%" data-top="' + top + '%" />';
				}
				
				html +=
					'<div class="section" data-anchor="' + p.name.safe() + '">' +
						'<div class="item ' + p.bg + '">' +
							'<div class="overlay ' + Data.Background[bgIndex] + '"></div>' +
							'<div class="info">' +
								'<div class="counter"><span>' + (i + 1) + '</span>|<span>' + Data.Projects.length + '</span></div>' +
								'<p class="category">' + p.category + '</p>' +
								'<h1>' + p.heading + '</h1>' +
								'<p>' + p.sub + '</p>' +
								'<p><a class="btn btn-info" href="https://slashwebdesign.studio/out.php?u=' + p.url + '" target="_blank">View project</a></p>' +
							'</div>' +
							'<div class="assets">' + assets + '</div>' +
						'</div>' +
					'</div>'
				;
				
				bgIndex++;
				
				$('.menu ul').append('<li data-menuanchor="' + p.name.safe() + '"><a href="#' + p.name.safe() + '">/' + p.name + '</a></li>');
				
				if (bgIndex === Data.Background.length) bgIndex = 0;
			}
			
			$('.app')
				.append(html)
				.fullpage({
					menu: '.menu',
					autoScrolling: true,
					scrollHorizontally: false,
					afterRender: function(){
						this.resizeWindow();
					}.bind(this),
					afterLoad: function(origin, destination, direction){
						this.loadAssets(destination.item);
					}.bind(this),
					afterResize: function(){
						this.resizeWindow();
					}.bind(this)
				});
		};
		
		this.init();
	},
	SWD = new App();
			
$(document).on('mousemove', 'body', function(e){
	if (window.innerWidth > 1099) $('.hasTransition:inViewport').parallax(30, e);
});

$(window).resize(SWD.resizeWindow.bind(SWD));

$.fn.parallax = function(resistance, mouse){
	let
		i = 0,
		nodes = $(this),
		factor = 1,
		bg = $(this).parent().prevAll('.overlay');

	for (i = 0; i < nodes.length; i++)
	{
		factor = $(nodes[i]).hasClass('reverse') ? 1 : -1;

		TweenLite.to(nodes[i], 0.2, {
			x: ((mouse.clientX - window.innerWidth / 2) / resistance) * factor,
			y: ((mouse.clientY - window.innerHeight / 2) / resistance) * factor
		});
	}
	
	// background
	factor *= -1;
	
	TweenLite.to(bg[0], 0.2, {
		'background-position': ((mouse.clientX - window.innerWidth / 2) / (resistance * 3)) * factor + 'px 0px'
	});
};