import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MeasuresModel } from 'src/app/model/recon';
import { ApiService } from 'src/app/services/api.service';
import { MessageActionDialogComponent } from '../../message-action-dialog/message-action-dialog.component';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss'],
})
export class MeasureComponent {
  measuresDataSource = new MatTableDataSource<MeasuresModel>([]);
  displayedMeasureColumns: string[] = [
    'id',
    'Src_Tbl_Measure',
    'Trgt_Tbl_Measure',
    'Var_Tbl_Measure',
    'Adj_Tbl_Measure',
  ];
  sources= ['Source 1', 'Source 2', 'Source 3'];
  targets= ['Target 1', 'Target 2', 'Target 3'];
  adjs= ['Adj 1', 'Adj 2', 'Adj 3'];
  variances= ['Variance 1', 'Variance 2', 'Variance 3']

  @Output() dataModified = new EventEmitter<MeasuresModel[]>();
  constructor(private _apiService: ApiService, public dialog: MatDialog) {}
  ngOnInit() {
    this.getMeasures();
  }
  getMeasures() {
    this._apiService.getAllMeasures().subscribe((data: MeasuresModel[]) => {
      this.measuresDataSource = new MatTableDataSource(data);
      this.dataModified.emit(this.measuresDataSource.data)
    });
  }
  addRow() {
    const newRow: MeasuresModel = {
      id: `${this.measuresDataSource.data.length} ` + 1,
      Recon_Id: '',
      Src_Tbl_Measure: 'new',
      Trgt_Tbl_Measure: ' new ',
      Var_Tbl_Measure: 'new ',
      Adj_Tbl_Measure: 'new',
    };
    this.measuresDataSource.data = [...this.measuresDataSource.data, newRow]; // Add the new row to the data source
  }
  removeAll() {
    const dialogRef = this.dialog.open(MessageActionDialogComponent, {
      width: '365px',
      data: {
        title: 'Delete Measures',
        message: 'Are you sure you want to delete all rows?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.measuresDataSource.data = [];
        this.dataModified.emit(this.measuresDataSource.data)
      }
    });
  }
  startEdit(element: MeasuresModel) {
    element.isEditMode = true;
    console.log('Edit', element);
  }
  saveEdit(row: MeasuresModel) {
    row.isEditMode = false;
  }
  deleteRow(selected: MeasuresModel) {
    const dialogRef = this.dialog.open(MessageActionDialogComponent, {
      width: '365px',
      data: {
        title: `Delete key ${selected.id}`,
        message: 'Are you sure you want to delete the row?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.measuresDataSource.data = this.measuresDataSource.data.filter(
          (element) => element.id !== selected.id
        );
        this.dataModified.emit(this.measuresDataSource.data)
      }
    });
   
  }
}
