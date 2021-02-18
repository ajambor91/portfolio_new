import { ThisReceiver } from "@angular/compiler";
import { environment } from "src/environments/environment";
import { ConfigModel } from "../models/config.model";
import { localConfig, production } from "./config-data";

export class Config{
    static configApi: ConfigModel = production;
    static localConfig: ConfigModel = localConfig;

    static get(): ConfigModel {
        if(environment.production === true) {
            return this.configApi;
        }
        else{
            return this.localConfig;
        }
    } 
}