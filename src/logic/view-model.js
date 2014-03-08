$(document).ready(function () {

    function List(id, name, members, tasks) {
        this.id = id;
        this.name = name;
        this.members = members;
        this.tasks = ko.observableArray(tasks);
        this.page = "#" + id;
    }

    function ErrandsViewModel(lists) {
        this.lists = ko.observableArray(lists);

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