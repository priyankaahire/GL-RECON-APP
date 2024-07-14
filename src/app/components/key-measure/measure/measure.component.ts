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
  measuresDataSource!: MatTableDataSource<{ row: MeasuresModel, errors: Partial<Record<keyof MeasuresModel, boolean>>, isEditMode: boolean }>;
  @Output() dataModified = new EventEmitter<MeasuresModel[]>();
  
  displayedMeasureColumns: string[] = [
    'id',
    'Src_Tbl_Measure',
    'Trgt_Tbl_Measure',
    'Var_Tbl_Measure',
    'Adj_Tbl_Measure',
  ];
  
  sources:{ id: string, value: string }[] = []
  targets:{ id: string, value: string }[] = []
  variances:{ id: string, value: string }[] = [];
  adjs:{ id: string, value: string }[] = [];

  validateFeilds = ['Src_Tbl_Measure', 'Trgt_Tbl_Measure','Var_Tbl_Measure','Adj_Tbl_Measure',]
  // Define validation functions for each field
  validationConfig: { [key in keyof MeasuresModel]?: (value: any) => boolean } = {
    Src_Tbl_Measure: value => !!value && this.sources.some((item:any) => item.id == value),
    Trgt_Tbl_Measure: value => !!value && this.targets.some((item:any) => item.id === value),
    Var_Tbl_Measure: value => !!value && this.variances.some((item:any) => item.id === value),
    Adj_Tbl_Measure: value => !!value && this.adjs.some((item:any) => item.id === value)
  };
  constructor(private _apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadStorageKeysData();
    this.getMeasures();
  }
  getMeasures() {
    this._apiService.getAllMeasures().subscribe((data: MeasuresModel[]) => {
      this.measuresDataSource = new MatTableDataSource(this.initializeData(data));
      this.dataModified.emit(this.measuresDataSource.data.map(item => item.row))
    });
  }
  loadStorageKeysData() {
    let storageKeys = localStorage.getItem('MEASURES_DATA');
    const measuresData =  storageKeys ? JSON.parse(storageKeys) : null;
    this.sources = measuresData[0].source_table;
    this.targets = measuresData[1].target_table
    this.variances = measuresData[2].variance_table
    this.adjs = measuresData[3].adjustment_table
    console.log("measuresData", measuresData)

  }
  initializeData(data: MeasuresModel[]): { row: MeasuresModel, errors: Partial<Record<keyof MeasuresModel, boolean>>, isEditMode: boolean }[] {
    return data.map(item => (
       {
       row: item,
       errors: {},
       isEditMode: false
     }));
   }
  addRow() {
    const newRow: MeasuresModel = {
      id: `${this.measuresDataSource.data.length} ` + 1,
      Recon_Id: '',
      Src_Tbl_Measure: '',
      Trgt_Tbl_Measure: '',
      Var_Tbl_Measure: '',
      Adj_Tbl_Measure: '',
    };
    const newRowData = { row: newRow, errors: {
      Src_Tbl_Measure: true,
      Trgt_Tbl_Measure: true,
      Var_Tbl_Measure: true,
      Adj_Tbl_Measure: true,
    }, isEditMode: true };
    this.measuresDataSource.data = [...this.measuresDataSource.data, newRowData]; // Add the new row to the data source
    this.dataModified.emit(this.measuresDataSource.data.map(item => item.row))
  }
  removeAll() {
    const dialogRef = this.dialog.open(MessageActionDialogComponent, {
      width: '365px',
      data: {
        title: 'Delete Measures',
        message: 'Are you sure you want to delete all rows?',
        firstButtonName: 'No',
        secondButtonName: 'Yes'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.measuresDataSource.data = [];
        this.measuresDataSource = new MatTableDataSource(this.initializeData([]));
        this.dataModified.emit(this.measuresDataSource.data.map(item => item.row))
      }
    });
  }
  deleteRow(selected: MeasuresModel) {
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
        this.measuresDataSource.data = this.measuresDataSource.data.filter(
          (element) => element.row.id !== selected.id
        );
        this.dataModified.emit(this.measuresDataSource.data.map(item => item.row))
      }
    });
   
  }
  startEdit(rowData: { row: MeasuresModel, errors: Partial<Record<keyof MeasuresModel, boolean>>, isEditMode: boolean }) {
    rowData.isEditMode = true;
    Object.keys(rowData.row).forEach(field => {
      if(this.validateFeilds.includes(field)) {
        this.validateRow(rowData, field as keyof MeasuresModel);
      }
    });
  }
  onSelectChange(rowData: { row: MeasuresModel, errors: Partial<Record<keyof MeasuresModel, boolean>> }, field: keyof MeasuresModel) {
    const isFieldValid = rowData.row[field as keyof MeasuresModel] =='' ? true : false;
    rowData.errors[field] = isFieldValid;
  }
   // Example validation function
  validateAndSave():any{
    if (this.validateData()) {
      return this.measuresDataSource.data.map(item => item.row)
    } else {
      console.log('Validation failed');
    }
  }

  private validateData(): boolean {
    let isValid = true;
    this.measuresDataSource.data.forEach(item => {
      if(item.isEditMode) {
        Object.keys(item.row).forEach(field => {
          if(this.validateFeilds.includes(field) ) {
            const isFieldValid = this.validateField(item.row[field as keyof MeasuresModel], field as keyof MeasuresModel);
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
  private validateField(value: any, fieldName: keyof MeasuresModel): boolean {
    const validator = this.validationConfig[fieldName];
    return validator ? validator(value) : true;
  }
  private validateRow(rowData: { row: MeasuresModel, errors: Partial<Record<keyof MeasuresModel, boolean>> }, field: keyof MeasuresModel) {
    const isFieldValid = this.validateField(rowData.row[field], field);
    rowData.errors[field] = !isFieldValid;
  }

}
