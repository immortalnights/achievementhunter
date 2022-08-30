define(function(require) {
	'use strict';

	const Backbone = require('backbone');

	return Backbone.Model.extend({
		url: function() { return '/api/Games/' + encodeURIComponent(this.id); },

		resynchronize: function(data)
		{
			return Backbone.ajax({
				url: this.url() + '/Resynchronize/invoke/',
				method: 'put',
				data: JSON.stringify(data),
				contentType: 'application/json'
			});
		}
	});
});