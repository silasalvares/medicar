from rest_framework import serializers

from .models import Especialidade, Medico, Agenda, Horario

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        fields = ['id', 'nome']

class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer(read_only=True)

    class Meta:
        model = Medico
        fields = ['id', 'nome', 'especialidade']

class HorarioSerializer(serializers.Serializer):
    class Meta:
        model = Horario
        fields = ['horario']

class FiltrosMedicoSerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=256, required=False, source='filter')
    especialidades = serializers.SerializerMethodField()

    def get_especialidades(self, obj):
        return obj.getlist('especialidade')


class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer(read_only=True)
    horarios = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Agenda
        fields = ['id', 'medico', 'dia', 'horarios']
