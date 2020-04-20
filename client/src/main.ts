import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {routes} from './routes/routes'
import {globalState} from './store'
import App from './App.vue'


const router = createRouter({
    history: createWebHistory(),
    routes
});


declare global {
    interface Window {
        h: typeof createWebHistory
        r: typeof router
    }
}


const app = createApp(App);
app.provide('state', globalState);

// console.info('router====>', router);
console.info('get router====>', router.getRoutes());

console.info('app====>', app);
app.use(router);
app.mount("#app");
