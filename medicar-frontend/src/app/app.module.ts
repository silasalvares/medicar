import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { LoginComponent } from './components/login/login.component';
import { AgendamentoConsultaComponent } from './components/consultas/agendamento-consulta/agendamento-consulta.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ConsultasComponent,
    LoginComponent,
    AgendamentoConsultaComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DynamicDialogModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
