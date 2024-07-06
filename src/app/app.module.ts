import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReconListComponent } from './components/recon-list/recon-list.component';
import { ReconCreateComponent } from './components/recon-create/recon-create.component';
import { MaterialModule } from './shared/material.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReconListComponent,
    ReconCreateComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
