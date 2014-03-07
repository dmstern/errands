$(document).ready(function () {

    function List(id, name, members, tasks) {
        this.id = id;
        this.name = name;
        this.members = members;
        this.tasks = tasks;
    }

    function ErrandsViewModel(lists) {
        this.lists = ko.observable(lists);
    }

    var listArray = ko.observableArray([
        new List(1, "Privat", ["Tom", "Jerry"], ["kind abholen", "arzttermin"]),
        new List(2, "Arbeit", ["Tom"], ["druckerpatronen", "papier"]),
        new List(3, "Haushalt", ["Tom", "Jerry"], ["milch", "brot"])
    ]);

    // Activates knockout.js
    ko.applyBindings(new ErrandsViewModel(listArray));

});