import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../models/consulta.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ConsultaService {

	constructor(private http: HttpClient) { }

	listarConsultas(): Observable<Consulta[]> {
		return this.http.get<Consulta[]>(environment.apiUrl + '/consultas/');
	}

	public marcarConsulta(dadosAgendamento): Observable<any> {
		return this.http.post<any>(environment.apiUrl + '/consultas/', dadosAgendamento);
	}

	public desmarcarConsulta(consulta_id: number): Observable<any> {
		return this.http.delete(environment.apiUrl + '/consultas/' + consulta_id);
	}
}
