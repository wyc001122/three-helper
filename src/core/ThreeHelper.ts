import { createApp } from "vue";
import * as THREE from 'three'
import ThreeHelperUI from "@/components/ThreeHelperUI/index.vue"
import loadPlugin from "./loadPlugin"

interface Configs {
    renderers?: THREE.WebGLRenderer[]
    scenes?: THREE.Scene[]
}

function createThreeHelper(configs: Configs = {}) {
    if (window.__THREE_HELPER_APP__) {
        window.__THREE_HELPER_APP__.unmount();
        window.__THREE_HELPER_APP__._container.remove()
        window.__THREE_HELPER_APP__ = null;
    }

    const root = document.createElement("div");
    root.id = "three-helper";
    root.style.cssText = `position: fixed;top: 10px;left: 10px;z-index:10`
    document.body.appendChild(root);

    window.__THREE_HELPER_APP__ = createApp(ThreeHelperUI, {
        renderers: configs.renderers || window.__THREE_RENDERERS__,
        scenes: configs.scenes || window.__THREE_SCENES__,
    });
    window.__THREE_HELPER_APP__.use(loadPlugin).mount(root);
}

export default createThreeHelper
