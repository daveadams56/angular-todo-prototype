import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TextComponent } from './journey/text/text.component';
import { PasswordComponent } from './journey/password/password.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TextComponent,
    PasswordComponent,
    HomeComponent,
    TodosComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
