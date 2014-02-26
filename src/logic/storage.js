$(document).ready(function () {

    $('#btnSave').bind('click', store);
    $('#btnRestore').bind('click', restoreContents);

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

});
