import { LayerNames, TilesetNames } from "../model/keys.model";
import { InitScene } from "../scenes/init-scene";
import { MainScene } from "../scenes/main-scene";

export const tilesetNames: TilesetNames = {
    ground: { tilesetName: 'env_ground', tilesetKey: 'tileset', path: '/assets/game/main/env_ground.png' , scenes: ['InitScene', 'MainScene']},
    trees: { tilesetName: 'env_trees', tilesetKey: 'tilesetTrees', path: '/assets/game/main/env_trees.png',scenes: ['InitScene', 'MainScene'] },
    wood: { tilesetName: 'wood_env', tilesetKey: 'tilesetWood', path: '/assets/game/main/wood_env.png', scenes: ['MainScene'] },
    decorative: { tilesetName: 'decorative_obj', tilesetKey: 'tilesetDecorative', path: '/assets/game/main/decorative_obj.png', scenes: ['MainScene'] }
};

export const layerNames: LayerNames = {
    groundLayer: { name: 'ground', tilesetKey: 'ground' ,scenes: ['InitScene', 'MainScene']},
    woodLayer: { name: 'wood_decorative', tilesetKey: 'wood', scenes: ['MainScene'] },
    woodCollisionLayer: { name: 'wood_collide', tilesetKey: 'wood', scenes: ['MainScene'] },
    grassLayer: { name: 'grass', tilesetKey: 'ground', scenes: ['InitScene', 'MainScene'] },
    treesLayer: { name: 'trees', tilesetKey: 'trees', scenes: ['InitScene', 'MainScene']},
    treesBackLayer: { name: 'trees_back', tilesetKey: 'trees', scenes: ['MainScene'] },
    treesGrassLayer: { name: 'trees_grass', tilesetKey: 'trees', scenes: ['InitScene', 'MainScene'] },
    decorativeLayer: { name: 'decorative', tilesetKey: 'decorative', scenes: ['MainScene'] }
};
