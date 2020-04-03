/**
 * @desc  热门的城市、大型都市
 * @date 2020年4月3日11:39:12
 * @author veaba
 * */
export const cityRoutes: object[] = [
    {
        path: "/city",
        children: [
            {
                path: 'wuhan',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'newYork',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'tokyo',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'hongkong',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'macao',
                component: () => import('../components/Hello.vue'),
            },
            {
                path: 'taiwan',
                component: () => import('../components/Hello.vue'),
            },
        ]
    }
];
