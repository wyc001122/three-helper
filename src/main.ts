import './assets/index.css'
import ThreeHelper from "@/core/ThreeHelper"
//@ts-ignore
function initThreeHelper() {

    window.__THREE_HELPER_APP__ = null
    window.__THREE_SCENES__ = [];
    window.__THREE_SCENES__ = [];
    window.__THREE_RENDERERS__ = [];
    window.__THREE_DEVTOOLS__ = document.createElement('div');
    window.__THREE_DEVTOOLS__.addEventListener('observe', (e: any) => {
        if (e.detail.isScene) {
            window.__THREE_SCENES__.push(e.detail)
        } else if (e.detail.isWebGLRenderer) {
            window.__THREE_RENDERERS__.push(e.detail)
        }
    });
    // @ts-ignore
    window.ThreeHelper = ThreeHelper
}
initThreeHelper()


import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')