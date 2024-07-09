import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { KeysModel } from 'src/app/model/recon';
import { ApiService } from 'src/app/services/api.service';
import { MessageActionDialogComponent } from '../../message-action-dialog/message-action-dialog.component';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss'],
})
export class KeysComponent implements OnChanges {
  //keysDataSource: MatTableDataSource<KeysModel>;
  displayedKeyColumns: string[] = [
    'id',
    'Src_Tbl_Key',
    'Trgt_Tbl_Key',
    'Var_Tbl_Key',
    'Adj_Tbl_Key',
  ];
  sources= ['Source 1', 'Source 2', 'Source 3'];
  targets= ['Target 1', 'Target 2', 'Target 3'];
  adjs= ['Adj 1', 'Adj 2', 'Adj 3'];
  variances= ['Variance 1', 'Variance 2', 'Variance 3']
  @Output() dataModified = new EventEmitter<KeysModel[]>();
  @Input() dataSource: KeysModel[] = [];
  keysDataSource!: MatTableDataSource<KeysModel>;

  constructor(private _apiService: ApiService, public dialog: MatDialog) {
   // this.keysDataSource = new MatTableDataSource(this.dataSource);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataSource"]) {
      const dataSourceChange = changes["dataSource"];
      if (dataSourceChange.currentValue) {
        this.keysDataSource = new MatTableDataSource<KeysModel>(dataSourceChange.currentValue);
      }
    }
  }
  getKeys() {
    this._apiService.getAllKeys().subscribe((data: KeysModel[]) => {
      this.keysDataSource = new MatTableDataSource(data);
      this.dataModified.emit(this.keysDataSource.data);
    });
  }

  addRow() {
    const newRow: KeysModel = {
      id: `${this.keysDataSource.data.length} ` + 1,
      Recon_Id: '',
      Src_Tbl_Key: 'new',
      Trgt_Tbl_Key: ' new',
      Var_Tbl_Key: 'new ',
      Adj_Tbl_Key: 'new',
    };
    this.keysDataSource.data = [...this.keysDataSource.data, newRow]; // Add the new row to the data source
  }
  removeAll() {
    const dialogRef = this.dialog.open(MessageActionDialogComponent, {
      width: '365px',
      data: {
        title: 'Delete Keys',
        message: 'Are you sure you want to delete all rows?',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'ok') {
        this.keysDataSource.data = [];
        this.dataModified.emit(this.keysDataSource.data);
      }
    });
  }

  startEdit(element: KeysModel) {
    element.isEditMode = true;
    console.log('Edit', element);
    this.validateAndAdjustColumns(element)
  }
  saveEdit(row: KeysModel) {
    row.isEditMode = false;
  }
  deleteRow(selected: KeysModel) {
    const dialogRef = this.dialog.open(MessageActionDialogComponent, {
      width: '365px',
      data: {
        title: `Delete key ${selected.id}`,
        message: 'Are you sure you want to delete the row?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.keysDataSource.data = this.keysDataSource.data.filter(
          (element) => element.id !== selected.id
        );
        this.dataModified.emit(this.keysDataSource.data);
      }
    });
   
  }

  validateAndAdjustColumns(row: KeysModel): void {
    if (row.isEditMode) {
      // Validate and adjust variance
      if (!this.variances.includes(row.Var_Tbl_Key)) {
        row.Var_Tbl_Key = ''; // Set variance to empty if not found in options
      }

      // Validate and adjust source
      if (!this.sources.includes(row.Src_Tbl_Key)) {
        row.Src_Tbl_Key = ''; // Set source to empty if not found in options
      }

      // Validate and adjust target
      if (!this.targets.includes(row.Trgt_Tbl_Key)) {
        row.Trgt_Tbl_Key = ''; // Set target to empty if not found in options
      }

      // Validate and adjust adj
      if (!this.adjs.includes(row.Adj_Tbl_Key)) {
        row.Adj_Tbl_Key = ''; // Set adj to empty if not found in options
      }
    }
  }

}
