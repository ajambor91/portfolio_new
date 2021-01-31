export interface TilesetNames{
    [key: string]: {
        tilesetName: string,
        tilesetKey: string,
        path: string
    }
}

export interface LayerNames{
    [key: string]: {
        name: string,
        tilesetKey: string;
    }
}