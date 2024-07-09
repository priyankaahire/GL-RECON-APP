import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReconListComponent } from './components/recon/recon-list/recon-list.component';
import { ReconCreateComponent } from './components/recon/recon-create/recon-create.component';
import { MaterialModule } from './shared/material.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyMeasureComponent } from './components/key-measure/key-measure.component';
import { MeasureComponent } from './components/key-measure/measure/measure.component';
import { KeysComponent } from './components/key-measure/keys/keys.component';
import { MessageActionDialogComponent } from './components/message-action-dialog/message-action-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReconListComponent,
    ReconCreateComponent,
    BreadcrumbComponent,
    KeyMeasureComponent,
    MeasureComponent,
    KeysComponent,
    MessageActionDialogComponent
    
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
  schemas:[NO_ERRORS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
