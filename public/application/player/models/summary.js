define(function(require) {
	var Backbone = require('backbone');

	return Backbone.Model.extend({
		url: function() { return '/api/Players/' + encodeURIComponent(this.id) + '/Summary/'; }
	});
});