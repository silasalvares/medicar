import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Consulta } from 'src/app/models/consulta.model';
import { Especialidade } from 'src/app/models/especialidade.model';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { Medico } from 'src/app/models/medico.model';
import { Agenda } from 'src/app/models/agenda.model';
import { AgendaService } from 'src/app/services/agenda.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
		private ref: DynamicDialogRef,
		private especialidadeService: EspecialidadeService,
		private agendaService: AgendaService,
		private consultaService: ConsultaService) { }

	ngOnInit(): void {
		this.especialidadeSelecionada = new Especialidade();
		this.agendas = [];
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
			this.medicos = this.agendas.map(a => a.medico);
		} 
	}

	public carregarAgendasMedico() {
		if (this.agendas.length > 0) {
			this.agendasMedico = this.agendas
				.filter(a => a.medico.id == this.medicoSelecionado.id);
		}
	}
	item
	public carregarHorariosAgenda() {
		if (this.agendasMedico.length > 0) {
			this.agendaSelecionada.horarios.forEach(h => {
					this.horariosAgenda.push({
						'label': h,
						'value': h
					});
			});
		}
	}

	public agendarConsulta() {
		let dadosAgendamento = {
			'agenda_id': this.agendaSelecionada.id,
			'horario': this.horarioSelecionado
		};
		this.consultaService.marcarConsulta(dadosAgendamento).subscribe(
			apiResponse => {
				this.ref.close();
			}
		);
	};

	public cancelar() {
		this.ref.close();
	}
}
