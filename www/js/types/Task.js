/*******************************************************************************
 * Task Object
 * TODO Weitere Attribute hinzufügen
 ******************************************************************************/
function Task(id, name, done) {
	/* =========================================================================
	 * Properties
	 * ========================================================================*/
	this.id = id;
	this.name = ko.observable(name);
	this.done = ko.observable(done);

	/* =========================================================================
	 * Operations
	 * ========================================================================*/
}

