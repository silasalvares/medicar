import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MedicoFiltros } from '../models/medico-filtros.model';

@Injectable({
	providedIn: 'root'
})
export class MedicoService {

	constructor(private httpClient: HttpClient) { }

	public listarMedicosByEspecialidades(especialidades: number[]): Observable<Medico[]> {
		let params = new HttpParams()
			.set('especialidade', especialidades.toString());
		return this.httpClient.get<Medico[]>(environment.apiUrl + '/medicos/', { params: params});
	}
}
