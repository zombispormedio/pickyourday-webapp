(function (module) {
    try {
        module = angular.module('alexandra');
    } catch (e) {
        module = angular.module('alexandra', []);
    }