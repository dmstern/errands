/*******************************************************************************
 * Trigger for re-apply QJM-Styles after adding items
 ******************************************************************************/
ko.bindingHandlers.jqmRefreshList = {
	update : function(element, valueAccessor) {
		// just to create a dependency:
		ko.utils.unwrapObservable(valueAccessor());

		// Refresh Listview after update:
		$(element).listview().listview("refresh");

		// Refresh CheckboxFieldset after update
		$("[data-role=controlgroup]").enhanceWithin().controlgroup()
				.controlgroup("refresh");

		$(element).enhanceWithin().collapsibleset().collapsibleset("refresh");

		// Apply dynamic style classes:
		domEditor.applyStyles();
	}
};

/*******************************************************************************
 * Main ViewModel:
 ******************************************************************************/
function ErrandsViewModel(lists) {
	console.log("Init ViewModel...");

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

/*******************************************************************************
 * Initial Test-Data:
 ******************************************************************************/
var users = new Array(new Contact(util.createUID(consts.USER), "Donald",
		"Duck", "Donald", null, null, null, null, null, null, null, null, null,
		null), new Contact(util.createUID(consts.USER), "Mickey", "Mouse",
		"Mickey", null, null, null, null, null, null, null, null, null, null),
		new Contact(util.createUID(consts.USER), "Dagobert", "Duck",
				"Dagobert", null, null, null, null, null, null, null, null,
				null, null));
var lists = new Array(new List("list1", "Privat", [ users[0], users[1] ], [
		new Task("task1", "Kind abholen", true),
		new Task("task2", "Arzttermin", true) ]), new List("list2", "Arbeit",
		[ users[2] ], [ new Task("task3", "Druckerpatronen", false),
				new Task("task4", "Papier", false) ]), new List("list3",
		"Haushalt", users, [ new Task("task5", "Milch", false),
				new Task("task6", "Brot", false) ]));

/*******************************************************************************
 * Activates knockout.js
 ******************************************************************************/
var viewModel = new ErrandsViewModel(lists);
ko.applyBindings(viewModel);
console.log("Applying DataBindings...");
