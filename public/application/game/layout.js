define(function(require) {
	'use strict';

	const Backbone = require('backbone');
	const Marionette = require('backbone.marionette');
	const template = require('tpl!game/templates/layout.html');
	const achievementTemplate = require('tpl!game/templates/achievement.html');

	return Marionette.View.extend({
		template: template,

		regions: {
			unlockedAchievementsLocation: '#unlockedachievements',
			lockedAchievementsLocation: '#lockedachievements'
		},

		events: {
			'click a[data-control="resynchronize"]': 'onResynchronize'
		},

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		},

		serializeData: function()
		{
			const data = Marionette.View.prototype.serializeData.call(this);

			data._summary = {
				global: true,
				playerUnlocked: null,
				playerPercent: null,
				minDifficulty: 0,
				maxDifficulty: 0
			};

			const achievements = this.model.get('achievements');
			if (this.getOption('playerId'))
			{
				data._summary.global = false;
				if (_.isEmpty(achievements))
				{
					data._summary.playerUnlocked = 0;
					data._summary.playerPercent = 0;
				}
				else
				{
					const unlockedAchievements = _.filter(achievements, function(achievement) { return achievement.unlocked; });

					data._summary.playerUnlocked = unlockedAchievements.length;

					data._summary.playerPercent = ((data._summary.playerUnlocked / achievements.length) * 100).toFixed(0);
				}
			}

			if (_.isEmpty(achievements))
			{
				data._summary.minDifficulty = 0;
				data._summary.maxDifficulty = 0;
			}
			else
			{
				data._summary.minDifficulty = _.min(achievements, 'percent').percent.toFixed(2);
				data._summary.maxDifficulty = _.max(achievements, 'percent').percent.toFixed(2);
			}

			return data;
		},

		onRender: function()
		{
			const achievements = new Backbone.Collection(this.model.get('achievements'));

			let unlocked = new Backbone.Collection(achievements.filter(function(achievement) {
				return achievement.get('unlocked') !== false;
			}));
			// unlocked.each(function(achievement) {
			// 	achievement.set('unlocked', true);
			// });
			// unlocked.sort();

			let locked = new Backbone.Collection(achievements.filter(function(achievement) {
				return achievement.get('unlocked') === false;
			}), {
				comparator: function(achievement) {
					return -achievement.get('percent');
				}
			});
			// locked.each(function(achievement) {
			// 	achievement.set('unlocked', false);
			// });

			locked.sort();

			this.showChildView('unlockedAchievementsLocation', new Marionette.NextCollectionView({
				className: 'achievement-list',
				collection: unlocked,
				childView: Marionette.View,
				childViewOptions: {
					template: achievementTemplate
				}
			}));

			this.showChildView('lockedAchievementsLocation', new Marionette.NextCollectionView({
				className: 'achievement-list',
				collection: locked,
				childView: Marionette.View,
				childViewOptions: {
					template: achievementTemplate
				}
			}));
		},

		onResynchronize: function()
		{
			let data;
			const playerId = this.getOption('playerId');
			if (playerId)
			{
				data = { playerId: playerId };
			}

			this.model.resynchronize(data);
		}
	});
});