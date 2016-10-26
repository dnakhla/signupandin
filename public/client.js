'use strict'

function init() {
    let el = $("main");
    jQuery.get('/signup.html', function (view) {
        el.html(view);
    });
}
init();
