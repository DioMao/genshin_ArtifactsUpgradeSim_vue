// @ts-nocheck
import { createRouter, createWebHashHistory } from "vue-router";

import artifactBox from "@/page/artifactBox";
import artifactUpgrade from "@/page/artifactUpgrade";
import artifactEquip from "@/page/artifactEquip";
import artifactState from "@/page/artifactState";
import notFound from "@/page/404";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/artifact-box",
    },
    {
      path: "/artifact-box",
      name: "artifact-box",
      component: artifactBox,
    },
    {
      path: "/artifact-:symbol",
      name: "upgrade",
      component: artifactUpgrade,
      props: true,
    },
    {
      path: "/equip-:symbol",
      name: "equip",
      component: artifactEquip,
      props: true,
    },
    {
      path: "/state-:name",
      name: "state",
      component: artifactState,
      props: true,
    },
    {
      path: "/:catchAll(.*)*",
      name: "notFound",
      component: notFound,
    },
  ],
});

export default router;
