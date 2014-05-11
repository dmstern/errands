/*******************************************************************************
 * Programmatisch vorgenommene DOM-Manipulationen
 ******************************************************************************/

var domEditor = {
	/***************************************************************************
	 * Mehere CSS-Klassen dynamisch meheren Elementen eines Typs (Bsp.
	 * 'addButton') zuweisen, statt die selbe Reihe von Class-Werten mehrfach zu
	 * definieren.
	 */
	applyStyles : function() {
		$('.add-button')
				.addClass(
						"ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all ui-shadow");
		$('.close-button')
				.addClass(
						"ui-link ui-btn ui-btn-a ui-icon-delete ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all");
		$('.overlay-panel')
				.addClass(
						"ui-panel ui-panel-position-right ui-panel-display-overlay ui-body-b ui-panel-animate ui-panel-open");

		console.log("Applying custom styles...");
	}
};