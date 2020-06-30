import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Registro } from 'src/app/models/registro.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

	cliente: Registro;
	confirmacaoSenha: string;

	constructor(
		private router: Router,
		private clienteService: ClienteService
	) { }

	ngOnInit(): void {
		this.cliente = new Registro();
	}

	public registrar() {
		this.clienteService.registrarCliente(this.cliente).subscribe(
			apiResponse => {
				this.router.navigate(['/login']);
			}
		);
	}

}
