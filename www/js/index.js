/**
 * Main start script for the app.
 */
app = {
	initialize : function() {
		
		// Initialize Model
		model.initialize();
		
		// Initialize ViewModel with test data
		var viewModel = new ErrandsViewModel(util.getTestLists());
		ko.applyBindings(viewModel);
		console.log("Applying DataBindings...");

		// Apply custom styles
		util.applyStyles();

	}
};