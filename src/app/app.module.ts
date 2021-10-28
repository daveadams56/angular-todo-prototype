import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TextComponent } from './journey/text/text.component';
import { PasswordComponent } from './journey/password/password.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { BackHomeComponent } from './utilities/back-home/back-home.component';
import { LoadingComponent } from './utilities/loading/loading.component';
import { HomeIconComponent } from './icons/home-icon/home-icon.component';
import { LeftArrowIconComponent } from './icons/left-arrow-icon/left-arrow-icon.component';
import { KeyIconComponent } from './icons/key-icon/key-icon.component';
import { FormComponent } from './journey/form/form.component';
import { ButtonComponent } from './journey/button/button.component';
import { EyeIconComponent } from './icons/eye-icon/eye-icon.component';
import { AlertComponent } from './journey/alert/alert.component';
import { AlertIconComponent } from './icons/alert-icon/alert-icon.component';
import { VerifiedIconComponent } from './icons/verified-icon/verified-icon.component';
import { RegisterComponent } from './register/register.component';
import { UnknownComponent } from './journey/unknown/unknown.component';
import { BooleanComponent } from './journey/boolean/boolean.component';
import { TermsConditionsComponent } from './journey/terms-conditions/terms-conditions.component';
import { KbaComponent } from './journey/kba/kba.component';
import { LockIconComponent } from './icons/lock-icon/lock-icon.component';
import { NewUserIconComponent } from './icons/new-user-icon/new-user-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TextComponent,
    PasswordComponent,
    HomeComponent,
    TodosComponent,
    LogoutComponent,
    TodoComponent,
    BackHomeComponent,
    LoadingComponent,
    HomeIconComponent,
    LeftArrowIconComponent,
    KeyIconComponent,
    FormComponent,
    ButtonComponent,
    EyeIconComponent,
    AlertComponent,
    AlertIconComponent,
    VerifiedIconComponent,
    RegisterComponent,
    UnknownComponent,
    BooleanComponent,
    TermsConditionsComponent,
    KbaComponent,
    LockIconComponent,
    NewUserIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
