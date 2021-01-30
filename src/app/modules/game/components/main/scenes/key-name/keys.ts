import { LayerNames, TilesetNames } from "../model/keys.model";

export const tilesetNames: TilesetNames = {
    ground : {tilesetName: 'env_ground', tilesetKey: 'tileset',path: '/assets/game/main/env_ground.png'},
    trees: {tilesetName: 'env_trees', tilesetKey: 'tilesetTrees',path: '/assets/game/main/env_trees.png'},
    wood: {tilesetName: 'wood_env', tilesetKey: 'tilesetWood', path: '/assets/game/main/wood_env.png'},
    decorative: {tilesetName: 'decorative_obj', tilesetKey: 'tilesetDecorative', path: '/assets/game/main/decorative_obj.png'}
};

export const layerNames: LayerNames = {
    groundLayer: {name: 'ground', tilesetKey: 'ground'},
    woodLayer: {name: 'wood_decorative', tilesetKey: 'wood'},
    woodCollisionLayer: {name: 'wood_collide', tilesetKey: 'wood'},
    grassLayer: {name: 'grass', tilesetKey: 'ground'},
    treesLayer: {name: 'trees', tilesetKey: 'trees'},
    treesBackLayer: {name: 'trees_back', tilesetKey: 'trees'},
    treesGrassLayer: {name: 'trees_grass', tilesetKey: 'trees'},
    decorativeLayer: {name: 'decorative', tilesetKey: 'decorative'}
};
