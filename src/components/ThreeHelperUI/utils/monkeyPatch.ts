/**
 * Three.js 原型链入侵工具
 * 用于拦截和修改 Three.js 对象的默认行为
 */

import * as THREE from 'three';

// 存储原始方法的引用
const originalMethods = new Map<string, Function>();

// 存储被拦截的对象
const interceptedObjects = new Set<any>();

/**
 * 拦截对象属性访问的处理函数
 */
type PropertyInterceptor = (
  target: any,
  propertyName: string,
  originalValue: any
) => any;

/**
 * 全局属性拦截器映射
 * 属性名 -> 拦截处理函数
 */
const globalPropertyInterceptors = new Map<string, PropertyInterceptor>();

/**
 * 设置全局属性拦截器
 * @param propertyName 要拦截的属性名
 * @param interceptor 拦截处理函数
 */
export function setGlobalPropertyInterceptor(
  propertyName: string,
  interceptor: PropertyInterceptor
) {
  globalPropertyInterceptors.set(propertyName, interceptor);
  console.log(`已设置全局属性拦截器: ${propertyName}`);
  return true;
}

/**
 * 移除全局属性拦截器
 * @param propertyName 要移除拦截的属性名
 */
export function removeGlobalPropertyInterceptor(propertyName: string) {
  const result = globalPropertyInterceptors.delete(propertyName);
  if (result) {
    console.log(`已移除全局属性拦截器: ${propertyName}`);
  }
  return result;
}

/**
 * 为对象创建代理，拦截属性访问
 * @param obj 需要被代理的对象
 * @returns 代理对象
 */
export function createInterceptingProxy(obj: any): any {
  // 避免重复代理
  if (interceptedObjects.has(obj)) {
    return obj;
  }
  
  const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
      const propName = String(prop);
      const originalValue = Reflect.get(target, prop, receiver);
      
      // 检查是否有针对此属性的全局拦截器
      if (globalPropertyInterceptors.has(propName)) {
        const interceptor = globalPropertyInterceptors.get(propName);
        if (interceptor) {
          try {
            // 调用拦截器函数，可能会修改返回值
            return interceptor(target, propName, originalValue);
          } catch (error) {
            console.error(`属性拦截器错误 (${propName}):`, error);
          }
        }
      }
      
      // 如果没有拦截器或拦截器出错，返回原始值
      return originalValue;
    }
  });
  
  interceptedObjects.add(proxy);
  return proxy;
}

/**
 * 拦截类的方法
 * @param targetClass 目标类或对象
 * @param methodName 方法名
 * @param callback 回调函数，接收原始方法和调用参数
 */
export function interceptMethod(
  targetClass: any, 
  methodName: string,
  callback: (original: Function, ...args: any[]) => any
) {
  // 检查方法是否存在
  if (typeof targetClass[methodName] !== 'function') {
    console.warn(`目标对象上未找到方法 ${methodName}`);
    return false;
  }

  // 保存原始方法
  const key = `${targetClass.constructor?.name || 'Unknown'}.${methodName}`;
  originalMethods.set(key, targetClass[methodName]);
  
  // 替换方法
  targetClass[methodName] = function(...args: any[]) {
    const original = originalMethods.get(key);
    if (!original) {
      console.error(`未找到原始方法: ${key}`);
      return undefined;
    }
    return callback(original, ...args);
  };
  
  console.log(`成功拦截 ${key} 方法`);
  return true;
}

/**
 * 拦截实例方法 (原型方法)
 * @param constructor 构造函数
 * @param methodName 方法名
 * @param callback 回调函数
 */
export function interceptPrototypeMethod(
  constructor: any,
  methodName: string,
  callback: (thisArg: any, original: Function, ...args: any[]) => any
) {
  if (!constructor.prototype || typeof constructor.prototype[methodName] !== 'function') {
    console.warn(`在 ${constructor.name}.prototype 上未找到方法 ${methodName}`);
    return false;
  }

  const key = `${constructor.name}.prototype.${methodName}`;
  originalMethods.set(key, constructor.prototype[methodName]);
  
  constructor.prototype[methodName] = function(...args: any[]) {
    console.log(`拦截到 ${key} 调用:`, args);
    const original = originalMethods.get(key);
    if (!original) {
      console.error(`未找到原始方法: ${key}`);
      return undefined;
    }
    return callback(this, original, ...args);
  };
  
  console.log(`成功拦截 ${key} 方法`);
  return true;
}

/**
 * 恢复被拦截的方法
 * @param targetClass 目标类或对象
 * @param methodName 方法名
 */
export function restoreMethod(targetClass: any, methodName: string) {
  const key = `${targetClass.constructor?.name || 'Unknown'}.${methodName}`;
  const original = originalMethods.get(key);
  
  if (original) {
    targetClass[methodName] = original;
    originalMethods.delete(key);
    console.log(`已恢复原始 ${key} 方法`);
    return true;
  }
  return false;
}

/**
 * 恢复被拦截的原型方法
 * @param constructor 构造函数
 * @param methodName 方法名
 */
export function restorePrototypeMethod(constructor: any, methodName: string) {
  const key = `${constructor.name}.prototype.${methodName}`;
  const original = originalMethods.get(key);
  
  if (original) {
    constructor.prototype[methodName] = original;
    originalMethods.delete(key);
    console.log(`已恢复原始 ${key} 方法`);
    return true;
  }
  return false;
}

/**
 * 检查对象或类是否有指定方法
 * @param obj 要检查的对象或类
 * @param methodName 方法名
 * @param checkPrototype 是否检查原型
 */
function hasMethod(obj: any, methodName: string, checkPrototype = false): boolean {
  if (!obj) return false;
  
  if (typeof obj[methodName] === 'function') {
    return true;
  }
  
  if (checkPrototype && obj.prototype && typeof obj.prototype[methodName] === 'function') {
    return true;
  }
  
  return false;
}

/**
 * 设置对 fromEquirectangular 方法的拦截
 * 这个函数会尝试拦截与 fromEquirectangular 相关的所有可能方法
 */
export function setupEquirectangularInterceptors() {
  try {
    // THREE.CubeTexture 上的静态方法 (如果存在)
    if (hasMethod(THREE.CubeTexture, 'fromEquirectangular')) {
      interceptMethod(THREE.CubeTexture, 'fromEquirectangular', 
        (original, ...args) => {
          console.log('自定义处理 CubeTexture.fromEquirectangular');
          return original.apply(THREE.CubeTexture, args);
        }
      );
    }
    
    // THREE.PMREMGenerator 原型方法
    if (hasMethod(THREE.PMREMGenerator, 'fromEquirectangular', true)) {
      interceptPrototypeMethod(THREE.PMREMGenerator, 'fromEquirectangular',
        (thisArg, original, ...args) => {
          console.log('自定义处理 PMREMGenerator.prototype.fromEquirectangular');
          return original.apply(thisArg, args);
        }
      );
    }

    // 尝试其他可能有此方法的类
    [
      THREE.CubeTextureLoader,
      THREE.TextureLoader,
      THREE.ImageLoader
    ].forEach(cls => {
      if (!cls) return;
      
      // 检查静态方法
      if (hasMethod(cls, 'fromEquirectangular')) {
        interceptMethod(cls, 'fromEquirectangular', 
          (original, ...args) => {
            console.log(`自定义处理 ${cls.name}.fromEquirectangular`);
            return original.apply(cls, args);
          }
        );
      }
      
      // 检查原型方法
      if (hasMethod(cls, 'fromEquirectangular', true)) {
        interceptPrototypeMethod(cls, 'fromEquirectangular',
          (thisArg, original, ...args) => {
            console.log(`自定义处理 ${cls.name}.prototype.fromEquirectangular`);
            return original.apply(thisArg, args);
          }
        );
      }
    });

    console.log('已完成 fromEquirectangular 方法拦截设置');
    return true;
  } catch (error) {
    console.error('设置 fromEquirectangular 拦截器时出错:', error);
    return false;
  }
}

/**
 * 设置对 fromEquirectangular 属性的全局拦截
 * 此函数会拦截所有对象的 fromEquirectangular 属性访问
 * @param callback 自定义处理函数
 */
export function setupFromEquirectangularInterceptor(
  callback: (target: any, value: any) => any = (target, value) => {
    console.log('拦截到 fromEquirectangular 属性访问:', target);
    return value;
  }
) {
  // 设置全局拦截器
  return setGlobalPropertyInterceptor('fromEquirectangular', (target, prop, value) => {
    // 如果是函数，可以进一步拦截调用
    if (typeof value === 'function') {
      return function(...args: any[]) {
        console.log('拦截到 fromEquirectangular 方法调用:', args);
        return callback(target, value.apply(target, args));
      };
    }
    
    // 如果是普通属性，直接处理
    return callback(target, value);
  });
}

/**
 * 使用示例：
 * 
 * // 在应用启动时设置拦截器
 * import { setupEquirectangularInterceptors } from './monkeyPatch';
 * 
 * // 在组件挂载时
 * onMounted(() => {
 *   setupEquirectangularInterceptors();
 * });
 * 
 * // 也可以单独拦截特定方法
 * import { interceptMethod } from './monkeyPatch';
 * 
 * interceptMethod(THREE.TextureLoader, 'load', (original, ...args) => {
 *   console.log('拦截到 TextureLoader.load 调用:', args);
 *   // 可以在这里修改参数、添加自定义逻辑等
 *   return original.apply(THREE.TextureLoader, args);
 * });
 */ 