$(document).ready(function () {
	
    function List(id, name, members, tasks) {
        this.id = id;
        this.name = name;
        this.members = ko.observableArray(members);
        this.tasks = ko.observableArray(tasks);
        this.page = "#" + id;
        this.listviewID = id + LISTVIEW;

        this.newTaskName = ko.observable("");
        this.addTask = function () {
            var newTaskID = createUID(TASK);
            var newTask = {
                id: newTaskID,
                name: this.newTaskName()
            };
            if (this.newTaskName() != "") {
                this.tasks.push(newTask);
                this.newTaskName("");
            }
            // refresh listview to apply JQMobile CSS:
            $("#" + this.listviewID).listview().listview('refresh');
        }.bind(this);
    }

    function ErrandsViewModel(lists) {
        this.lists = ko.observableArray(lists);

        this.newListName = ko.observable("");

        this.addList = function () {
            var newList = new List(createUID(LIST), this.newListName(), [], []);
            if (this.newListName() != "") {
                this.lists.push(newList);
                this.newListName("");
            }
        }.bind(this);  // Ensure that "this" is always this view model
        
        this.store = function() {
            var data = JSON.stringify(this);
            console.log("storing: " + data);
            localStorage['lists'] = data;
        }
        
        this.restore = function() {
            var data = localStorage['lists'];
            if (data != undefined) {
                console.log("restored: " + data);
            }
        }
    }

    var lists = new Array(
        new List("list1", "Privat", ["Tom", "Jerry"], [{
            id: "task1",
            name: "kind abholen"
        }, {
            id: "task2",
            name: "arzttermin"
        }]),
        new List("list2", "Arbeit", ["Tom"], [{
            id: "task3",
            name: "druckerpatronen"
        }, {
            id: "task4",
            name: "papier"
        }]),
        new List("list3", "Haushalt", ["Tom", "Jerry"], [{
            id: "task5",
            name: "milch"
        }, {
            id: "task6",
            name: "brot"
        }])
    );

    // Activates knockout.js
    var viewModel = new ErrandsViewModel(lists);
    ko.applyBindings(viewModel);
    
});