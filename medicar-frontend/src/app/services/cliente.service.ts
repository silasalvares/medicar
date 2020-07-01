import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.model';
import { hostViewClassName } from '@angular/compiler';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro.model';

@Injectable({
	providedIn: 'root'
})
export class ClienteService {

	constructor(
		private http: HttpClient
	) { }

	public registrarCliente(cliente: Registro) {
		return this.http.post(environment.apiUrl + '/clientes/', cliente);
	}

	public getDadosCliente(): Observable<Cliente> {
		return this.http.get<Cliente>(environment.apiUrl + '/clientes/');
	}
}
