import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReconListComponent } from './components/recon/recon-list/recon-list.component';
import { ReconCreateComponent } from './components/recon/recon-create/recon-create.component';
import { KeyMeasureComponent } from './components/key-measure/key-measure.component';
import { MeasureComponent } from './components/key-measure/measure/measure.component';
import { DefaultReconListComponent } from './components/recon/default-recon-list/default-recon-list.component';

const routes: Routes = [
  { path:'recon', component: ReconListComponent},
  { path:'create-recon', component: ReconCreateComponent},
  { path:'key-measure', component: KeyMeasureComponent},
  { path:'measure', component: MeasureComponent },
  { path:'default-recon', component: DefaultReconListComponent},
  { path: '', redirectTo: '/default-recon', pathMatch: 'full' },
  { path: '**', redirectTo: '/default-recon' } // Handle any other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
