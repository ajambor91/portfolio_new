import { Depth } from "../enums/depth.enum";
import { LayerNames, TilesetNames } from "../model/keys.model";

export const tilesetNames: TilesetNames = {
    ground: { tilesetName: 'env_ground', tilesetKey: 'tileset', path: '/assets/game/main/env_ground.png' , scenes: ['InitScene', 'MainScene']},
    trees: { tilesetName: 'env_trees', tilesetKey: 'tilesetTrees', path: '/assets/game/main/env_trees.png',scenes: ['InitScene', 'MainScene'] },
    wood: { tilesetName: 'wood_env', tilesetKey: 'tilesetWood', path: '/assets/game/main/wood_env.png', scenes: ['MainScene'] },
    decorative: { tilesetName: 'decorative_obj', tilesetKey: 'tilesetDecorative', path: '/assets/game/main/decorative_obj.png', scenes: ['MainScene'] },
    rock: { tilesetName: 'env_rock', tilesetKey: 'rock', path: '/assets/game/main/env_rock.png', scenes: ['MainScene'] },
    tar: {tilesetName: 'tar', tilesetKey: 'tar', path: '/assets/game/main/tar.png', scenes: ['MainScene']}
};

export const layerNames: LayerNames = {
    groundLayer: { name: 'ground', tilesetKey: 'ground' ,depth: Depth.Ground, scenes: ['InitScene', 'MainScene']},
    woodLayer: { name: 'wood_decorative', tilesetKey: 'wood',depth: Depth.DecorativeWood, scenes: ['MainScene'] },
    woodCollisionLayer: { name: 'wood_collide', tilesetKey: 'wood',depth: Depth.Wood, scenes: ['MainScene'] },
    grassLayer: { name: 'grass', tilesetKey: 'ground',depth: Depth.Grass, scenes: ['InitScene', 'MainScene'] },
    treesLayer: { name: 'trees', tilesetKey: 'trees',depth: Depth.Trees, scenes: ['InitScene', 'MainScene']},
    treesBackLayer: { name: 'trees_back', tilesetKey: 'trees',depth: Depth.TreesFrontPlayer, scenes: ['MainScene'] },
    treesGrassLayer: { name: 'trees_grass', tilesetKey: 'trees',depth: Depth.Grass, scenes: ['InitScene', 'MainScene'] },
    treesBehindLayer: { name: 'trees_behind', tilesetKey: 'trees',depth: Depth.TreesFrontPlayer, scenes: [ 'MainScene'] },
    decorativeLayer: { name: 'decorative', tilesetKey: 'decorative',depth: Depth.Decorative, scenes: ['MainScene'] },
    rockLayer: { name: 'rocks', tilesetKey: 'rock',depth: Depth.RocksTrap, scenes: ['MainScene'] },
    grassVertLayer: { name: 'grass_vert', tilesetKey: 'ground',depth: Depth.Ground, scenes: ['MainScene'] },
    monsterCollideLayer: {name: 'enemies_collide', tilesetKey: 'ground', depth: Depth.Ground, scenes:['MainScene']},
    tarLayer: {name: 'tar', tilesetKey: 'tar', depth: Depth.Grass, scenes: ['MainScene']}
};
