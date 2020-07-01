"""medikar_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from medicos.apis import MedicosAPI, EspecialidadesAPI, AgendasAPI, HorariosAPI
from clientes.apis import ClientesAPI, ConsultasAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', obtain_jwt_token),
    path('medicos/', MedicosAPI.as_view()),
    path('especialidades/', EspecialidadesAPI.as_view()),
    path('clientes/', ClientesAPI.as_view()),
    path('agendas/', AgendasAPI.as_view()),
    path('consultas/', ConsultasAPI.as_view()),
    path('consultas/<int:consulta_id>', ConsultasAPI.as_view()),
    path('horarios/<int:agenda_id>', HorariosAPI.as_view()),
]
