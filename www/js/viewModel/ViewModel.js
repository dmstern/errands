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

	self.lists = ko.observableArray(lists);
	self.newListName = ko.observable("");
	self.contacts = ko.observableArray([ util.getDummyContact() ]);

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
	self.findContacts = function(event, ui) {
		console.debug("Fordere Kontaktdaten an...");
		model.findContacts();
	};

	/**
	 * 
	 */
	self.contactsNotEmty = ko.computed(function() {
		return (self.contacts().length != 0
				&& self.contacts()[0] != util.getDummyContact());
	}, this);

	/**
	 * TODO Rausschmeißen, wenn nicht benötigt.
	 */
	self.store = function() {
		var data = JSON.stringify(self);
		console.log("storing: " + data);
		localStorage['lists'] = data;
	};

	/**
	 * TODO Rausschmeißen, wenn nicht benötigt.
	 */
	self.restore = function() {
		var data = localStorage['lists'];
		if (data != undefined) {
			console.log("restored: " + data);
		}
	};

	self.bindEvents = function() {
		model.addEventListener(events.FOUND_CONTACTS, function(contacts) {
			self.contacts(contacts);
		});
	};

	self.bindEvents();
}
