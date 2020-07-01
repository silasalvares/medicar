import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agenda } from '../models/agenda.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Horario } from '../models/horario.model';

@Injectable({
	providedIn: 'root'
})
export class AgendaService {

	constructor(private httpClient: HttpClient) { }

	public listarAgendasDisponiveis(): Observable<Agenda[]> {
		return this.httpClient.get<Agenda[]>(environment.apiUrl + '/agendas/');
	}

	public listarHorariosDisponiveis(agenda_id): Observable<Horario[]> {
		return this.httpClient.get<Horario[]>(environment.apiUrl + '/horarios/' + agenda_id) ;
	}

}
