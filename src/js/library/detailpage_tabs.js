import $ from './jquery.js';

$(function() {
    $('.tabs').tabs({
        ev: 'mouseenter',
        active: 'active',
        display: 'display'
    });
});