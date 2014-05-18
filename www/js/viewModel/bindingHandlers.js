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

		$(element).enhanceWithin().collapsibleset().collapsibleset("refresh");

		// Apply dynamic style classes:
		util.applyStyles();
	}
};