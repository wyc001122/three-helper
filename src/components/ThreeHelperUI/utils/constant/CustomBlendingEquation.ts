import * as THREE from 'three'

export const BLENDING_EQUATIONS = {
    [THREE.AddEquation]: 'AddEquation',
    [THREE.SubtractEquation]: 'SubtractEquation',
    [THREE.ReverseSubtractEquation]: 'ReverseSubtractEquation',
    [THREE.MinEquation]: 'MinEquation',
    [THREE.MaxEquation]: 'MaxEquation',
}
export const SOURCE_FACTORS = {
    [THREE.ZeroFactor]: 'ZeroFactor',
    [THREE.OneFactor]: 'OneFactor',
    [THREE.SrcColorFactor]: 'SrcColorFactor',
    [THREE.OneMinusSrcColorFactor]: 'OneMinusSrcColorFactor',
    [THREE.SrcAlphaFactor]: 'SrcAlphaFactor',
    [THREE.OneMinusSrcAlphaFactor]: 'OneMinusSrcAlphaFactor',
    [THREE.DstAlphaFactor]: 'DstAlphaFactor',
    [THREE.OneMinusDstAlphaFactor]: 'OneMinusDstAlphaFactor',
    [THREE.DstColorFactor]: 'DstColorFactor',
    [THREE.OneMinusDstColorFactor]: 'OneMinusDstColorFactor',
    [THREE.SrcAlphaSaturateFactor]: 'SrcAlphaSaturateFactor',
    [THREE.ConstantColorFactor]: 'ConstantColorFactor',
    [THREE.OneMinusConstantColorFactor]: 'OneMinusConstantColorFactor',
    [THREE.ConstantAlphaFactor]: 'ConstantAlphaFactor',
    [THREE.OneMinusConstantAlphaFactor]: 'OneMinusConstantAlphaFactor',
}

export const DESTINATION_FACTORS = {
    [THREE.SrcAlphaSaturateFactor]: 'SrcAlphaSaturateFactor',
}

