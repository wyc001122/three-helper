import * as THREE from 'three'


export const CULL_FACE_MODES = {
    [THREE.CullFaceNone]: 'CullFaceNone',
    [THREE.CullFaceBack]: 'CullFaceBack',
    [THREE.CullFaceFront]: 'CullFaceFront',
    [THREE.CullFaceFrontBack]: 'CullFaceFrontBack',
}

export const SHADOW_TYPES = {
    [THREE.BasicShadowMap]: 'BasicShadowMap',
    [THREE.PCFShadowMap]: 'PCFShadowMap',
    [THREE.PCFSoftShadowMap]: 'PCFSoftShadowMap',
    [THREE.VSMShadowMap]: 'VSMShadowMap',
}

export const TONE_MAPPING = {
    [THREE.NoToneMapping]: 'NoToneMapping',
    [THREE.LinearToneMapping]: 'LinearToneMapping',
    [THREE.ReinhardToneMapping]: 'ReinhardToneMapping',
    [THREE.CineonToneMapping]: 'CineonToneMapping',
    [THREE.ACESFilmicToneMapping]: 'ACESFilmicToneMapping',
    [THREE.AgXToneMapping]: 'AgXToneMapping',
    [THREE.NeutralToneMapping]: 'NeutralToneMapping',
    [THREE.CustomToneMapping]: 'CustomToneMapping',
}
