import {
    SIDE,
    BLENDING_MODE,
    DEPTH_MODE,
    TEXTURE_COMBINE_OPERATIONS,
    STENCIL_FUNCTIONS,
    STENCIL_OPERATIONS,
    NORMAL_MAP_TYPES
} from './Material'

import {
    BLENDING_EQUATIONS,
    SOURCE_FACTORS,
    DESTINATION_FACTORS
} from './CustomBlendingEquation'

import {
    Mapping_Modes,
    Wrapping_Modes,
    Magnification_Filters,
    Minification_Filters,
    Types,
    Formats,
    DDS_ST3C_Compressed_Texture_Formats,
    PVRTC_Compressed_Texture_Formats,
    ETC_Compressed_Texture_Formats,
    ASTC_Compressed_Texture_Formats,
    BPTC_Compressed_Texture_Formats,
    Texture_Comparison_Functions,
    Depth_Packing,
    Color_Space
} from './Texture'

const material_key_value: any = {
    blendDst: SOURCE_FACTORS,
    blendEquation: BLENDING_EQUATIONS,
    blending: BLENDING_MODE,
    blendSrc: SOURCE_FACTORS,
    depthFunc: DEPTH_MODE,
    stencilFunc: STENCIL_FUNCTIONS,
    stencilFail: STENCIL_OPERATIONS,
    stencilZFail: STENCIL_OPERATIONS,
    stencilZPass: STENCIL_OPERATIONS,
    shadowSide: SIDE,
    side: SIDE,
}

const texture_key_value: any = {
    mapping: Mapping_Modes,
    wrapS: Wrapping_Modes,
    wrapT: Wrapping_Modes,
    magFilter: Magnification_Filters,
    minFilter: Minification_Filters,
    format: Formats,
    type: Types,
    colorSpace: Color_Space,
}

export function getConstantName(object: any, key: string, value: any) {
    if (object.isMaterial && material_key_value[key]) {
        return material_key_value[key][value]
    }
    if (object.isTexture && texture_key_value[key]) {
        return texture_key_value[key][value]
    }
}







