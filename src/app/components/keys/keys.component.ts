import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KeysModel } from 'src/app/model/recon';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent {
  keysDataSource: MatTableDataSource<KeysModel>;
  displayedKeyColumns : string[] = [
    'Src_Tbl_Key',
    'Trgt_Tbl_Key',
    'Var_Tbl_Key',
    'Adj_Tbl_Key'
  ]
constructor(private _apiService: ApiService) {
  this.keysDataSource = new MatTableDataSource<KeysModel>([])
}
ngOnInit() {
  this.getKeys()
}
getKeys() {
  this._apiService.getAllKeys().subscribe((data:KeysModel[])=>{
   this.keysDataSource= new MatTableDataSource(data)
   this.checkEmptyDataSource();
  })
 }
  checkEmptyDataSource() {
   if (this.keysDataSource.data.length === 0) {
     this.addEmptyRow();
   }
  }
  addEmptyRow() {
   const emptyRow: KeysModel = {
     id:'',
     Recon_Id:'',
     Src_Tbl_Key:'',
     Trgt_Tbl_Key:'',
     Var_Tbl_Key:'',
     Adj_Tbl_Key:''
   };
   this.keysDataSource.data = [emptyRow];
 }

 editRow(element: KeysModel) {
   console.log('Edit', element);
   // Implement edit logic here
 }
 deleteRow(id: string) {
   this.keysDataSource.data = this.keysDataSource.data.filter(element => element.id !== id);
   this.checkEmptyDataSource();
 }
}
