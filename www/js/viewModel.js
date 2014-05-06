/*******************************************************************************
 * Trigger for re-apply QJM Styles after adding items
 ******************************************************************************/
ko.bindingHandlers.jqmRefreshList = {
	update : function(element, valueAccessor) {
		// just to create a dependency:
		ko.utils.unwrapObservable(valueAccessor()); 
		$(element).listview().listview("refresh");
	}
};

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

		var newTask = {
			id : newTaskID,
			name : this.newTaskName()
		};

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
	}.bind(this); // Ensure that "this" is always this view model

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
 * Initial Test-Data:
 ******************************************************************************/
var lists = new Array(new List("list1", "Privat", [ "Tom", "Jerry" ], [ {
	id : "task1",
	name : "kind abholen"
}, {
	id : "task2",
	name : "arzttermin"
} ]), new List("list2", "Arbeit", [ "Tom" ], [ {
	id : "task3",
	name : "druckerpatronen"
}, {
	id : "task4",
	name : "papier"
} ]), new List("list3", "Haushalt", [ "Tom", "Jerry" ], [ {
	id : "task5",
	name : "milch"
}, {
	id : "task6",
	name : "brot"
} ]));

/*******************************************************************************
 * Activates knockout.js
 ******************************************************************************/
var viewModel = new ErrandsViewModel(lists);
ko.applyBindings(viewModel);
