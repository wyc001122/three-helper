/**
 * Three.js 拦截器设置
 * 用于安装和配置所有对 Three.js 的方法拦截
 */
import * as THREE from 'three';

/**
 * 全局对象属性拦截设置
 * 用于安装和配置对象属性拦截器
 */
import { 
  createInterceptingProxy,
  setupFromEquirectangularInterceptor,
  removeGlobalPropertyInterceptor,
  interceptMethod,
  setupEquirectangularInterceptors,
  interceptPrototypeMethod 
} from './monkeyPatch';

// 仅用于类型声明
import type { Texture, WebGLRenderer } from 'three';

/**
 * 设置所有 Three.js 方法拦截器
 * 在应用程序启动或组件挂载时调用此方法
 */
export function setupThreePatches() {
  console.log('正在设置 Three.js 拦截器...');
  
  // 拦截 fromEquirectangular 相关方法
  setupEquirectangularInterceptors();
  
  // 拦截其他重要方法
  setupOtherInterceptors();
  
  console.log('Three.js 拦截器设置完成');
  return true;
}

/**
 * 设置其他方法拦截器
 * 可以根据需要添加更多拦截器
 */
function setupOtherInterceptors() {
  // 拦截 TextureLoader.load 方法
  // 注意：这里使用targetClass, methodName和回调的形式
  const targetObject = (window as any).THREE?.TextureLoader;
  if (targetObject) {
    interceptMethod(
      targetObject, 
      'load',
      (originalMethod: Function, ...args: any[]) => {
        const url = args[0];
        console.log('拦截到纹理加载:', url);
        return originalMethod(...args);
      }
    );
  }
}

/**
 * 示例：使用自定义的 fromEquirectangular 处理逻辑
 * @param texture 等矩形贴图
 * @param renderer WebGL渲染器
 */
export function handleEquirectangularTexture(texture: Texture, renderer: WebGLRenderer) {
  if (!texture || !renderer) {
    console.error('处理等距矩形纹理失败: 缺少必要参数');
    return null;
  }
  
  // 这部分代码需要在运行时执行，这里只是示例
  // const pmremGenerator = new THREE.PMREMGenerator(renderer);
  // pmremGenerator.compileEquirectangularShader();
  
  // const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  // texture.dispose();
  // pmremGenerator.dispose();
  
  console.log('处理等距矩形纹理:', texture, renderer);
  return null; // 在实际应用中应返回处理后的纹理
}

/**
 * 设置全局属性拦截器
 * 在应用程序启动或组件挂载时调用此方法
 */
export function setupGlobalInterceptors() {
  console.log('正在设置全局属性拦截器...');
  
  // 设置 fromEquirectangular 属性的拦截器
  setupFromEquirectangularInterceptor((target, value) => {
    console.log('捕获到 fromEquirectangular 操作:', target);
    console.log('  - 返回值:', value);
    
    // 在这里可以添加自定义逻辑，例如：
    // - 记录所有使用此属性的对象
    // - 修改返回值
    // - 触发其他操作
    
    return value; // 返回原始值，或者可以返回修改后的值
  });
  
  console.log('全局属性拦截器设置完成');
  return true;
}

/**
 * 为对象应用代理拦截
 * @param obj 要拦截的对象
 * @returns 代理后的对象
 */
export function applyInterceptors<T>(obj: T): T {
  return createInterceptingProxy(obj) as T;
}

/**
 * 清理并移除所有拦截器
 * 在组件卸载时调用此方法
 */
export function cleanupInterceptors() {
  removeGlobalPropertyInterceptor('fromEquirectangular');
  // 可以添加其他清理逻辑
  console.log('已移除所有全局属性拦截器');
}

/**
 * 示例：拦截对象的 fromEquirectangular 属性
 * @param obj 需要拦截的对象
 */
export function interceptEquirectangularFor(obj: any) {
  return createInterceptingProxy(obj);
} 