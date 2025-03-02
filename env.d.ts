/// <reference types="vite/client" />
import * as THREE from 'three'
declare global {
    interface Window {
        __THREE_HELPER_APP__: App | null
        __THREE_DEVTOOLS__: HTMLDivElement & {
            addEventListener(type: 'observe', listener: (e: { detail: { isScene?: boolean; isWebGLRenderer?: boolean; object: any } }) => void): void
        }
        __THREE_SCENES__: THREE.Scene[]
        __THREE_RENDERERS__: THREE.WebGLRenderer[]
    }
}