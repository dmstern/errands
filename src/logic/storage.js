$(document).ready(function () {

    $('#btnSave').bind('click', store);
    $('#btnRestore').bind('click', restoreContents);
    initData();

    function store() {
        var lists = $('#listHaushalt').html();
        console.log(lists);
        localStorage['lists'] = lists;
    }

    function restoreContents() {
        var lists = localStorage['lists'];
        if (lists != undefined) {
            $('#lists').html(lists);
        }
    }

    function initData() {
        var listsJsonString = '[{"id":"list1","name":"Arbeit","members":["tom","jerry"],"owner":"tom","tasks":[{"id":"task1","name":"druckerpatronen","date":null,"location":"Media Markt","image":null,"state":"OPEN"},{"id":"task2","name":"post abholen","date":null,"location":"Poststelle","image":null,"state":"OPEN"}]},{"id":"list2","name":"privat","members":["tom"],"owner":"tom","tasks":[{"id":"task3","name":"kind abholen","date":"2014-02-20 15:30","location":"Grundschule Entenhausen","image":null,"state":"OPEN"}]},{"id":"list3","name":"haushalt","members":["tom","jerry"],"owner":"jerry","tasks":[{"id":"task4","name":"Milch","date":null,"location":"Supermarkt","image":null,"state":"OPEN"},{"id":"task5","name":"Milch","date":null,"location":"Supermarkt","image":null,"state":"OPEN"},{"id":"task6","name":"Brot","date":null,"location":"Supermarkt","image":null,"state":"OPEN"}]}]';
        //        var lists = $.getJSON("data/daniel.json", function () {
        //            console.log("succes");
        //        });
        var lists = JSON.parse(listsJsonString);

        //        alert(lists[0].tasks[0].name);
        var list = lists[0];
        //        $('#lists').append("<li class=\"ui-first-child\"><a class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\" href=\"#" + list.id + "\" data-transition=\"slide\">" + list.name + "</a></li>");
    }

});