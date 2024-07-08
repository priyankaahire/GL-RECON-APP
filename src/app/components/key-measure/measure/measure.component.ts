import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MeasuresModel } from 'src/app/model/recon';
import { ApiService } from 'src/app/services/api.service';
import { MessageActionDialogComponent } from '../../message-action-dialog/message-action-dialog.component';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent {
  measuresDataSource= new MatTableDataSource<MeasuresModel>([]);
  displayedMeasureColumns  : string[] = [
    'id',
    'Src_Tbl_Measure',
    'Trgt_Tbl_Measure',
    'Var_Tbl_Measure',
    'Adj_Tbl_Measure'
  ]

 constructor(private _apiService: ApiService, public dialog: MatDialog) { }
 ngOnInit() {
  this.getMeasures();
 }
 getMeasures() {
  this._apiService.getAllMeasures().subscribe((data:MeasuresModel[])=>{
   this.measuresDataSource = new MatTableDataSource(data)
  })
 }
addRow() {
  const newRow: MeasuresModel = {
    id: `${this.measuresDataSource.data.length } `+ 1,
    Recon_Id:'',
    Src_Tbl_Measure:'new',
    Trgt_Tbl_Measure:' new ',
    Var_Tbl_Measure:'new ',
    Adj_Tbl_Measure:'new'
  };
  this.measuresDataSource.data = [...this.measuresDataSource.data, newRow]; // Add the new row to the data source
}
removeAll() {
  const dialogRef = this.dialog.open(MessageActionDialogComponent, {
    width: '365px',
    data: {
      title: 'Delete Measures',
      message: 'Are you sure you want to delete all rows?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'ok') {
      // Perform action when user clicks OK
      this.measuresDataSource.data = [];
    } else {
      // Handle cancel or closed dialog scenario
    }
  });
}
// isEmptyRow(row: MeasuresModel): boolean {
//   return row.id === '' && row.Src_Tbl_Measure === '' && row.Trgt_Tbl_Measure === '' && row.Var_Tbl_Measure === '' && row.Adj_Tbl_Measure === '';
// }
editRow(element: MeasuresModel) {
  console.log('Edit', element);
}
deleteRow(id: string) {
  this.measuresDataSource.data = this.measuresDataSource.data.filter(element => element.id !== id);
}
}
