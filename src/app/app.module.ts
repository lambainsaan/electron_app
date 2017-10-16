import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { MatStepperModule, MatInputModule, MatButtonModule, MatSelectModule, MatAutocompleteModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemCategoriesService } from './services/item-categories.service';
import { ItemSubCategoriesService } from './services/item-sub-categories.service';
import { HttpClientModule } from "@angular/common/http";
import { SubItemComponent } from './components/sub-item/sub-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [ElectronService, ItemCategoriesService, ItemSubCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
