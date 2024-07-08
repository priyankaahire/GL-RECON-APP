import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-recon-create',
  templateUrl: './recon-create.component.html',
  styleUrls: ['./recon-create.component.scss'],
})
export class ReconCreateComponent {
  form: FormGroup;
  frequencies:any = [];
  sourceDatabase:any = [];
  sourceSchema:any = [];
  sourceTable:any = [];
  targetDatabase:any = [];
  targetSchema:any = [];
  targetTable:any = [];
  varianceDatabase:any = [];
  varianceSchema:any = [];
  varianceTable:any = [];
  adjustmentDatabase:any = [];
  adjustmentSchema:any = [];
  adjustmentTable:any = [];
  targetFilter:any = [];
  sourceFilter:any = [];
  constructor(private fb: FormBuilder, private _dataService: DataService, private _router: Router) {
    this.form = this.fb.group({
      reconName: ['', Validators.required],
      frequency: ['', Validators.required],
      sourcedb:['', Validators.required],
      sourcetable:['', Validators.required],
      sourceschema:['', Validators.required],
      targetdb:['', Validators.required],
      targettable:['', Validators.required],
      targetschema:['', Validators.required],
      variancedb:['', Validators.required],
      variancetable:['', Validators.required],
      varianceschema:['', Validators.required],
      adjustmenttable:['', Validators.required],
      adjustmentschema:['', Validators.required],
      adjustmentdb:['', Validators.required],
      sourcefilter:['', !Validators.required],
     targetfilter:['', !Validators.required],
    });
  }
  ngOnInit():void {
    this.loadData();
  }
  loadData() {
    this._dataService.getFrequencies().subscribe(data=>this.frequencies = data);
    this._dataService.getSourceDatabase().subscribe(data => this.sourceDatabase = data);
    this._dataService.getSourceSchema().subscribe(data => this.sourceSchema = data);
    this._dataService.getSourceTable().subscribe(data => this.sourceTable = data);
    this._dataService.getTargetDatabase().subscribe(data => this.targetDatabase = data);
    this._dataService.getTargetSchema().subscribe(data => this.targetSchema = data);
    this._dataService.getTargetTable().subscribe(data => this.targetTable = data);
    this._dataService.getVarianceDatabase().subscribe(data => this.varianceDatabase = data);
    this._dataService.getVarianceSchema().subscribe(data => this.varianceSchema = data);
    this._dataService.getVarianceTable().subscribe(data => this.varianceTable = data);
    this._dataService.getAdjustmentDatabase().subscribe(data => this.adjustmentDatabase = data);
    this._dataService.getAdjustmentSchema().subscribe(data => this.adjustmentSchema = data);
    this._dataService.getAdjustmentTable().subscribe(data => this.adjustmentTable = data);
    this._dataService.getTargetFilter().subscribe(data => this.targetFilter = data);
    this._dataService.getSourceFilter().subscribe(data => this.sourceFilter = data);
  }
  get reconName() {
    return this.form.get('reconName');
  }
  get frequency() {
    return this.form.get('frequency');
  }
   /** Source */
  get sourcetable() {
    return this.form.get('sourcetable');
  }
  get sourceschema() {
    return this.form.get('sourceschema');
  }
  get sourcedb() {
    return this.form.get('sourcedb');
  }
  /** Target */
  get targettable() {
    return this.form.get('targettable');
  }
  get targetschema() {
    return this.form.get('targetschema');
  }
  get targetdb() {
    return this.form.get('targetdb');
  }
  /** Variance */
  get variancetable() {
    return this.form.get('targettable');
  }
  get varianceschema() {
    return this.form.get('targetschema');
  }
  get variancedb() {
    return this.form.get('targetdb');
  }
  /** Adjustment */
  get adjustmenttable() {
    return this.form.get('adjustmenttable');
  }
  get adjustmentschema() {
    return this.form.get('adjustmentschema');
  }
  get adjustmentdb() {
    return this.form.get('adjustmentdb');
  }
  get sourcefilter() {
    return this.form.get('sourcefilter');
  }
  get targetfilter() {
    return this.form.get('targetfilter');
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this._router.navigate(['./key-measure'])
    } else {
      this._router.navigate(['./key-measure'])

    }
  }
}
