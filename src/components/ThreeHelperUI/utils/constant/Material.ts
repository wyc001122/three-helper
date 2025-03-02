import * as THREE from 'three'

export const SIDE = {
    [THREE.FrontSide]: 'FrontSide',
    [THREE.BackSide]: 'BackSide',
    [THREE.DoubleSide]: 'DoubleSide'
}

export const BLENDING_MODE = {
    [THREE.NoBlending]: 'NoBlending',
    [THREE.NormalBlending]: 'NormalBlending',
    [THREE.AdditiveBlending]: 'AdditiveBlending',
    [THREE.SubtractiveBlending]: 'SubtractiveBlending',
    [THREE.MultiplyBlending]: 'MultiplyBlending',
    [THREE.CustomBlending]: 'CustomBlending',
}

export const DEPTH_MODE = {
    [THREE.NeverDepth]: 'NeverDepth',
    [THREE.AlwaysDepth]: 'AlwaysDepth',
    [THREE.EqualDepth]: 'EqualDepth',
    [THREE.LessDepth]: 'LessDepth',
    [THREE.LessEqualDepth]: 'LessEqualDepth',
    [THREE.GreaterEqualDepth]: 'GreaterEqualDepth',
    [THREE.GreaterDepth]: 'GreaterDepth',
    [THREE.NotEqualDepth]: 'NotEqualDepth',
}

export const TEXTURE_COMBINE_OPERATIONS = {
    [THREE.MultiplyOperation]: 'MultiplyOperation',
    [THREE.MixOperation]: 'MixOperation',
    [THREE.AddOperation]: 'AddOperation',
}

export const STENCIL_FUNCTIONS = {
    [THREE.NeverStencilFunc]: 'NeverStencilFunc',
    [THREE.LessStencilFunc]: 'LessStencilFunc',
    [THREE.EqualStencilFunc]: 'EqualStencilFunc',
    [THREE.LessEqualStencilFunc]: 'LessEqualStencilFunc',
    [THREE.GreaterStencilFunc]: 'GreaterStencilFunc',
    [THREE.NotEqualStencilFunc]: 'NotEqualStencilFunc',
    [THREE.GreaterEqualStencilFunc]: 'GreaterEqualStencilFunc',
    [THREE.AlwaysStencilFunc]: 'AlwaysStencilFunc',
}

export const STENCIL_OPERATIONS = {
    [THREE.ZeroStencilOp]: 'ZeroStencilOp',
    [THREE.KeepStencilOp]: 'KeepStencilOp',
    [THREE.ReplaceStencilOp]: 'ReplaceStencilOp',
    [THREE.IncrementStencilOp]: 'IncrementStencilOp',
    [THREE.DecrementStencilOp]: 'DecrementStencilOp',
    [THREE.IncrementWrapStencilOp]: 'IncrementWrapStencilOp',
    [THREE.DecrementWrapStencilOp]: 'DecrementWrapStencilOp',
    [THREE.InvertStencilOp]: 'InvertStencilOp',
}

export const NORMAL_MAP_TYPES = {
    [THREE.TangentSpaceNormalMap]: 'TangentSpaceNormalMap',
    [THREE.ObjectSpaceNormalMap]: 'ObjectSpaceNormalMap',
}


