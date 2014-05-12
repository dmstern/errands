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
		domEditor.applyStyles();
	}
};

/*******************************************************************************
 * Main ViewModel:
 ******************************************************************************/
function ErrandsViewModel(lists) {
	console.log("Init ViewModel...");

	// =========================================================================
	// Properties:
	// =========================================================================

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
		if ( openTasks > 0 ) {
			return consts.TITLE + " (" + openTasks + ")";
		} else {
			return consts.TITLE;
		}
	}, this);

	// ==========================================================================
	// Operations
	// ==========================================================================

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
		// Ensure that "this" is always this view model:
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
 * List Object
 ******************************************************************************/
function List(id, name, members, tasks) {
	/*
	 * Properties =======================================================
	 */
	this.id = id;
	this.name = ko.observable(name);
	this.members = ko.observableArray(members);
	this.tasks = ko.observableArray(tasks);
	this.page = "#" + id;
	this.listviewID = id + consts.LISTVIEW;
	this.countOpenTasks = ko.computed(function() {
		var count = 0;
		this.tasks().forEach(function(task) {
			if (!task.done()) {
				count++;
			}
		});
		return count;
	}, this);

	this.allDone = ko.computed(function() {
		return (this.countOpenTasks() == 0) && (this.tasks().length > 0);
	}, this);

	this.displayName = ko.computed(function() {
		var countDisplay = " (" + this.countOpenTasks() + ")";

		if (this.countOpenTasks() > 0) {
			displayName = this.name() + countDisplay;
		} else {
			displayName = this.name();
		}
		return displayName;
	}, this);

	/*
	 * Operations =================================================== TODO
	 * vielleicht eher in extra objekt auslagern.
	 */
	// Add New Task:
	this.newTaskName = ko.observable("");
	this.addTask = function() {
		var newTaskID = util.createUID(consts.TASK);

		var newTask = new Task(newTaskID, this.newTaskName(), false);

		if (this.newTaskName() != "") {
			this.tasks.push(newTask);
			this.newTaskName("");
		}

	}.bind(this);

	// TODO Auswahl in ViewModel einfügen! BZW. teilnehmer / mitglieder der
	// liste anzeigen / verwalten
	this.selection = ko.observableArray(); // --> Aber nicht hier in List!

	this.reset = function() {
		// TODO Auswahl wieder entfernen.

		console.log("ShareList aborted by user.");
	}

	// TODO Bei Klick auf Ok (Share) Auswahl in viewModel speichern
	// TODO -> Und: Bereits teilnehmende User für TaskListe anzeigen!

	// // Share List:
	// this.share = function() {
	// console.log("shareList: " + this.name());
	// };

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

}

/*******************************************************************************
 * Initial Test-Data:
 ******************************************************************************/
var lists = new Array(new List("list1", "Privat", [ "Tom", "Jerry" ], [
		new Task("task1", "Kind abholen", true),
		new Task("task2", "Arzttermin", true) ]), new List("list2", "Arbeit",
		[ "Tom" ], [ new Task("task3", "Druckerpatronen", false),
				new Task("task4", "Papier", false) ]), new List("list3",
		"Haushalt", [ "Tom", "Jerry" ], [ new Task("task5", "Milch", false),
				new Task("task6", "Brot", false) ]));

/*******************************************************************************
 * Activates knockout.js
 ******************************************************************************/
var viewModel = new ErrandsViewModel(lists);
ko.applyBindings(viewModel);
console.log("Applying DataBindings...");
