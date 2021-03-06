/**
 * @module {Module} bitballs/components/tournament/list <tournament-list>
 * @parent bitballs.components
 *
 * @group bitballs/components/tournament/list.properties 0 properties
 *
 * @description Provides links to the existing tournaments. Enables logged
 * in admin users to create and destroy tournaments.
 *
 * @signature `<tournament-list {is-admin}/>`
 *   Renders a list of tournaments.
 *
 *   @param {Boolean} is-admin Configures whether or not admin specific
 *   features are enabled.
 *
 *
 * @body
 *
 * To create a `<tournament-list>` element pass a boolean like [bitballs/app.prototype.isAdmin]:
 *
 * ```
 * <tournament-list
 *     {is-admin}="app.isAdmin" />
 * ```
 *
 * ## Example
 *
 * @demo public/components/tournament/list/list.html
 *
 */
import {
	Component, DefineMap
} from "can";
import Tournament from "bitballs/models/tournament";
import view from "./list.stache";
import "bootstrap/dist/css/bootstrap.css!";
import "can-stache-route-helpers";

export const ViewModel = DefineMap.extend('TournamentList',
/** @prototype */
{

	tournamentsPromise: {
		default: function(){
			return Tournament.getList({orderBy: "date"});
		}
	},
	/**
	* @property {bitballs/models/tournament} bitballs/components/tournament/list.tournament tournament
	* @parent bitballs/components/tournament/list.properties
	*
	* The [bitballs/models/tournament] model that backs the tournament
	* creation form.
	**/
	tournament: {
		Type: Tournament,
		Default: Tournament
	},
	/**
	* @property {Boolean} bitballs/components/tournament/list.isAdmin isAdmin
	* @parent bitballs/components/tournament/list.properties
	*
	* Configures whether or not admin specific features are enabled.
	**/
	isAdmin: {
		type: 'boolean',
		default: false
	},
	/**
	* @property {Promise<Tournament>} bitballs/components/tournament/list.savePromise savePromise
	* @parent bitballs/components/tournament/list.properties
	*
	* A promise that resolves when [bitballs/component/tournament/list.prototype.createTournament]
	* is called and the [bitballs/models/tournament] model is persisted to the server.
	**/
	savePromise: 'any',
	/**
	 * @function createTournament
	 *
	 * @description Creates the tournament on the server and when successful sets
	 * [bitballs/components/tournament/list.tournament] to a new [bitballs/models/tournament] model.
	 *
	 * @param {Event} [ev] A DOM Level 2 event.
     *
	 * @return {Promise<Tournament>} A [bitballs/models/tournament] model.
	 */
	createTournament: function(ev) {
		if (ev) {
			ev.preventDefault();
		}
		var self = this;

		var promise = this.tournament.save().then(function(player) {
			self.tournament = new Tournament();
		});

		this.savePromise = promise;
		return promise;
	},
	/**
	 * @function
	 * @description Delete a tournament from the database.
	 * @param {bitballs/models/tournament} tournament The [bitballs/models/tournament] to delete.
	 *
	 * @body
	 *
	 * Use in a template like:
	 * ```
	 * <span class="destroy-btn" ($click)="deleteTournament(.)"></span>
	 * ```
	 */
	deleteTournament: function (tournament) {
		if (! window.confirm('Are you sure you want to delete this tournament?')) {
			return;
		}
		tournament.destroy();
	}
});

export const TournamentList = Component.extend({
	tag: "tournament-list",
	view,
	ViewModel
});

export { TournamentList as Component };
