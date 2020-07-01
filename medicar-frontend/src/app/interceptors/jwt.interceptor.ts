import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let token = localStorage.getItem('authToken');
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `JWT ${token}`
				}
			})
		}

		return next.handle(request);
	}
}
