from typing import Dict
from rest_framework.views import APIView
from rest_framework.response import Response

from .services import EspecialidadeService, MedicoService, AgendaService
from .serializers import EspecialidadeSerializer, MedicoSerializer, FiltrosMedicoSerializer, AgendaSerializer

class EspecialidadesAPI(APIView):

    def get(self, request, *args, **kwargs):
        especialidades = EspecialidadeService.listar_especialidades()
        serializer = EspecialidadeSerializer(especialidades, many=True)
        return Response(serializer.data)
        
class MedicosAPI(APIView):

    def get(self, request, *args, **kwargs):
        filtros = FiltrosMedicoSerializer(request.query_params)
        medicos = MedicoService.listar_medicos(filtros.data)
        serializer = MedicoSerializer(medicos, many=True)
        return Response(serializer.data)

class AgendasAPI(APIView):

    def get(self, request, *args, **kwargs):
        agendas = AgendaService.listar_agendas()
        serializer = AgendaSerializer(agendas, many=True)
        return Response(serializer.data)