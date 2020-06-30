import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agenda } from '../models/agenda.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AgendaService {

	constructor(private httpClient: HttpClient) { }

	public listarAgendasDisponiveis(): Observable<Agenda[]> {
		return this.httpClient.get<Agenda[]>(environment.apiUrl + '/agendas/');
	}

}
