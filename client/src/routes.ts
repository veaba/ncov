export const routes: any[] = [

    {
        path: '/',
        meta: {
            title: "Home"
        },
        component: () => import('./layout/Home.vue'),
        children: [
            {
                path: 'china',
                component: () => import('./components/Hello.vue'),
            },
            {
                path: 'a',
                component: () => import('./components/Hello.vue'),
            },
            {
                path: 'b',
                component: () => import('./components/Hello.vue'),
            }
        ]
    },
    {
        path: '/c',
        component: () => import('./components/Hello.vue'),
    }
];
