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
	
	this.isMember = function(contact) {
		var result = this.members().indexOf(contact) > -1;
		console.debug("isMember(" + contact.displayName + ") : " + result);
		return result;
	};
	
	this.memberStatus = function(contact) {
		return this.isMember(contact) ? 'ui-icon-check' : 'ui-icon-plus';
	};
	
	this.addMember = function(contact) {
		
		// Nicht hinzufügen, wenn Kontakt bereits Mitglied.
		if (this.isMember(contact)) {
			console.warn("Der Kontakt '" + contact.displayName + "' ist bereits Mitglied der Liste.");
			return;
		}
		
		console.log("addMember: " + contact.displayName);
		this.members.push(contact);
		
	}.bind(this);

	this.removeMember = function(member) {
		console.log("removeMember: " + member.displayName);
		this.members.remove(member);
		
	}.bind(this);

}