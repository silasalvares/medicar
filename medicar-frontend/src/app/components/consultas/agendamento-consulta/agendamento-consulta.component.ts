import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Consulta } from 'src/app/models/consulta.model';
import { Especialidade } from 'src/app/models/especialidade.model';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { Medico } from 'src/app/models/medico.model';
import { Agenda } from 'src/app/models/agenda.model';
import { AgendaService } from 'src/app/services/agenda.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
	selector: 'agendamento-consulta',
	templateUrl: './agendamento-consulta.component.html',
	styleUrls: ['./agendamento-consulta.component.scss']
})
export class AgendamentoConsultaComponent implements OnInit {
	
	public especialidades: Especialidade[];
	public especialidadeSelecionada: Especialidade;
	public medicos: Medico[];
	public medicoSelecionado: Medico;
	public agendas: Agenda[];
	public agendaSelecionada: Agenda;
	public horariosAgenda: SelectItem[];
	public horarioSelecionado: string;
	
	public agendasMedico: Agenda[];
	public consulta: Consulta;

	constructor(
		private messageService: MessageService,
		private ref: DynamicDialogRef,
		private especialidadeService: EspecialidadeService,
		private agendaService: AgendaService,
		private consultaService: ConsultaService) { }

	ngOnInit(): void {
		this.especialidadeSelecionada = new Especialidade();
		this.agendas = [];
		this.medicos = [];
		this.horariosAgenda = [];
		this.consulta = new Consulta();
		this.carregarEspecialidades();
	}

	private carregarEspecialidades() {
		this.especialidadeService.listarEspecialidades().subscribe(
			apiResult => {
				this.especialidades = apiResult;
			}
		)
	}

	public carregarAgendas() {
		this.agendaService.listarAgendasDisponiveis().subscribe(
			apiResponse	=> {
				this.agendas = apiResponse;
				this.carregarMedicos();
			}
		);
	}

	public carregarMedicos() {
		if (this.agendas.length > 0) {
			let medicosDisponiveis = [];
			this.agendas.forEach(a => {
				if (!medicosDisponiveis.map(m => m.id).some((mid) => mid == a.medico.id)) {
					medicosDisponiveis.push(a.medico);
				}
			});
			this.medicos = medicosDisponiveis;
		} 
	}

	public carregarAgendasMedico() {
		if (this.agendas.length > 0) {
			this.agendasMedico = this.agendas
				.filter(a => a.medico.id == this.medicoSelecionado.id);
		}
	}
	
	public carregarHorariosAgenda() {
		if (this.agendasMedico.length > 0) {
			this.agendaService.listarHorariosDisponiveis(this.agendaSelecionada.id)
				.subscribe(
					apiResponse => {
						apiResponse.forEach(h => {
							this.horariosAgenda.push({
								'label': h.horario,
								'value': h.horario
							});
						});
					}
				);
		}
	}

	public agendarConsulta() {
		let dadosAgendamento = {
			'agenda_id': this.agendaSelecionada.id,
			'horario': this.horarioSelecionado
		};
		this.consultaService.marcarConsulta(dadosAgendamento).subscribe(
			apiResponse => {
				this.messageService.add({severity: 'success', detail: 'Consulta marcada com sucesso'})
				this.ref.close();
			}
		);
	};

	public cancelar() {
		this.ref.close();
	}
}
