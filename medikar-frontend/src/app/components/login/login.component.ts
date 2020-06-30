import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	usuario: Login;

	constructor(
		private router: Router,
		private authService: AuthenticationService
	) { }

	ngOnInit(): void {
		this.usuario = new Login();
	}

	public login() {
		this.authService.login(this.usuario).subscribe(
			apiResponse => {
				localStorage.setItem('authToken', apiResponse.token);
				this.router.navigate(['/']);
			}
		);

	}
}
