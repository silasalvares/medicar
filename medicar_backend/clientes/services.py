from typing import Dict
from django.contrib.auth.models import User
from django.utils import timezone

from medicos.services import AgendaService
from .models import Cliente, Consulta

class ClienteService:

    @staticmethod
    def get_dados_cliente(email: str) -> Dict:
        print(email)
        cliente = Cliente.objects.filter(usuario__email=email).get()
        return {
            'id': cliente.id,
            'nome': cliente.nome
        }

    @staticmethod
    def criar_cliente(nome: str, email: str, senha: str) -> Dict:
        novo_usuario = User.objects.create_user(first_name=nome, username=email, email=email, password=senha)
        return {
            'nome': nome,
            'email': email
        }


class ConsultaService:

    @staticmethod
    def marcar_consulta(agenda_id: int, horario: str, email: str):
        horario_obj = AgendaService.get_horario(agenda_id, horario)
        cliente = Cliente.objects.filter(usuario__email=email).get()
        nova_consulta = Consulta(horario=horario_obj, cliente=cliente)
        nova_consulta.save()
        return nova_consulta

    @staticmethod
    def desmarcar_consulta(consulta_id):
        Consulta.objects.filter(id=consulta_id).delete()

    @staticmethod
    def listar_consultas_agendadas(email):
        cliente = Cliente.objects.filter(usuario__email=email).get()
        return Consulta.objects.filter(
            cliente=cliente, 
            horario__agenda__dia__gte=timezone.now()).all()

    @staticmethod
    def _validar_marcacao_consulta():
        raise NotImplementedError

    @staticmethod 
    def _validar_desmarcacao_consulta():
        raise NotImplementedError

