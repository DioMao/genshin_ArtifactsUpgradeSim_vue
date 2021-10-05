import { createRouter, createWebHashHistory } from 'vue-router'

import artifactBox from '@/page/artifactBox'
import artifactUpgrade from '@/page/artifactUpgrade'
import artifactEquip from '@/page/artifactEquip'
import notFound from '@/page/404'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/artifact-box'
        },
        {
            path: '/artifact-box',
            name: 'artifact-box',
            component: artifactBox
        },
        {
            path: '/artifact-:index',
            name: 'upgrade',
            component: artifactUpgrade,
            props: true
        },
        {
            path: '/equip-:index',
            name: 'equip',
            component: artifactEquip,
            props: true
        },
        {
            path: '/:catchAll(.*)*',
            name: 'notFound',
            component: notFound
        }
    ]
})

export default router