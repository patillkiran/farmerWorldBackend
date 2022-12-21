import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFarmerComponent } from './components/add-farmer/add-farmer.component';
import { ViewFarmerComponent } from './components/view-farmer/view-farmer.component';
import { UpdateFarmerComponent } from './components/update-farmer/update-farmer.component';
import { FarmerListComponent } from './components/farmer-list/farmer-list.component';

//services

import{FarmerService} from './services/farmer.service';
import { HeaderComponent } from './components/header/header.component'

const routes: Routes = [
  { path: '', redirectTo: 'farmers', pathMatch: 'full' },
  { path: 'farmers', component: FarmerListComponent },
  { path: 'updateFarmer/:id', component: UpdateFarmerComponent },
  { path: 'addFarmer', component: AddFarmerComponent },
  { path: 'viewFarmer/:id', component: ViewFarmerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AddFarmerComponent,
    ViewFarmerComponent,
    FarmerListComponent,
    UpdateFarmerComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
        appId: 'ng-universal-demystified'
    }),
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-top-right',
      preventDuplicates:true,
      progressBar:true,
      enableHtml:true
    })
  ],
  providers: [FarmerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
