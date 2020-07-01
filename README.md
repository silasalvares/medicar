# Medicar - Desafio IntMed

Construção de um sistema para uma clínica chamada Medicar com o intuito de auxiliar seus clientes na marcação de consultas e gerenciar seu corpo médico.

Requisitos:
  - O cliente da clínica pode criar uma conta no sistema
  - O cliente da clínica pode se autenticar no sistema
  - O cliente pode marcar uma consulta
    - Não deve ser possível marcar consultas para um dia e horário não disponível ou já alocado para outro cliente
    - Não deve ser possível marcar consultas para dia e horário passados
    - Não deve ser possível marcar consultas para um dia horário na qual o paciente já tem uma consulta marcada
  - O cliente pode desmarcar uma consulta
    - Não deve ser possível desmarcar uma consulta que já aconteceu
  - O cliente pode visualizar as suas consultas marcadas que ainda não aconteceram
  - O gestor da clínica pode cadastrar especialidades médicas
  - O gestor da clínica pode cadastrar médicos
  - O gestor da clínica pode alocar médicos em horários específicos de um dia

## Características da solução

- Backend: Python (Django); Banco de dados Relacional
- Frontend: Angular 9; Componentes Primeng;

## Passos para execução

### Execução do backend

##### Requisitos
- Virtualenv
- Python 3

##### Criação do ambiente virtual
```sh
virtualenv -p python3 env
source env/bin/activate
```
##### Instalação dos requisitos
```sh
(env)$ cd medicar_backend
(env)$ pip install -r requirements.txt
```
##### Criação da estrutura do banco de dados
```sh
(env)$ python manage.py makemigrations
(env)$ python manage.py migrate
```

##### Criação do superuser
```sh
(env)$ python manage.py createsuperuser
```

##### Execução do servidor de desenvolvimento
```sh
(env)$ python manage.py runserver
* Running on http://127.0.0.1:8000/
```

### Execução do frontend
##### Instalação das dependências
```
$ cd medicar-frontend
$ npm i
```
##### Execução do servidor de desenvolvimento
```
$ npx ng serve
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```