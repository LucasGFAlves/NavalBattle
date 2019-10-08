import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreditosComponent } from './creditos/creditos.component';

import { ConnectionService } from './connection.service';
import { CellComponent } from './cell/cell.component';
import { GameControl } from './game-control';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'creditos', component: CreditosComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreditosComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [ConnectionService, GameControl]
})
export class AppModule { }
