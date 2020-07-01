import { Medico } from './medico.model';

export class Consulta {
    id: number;
    dia: Date;
    data_agendamento: Date;
    medico: Medico;
}