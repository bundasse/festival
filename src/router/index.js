import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "MainHome",
        component: ()=> import('@/pages/Home')
    },{
        path: "/event",
        name: "EventPage",
        component: ()=> import('@/pages/Event')
    },{
        path: "/sub",
        name: "SubPage",
        component: ()=> import('@/pages/SubPage')
    },
    {
        path: "/detail/:id",
        name: "DetailPage",
        component: ()=> import('@/pages/Detail')
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
    {
        path: "/404",
        component: ()=> import('@/pages/NotPage')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;