import { ConfigModel } from "../models/config.model"

export const localConfig: ConfigModel = {
    api: 'http://home-backend.local/'
}

export const production: ConfigModel = {
    api: 'https://backend.adamjambor.pl/'
}