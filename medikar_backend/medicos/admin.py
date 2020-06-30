from django.contrib import admin

from .models import Especialidade, Medico, Agenda, Horario

class HorarioInline(admin.StackedInline):
    model = Horario
    extra = 0

class AgendaAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['medico', 'dia']}),
    ]
    inlines = [HorarioInline]

admin.site.register(Especialidade)
admin.site.register(Medico)
admin.site.register(Agenda, AgendaAdmin)



