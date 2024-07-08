import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { KeysModel } from 'src/app/model/recon';
import { ApiService } from 'src/app/services/api.service';
import { MessageActionDialogComponent } from '../../message-action-dialog/message-action-dialog.component';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent {
  keysDataSource: MatTableDataSource<KeysModel>;
  displayedKeyColumns : string[] = [
    'id',
    'Src_Tbl_Key',
    'Trgt_Tbl_Key',
    'Var_Tbl_Key',
    'Adj_Tbl_Key'
  ]
constructor(private _apiService: ApiService, public dialog: MatDialog) {
  this.keysDataSource = new MatTableDataSource<KeysModel>([])
}
ngOnInit() {
  this.getKeys()
}
getKeys() {
  this._apiService.getAllKeys().subscribe((data:KeysModel[])=>{
   this.keysDataSource= new MatTableDataSource(data)
  })
 }
 
 addRow() {
  const newRow: KeysModel = {
    id: `${this.keysDataSource.data.length } `+ 1,
    Recon_Id:'',
    Src_Tbl_Key:'new',
    Trgt_Tbl_Key:' new',
    Var_Tbl_Key:'new ',
    Adj_Tbl_Key:'new'
  };
  this.keysDataSource.data = [...this.keysDataSource.data, newRow]; // Add the new row to the data source
}
removeAll() {
  const dialogRef = this.dialog.open(MessageActionDialogComponent, {
    width: '365px',
    data: {
      title: 'Delete Keys',
      message: 'Are you sure you want to delete all rows?'
    }
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if (result === 'ok') {
      // Perform action when user clicks OK
      this.keysDataSource.data = [];
    } else {
      // Handle cancel or closed dialog scenario
    }
  });
}

 editRow(element: KeysModel) {
   console.log('Edit', element);
   // Implement edit logic here
 }
 deleteRow(id: string) {
   this.keysDataSource.data = this.keysDataSource.data.filter(element => element.id !== id);
 }
}
