'use strict';

module.exports = function(status, message) {
    this.status = status;
    this.message = message ? message : "";
};
