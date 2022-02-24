sap.ui.define([
    
], function(require, factory) {
    'use strict';
    return {
        getState: function (status) {
            switch (status) {
                case "Available":
                    return "Success";
                    break;
                case "Out of Stock":
                    return "Warning";
                    break;
                default:
                    return "Error";
                    break;
            }
        }
    } 
});