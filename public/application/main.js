require.config({
	baseUrl: '/application',

	paths: {
		'requireLib': '/node_modules/requirejs/require',
		'jquery': '/node_modules/jquery/dist/jquery',
		// 'bootstrap' : "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min",
		// 'cookies': '/node_modules/js-cookie/src/js.cookie',
		'underscore': '/node_modules/underscore/underscore',
		'text': '/node_modules/requirejs-text/text',
		'tpl': '/node_modules/requirejs-underscore-tpl/underscore-tpl',
		'backbone': '/node_modules/backbone/backbone',
		'backbone.marionette': '/node_modules/backbone.marionette/lib/backbone.marionette',
		'backbone.radio': '/node_modules/backbone.radio/build/backbone.radio',
		'backbone.poller': '/node_modules/backbone-poller/backbone.poller.min',
		'moment': '/node_modules/moment/min/moment-with-locales',
		// 'materialize': '/node_modules/backbone-poller/backbone.poller.min',
		// 'fontawesome': '/node_modules/@fortawesome/fontawesome/index',
		// 'fontawesome-solid': '/node_modules/@fortawesome/fontawesome-free-solid/index',
		// 'fontawesome-regular': '/node_modules/@fortawesome/fontawesome-free-regular/index',
		// 'fontawesome-brands': '/node_modules/@fortawesome/fontawesome-free-brands/index'
	}
});

let once = false;

requirejs(['application', 'jquery', 'underscore', 'moment',/*'fontawesome', 'fontawesome-solid', 'fontawesome-regular', 'fontawesome-brands'*/], function(application, $, _, moment) {
	'use strict';

	window._ = _;

	const app = application();
	_.defer(app.start.bind(app));
}, function(err) {
	if (!once)
	{
		once = true;
		document.getElementsByTagName('body')[0].innerHTML = '<div class="error">' + err + '</div>';
		console.error(err);
	}
});
