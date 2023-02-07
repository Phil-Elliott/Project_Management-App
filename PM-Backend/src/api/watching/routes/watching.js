'use strict';

/**
 * watching router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::watching.watching');
