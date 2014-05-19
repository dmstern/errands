/*******************************************************************************
 * Allgemeine Utility-Funktionen, die von überall per util.FUNCTIONNAME()
 * aufgerufen werden können
 ******************************************************************************/

var util = {
	/***************************************************************************
	 * Script zum generieren einer rfc4122 version 4 Unipque ID. Quelle:
	 * https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	 */
	createUID : function(prefix) {

		var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
				function(c) {
					var r = Math.random() * 16 | 0, v = c == 'x' ? r
							: (r & 0x3 | 0x8);
					return v.toString(16);
				});
		return prefix + uid;
	},

	/***************************************************************************
	 * Erstellt ein leeres Dummy-Contact-Object nach der
	 * navigator.contacts-Schnittstelle
	 * http://plugins.cordova.io/#/package/org.apache.cordova.contacts
	 */
	createDummyContact : function() {
		return new Contact(null, null, new ContactName(null, null, null, null,
				null, null), null, [], [], [], [], [], null, null, [], [], []);
	},
	
	getDummyContact : function() {
		if (consts.DUMMY_CONTACT === null) {
			consts.DUMMY_CONTACT = this.createDummyContact();
		}
		return consts.DUMMY_CONTACT;
	},

	/***************************************************************************
	 * Initial Test-Data:
	 **************************************************************************/
	getTestUsers : function() {
		return new Array(new Contact(util.createUID(consts.USER), "Donald",
				new ContactName("Donald Duck", "Duck", null, null, null, null),
				"Don", null, null, null, null, null, null, null, null, null,
				null), new Contact(util.createUID(consts.USER), "Mickey",
				new ContactName("Mickey Mouse", "Mouse", "Mickey", null, null,
						null), "Mick", null, null, null, null, null, null,
				null, null, null, null), new Contact(util
				.createUID(consts.USER), "Dagobert", new ContactName(
				"Dagobert Duck", "Duck", "Dagobert", null, null, null),
				"Daggy", null, null, null, null, null, null, null, null, null,
				null));
	},

	getTestLists : function() {
		return new Array(new List("list1", "Privat", [ this.getTestUsers()[0], this.getTestUsers()[1] ], [
				new Task("task1", "Kind abholen", true),
				new Task("task2", "Arzttermin", true) ]), new List("list2",
				"Arbeit", [ this.getTestUsers()[2] ], [
						new Task("task3", "Druckerpatronen", false),
						new Task("task4", "Papier", false) ]), new List(
				"list3", "Haushalt", this.getTestUsers(), [
						new Task("task5", "Milch", false),
						new Task("task6", "Brot", false) ]));
	},
	
	/***************************************************************************
	 * Mehere CSS-Klassen dynamisch meheren Elementen eines Typs (Bsp.
	 * 'addButton') zuweisen, statt die selbe Reihe von Class-Werten mehrfach zu
	 * definieren.
	 */
	applyStyles : function() {

		$('.add-button').addClass(
				"ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-shadow");
		$('.close-button')
				.addClass(
						"ui-btn ui-icon-delete ui-btn-icon-left ui-btn-inline ui-shadow");
		$('.ok-button').addClass(
				"ui-btn ui-icon-check ui-btn-icon-left ui-shadow");
		$('.overlay-panel')
				.addClass(
						"ui-panel ui-panel-position-right ui-panel-display-overlay ui-body-b ui-panel-animate ui-panel-open");
		$('[data-role=button]').addClass("ui-corner-all");

		console.debug("Applying custom styles...");
	}

};