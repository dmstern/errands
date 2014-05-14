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
						"ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-shadow");
		$('.close-button')
				.addClass(
						"ui-btn ui-icon-delete ui-btn-icon-left ui-btn-inline ui-shadow");
		$('.ok-button')
				.addClass(
						"ui-btn ui-icon-check ui-btn-icon-left ui-shadow");
		$('.overlay-panel')
				.addClass(
						"ui-panel ui-panel-position-right ui-panel-display-overlay ui-body-b ui-panel-animate ui-panel-open");
		$('[data-role=button]').addClass("ui-corner-all");

		console.log("Applying custom styles...");
	}
};