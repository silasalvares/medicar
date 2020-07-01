from typing import Dict

from .models import Especialidade, Medico, Agenda, Horario

class EspecialidadeService:

    @staticmethod
    def listar_especialidades() -> list:
        especialidades = Especialidade.objects.all()
        return especialidades

class MedicoService:
    
    @staticmethod
    def listar_medicos(filtros) -> list:
        medicos = Medico.filtro.filtrar(filtros)
        return medicos

class AgendaService:

    @staticmethod
    def listar_agendas() -> list:
        agendas = Agenda.obter_disponiveis()
        return agendas

    def get_horario(agenda_id, horario) -> Horario:
        horario = Horario.objects.disponiveis().get_by_horario_agenda(agenda_id, horario)
        return horario.get()

    def get_horarios_disponiveis(agenda_id) -> list:
        horarios = Horario.objects.disponiveis()
        return horarios
