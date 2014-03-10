/**
 * Script zum generieren einer rfc4122 version 4 Unipque ID.
 * Quelle: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 *
 */

function createUID(prefix) {

    var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return prefix + uid;
}