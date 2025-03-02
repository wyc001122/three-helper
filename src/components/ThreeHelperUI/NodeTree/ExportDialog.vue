<script lang='ts' setup>
import { ref, computed } from 'vue'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const props = defineProps<{
    isOpen: boolean,
    data: any
}>()

const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void,
    (e: 'export', data: any, options: any): void
}>()

// 导出配置选项
const exportOptions = ref({
    fileName: computed(() => props.data?.name || props.data?.type || 'object'),
    binary: false,             // 以二进制 (.glb) 格式导出
    trs: false,                // 导出位置、旋转和缩放而不是矩阵
    onlyVisible: true,         // 只导出可见对象
    truncateDrawRange: true,   // 只导出drawRange内的属性
    embedImages: true,         // 将图像嵌入到glTF资产中
    maxTextureSize: '4096',    // 限制图像最大尺寸
    forceIndices: false,       // 为非索引几何体生成索引
    includeCustomExtensions: false, // 导出自定义glTF扩展
})

// 选项描述
const optionDescriptions = {
    fileName: '导出文件的名称',
    binary: '以二进制 (.glb) 格式导出，返回 ArrayBuffer。默认为 false',
    trs: '导出每个节点的位置、旋转和缩放而不是矩阵。默认为 false',
    onlyVisible: '仅导出可见对象。默认为 true',
    truncateDrawRange: '仅导出绘制范围内的几何体属性。默认为 false',
    embedImages: '将图像嵌入到导出的文件中。默认为 true',
    maxTextureSize: '将图像最大尺寸（宽度和高度）限制为给定值。默认为无穷大',
    forceIndices: '为非索引几何体生成索引。默认为 false',
    includeCustomExtensions: '导出在对象属性上定义的自定义 glTF 扩展(userData.gltfExtensions)。默认为 false',
}

// 纹理尺寸选项
const textureSizeOptions = [
    { value: '256', label: '256×256' },
    { value: '512', label: '512×512' },
    { value: '1024', label: '1024×1024' },
    { value: '2048', label: '2048×2048' },
    { value: '4096', label: '4096×4096' },
    { value: '8192', label: '8192×8192' },
    { value: 'Infinity', label: '无限制' }
]

// 关闭对话框
const closeDialog = () => {
    emit('update:isOpen', false)
}

// 执行导出
const handleExport = () => {
    // 将字符串类型的 maxTextureSize 转换回数字
    const maxTextureSizeValue = exportOptions.value.maxTextureSize === 'Infinity'
        ? Infinity
        : parseInt(exportOptions.value.maxTextureSize, 10);

    emit('export', props.data, {
        ...exportOptions.value,
        maxTextureSize: maxTextureSizeValue,
        fileName: exportOptions.value.fileName
    })
    closeDialog()
}
</script>

<template>
    <Dialog :open="isOpen" @update:open="emit('update:isOpen', $event)">
        <DialogContent class="sm:max-w-[500px] text-sm p-5">
            <DialogHeader class="mb-3">
                <DialogTitle class="text-base flex">
                    <div>GLTFExporter导出</div>
                    <a href="https://threejs.org/docs/index.html#examples/zh/exporters/GLTFExporter" target="_blank"
                        title="文档" class="text-primary hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="ml-1">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </DialogTitle>
            </DialogHeader>

            <div class="space-y-4 py-2">
                <!-- 文件名 -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label for="fileName">fileName</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.fileName">?</span>
                    </div>
                    <Input id="fileName" v-model="exportOptions.fileName" class="col-span-3 h-7 " />
                </div>

                <!-- 二进制格式 -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label>binary</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.binary">?</span>
                    </div>
                    <div class="col-span-3 flex space-x-2">
                        <Button type="button" @click="exportOptions.binary = true"
                            :variant="exportOptions.binary ? 'default' : 'ghost'" class="h-6  px-3 min-w-[40px]">
                            true
                        </Button>
                        <Button type="button" @click="exportOptions.binary = false"
                            :variant="!exportOptions.binary ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            false
                        </Button>
                    </div>
                </div>

                <!-- TRS -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label>trs</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.trs">?</span>
                    </div>
                    <div class="col-span-3 flex space-x-2">
                        <Button type="button" @click="exportOptions.trs = true"
                            :variant="exportOptions.trs ? 'default' : 'ghost'" class="h-6  px-3 min-w-[40px]">
                            true
                        </Button>
                        <Button type="button" @click="exportOptions.trs = false"
                            :variant="!exportOptions.trs ? 'default' : 'ghost'" class="h-6  px-3 min-w-[40px]">
                            false
                        </Button>
                    </div>
                </div>

                <!-- 仅可见对象 -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label>onlyVisible</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.onlyVisible">?</span>
                    </div>
                    <div class="col-span-3 flex space-x-2">
                        <Button type="button" @click="exportOptions.onlyVisible = true"
                            :variant="exportOptions.onlyVisible ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            true
                        </Button>
                        <Button type="button" @click="exportOptions.onlyVisible = false"
                            :variant="!exportOptions.onlyVisible ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            false
                        </Button>
                    </div>
                </div>

                <!-- 截断绘制范围 -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label>truncateDrawRange</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.truncateDrawRange">?</span>
                    </div>
                    <div class="col-span-3 flex space-x-2">
                        <Button type="button" @click="exportOptions.truncateDrawRange = true"
                            :variant="exportOptions.truncateDrawRange ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            true
                        </Button>
                        <Button type="button" @click="exportOptions.truncateDrawRange = false"
                            :variant="!exportOptions.truncateDrawRange ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            false
                        </Button>
                    </div>
                </div>

                <!-- 嵌入图像 -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label>embedImages</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.embedImages">?</span>
                    </div>
                    <div class="col-span-3 flex space-x-2">
                        <Button type="button" @click="exportOptions.embedImages = true"
                            :variant="exportOptions.embedImages ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            true
                        </Button>
                        <Button type="button" @click="exportOptions.embedImages = false"
                            :variant="!exportOptions.embedImages ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            false
                        </Button>
                    </div>
                </div>

                <!-- 最大纹理尺寸 -->
                <div class="grid grid-cols-5 items-center gap-3" v-if="exportOptions.embedImages">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label for="maxTextureSize">maxTextureSize</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.maxTextureSize">?</span>
                    </div>
                    <Select v-model="exportOptions.maxTextureSize" class="col-span-3">
                        <SelectTrigger id="maxTextureSize" class="h-7 ">
                            <SelectValue
                                :placeholder="exportOptions.maxTextureSize === 'Infinity' ? '无限制' : exportOptions.maxTextureSize" />
                        </SelectTrigger>
                        <SelectContent class="">
                            <SelectItem v-for="option in textureSizeOptions" :key="option.value" :value="option.value"
                                class="">
                                {{ option.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <!-- 强制索引 -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2">
                        <Label>forceIndices</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.forceIndices">?</span>
                    </div>
                    <div class="col-span-3 flex space-x-2">
                        <Button type="button" @click="exportOptions.forceIndices = true"
                            :variant="exportOptions.forceIndices ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            true
                        </Button>
                        <Button type="button" @click="exportOptions.forceIndices = false"
                            :variant="!exportOptions.forceIndices ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            false
                        </Button>
                    </div>
                </div>

                <!-- 包含自定义扩展 -->
                <div class="grid grid-cols-5 items-center gap-3">
                    <div class="text-right  flex items-center justify-end col-span-2 whitespace-nowrap">
                        <Label>includeCustomExtensions</Label>
                        <span class="tooltip  ml-1 text-gray-400 text-[10px] cursor-help"
                            :data-tip="optionDescriptions.includeCustomExtensions">?</span>
                    </div>
                    <div class="col-span-3 flex space-x-2">
                        <Button type="button" @click="exportOptions.includeCustomExtensions = true"
                            :variant="exportOptions.includeCustomExtensions ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            true
                        </Button>
                        <Button type="button" @click="exportOptions.includeCustomExtensions = false"
                            :variant="!exportOptions.includeCustomExtensions ? 'default' : 'ghost'"
                            class="h-6  px-3 min-w-[40px]">
                            false
                        </Button>
                    </div>
                </div>
            </div>

            <DialogFooter class="mt-5">
                <Button variant="ghost" @click="closeDialog" class="h-7  px-4">取消</Button>
                <Button @click="handleExport" class="h-7  px-4 ml-2">导出</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
/* 自定义样式以确保控件大小一致 */
:deep(.select-trigger) {
    height: 1.75rem;
    min-height: 1.75rem;
    font-size: 0.75rem;
}

:deep(.select-content) {
    font-size: 0.75rem;
}

/* 工具提示样式 */
.tooltip {
    position: relative;
    display: inline-block;
    font-weight: bold;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    line-height: 12px;
    text-align: center;
}

.tooltip:hover::after {
    content: attr(data-tip);
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    z-index: 50;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: normal;
    pointer-events: none;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}
</style>