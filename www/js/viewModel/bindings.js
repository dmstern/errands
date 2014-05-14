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
 * Initial Test-Data:
 ******************************************************************************/
var users = new Array(new Contact(util.createUID(consts.USER), "Donald",
		new ContactName("Donald Duck", "Duck", null, null, null, null), "Don",
		null, null, null, null, null, null, null, null, null, null),
		new Contact(util.createUID(consts.USER), "Mickey", new ContactName(
				"Mickey Mouse", "Mouse", "Mickey", null, null, null), "Mick", null, null, null,
				null, null, null, null, null, null, null), new Contact(util
				.createUID(consts.USER), "Dagobert", new ContactName("Dagobert Duck",
				"Duck", "Dagobert", null, null, null), "Daggy", null, null, null, null,
				null, null, null, null, null, null));
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
