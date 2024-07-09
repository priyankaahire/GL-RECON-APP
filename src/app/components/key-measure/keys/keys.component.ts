import { Component, EventEmitter, Output } from '@angular/core';
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
export class KeysComponent {
  keysDataSource: MatTableDataSource<KeysModel>;
  displayedKeyColumns: string[] = [
    'id',
    'Src_Tbl_Key',
    'Trgt_Tbl_Key',
    'Var_Tbl_Key',
    'Adj_Tbl_Key',
  ];
  srcTabKeys = ["insight_hl_Acc", "insight_hl_Acc2", "insight_hl_Acc2"]
  targetTabKeys = ["target1", "target2", "target3"]
  varianceTabKeys = ["var11", "var22", "var3"]
  adjTabKeys = ["adj1", "adj2", "tadj3"]
  @Output() dataModified = new EventEmitter<KeysModel[]>();

  constructor(private _apiService: ApiService, public dialog: MatDialog) {
    this.keysDataSource = new MatTableDataSource<KeysModel>([]);
  }
  ngOnInit() {
    this.getKeys();
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
        // Perform action when user clicks OK
        this.keysDataSource.data = [];
        this.dataModified.emit(this.keysDataSource.data);
      } else {
        // Handle cancel or closed dialog scenario
      }
    });
  }

  startEdit(element: KeysModel) {
    element.isEditing = true;
    console.log('Edit', element);
  }
  saveEdit(row: KeysModel) {
    row.isEditing = false;
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
        // Perform action when user clicks OK
        this.keysDataSource.data = this.keysDataSource.data.filter(
          (element) => element.id !== selected.id
        );
        this.dataModified.emit(this.keysDataSource.data);
      } else {
        // Handle cancel or closed dialog scenario
      }
    });
   
  }

}
