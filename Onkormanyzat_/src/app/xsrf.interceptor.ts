import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Retrieve XSRF token
    const token = this.tokenExtractor.getToken();

    // Clone the request and add the X-XSRF-Token header if token is available
    let newReq = req;
    if (token && req.method !== 'GET' && req.method !== 'HEAD') {
      newReq = req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', token)
      });
    }

    // Pass the cloned request to the next interceptor or HttpHandler
    return next.handle(newReq);
  }
}
