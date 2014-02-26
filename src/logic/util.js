$(document).ready(function () {

    //    $('#btnNewTask').bind('click', testForm);

    $('#formNewTask').submit(function () {
        testForm();
        return false;
    });

    function testForm() {
        newTaskName = $('#tfNewTask').val();
        alert(newTaskName);
    }

});
