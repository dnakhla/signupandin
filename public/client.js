'use strict'
const mainEl = 'main';
let state = {
    email_ready: false,
    password_ready: false
}

function getView(address) {
    return jQuery.get('/' + address);
}

function updateSubmit() {
    if (state.email_ready && state.password_ready) {
        $('input.js-submit')
            .removeAttr('disabled');
    }
    console.log(state)
    if (!state.email_ready) {
        $('input.js-email')
            .addClass('redborder');
    } else {
        $('input.js-email')
            .removeClass('redborder');
    }
    if (!state.password_ready) {
        $('input.js-password')
            .addClass('redborder');
    } else {
        $('input.js-password')
            .removeClass('redborder');
    }
}

function validateEmail(e) {
    return injectDepend('https://cdnjs.cloudflare.com/ajax/libs/validator/6.1.0/validator.min.js')
        .then(function (a) {
            let emailValue = $('input.js-email')
                .get(0)
                .value;
            state.email_ready = validator.isEmail(emailValue);
            updateSubmit();
        });
}

function validatePassword(e) {
    state.password_ready = true;
    updateSubmit();
    return Promise.resolve(true)
}

function injectDepend(script) {
    return new Promise(function (resolve, reject) {
        $.getScript(script)
            .done(function () {
                resolve(true)
            })
            .fail(function (jqxhr, settings, exception) {
                reject("Triggered ajaxError handler.");
            });
    });
}

function bindEvents(data) {
    $(mainEl)
        .html(data);
    $('.js-email')
        .on('change', validateEmail)
    $('.js-password')
        .on('change', validatePassword)
}

function init(view) {
    getView(view)
        .then(bindEvents)
}

init('signup.html')
