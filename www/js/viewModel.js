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

		// Apply dynamic style classes:
		applyStyles();
	}
};

/*******************************************************************************
 * ViewModel for Lists and Tasks:
 ******************************************************************************/
function ErrandsViewModel(lists) {
	this.lists = ko.observableArray(lists);

	this.newListName = ko.observable("");

	this.addList = function() {
		var newListID = createUID(LIST);

		var newList = new List(newListID, this.newListName(), [], []);
		if (this.newListName() != "") {
			this.lists.push(newList);
			this.newListName("");
		}
		// Ensure that "this" is always this view model:
	}.bind(this);

	this.store = function() {
		var data = JSON.stringify(this);
		console.log("storing: " + data);
		localStorage['lists'] = data;
	}

	this.restore = function() {
		var data = localStorage['lists'];
		if (data != undefined) {
			console.log("restored: " + data);
		}
	}
}

/*******************************************************************************
 * List Object
 ******************************************************************************/
function List(id, name, members, tasks) {
	/*
	 * Properties =======================================================
	 */
	this.id = id;
	this.name = name;
	this.members = ko.observableArray(members);
	this.tasks = ko.observableArray(tasks);
	this.page = "#" + id;
	this.listviewID = id + LISTVIEW;

	/*
	 * List Operations ===================================================
	 */
	// Add New Task:
	this.newTaskName = ko.observable("");
	this.addTask = function() {
		var newTaskID = createUID(TASK);

		var newTask = new Task(newTaskID, this.newTaskName(), false);

		if (this.newTaskName() != "") {
			this.tasks.push(newTask);
			this.newTaskName("");
		}

	}.bind(this);

	// Share List:
	this.share = function() {
		console.log("shareList: " + this.name);
	}
}

/*******************************************************************************
 * Tasks Object TODO Weitere Attribute hinzufügen
 ******************************************************************************/
function Task(id, name, done) {
	/*
	 * Properties
	 */
	this.id = id;
	this.name = ko.observable(name);
	this.done = ko.observable(done);

	/*
	 * Operations
	 */
	this.check = function() {
		alert("done.");
	}

}

/*******************************************************************************
 * Initial Test-Data:
 ******************************************************************************/
var lists = new Array(new List("list1", "Privat", [ "Tom", "Jerry" ], [
		new Task("task1", "Kind abholen", false),
		new Task("task2", "Arzttermin", false) ]), new List("list2", "Arbeit",
		[ "Tom" ], [ new Task("task3", "Druckerpatronen", false),
				new Task("task4", "Papier", false) ]), new List("list3",
		"Haushalt", [ "Tom", "Jerry" ], [ new Task("task5", "Milch", false),
				new Task("task6", "Brot", false) ]));

/*******************************************************************************
 * Activates knockout.js
 ******************************************************************************/
var viewModel = new ErrandsViewModel(lists);
ko.applyBindings(viewModel);
