from rest_framework import serializers

from medicos.serializers import MedicoSerializer
from .models import Consulta

class ClienteSerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=256)
    email = serializers.CharField(max_length=256) 
    senha = serializers.CharField(max_length=256)

class DadosClienteSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    nome = serializers.CharField()

class NovaConsultaSerializer(serializers.Serializer):
    agenda_id = serializers.IntegerField()
    horario = serializers.CharField()

class ConsultaSerializer(serializers.ModelSerializer):
    medico = serializers.SerializerMethodField()
    dia = serializers.SerializerMethodField()
    horario = serializers.SerializerMethodField()

    class Meta:
        model = Consulta
        fields = ['id', 'data_agendamento', 'medico', 'dia', 'horario']

    def get_medico(self, obj):
        return MedicoSerializer(obj.horario.agenda.medico).data

    def get_dia(self, obj):
        return obj.horario.agenda.dia
    
    def get_horario(self, obj):
        return obj.horario.horario