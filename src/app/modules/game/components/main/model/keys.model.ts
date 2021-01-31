export interface TilesetNames{
    [key: string]: {
        tilesetName: string,
        tilesetKey: string,
        path: string,
        scenes: any[]
    }
}

export interface LayerNames{
    [key: string]: {
        name: string,
        tilesetKey: string,
        scenes: any[]
    }
}