import uuid
from django.db import models
from django.utils import timezone

class Especialidade(models.Model):
    nome = models.CharField(max_length=256)
    descricao = models.CharField(max_length=512)

class MedicoFilterQuerySet(models.QuerySet):

    def filtrar(self, filtros):
        filtros_aplicados = {}
        
        if filtros.get('nome'):
            filtros_aplicados['nome'] = filtros.get('nome')
        if filtros.get('especialidades'):
            filtros_aplicados['especialidade__id__in'] = filtros.get('especialidades')
        

        return self.filter(**filtros_aplicados)
        

class Medico(models.Model):
    nome = models.CharField(max_length=256)
    especialidade = models.ForeignKey('Especialidade', on_delete=models.CASCADE)

    objects = models.Manager()
    filtro = MedicoFilterQuerySet.as_manager()
    

class Agenda(models.Model):
    medico = models.ForeignKey('Medico', on_delete=models.CASCADE, related_name='agendas')
    dia = models.DateField(blank=False, null=False)

    @classmethod
    def obter_disponiveis(cls):
        return cls.objects.filter(dia__gte=timezone.now()).all()

class HorarioQuerySet(models.QuerySet):
    def disponiveis(self):
        return self.filter(consulta__isnull=True, agenda__dia__gte=timezone.now())

    def get_by_horario_agenda(self, agenda_id, horario):
        return self.filter(agenda__id=agenda_id, horario=horario)

class Horario(models.Model):
    horario = models.CharField(max_length=5, blank=False, null=False)
    agenda = models.ForeignKey('Agenda', on_delete=models.CASCADE, related_name='horarios')

    objects = HorarioQuerySet.as_manager()

    def __str__(self):
        return self.horario