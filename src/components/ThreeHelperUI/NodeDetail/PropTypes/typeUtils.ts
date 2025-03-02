// 检查值是否为HTML元素
export function isHTMLElement(value: any): boolean {
  return value &&
    typeof value === 'object' &&
    (value.nodeType !== undefined && value.nodeName !== undefined ||
      (value.toString && value.toString() === '[object HTMLElement]'))
}

// 检查值是否为纹理
export function isTexture(value: any): boolean {
  return value &&
    typeof value === 'object' &&
    value.isTexture === true
}

// 获取值的类型
export function getValueType(value: any): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'function') return 'function'
  if (Array.isArray(value)) return 'array'
  if (ArrayBuffer.isView(value)) return 'typedarray'
  return typeof value
}

// 检查值是否有子元素
export function hasChildren(value: any, valueType: string): boolean {
  return valueType === 'object' || valueType === 'array' || valueType === 'typedarray'
} 