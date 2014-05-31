/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with self work for additional information
 * regarding copyright ownership.  The ASF licenses self file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use self file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by modellicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * TODO Eigenleistung deutlich machen!!!
 */
var model = {

	deviceReady : false,
	observerMap : new ObserverMap(),

	/***************************************************************************
	 * Model Constructor
	 */
	initialize : function() {
		console.log("Connecting to Device...");
		this.bindEvents();
	},

	/***************************************************************************
	 * Bind Event Listeners
	 * 
	 * Bind any events that are required on startup. Common events are: 'load',
	 * events.DEVICE_READY, 'offline', and 'online'.
	 */
	bindEvents : function() {
		document.addEventListener(events.DEVICE_READY, this.onDeviceReady,
				false);
	},

	/***************************************************************************
	 * deviceready Event Handler
	 * 
	 * The scope of 'this' is the event. In order to call the 'receivedEvent'
	 * function, we must explicitly call 'model.receivedEvent(...);'
	 */
	onDeviceReady : function() {
		model.deviceReady = true;
		model.receivedEvent(events.DEVICE_READY);
	},

	/***************************************************************************
	 * Update DOM on a Received Event
	 */
	receivedEvent : function(id) {
		console.log('model received Event: ' + id);
	},

	/***************************************************************************
	 * DeviceAccess:
	 * TODO options, filter (und evtl. auch onSuccess) als Parameter übergeben.
	 */
	findContacts : function() {

		if (!model.deviceReady) {
			var errorMsg = 'Gerät ist nicht bereit!'; 
			console.error(errorMsg);
			alert(errorMsg);
			return;
		}

		var onSuccess = function(contacts) {
			var successMsg = contacts.length + ' Kontakte gefunden.';
			console.log(successMsg);
			model.observerMap.notifyObservers(events.FOUND_CONTACTS, contacts);
		};

		var onError = function(contactError) {
			var errorMsg = 'Fehler beim Laden der Kontakte!';
			console.error(errorMsg);
			alert(errorMsg);
		};
		
		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		var fields = [ "*" ];
		navigator.contacts.find(fields, onSuccess, onError, options);

	},

	/**
	 * 
	 */
	addEventListener : function(eventType, eventHandler) {
		model.observerMap.put(eventType, eventHandler);
	},
	
	removeEventListener : function(eventType, eventHandler) {
		// TODO implement.
		console.error("removeEventListener(): Diese Methode ist noch nicht implementiert.");
	}

};
