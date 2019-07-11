/*
 * © 2019 SlashWebDesign
 */

let
	ts = new Date().getTime(),
	url = new URL(window.location.href),
	debug = true;

function lg(o, level){
	if (!level) level = 'info';

	if (console)
	{
		switch (level)
		{
			case 'trace': console.log('%c' + o, 'color: #2f68b4'); break;
			case 'error': console.error(o); break;
			case 'warn': console.warn(o); break;
			case 'log':
			case 'info':
			default: console.log(o); break;
		}
	}
};

function loadScript(source, callback, cached, module){
	let script = document.createElement('script');

	script.src = !debug || cached ? source : source + '?v=' + ts;
	script.async = false;
	script.defer = false;
	script.type = module ? 'module' : '';
	script.onerror = function(){
		lg('loading > error loading file [' + source + ']', 'error');
	};

	if (typeof callback === 'function') script.onload = callback;

	document.body.appendChild(script);
};

function loadStyle(source, callback, cached){
	let style = document.createElement('link');

	style.href = cached ? source : source + '?v=' + ts;
	style.rel = 'stylesheet';
	style.type = 'text/css';
	style.onerror = function(){
		lg('loading > error loading file [' + source + ']', 'error');
	};

	if (typeof callback === 'function') style.onload = callback;

	document.getElementsByTagName('head')[0].appendChild(style);
};

window.onerror = function(msg, source, line, col, error){
	lg(msg + ' in ' + source + ' on line ' + line, 'error');
	if (error) lg(error, 'error');
};

loadScript('https://www.googletagmanager.com/gtag/js?id=UA-74596211-1', function(){
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-74596211-1');
});

loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js', null, true);
loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/ScrollToPlugin.min.js', null, true);

loadScript('assets/js/jquery.min.js', function(){
	loadScript('assets/js/fullpage.js', function(){
		if (url.pathname.indexOf('portfolio') > -1)
		{
			loadScript('assets/js/portfolio.js', null, false, true);
		}
		else
		{
			loadStyle('https://fonts.googleapis.com/icon?family=Material+Icons', null, true);
			loadScript('assets/js/three.min.js', function(){
				loadScript('assets/js/vanta.waves.min.js', function(){
					loadScript('assets/js/home.js', null, false, true);
				});
			});
		}
	}, true);
}, true);
