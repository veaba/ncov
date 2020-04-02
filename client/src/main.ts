import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
// import {routes} from './routes'
// import {globalState} from './store'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            meta: {
                title: "Home"
            },
            component: () => import('./layout/Home.vue'),
            children: [
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

    ]
});


// declare global {
//     interface Window {
//         h: typeof createWebHistory
//         r: typeof router
//     }
// }


const app = createApp(App);
// app.provide('state', globalState);

console.info('router====>', router);

console.info('app====>', app);
app.use(router);
app.mount("#app");
