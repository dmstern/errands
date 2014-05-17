/*******************************************************************************
 * Main ViewModel:
 ******************************************************************************/
function ErrandsViewModel(lists) {

	var self = this;
	// app.addObserver(self);

	/*
	 * =========================================================================
	 * Properties:
	 * =========================================================================
	 */

	self.lists = ko.observableArray(lists);
	self.newListName = ko.observable("");
	self.contacts = ko.observableArray([ util.createDummyContact() ]);

	self.countAllOpenTasks = ko.computed(function() {
		var count = 0;
		self.lists().forEach(function(list) {
			count += list.countOpenTasks();
		});
		return count;
	}, self);

	self.heading = ko.computed(function() {
		var openTasks = self.countAllOpenTasks();
		if (openTasks > 0) {
			return consts.TITLE + " (" + openTasks + ")";
		} else {
			return consts.TITLE;
		}
	}, self);

	/*
	 * =========================================================================
	 * Operations
	 * =========================================================================
	 */

	/**
	 * 
	 */
	self.addList = function() {
		var newListID = util.createUID(consts.LIST);

		var newList = new List(newListID, self.newListName(), [], []);
		if (self.newListName() != "") {
			self.lists.push(newList);
			self.newListName("");
		}
	}.bind(self);

	/*
	 * TODO Besser wäre, wenn die Daten aus dem Model an die aus dem ViewModel
	 * gebunden werden könnten, sodass die GUI sich automatisch aktualisiert,
	 * wenn sich die Daten im Model geändert haben.
	 */
	self.getContacts = function(event, ui) {
		console.debug("getContacts");
		app.getContacts();
	};

	/**
	 * 
	 */
	self.store = function() {
		var data = JSON.stringify(self);
		console.log("storing: " + data);
		localStorage['lists'] = data;
	};

	/**
	 * 
	 */
	self.restore = function() {
		var data = localStorage['lists'];
		if (data != undefined) {
			console.log("restored: " + data);
		}
	};

	self.bindEvents = function() {
		app.addEventListener(events.FOUND_CONTACTS, function(contacts) {
			self.contacts(contacts);
		});
	};

	/*
	 * Init ViewModel:
	 */
	console.log("Init ViewModel...");
	self.bindEvents();
}
