import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './components/todo/todo.module';
import { FooterComponent } from './shared/footer/footer.component';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ScrollTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TodoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
