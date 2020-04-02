import Home from './layout/Home.vue'
import Hello from './components/Hello.vue'
export const routes: any[] = [
    {
        path: '/',
        meta: {
            title: "Home"
        },
        component: Home,
        children: [
            {
                path: '/china',
                component: Hello,
            }
        ]
    }
];
