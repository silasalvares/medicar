import uuid
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.utils import timezone


class Cliente(models.Model):
    nome = models.CharField(max_length=256)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

@receiver(post_save, sender=User)
def criar_cliente(sender, instance, created, **kwargs):
    if created:
        Cliente.objects.create(nome=instance.get_full_name(), usuario=instance)

@receiver(post_save, sender=User)
def salvar_cliente(sender, instance, **kwargs):
    instance.cliente.save()

class Consulta(models.Model):
    horario = models.OneToOneField('medicos.Horario', on_delete=models.CASCADE)
    data_agendamento = models.DateTimeField(default=timezone.now())



    

