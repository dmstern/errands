/**
 *  Programmatisch vorgenommene Style-Definitionen
 */
/*
 * Mehere CSS-Klassen dynamisch meheren Elementen eines Typs (Bsp. 'addButton') zuweisen, statt die selbe Reihe von Class-Werten mehrfach zu definieren.
 */
function applyStyles() {
	$('.addButton').addClass("ui-btn ui-icon-plus ui-btn-icon-left ui-btn-inline ui-corner-all ui-shadow ui-mini");
	$('.closeButton').addClass("ui-link ui-btn ui-btn-a ui-icon-delete ui-btn-icon-left ui-btn-inline ui-shadow ui-corner-all");
	$('.overlayPanel').addClass("ui-panel ui-panel-position-right ui-panel-display-overlay ui-body-b ui-panel-animate ui-panel-open");
}