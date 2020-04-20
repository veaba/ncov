/**
 * @desc 国家路由
 * @date 2020年4月3日11:39:05
 * @author veaba
 * */
export const countryRoutes: object[] = [
    {
        path: "/country",
        component: () => import('../components/country/Country.vue'),
        children: [
            {
                path: 'china',
                component: () => import('../components/country/China.vue'),
            },
            {
                path: 'america',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'korea',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'uk',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'serbia',
                component: () => import('../components/Hello.vue'),
            },
        ]
    }
];
