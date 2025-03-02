interface DragOptions {
  onDrag?: (e: MouseEvent, position: { x: number, y: number }) => void
  onDragStart?: (e: MouseEvent) => void
  onDragEnd?: (e: MouseEvent) => void
  handler?: string | HTMLElement  // 可以传入选择器或者 DOM 元素
}

export function useDraggable(element: HTMLElement, options: DragOptions = {}) {
  let isDragging = false
  let startX = 0
  let startY = 0
  let startLeft = 0
  let startTop = 0

  function handleMouseDown(e: MouseEvent) {
    // 检查是否点击在 handler 上
    if (options.handler) {
      const handlerElement = typeof options.handler === 'string'
        ? element.querySelector(options.handler)
        : options.handler

      const target = e.target as HTMLElement
      // 如果点击的不是 handler 或其子元素，则不处理
      if (!handlerElement?.contains(target)) {
        return
      }
    }

    isDragging = true
    startX = e.clientX
    startY = e.clientY

    // 获取元素当前位置
    const rect = element.getBoundingClientRect()
    startLeft = rect.left
    startTop = rect.top

    // 添加临时事件监听
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // 防止文本选中
    e.preventDefault()

    // 调用开始拖拽回调
    options.onDragStart?.(e)
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return

    // 计算位移
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    // 更新元素位置
    const newLeft = startLeft + deltaX
    const newTop = startTop + deltaY

    element.style.position = 'fixed'
    element.style.left = `${newLeft}px`
    element.style.top = `${newTop}px`

    // 调用拖拽中回调
    options.onDrag?.(e, { x: newLeft, y: newTop })
  }

  function handleMouseUp(e: MouseEvent) {
    if (!isDragging) return

    isDragging = false

    // 移除临时事件监听
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    // 调用结束拖拽回调
    options.onDragEnd?.(e)
  }

  // 添加鼠标按下事件监听
  element.addEventListener('mousedown', handleMouseDown)

  // 返回清理函数
  return () => {
    element.removeEventListener('mousedown', handleMouseDown)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
} 