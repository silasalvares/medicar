import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidade } from '../models/especialidade.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EspecialidadeService {

	constructor(private http: HttpClient) { }

	public listarEspecialidades(): Observable<Especialidade[]> {
		return this.http.get<Especialidade[]>(environment.apiUrl + '/especialidades/');
	}
}
