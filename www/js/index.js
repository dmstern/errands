/*******************************************************************************
 * Main start script for the app.
 ******************************************************************************/
app = {
	viewModel : null,
	initialize : function() {

		// Initialize Model
		model.initialize();

		// Initialize ViewModel with test data
		this.viewModel = new ErrandsViewModel(util.getTestLists());
		ko.applyBindings(this.viewModel);
		console.log("Applying DataBindings...");

		// Apply custom styles
		util.applyStyles();

	}
};