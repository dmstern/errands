/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {

	viewModel : null,

	/***************************************************************************
	 * Application Constructor
	 */
	initialize : function(viewModel) {
		this.viewModel = viewModel;
		console.log("Connecting to Device...");
		this.bindEvents();
		domEditor.applyStyles();
	},

	/***************************************************************************
	 * Bind Event Listeners
	 * 
	 * Bind any events that are required on startup. Common events are: 'load',
	 * 'deviceready', 'offline', and 'online'.
	 */
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	/***************************************************************************
	 * deviceready Event Handler
	 * 
	 * The scope of 'this' is the event. In order to call the 'receivedEvent'
	 * function, we must explicitly call 'app.receivedEvent(...);'
	 */
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},

	/***************************************************************************
	 * Update DOM on a Received Event
	 */
	receivedEvent : function(id) {
		console.log('Received Event: ' + id);

		switch (id) {
		case 'deviceready':
			this.getContacts();
			break;
		}
	},

	/***************************************************************************
	 * DeviceAccess:
	 */
	getContacts : function() {

		var onSuccess = function(contacts) {
			var successMsg = 'Found ' + contacts.length + ' contacts.';
			console.log(successMsg);
			app.viewModel.contacts(contacts);
		}

		var onError = function(contactError) {
			var errorMsg = 'Fehler beim Laden der Kontakte!';
			console.error(errorMsg);
			alert(errorMsg);
		}

		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		var fields = [ "displayName", "name" ];
		navigator.contacts.find(fields, onSuccess, onError, options);
	}
}
