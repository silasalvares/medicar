from functools import partial
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import ClienteSerializer, DadosClienteSerializer, NovaConsultaSerializer, ConsultaSerializer
from .services import ClienteService, ConsultaService
from .pemissions import IsPostOrDeny

class ClientesAPI(APIView):

    permission_classes = [IsPostOrDeny]
    
    def get(self, request, *args, **kwargs):
        cliente = ClienteService.get_dados_cliente(request.user)
        serializer = DadosClienteSerializer(cliente)
        return Response(serializer.data)

    def post(self, request):
        request_data = ClienteSerializer(request.data)
        new_cliente = ClienteService.criar_cliente(**request_data.data)
        return Response({'result': 'OK'})


class ConsultasAPI(APIView):

    def get(self, request, *args, **kwargs):
        consultas = ConsultaService.listar_consultas_agendadas()
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        request_data = NovaConsultaSerializer(request.data)
        nova_consulta = ConsultaService.marcar_consulta(**request_data.data)
        serializer = ConsultaSerializer(nova_consulta)
        return Response(serializer.data)

    def delete(self, request, consulta_id, *args, **kwargs):
        ConsultaService.desmarcar_consulta(consulta_id)
        return Response()


