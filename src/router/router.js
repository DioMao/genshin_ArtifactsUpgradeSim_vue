import { createRouter,createWebHistory } from 'vue-router'

import artifactBox from '@/page/artifactBox'
import artifactUpgrade from '@/page/artifactUpgrade'

const router = createRouter({
    history: createWebHistory(),
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
        }
    ]
})

export default router