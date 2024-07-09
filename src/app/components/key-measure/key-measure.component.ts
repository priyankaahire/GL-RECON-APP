import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MeasureComponent } from './measure/measure.component';
import { MeasuresModel, KeysModel } from 'src/app/model/recon';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-key-measure',
  templateUrl: './key-measure.component.html',
  styleUrls: ['./key-measure.component.scss']
})
export class KeyMeasureComponent implements AfterViewInit {

  keysDataSource:KeysModel[] = []
  measureDataSource:MeasuresModel[] = []
  @ViewChild(MeasureComponent) measureComp!: MeasureComponent;
  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this.getKeys();
  }
  ngAfterViewInit() {
    if(this.measureComp) {
      this.measureComp.dataModified.subscribe((modifiedData: MeasuresModel[]) => {
        console.log('Data received from Child to parent:', modifiedData);
        this.measureDataSource = modifiedData;
      });
    }
  }
  getKeys() {
    this._apiService.getAllKeys().subscribe((data: KeysModel[]) => {
      this.keysDataSource = data;
      console.log(this.keysDataSource)
    });
  }
  handleKeysData(modifiedData: KeysModel[]) {
    console.log('Keys data received in parent:', modifiedData);
    this.keysDataSource = modifiedData;
    // Handle the modified data from KeysComponent here
  }

  onSave() {
    // We have to check each row each elment should not empty if empty set the solution
    this.keysDataSource.forEach((row:KeysModel) => {
      row.hasError = !row.Src_Tbl_Key || !row.Trgt_Tbl_Key || !row.Adj_Tbl_Key || !row.Var_Tbl_Key;
      if(row.hasError) {
        row.isEditMode = true;
      }
    });
  }

}
