import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/services/consulta.service';
import { AgendamentoConsultaComponent } from './agendamento-consulta/agendamento-consulta.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { Especialidade } from 'src/app/models/especialidade.model';
import { Consulta } from 'src/app/models/consulta.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
	selector: 'app-consultas',
	templateUrl: './consultas.component.html',
	styleUrls: ['./consultas.component.scss'],
	providers: [DialogService]
})
export class ConsultasComponent implements OnInit {

	public cliente: Cliente;
	public especialidades: Especialidade[];
	public consultas: Consulta[];

	constructor(
		private authService: AuthenticationService,
		private consultaService: ConsultaService,
		private especialidadeService: EspecialidadeService,
		private clienteService: ClienteService,
		private dialogService: DialogService) { }

	ngOnInit(): void {
		this.cliente = new Cliente();
		this.carregarDadosCliente();
		this.carregarEspecialidades();
		this.carregarConsultas();
	}

	private carregarDadosCliente() {
		this.clienteService.getDadosCliente().subscribe(
			apiResponse => {
				this.cliente = apiResponse;
			}
		);
	}

	private carregarEspecialidades() {
		this.especialidadeService.listarEspecialidades().subscribe(
			apiResult => {
				this.especialidades = apiResult;
			}
		)

	}

	private carregarConsultas() {
		this.consultaService.listarConsultas().subscribe(
			apiResponse => {
				this.consultas = apiResponse;
			}
		);
	}

	public novaConsulta() {
		const ref = this.dialogService.open(AgendamentoConsultaComponent, {
			header: 'Nova Consulta',
			width: '30%',
			baseZIndex: 999999,
			closable: false
		})
	}

	public desconectar() {
		this.authService.logout();
	}
}
