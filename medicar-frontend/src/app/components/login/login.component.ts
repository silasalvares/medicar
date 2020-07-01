import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [ MessageService ]
})
export class LoginComponent implements OnInit {

	usuario: Login;

	constructor(
		private router: Router,
		private messageService: MessageService,
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
			},
			error => {
				this.messageService.add({severity: 'error', detail: 'Credenciais Inválidas.'})
			}
		);

	}
}
