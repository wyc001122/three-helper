import * as THREE from "three"
import { toRaw } from "vue"
// @ts-ignore
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js"
// @ts-ignore
import * as TextureUtils from 'three/addons/utils/WebGLTextureUtils.js';

export function expandAll(data: THREE.Object3D, isExpanded: boolean) {
     
}

export function consoleNode(data: THREE.Object3D) {
    const nodeName = data.name || 'unknown'
    const type = data.type
    console.log(`%c 🍊 THREE.${type} : ${nodeName} `, `padding:2px;background:#09090b;color:#fff;border:5px solid #27272a;border-radius:6px `, toRaw(data));
}

/**
 * 导出Three.js对象为GLTF/GLB格式
 * @param data 要导出的Three.js对象
 * @param options 导出选项
 * @param fileName 文件名（不含扩展名）
 */
export function exportNode(
    data: THREE.Object3D,
    options: {
        trs?: boolean;
        onlyVisible?: boolean;
        truncateDrawRange?: boolean;
        binary?: boolean;
        embedImages?: boolean;
        maxTextureSize?: number;
        forceIndices?: boolean;
        includeCustomExtensions?: boolean;
    } = {},
    fileName?: string
) {
    // 默认导出选项
    const defaultOptions = {
        trs: false,
        onlyVisible: true,
        truncateDrawRange: true,
        binary: false,
        embedImages: true,
        maxTextureSize: Infinity,
        forceIndices: false,
        includeCustomExtensions: false
    };

    // 合并默认选项和用户提供的选项
    const exportOptions = { ...defaultOptions, ...options };

    // 使用对象的名称作为文件名，如果没有名称则使用类型
    const outputFileName = fileName || data.name || data.type || 'object';

    const gltfExporter = new GLTFExporter().setTextureUtils(TextureUtils);

    gltfExporter.parse(
        data,
        function (result) {
            if (result instanceof ArrayBuffer) {
                saveArrayBuffer(result, `${outputFileName}.glb`);
            } else {
                const output = JSON.stringify(result, null, 2);
                saveString(output, `${outputFileName}.gltf`);
            }
        },
        function (error) {
            console.log('导出过程中发生错误', error);
        },
        exportOptions
    );
}

function save(blob: Blob, filename: string) {
    // 创建一个临时的链接元素用于下载
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link); // Firefox 兼容性处理

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // 延迟移除链接元素和释放URL对象
    setTimeout(() => {
        // 从DOM中移除链接
        document.body.removeChild(link);
        // 释放URL对象
        URL.revokeObjectURL(link.href);
    }, 100);
}

function saveString(text: string, filename: string) {
    save(new Blob([text], { type: 'text/plain' }), filename);
}

function saveArrayBuffer(buffer: ArrayBuffer, filename: string) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}


// TODO: 需要优化
export function viewBoxHelper(data: any) {
    if (data.geometry) {
        if (data.$boxHelper) {
            data.$boxHelper.visible = !data.$boxHelper.visible
            return
        }

        const model = data
        const inverseMatrix = new THREE.Matrix4().copy(model.matrix).invert()
        data.$boxHelper = new THREE.BoxHelper(model)
        data.$boxHelper.matrixAutoUpdate = false
        data.$boxHelper.applyMatrix4(inverseMatrix)
        data.$boxHelper.updateMatrix()
        data.$boxHelper.matrixAutoUpdate = true
        data.$boxHelper.$hide = true
        model.add(data.$boxHelper)
    }
}



