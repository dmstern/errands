$(document).ready(function () {

    function List(id, name, members, tasks) {
        this.id = id;
        this.name = name;
        this.members = ko.observableArray(members);
        this.tasks = ko.observableArray(tasks);
        this.page = "#" + id;

        //        this.newTask = ko.observable("");
        //        this.addTask = function () {
        //            if (this.newTask() != "") {
        //                this.tasks.push(this.newTask());
        //                this.newTask("");
        //            }
        //        }.bind(this);
    }

    function ErrandsViewModel(lists) {
        this.lists = ko.observableArray(lists);

        this.newListName = ko.observable("");

        this.addList = function () {
            var newList = new List(createUID(LIST), this.newListName(), [], [{}]);
            if (this.newListName() != "") {
                this.lists.push(newList);
                this.newListName("");
            }
        }.bind(this);  // Ensure that "this" is always this view model
    }

    var lists = new Array(
        new List("list1", "Privat", ["Tom", "Jerry"], [{
            name: "kind abholen"
        }, {
            name: "arzttermin"
        }]),
        new List("list2", "Arbeit", ["Tom"], [{
            name: "druckerpatronen"
        }, {
            name: "papier"
        }]),
        new List("list3", "Haushalt", ["Tom", "Jerry"], [{
            name: "milch"
        }, {
            name: "brot"
        }])
    );

    // Activates knockout.js
    ko.applyBindings(new ErrandsViewModel(lists));

});