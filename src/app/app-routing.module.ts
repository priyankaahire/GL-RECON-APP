import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReconListComponent } from './components/recon/recon-list/recon-list.component';
import { ReconCreateComponent } from './components/recon/recon-create/recon-create.component';
import { KeyMeasureComponent } from './components/key-measure/key-measure.component';
import { MeasureComponent } from './components/key-measure/measure/measure.component';

const routes: Routes = [
  { path:'recon', component: ReconListComponent,},
  { path:'create-recon', component: ReconCreateComponent},
  { path:'key-measure', component: KeyMeasureComponent},
  { path:'measure', component: MeasureComponent },
  { path: '', redirectTo: '/recon', pathMatch: 'full' },
  { path: '**', redirectTo: '/recon' } // Handle any other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
