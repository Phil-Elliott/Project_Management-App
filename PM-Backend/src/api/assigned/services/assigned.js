'use strict';

/**
 * assigned service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::assigned.assigned');
