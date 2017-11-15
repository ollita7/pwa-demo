import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class RequestInterceptor {
  @BlockUI() blockUI: NgBlockUI;
  public defaultMessage = 'Please wait...';
  public genericMessage = 'Error ocurred, pelase contact with your adminsitrator';

  constructor(public toastr: ToastrService, public toastrConfig: ToastrConfig) {
    toastrConfig.closeButton = true;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
        .map((event: HttpEvent<any>) => {
            this.blockUI.start(this.defaultMessage);
            if (event instanceof HttpResponse) {
                this.blockUI.stop();
                if (event.body.status === 'error') {
                    this.toastr.error (null, event.body.error, this.toastrConfig);
                }
                return event;
            }
        })
        .catch((err: HttpEvent<any>) => {
            this.blockUI.stop();
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // resdirect to home
                    return Observable.throw('401 Unauthorized');
                }else if (err.status === 403) {
                    // redirect to login
                }else if (err.status === 404) {
                    console.log(`method ${req.url} not found on server`);
                    if (err.error) {
                        const errorJSON = JSON.parse(err.error);
                        this.toastr.error (null, errorJSON.error, this.toastrConfig);
                    }else {
                        this.toastr.error(null, this.genericMessage, this.toastrConfig);
                    }
                }else if (err.status === 500) {
                    this.toastr.error (null, this.genericMessage, this.toastrConfig);
                }else {
                    this.toastr.error (null, this.genericMessage, this.toastrConfig);
                }
                return Observable.throw(err);
            }
        });
    }

}
