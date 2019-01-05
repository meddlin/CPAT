import { Meteor } from 'meteor/meteor';
import { Targets } from './targets';

Meteor.methods({
	'targets.insert': function insert(data) {
		return Targets.insert({
			name: data.targetName,
			region: data.region
		});
	}
});