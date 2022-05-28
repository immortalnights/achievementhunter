define(function(require) {
	const Marionette = require('backbone.marionette');
	const _ = require('underscore');

	return Marionette.NextCollectionView.extend({
		tagName: 'ul',
		className: '',
		childView: Marionette.View,
		childViewOptions: {
			tagName: 'li',
			template: _.template("&lt;missing template&gt;")
		},
		emptyView: Marionette.View,
	});
});