import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    imports:[MatIconModule, MatToolbarModule, MatToolbarModule,
        MatToolbarModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule,
         MatSelectModule, MatTableModule, MatSortModule, MatPaginatorModule
     ],
     exports: [
        MatIconModule, MatToolbarModule, MatToolbarModule,
        MatToolbarModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule,
         MatSelectModule, MatTableModule, MatSortModule, MatPaginatorModule
        
      ]
})

export class MaterialModule { }
