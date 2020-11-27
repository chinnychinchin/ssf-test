import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountriesComponent } from './components/countries.component';
import { AuthPageComponent } from './components/auth-page.component';
import { NewsComponent } from './components/news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsAppDB } from './news.database';

const ROUTES: Routes = [
  { path: 'auth', component: AuthPageComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'news/:country', component: NewsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    AuthPageComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NewsAppDB],
  bootstrap: [AppComponent]
})
export class AppModule { }
