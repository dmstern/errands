/*******************************************************************************
 * Main ViewModel:
 ******************************************************************************/
function ErrandsViewModel(lists) {
	console.log("Init ViewModel...");
	
	var self = this;

	/*
	 * =========================================================================
	 * Properties:
	 * =========================================================================
	 */

	this.lists = ko.observableArray(lists);
	this.newListName = ko.observable("");
	this.contacts = ko.observableArray([ util.createDummyContact() ]);

	this.countAllOpenTasks = ko.computed(function() {
		var count = 0;
		this.lists().forEach(function(list) {
			count += list.countOpenTasks();
		});
		return count;
	}, this);

	this.heading = ko.computed(function() {
		var openTasks = this.countAllOpenTasks();
		if (openTasks > 0) {
			return consts.TITLE + " (" + openTasks + ")";
		} else {
			return consts.TITLE;
		}
	}, this);

	/*
	 * =========================================================================
	 * Operations
	 * =========================================================================
	 */

	/**
	 * 
	 */
	this.addList = function() {
		var newListID = util.createUID(consts.LIST);

		var newList = new List(newListID, this.newListName(), [], []);
		if (this.newListName() != "") {
			this.lists.push(newList);
			this.newListName("");
		}
	}.bind(this);

	/*
	 * Besser wäre, wenn die Daten aus dem Model an die aus dem ViewModel gebunden werden könnten, sodass die GUI sich automatisch aktualisiert, wenn sich die Daten im Model geändert haben. 
	 */
	this.getContacts = function(event, ui) {
		console.debug("getContacts");
		self.contacts(app.getContacts());
	};

	/**
	 * 
	 */
	this.store = function() {
		var data = JSON.stringify(this);
		console.log("storing: " + data);
		localStorage['lists'] = data;
	};

	/**
	 * 
	 */
	this.restore = function() {
		var data = localStorage['lists'];
		if (data != undefined) {
			console.log("restored: " + data);
		}
	};

}
