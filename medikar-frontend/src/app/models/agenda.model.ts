import { Medico } from './medico.model';

export class Agenda {
    id: number;
    medico: Medico;
    dia: Date;
    horarios: string[];
}