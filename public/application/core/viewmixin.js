define(function(require) {
	var Marionette = require('backbone.marionette');
	var moment = require('moment');

	// Might be a better way to do this...
	var mixinTemplateContext = Marionette.View.prototype.mixinTemplateContext;
	Marionette.View.prototype.mixinTemplateContext = function(target) {
		var data = mixinTemplateContext.call(this, target);

		data.moment = moment;
		data.formatDate = function(date) {
			return moment(date).format('LLL');
		}
		data.formatUnixTimestamp = function(timestamp) {
			return moment.unix(timestamp).format('LLL');
		}

		return data;
	}
});