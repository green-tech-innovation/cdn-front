import { createWebHistory, createRouter } from "vue-router";

import routes from './routes'
import helpers from "@/helpers/helper"

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'history',
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})



router.beforeEach((to, from, next) => {
    if (to.meta.authRequired) {
        if (helpers.isConnected()) {
            return next()
        } else {
            return next('login')
        }
    } else if (to.meta.authRequired == false) {
        if (helpers.isConnected()) {
            return next("")
        } else {
            return next()
        }
    } else {
        return next()
    }
})

export default router