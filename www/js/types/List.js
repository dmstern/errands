/*******************************************************************************
 * List Object
 ******************************************************************************/
/*
 * TODO Eher in extra js-Datei auslagern.
 */
function List(id, name, members, tasks) {
	/*
	 * =========================================================================
	 * Properties
	 * =========================================================================
	 */
	this.id = id;
	this.name = ko.observable(name);
	this.members = ko.observableArray(members);
	this.tasks = ko.observableArray(tasks);
	this.page = "#" + id;
	this.listviewID = id + consts.LISTVIEW;

	this.membersHeading = ko.computed(function() {
		return consts.LIST_MEMBERS + " (" + this.members().length + ")";
	}, this);

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
	 * =========================================================================
	 * Operations
	 * =========================================================================
	 */
	// Add New Task:
	// TODO vielleicht eher in extra objekt auslagern?
	this.newTaskName = ko.observable("");
	this.addTask = function() {
		var newTaskID = util.createUID(consts.TASK);

		var newTask = new Task(newTaskID, this.newTaskName(), false);

		if (this.newTaskName() != "") {
			this.tasks.push(newTask);
			this.newTaskName("");
		}

	}.bind(this);

	this.addMember = function(member) {
		console.log("addMember: " + member.displayName);
		this.members.push(member);
	}.bind(this);

	this.removeMember = function(member) {
		console.log("removeMember: " + member.displayName);
		this.members.remove(member);
	}.bind(this);

}
