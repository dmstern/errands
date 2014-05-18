/**
 * Helper for an observable object.
 * 
 * Saves a list of the observer's eventHandlers for each eventType, that are
 * mapped to a given eventType-string and calls them when notifyObservers() is
 * called.
 */
function ObserverMap() {
	console.debug("Init new ObserverMap.");

	var self = this;

	self.handlerLists = new Array();

	/**
	 * Adds an EventHandler to the collection.
	 * 
	 * @param eventType
	 *            The string that specifies the type of the event, on which
	 *            appearance the eventHandler should be called.
	 * @param eventHandler
	 *            A function that is called, when the event is dispatched.
	 */
	self.put = function(eventType, eventHandler) {

		var handlerList = self.findHandlerList(eventType);

		if (handlerList == null) {
			// If no HandlerList was found, create a new one.
			console.debug("No matching HandlerList found, "
					+ "creating a new one.");
			handlerList = new HandlerList(eventType);
			self.handlerLists.push(handlerList);
		}
		handlerList.addEventHandler(eventHandler);

	};

	/**
	 * Notifies all saved observers that are registered for the given eventType.
	 * 
	 * @param eventType
	 *            The string that specifies the type of the event, on which
	 *            appearance the eventHandler should be called.
	 * @param data
	 *            Some data, that the model can ship with the event dispatch, so
	 *            that observers can handle them.
	 */
	self.notifyObservers = function(eventType, data) {
		console.debug("Searching for observer to notify...");

		var matchingHandlerList = self.findHandlerList(eventType);

		if (matchingHandlerList != null) {
			console.debug();
			matchingHandlerList.notifyObservers(data);
		} else {
			console.warn("No Observer with type '" + eventType + "' found. "
					+ "Nobody to notify.");
		}

	};

	/**
	 * Find a List of EventHandlers for a specified eventType string.
	 */
	self.findHandlerList = function(eventType) {
		console.debug("Searching for matching HandlerList....");

		var result = null;

		self.handlerLists.forEach(function(handlerList) {
			if (handlerList.eventType.valueOf() === eventType.valueOf()) {
				console.debug("Found matching HandlerList: " + eventType);
				result = handlerList;
			}
		});

		if (result == null) {
			console.debug("No handlerList for type '" + eventType + "' found.");
		}

		return result;
	};
}

/**
 * A List of EventHandlers for one EventType.
 * 
 * @param eventType
 *            A String that specifies the Type of the event.
 */
function HandlerList(eventType) {
	var self = this;

	console.debug("Init HandlerList for type '" + eventType + "'.");

	self.eventType = eventType;
	self.eventHandlers = new Array();

	self.addEventHandler = function(eventHandler) {
		console.debug("Adding EventHandler '" + eventHandler.name + "'.");
		self.eventHandlers.push(eventHandler);
	};

	self.notifyObservers = function(data) {
		console.debug("HandlerList '" + self.eventType
				+ "': Notify observers...");
		self.eventHandlers.forEach(function(eventHandler) {
			eventHandler(data);
		});
	};

}