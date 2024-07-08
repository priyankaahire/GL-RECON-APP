import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MeasuresModel } from 'src/app/model/recon';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent {
  measuresDataSource: MatTableDataSource<MeasuresModel>;
  displayedMeasureColumns  : string[] = [
    'Src_Tbl_Measure',
    'Trgt_Tbl_Measure',
    'Var_Tbl_Measure',
    'Adj_Tbl_Measure'
  ]

 constructor(private _apiService: ApiService) {
  this.measuresDataSource = new MatTableDataSource<MeasuresModel>([])

 }
 ngOnInit() {
  this.getMeasures();
 }
 getMeasures() {
  this._apiService.getAllMeasures().subscribe((data:MeasuresModel[])=>{
   this.measuresDataSource = new MatTableDataSource(data)
   this.checkEmptyDataSource()
  })
 }

 checkEmptyDataSource() {
  if (this.measuresDataSource.data.length === 0) {
    this.addEmptyRow();
  }
 }

 addEmptyRow() {
  const emptyRow: MeasuresModel = {
    id:'',
    Recon_Id:'',
    Src_Tbl_Measure:'',
    Trgt_Tbl_Measure:'',
    Var_Tbl_Measure:'',
    Adj_Tbl_Measure:''
  };
  this.measuresDataSource.data = [emptyRow];
  console.log(this.measuresDataSource)
}

editRow(element: MeasuresModel) {
  console.log('Edit', element);
  // Implement edit logic here
}

deleteRow(id: string) {
  this.measuresDataSource.data = this.measuresDataSource.data.filter(element => element.id !== id);
  this.checkEmptyDataSource();
}
}
