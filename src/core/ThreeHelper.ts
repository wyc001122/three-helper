import { createApp } from "vue";
import * as THREE from 'three'
import ThreeHelperUI from "@/components/ThreeHelperUI/index.vue"
import loadPlugin from "./loadPlugin"
import { type App } from 'vue'

declare global {
    interface Window {
        __THREE_HELPER__: App | null
        __THREE_DEVTOOLS__: HTMLDivElement & {
            addEventListener(type: 'observe', listener: (e: { detail: { isScene?: boolean; isWebGLRenderer?: boolean; object: any } }) => void): void
        }
    }
}

let app: App | null = null
let scenes: THREE.Scene[] = []
let renderers: THREE.WebGLRenderer[] = []

window.__THREE_DEVTOOLS__ = document.createElement('div');
window.__THREE_DEVTOOLS__.addEventListener('observe', (e: any) => {
    if (e.detail.isScene) {
        scenes.push(e.detail)
    } else if (e.detail.isWebGLRenderer) {
        renderers.push(e.detail)
    }
});

function createThreeHelper() {
    if (app) {
        app.unmount();
        app._container.remove()
        app = null;
    }

    const root = document.createElement("div");
    root.id = "three-helper";
    root.style.cssText = `position: fixed;top: 10px;left: 10px;`
    document.body.appendChild(root);

    app = createApp(ThreeHelperUI, {
        // renderer: data.renderer,
        scene: scenes,
    });
    app.use(loadPlugin).mount(root);
}

export default createThreeHelper
