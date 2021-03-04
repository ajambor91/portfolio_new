import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Config } from "src/app/config/config";
import { CustomInjectable } from "../di/custom.injector";
import { Result } from "../model/result.model";

@CustomInjectable()

export class ResultService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    }

    addResult(result: Result): Observable<boolean> {
        return this.httpClient.post<boolean>(`${Config.get().api}results/add`, result);
    }

    getResults(): Observable<Result[]> {
        return this.httpClient.get<Result[]>(`${Config.get().api}results/get`);
    }
}


