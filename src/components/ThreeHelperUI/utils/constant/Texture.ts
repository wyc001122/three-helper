import * as THREE from 'three'

export const Mapping_Modes = {
    [THREE.UVMapping]: 'UVMapping',
    [THREE.CubeReflectionMapping]: 'CubeReflectionMapping ',
    [THREE.CubeRefractionMapping]: 'CubeRefractionMapping',
    [THREE.EquirectangularReflectionMapping]: 'EquirectangularReflectionMapping',
    [THREE.EquirectangularRefractionMapping]: 'EquirectangularRefractionMapping ',
    [THREE.CubeUVReflectionMapping]: 'CubeUVReflectionMapping',
}

export const Wrapping_Modes = {
    [THREE.RepeatWrapping]: 'RepeatWrapping',
    [THREE.ClampToEdgeWrapping]: 'ClampToEdgeWrapping',
    [THREE.MirroredRepeatWrapping]: 'MirroredRepeatWrapping',
}

export const Magnification_Filters = {
    [THREE.NearestFilter]: 'NearestFilter',
    [THREE.LinearFilter]: 'LinearFilter',
}

export const Minification_Filters = {
    [THREE.NearestFilter]: 'NearestFilter',
    [THREE.NearestMipmapNearestFilter]: 'NearestMipmapNearestFilter',
    [THREE.NearestMipmapLinearFilter]: 'NearestMipmapLinearFilter',
    [THREE.LinearFilter]: 'LinearFilter',
    [THREE.LinearMipmapNearestFilter]: 'LinearMipmapNearestFilter',
    [THREE.LinearMipmapLinearFilter]: 'LinearMipmapLinearFilter',
}

export const Types = {
    [THREE.UnsignedByteType]: 'UnsignedByteType',
    [THREE.ByteType]: 'ByteType',
    [THREE.ShortType]: 'ShortType',
    [THREE.UnsignedShortType]: 'UnsignedShortType',
    [THREE.IntType]: 'IntType',
    [THREE.UnsignedIntType]: 'UnsignedIntType',
    [THREE.FloatType]: 'FloatType',
    [THREE.HalfFloatType]: 'HalfFloatType',
    [THREE.UnsignedShort4444Type]: 'UnsignedShort4444Type',
    [THREE.UnsignedShort5551Type]: 'UnsignedShort5551Type',
    [THREE.UnsignedInt248Type]: 'UnsignedInt248Type',
    [THREE.UnsignedInt5999Type]: 'UnsignedInt5999Type',
}

export const Formats = {
    [THREE.AlphaFormat]: 'AlphaFormat',
    [THREE.RedFormat]: 'RedFormat',
    [THREE.RedIntegerFormat]: 'RedIntegerFormat',
    [THREE.RGFormat]: 'RGFormat',
    [THREE.RGIntegerFormat]: 'RGIntegerFormat',
    [THREE.RGBFormat]: 'RGBFormat',
    [THREE.RGBAFormat]: 'RGBAFormat',
    [THREE.RGBAIntegerFormat]: 'RGBAIntegerFormat',
    [THREE.LuminanceFormat]: 'LuminanceFormat',
    [THREE.LuminanceAlphaFormat]: 'LuminanceAlphaFormat',
    [THREE.DepthFormat]: 'DepthFormat',
    [THREE.DepthStencilFormat]: 'DepthStencilFormat',
}

export const DDS_ST3C_Compressed_Texture_Formats = {
    [THREE.RGB_S3TC_DXT1_Format]: 'RGB_S3TC_DXT1_Format',
    [THREE.RGBA_S3TC_DXT1_Format]: 'RGBA_S3TC_DXT1_Format',
    [THREE.RGBA_S3TC_DXT3_Format]: 'RGBA_S3TC_DXT3_Format',
    [THREE.RGBA_S3TC_DXT5_Format]: 'RGBA_S3TC_DXT5_Format',
}

export const PVRTC_Compressed_Texture_Formats = {
    [THREE.RGB_PVRTC_4BPPV1_Format]: 'RGB_PVRTC_4BPPV1_Format',
    [THREE.RGB_PVRTC_2BPPV1_Format]: 'RGB_PVRTC_2BPPV1_Format',
    [THREE.RGBA_PVRTC_4BPPV1_Format]: 'RGBA_PVRTC_4BPPV1_Format',
    [THREE.RGBA_PVRTC_2BPPV1_Format]: 'RGBA_PVRTC_2BPPV1_Format',
}

export const ETC_Compressed_Texture_Formats = {
    [THREE.RGB_ETC1_Format]: 'RGB_ETC1_Format',
    [THREE.RGB_ETC2_Format]: 'RGB_ETC2_Format',
    [THREE.RGBA_ETC2_EAC_Format]: 'RGBA_ETC2_EAC_Format',
}


export const ASTC_Compressed_Texture_Formats = {
    [THREE.RGBA_ASTC_4x4_Format]: 'RGBA_ASTC_4x4_Format',
    [THREE.RGBA_ASTC_5x4_Format]: 'RGBA_ASTC_5x4_Format',
    [THREE.RGBA_ASTC_5x5_Format]: 'RGBA_ASTC_5x5_Format',
    [THREE.RGBA_ASTC_6x5_Format]: 'RGBA_ASTC_6x5_Format',
    [THREE.RGBA_ASTC_8x5_Format]: 'RGBA_ASTC_8x5_Format',
    [THREE.RGBA_ASTC_8x6_Format]: 'RGBA_ASTC_8x6_Format',
    [THREE.RGBA_ASTC_8x8_Format]: 'RGBA_ASTC_8x8_Format',
    [THREE.RGBA_ASTC_10x5_Format]: 'RGBA_ASTC_10x5_Format',
    [THREE.RGBA_ASTC_10x8_Format]: 'RGBA_ASTC_10x8_Format',
    [THREE.RGBA_ASTC_10x10_Format]: 'RGBA_ASTC_10x10_Format',
    [THREE.RGBA_ASTC_12x10_Format]: 'RGBA_ASTC_12x10_Format',
    [THREE.RGBA_ASTC_12x12_Format]: 'RGBA_ASTC_12x12_Format',
}

export const BPTC_Compressed_Texture_Formats = {
    [THREE.RGBA_BPTC_Format]: 'RGBA_BPTC_Format',
}

export const Texture_Comparison_Functions = {
    [THREE.NeverCompare]: 'NeverCompare',
    [THREE.LessCompare]: 'LessCompare',
    [THREE.EqualCompare]: 'EqualCompare',
    [THREE.LessEqualCompare]: 'LessEqualCompare',
    [THREE.GreaterCompare]: 'GreaterCompare',
    [THREE.NotEqualCompare]: 'NotEqualCompare',
    [THREE.GreaterEqualCompare]: 'GreaterEqualCompare',
    [THREE.AlwaysCompare]: 'AlwaysCompare',
}

export const Depth_Packing = {
    [THREE.BasicDepthPacking]: 'BasicDepthPacking',
    [THREE.RGBADepthPacking]: 'RGBADepthPacking',
}

export const Color_Space = {
    [THREE.NoColorSpace]: 'NoColorSpace',
    [THREE.SRGBColorSpace]: 'SRGBColorSpace',
    [THREE.LinearSRGBColorSpace]: 'LinearSRGBColorSpace',
}

