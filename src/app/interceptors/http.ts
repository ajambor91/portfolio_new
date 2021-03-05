import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "../models/token.model";
import { HttpService } from "../service/http.service";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
    
    private token: Token;

    constructor(private httpService: HttpService){
        httpService.token.subscribe((res: Token) => {
            this.token = res;
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(typeof this.token !== 'undefined' ) {
            req = req.clone({
                setHeaders: {
                    'Authorization': this.token.token
                }
            });

        }
        return next.handle(req);
    }
}