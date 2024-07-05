import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReconListComponent } from './components/recon-list/recon-list.component';
import { ReconCreateComponent } from './components/recon-create/recon-create.component';

const routes: Routes = [
  { path:'recon', component: ReconListComponent,},
  { path:'create-recon', component: ReconCreateComponent},
  { path: '', redirectTo: '/recon', pathMatch: 'full' },
  { path: '**', redirectTo: '/recon' } // Handle any other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
