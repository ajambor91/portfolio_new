import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Token } from "../models/token.model";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    token: Subject<Token> = new Subject<Token>();
}