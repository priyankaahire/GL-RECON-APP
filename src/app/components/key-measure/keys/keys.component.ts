import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
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
export class KeysComponent implements OnInit {
  keysDataSource!: MatTableDataSource<{ row: KeysModel, errors: Partial<Record<keyof KeysModel, boolean>>, isEditMode: boolean }>;
  displayedKeyColumns: string[] = [
    'id',
    'Src_Tbl_Key',
    'Trgt_Tbl_Key',
    'Var_Tbl_Key',
    'Adj_Tbl_Key',
  ];
  sources:{ id: string, value: string }[] = []
  targets:{ id: string, value: string }[] = []
  variances:{ id: string, value: string }[] = [];
  adjs:{ id: string, value: string }[] = [];
  validateFeilds = ['Src_Tbl_Key',
  'Trgt_Tbl_Key',
  'Var_Tbl_Key',
  'Adj_Tbl_Key']
  @Output() dataModified = new EventEmitter<KeysModel[]>();

  // Define validation functions for each field
  validationConfig: { [key in keyof KeysModel]?: (value: any) => boolean } = {
    Src_Tbl_Key: value => !!value && this.sources.some((item:any) => item.id === value),
    Var_Tbl_Key: value => !!value && this.variances.some((item:any) => item.id === value),
    Trgt_Tbl_Key: value => !!value && this.targets.some((item:any) => item.id === value),
    Adj_Tbl_Key: value => !!value && this.adjs.some((item:any) => item.id === value),
  };

  constructor(private _apiService: ApiService, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.loadStorageKeysData()
    this.getKeys();
  }

  loadStorageKeysData() {
    let storageKeys = localStorage.getItem('KEYS_DATA');
    const keysData =  storageKeys ? JSON.parse(storageKeys) : null;
    this.sources = keysData[0].source_table;
    this.targets = keysData[1].target_table
    this.variances = keysData[2].variance_table
    this.adjs = keysData[3].adjustment_table
    console.log("keys", keysData)

  }
  getKeys() {
    this._apiService.getAllKeys().subscribe((data: KeysModel[]) => {
      this.keysDataSource = new MatTableDataSource(this.initializeData(data));
      this.dataModified.emit(this.keysDataSource.data.map(item => item.row))
    });
  }

  initializeData(data: KeysModel[]): { row: KeysModel, errors: Partial<Record<keyof KeysModel, boolean>>, isEditMode: boolean }[] {
   return data.map(item => (
      {
      row: item,
      errors: {},
      isEditMode: false
    }));
  }
  addRow() {
    const newRow: KeysModel = {
      id: `${this.keysDataSource.data.length} ` + 1,
      Recon_Id: '',
      Src_Tbl_Key: '',
      Trgt_Tbl_Key: '',
      Var_Tbl_Key: '',
      Adj_Tbl_Key: '',
    };
    const newRowData = { row: newRow, errors: {Src_Tbl_Key: true,Trgt_Tbl_Key: true,Var_Tbl_Key: true,Adj_Tbl_Key: true}, isEditMode: true };
    this.keysDataSource.data = [...this.keysDataSource.data, newRowData]; // Add the new row to the data source
    this.dataModified.emit(this.keysDataSource.data.map(item => item.row))
  }
  removeAll() {
    const dialogRef = this.dialog.open(MessageActionDialogComponent, {
      width: '365px',
      data: {
        title: 'Delete Keys',
        message: 'Are you sure you want to delete all rows?',
        firstButtonName: 'No',
        secondButtonName: 'Yes'
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'ok') {
        this.keysDataSource.data = [];
        this.keysDataSource = new MatTableDataSource(this.initializeData([]));
        this.dataModified.emit(this.keysDataSource.data.map(item => item.row))
      }
    });
  }
  deleteRow(selected: KeysModel) {
    const dialogRef = this.dialog.open(MessageActionDialogComponent, {
      width: '365px',
      data: {
        title: `Delete key ${selected.id}`,
        message: 'Are you sure you want to delete the row?',
        firstButtonName: 'No',
        secondButtonName: 'Yes'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.keysDataSource.data = this.keysDataSource.data.filter(
          (element) => element.row.id !== selected.id
        );
        this.dataModified.emit(this.keysDataSource.data.map(item => item.row))
      }
    });
   
  }
  startEdit(rowData: { row: KeysModel, errors: Partial<Record<keyof KeysModel, boolean>>, isEditMode: boolean }) {
    rowData.isEditMode = true;
    Object.keys(rowData.row).forEach(field => {
      if(this.validateFeilds.includes(field)) {
        this.validateRow(rowData, field as keyof KeysModel);
      }
    });
  }
  onSelectChange(rowData: { row: KeysModel, errors: Partial<Record<keyof KeysModel, boolean>> }, field: keyof KeysModel) {
    const isFieldValid = rowData.row[field as keyof KeysModel] =='' ? true : false;
    rowData.errors[field] = isFieldValid;
  }
   // Example validation function
  validateAndSave():any{
    if (this.validateData()) {
      return this.keysDataSource.data.map(item => item.row)
    } else {
      console.log('Validation failed');
    }
  }
  private validateData(): boolean {
    let isValid = true;
    this.keysDataSource.data.forEach(item => {
      if(item.isEditMode) {
        Object.keys(item.row).forEach(field => {
          if(this.validateFeilds.includes(field) ) {
            const isFieldValid = this.validateField(item.row[field as keyof KeysModel], field as keyof KeysModel);
            item.errors = { ...item.errors, [field]: !isFieldValid };
              if (!isFieldValid) {
                isValid = false;
              }
          }
        });
         // After processing all fields, check if any error is present
         if(Object.values(item.errors).includes(true)) {
          item.isEditMode = true;
          isValid = false;
        } else {
          isValid = true
        }
      }
      
    });
    return isValid;
  }
  private validateField(value: any, fieldName: keyof KeysModel): boolean {
    const validator = this.validationConfig[fieldName];
    return validator ? validator(value) : true;
  }
  private validateRow(rowData: { row: KeysModel, errors: Partial<Record<keyof KeysModel, boolean>> }, field: keyof KeysModel) {
    const isFieldValid = this.validateField(rowData.row[field], field);
    rowData.errors[field] = !isFieldValid;
  }


}
