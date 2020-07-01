import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	public login(usuario: Login) {
		return this.http.post<any>(environment.apiUrl + '/login/', usuario);
	}

	public logout() {
		localStorage.removeItem('authToken');
		location.reload(true);
	}
}
