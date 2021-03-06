/*******************************************************************************
 * Main ViewModel:
 ******************************************************************************/
function ErrandsViewModel(lists) {
	console.log("Init ViewModel...");

	var self = this;

	/* =========================================================================
	 * Properties:
	 * =======================================================================*/

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

	/* =========================================================================
	 * Operations
	 * =======================================================================*/

	self.addList = function() {
		var newListID = util.createUID(consts.LIST);

		var newList = new List(newListID, self.newListName(), [], []);
		if (self.newListName() != "") {
			self.lists.push(newList);
			self.newListName("");
		}
	}.bind(self);

	self.findContacts = function(event, ui) {
		console.debug("Fordere Kontaktdaten an...");
		model.findContacts();
	};

	self.contactsNotEmty = ko.computed(function() {
		return (self.contacts().length != 0
				&& self.contacts()[0] != util.getDummyContact());
	}, this);

	self.bindEvents = function() {
		model.addEventListener(events.FOUND_CONTACTS, function(contacts) {
			self.contacts(contacts);
		});
	};

	self.bindEvents();
}