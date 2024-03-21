export default [{
        path: "/",
        name: "dashboard",
        meta: { authRequired: true },
        component: () =>
            import ("./views/dashboards/default"),
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("./views/account/login"),
        meta: { authRequired: false },
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import ("./views/account/register"),
        meta: { authRequired: false },
    },
    {
        path: "/forgot-password",
        name: "Forgot password",
        component: () =>
            import ("./views/account/forgot-password"),
        meta: {
            authRequired: false
        },
    },
    {
        path: "/logout",
        name: "logout",
        component: () =>
            import ("./views/account/logout"),
        meta: {
            authRequired: true,
        },
    },

    /*######################## CDN ########################*/

    /************* USERS **************/
    {
        path: "/cdn/users",
        name: "cdn_users",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/users/index"),
    },
    {
        path: "/cdn/users/:id",
        name: "cdn_users_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/users/show"),
    },

    /************* CATEGORIES **************/
    {
        path: "/cdn/categories",
        name: "cdn_categories",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/categories/index"),
    },
    {
        path: "/cdn/categories/:id",
        name: "cdn_categories_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/categories/show"),
    },


    /************* ORGANES **************/
    {
        path: "/cdn/organes",
        name: "organes",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/organes/index"),
    },
    {
        path: "/cdn/organes/:id",
        name: "organes_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/organes/show"),
    },

    /************* SECTORS **************/
    {
        path: "/cdn/sectors",
        name: "cdn_sectors",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/sectors/index"),
    },
    {
        path: "/cdn/sectors/:id",
        name: "cdn_sectors_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/sectors/show"),
    },

    /************* PATNERS **************/
    {
        path: "/cdn/patners",
        name: "cdn_patners",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/patners/index.vue"),
    },
    {
        path: "/cdn/patners/:id",
        name: "cdn_patners_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/patners/show"),
    },

    /************* PROJECTS **************/
    {
        path: "/cdn/projects",
        name: "cdn_projects",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/projects/index"),
    },
    {
        path: "/cdn/projects/:id",
        name: "cdn_projects_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/projects/show"),
    },

    /************* PROJECTS **************/
    {
        path: "/cdn/activities/:id",
        name: "activities_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/activities/show"),
    },

    /************* ACTIVITIES **************/
    {
        path: "/cdn/sub-activities/:id",
        name: "sub_activities_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/sub-activities/show"),
    },

    /************* EVENTS **************/
    {
        path: "/cdn/events",
        name: "cdn_events",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/events/index.vue"),
    },
    {
        path: "/cdn/events/:id",
        name: "cdn_events_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/events/show.vue"),
    },

    /************* SURVEYS **************/
    {
        path: "/cdn/surveys",
        name: "cdn_surveys",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/surveys/index.vue"),
    },
    {
        path: "/cdn/surveys/:id",
        name: "cdn_surveys_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/surveys/show.vue"),
    },
    {
        path: "/cdn/surveys/:id/votes",
        name: "cdn_surveys_show_votes",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/surveys/votes.vue"),
    },

    /************* FORMULARS **************/
    {
        path: "/cdn/formulars",
        name: "cdn_formulars",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/formulars/index.vue"),
    },
    {
        path: "/cdn/formulars/:id",
        name: "cdn_formulars_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/formulars/show.vue"),
    },
    {
        path: "/cdn/formulars/:id/responses",
        name: "cdn_formulars_responses",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/formulars/responses.vue"),
    },

    /************* COURRIERS **************/
    {
        path: "/cdn/courriers",
        name: "cdn_courriers",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/courriers/index.vue"),
    },
    {
        path: "/cdn/courriers/:id",
        name: "cdn_courriers_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/courriers/show.vue"),
    },

    /************* GALLEY **************/
    {
        path: "/cdn/gallery",
        name: "cdn_gallery",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/gallery/index.vue"),
    },
    {
        path: "/cdn/gallery/:id",
        name: "cdn_gallery_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/gallery/show.vue"),
    },

    /************* ANNUAL REPORT **************/
    {
        path: "/cdn/annual-reports",
        name: "cdn_annual_reports",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/annual-reports/index.vue"),
    },

    /************* CHAT **************/
    {
        path: "/chat",
        name: "chat",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/cdn/chat/index.vue"),
    },





    {
        path: "/notifications",
        name: "notifications",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/notifications"),
    },

    {
        path: "/profile",
        name: "profile",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/profile"),
    },

    {
        path: "/setting",
        name: "setting",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/setting"),
    },







    /*######################## SECTOR ########################*/
    {
        path: "/sector/projects",
        name: "sector_projects",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/sector/projects/index"),
    },
    {
        path: "/sector/projects/:id",
        name: "sector_projects_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/sector/projects/show"),
    },

    /************* ACTITIES **************/
    {
        path: "/sector/activities/:id",
        name: "sector_activities_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/sector/activities/show.vue"),
    },

    /************* SUB-ACTIVITIES **************/
    {
        path: "/sector/sub-activities/:id",
        name: "sector_sub-activities_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/sector/sub-activities/show.vue"),
    },

    /************* ANNUAL REPORT **************/
    {
        path: "/sector/annual-reports",
        name: "sector_annual_reports",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/sector/annual-reports/index.vue"),
    },

    /************* GALLEY **************/
    {
        path: "/sector/gallery",
        name: "sector_gallery",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/sector/gallery/index"),
    },
    {
        path: "/sector/gallery/:id",
        name: "sector_gallery_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/sector/gallery/show.vue"),
    },






    /*######################## PATNER ########################*/
    {
        path: "/patner/projects",
        name: "patner_projects",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/patner/projects/index"),
    },
    {
        path: "/patner/projects/:id",
        name: "patner_projects_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/patner/projects/show"),
    },

    /************* ACTITIES **************/
    {
        path: "/patner/activities/:id",
        name: "patner_activities_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/patner/activities/show"),
    },

    /************* SUB-ACTIVITIES **************/
    {
        path: "/patner/sub-activities/:id",
        name: "patner_sub-activities_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/patner/sub-activities/show"),
    },





    /************** GENERAL **************/

    /************* EVENTS **************/
    {
        path: "/events",
        name: "events",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/events/index.vue"),
    },
    {
        path: "/events/:id",
        name: "events_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/events/show.vue"),
    },

    /************* COURRIERS **************/
    {
        path: "/courriers",
        name: "courriers",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/courriers/index"),
    },
    {
        path: "/courriers/:id",
        name: "courriers_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/courriers/show"),
    },

    /************* SURVEYS **************/
    {
        path: "/surveys",
        name: "surveys",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/surveys/index.vue"),
    },
    {
        path: "/surveys/:id",
        name: "surveys_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/surveys/show.vue"),
    },

    /************* SURVEYS **************/
    {
        path: "/formulars",
        name: "formulars",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/formulars/index.vue"),
    },
    {
        path: "/formulars/:id",
        name: "formulars_show",
        meta: { authRequired: true },
        component: () =>
            import ("./views/pages/general/formulars/show.vue"),
    },










    // Redirect any unmatched routes to the 404 page. This may
    // require some server configuration to work in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    // {
    //     path: "*",
    //     redirect: "404",
    // },
    {
        path: "/pages/maintenance",
        name: "Maintenance",
        meta: { authRequired: true },
        component: () =>
            import ("./views/utility/maintenance"),
    },
    {
        path: "/pages/coming-soon",
        name: "coming-soon",
        meta: { authRequired: true },
        component: () =>
            import ("./views/utility/coming-soon"),
    },
    {
        path: "/pages/404",
        name: "Error-404",
        meta: { authRequired: true },
        component: () =>
            import ("./views/utility/404"),
    },
    {
        path: "/pages/500",
        name: "Error-500",
        meta: { authRequired: true },
        component: () =>
            import ("./views/utility/500"),
    },
];