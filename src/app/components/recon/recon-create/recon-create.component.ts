import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { MessageActionDialogComponent } from '../../message-action-dialog/message-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export function noSpecialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpecialCharacters = /[^a-zA-Z0-9\- ]/g.test(control.value);
    return hasSpecialCharacters ? { specialCharacters: true } : null;
  };
}

@Component({
  selector: 'app-recon-create',
  templateUrl: './recon-create.component.html',
  styleUrls: ['./recon-create.component.scss'],
})
export class ReconCreateComponent {
  form: FormGroup;
  frequencies: any = [];
  databases: any = {
    source: { db: [], schema: [], table: [] },
    target: { db: [], schema: [], table: [] },
    variance: { db: [], schema: [], table: [] },
    adjustment: { db: [], schema: [], table: [] },
  };
  filters: any = {
    target: [],
    source: [],
  };
  filterFlagOptions: any = [
    { id: '1', value: 'Yes' },
    { id: '0', value: 'No' },
  ];
  constructor(private fb: FormBuilder, private _dataService: DataService, private router: Router, private dialog: MatDialog) {
    this.form = this.fb.group({
      reconName: ['', [Validators.required, noSpecialCharactersValidator(), Validators.maxLength(255)]],
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
      adjusttb:['', Validators.required],
      adjustschema:['', Validators.required],
      adjustdb:['', Validators.required],
      sourcefiltflag:['', Validators.required],
      targetfiltflag:['', Validators.required],
    });
  }
  ngOnInit():void {
    this.loadData();
  }
  loadData() {
    this._dataService.getFrequencies().subscribe(data => this.frequencies = data);
    this.loadDatabaseData('source');
    this.loadDatabaseData('target');
    this.loadDatabaseData('variance');
    this.loadDatabaseData('adjustment');
    this._dataService.getTargetFilter().subscribe(data => this.filters.target = data);
    this._dataService.getSourceFilter().subscribe(data => this.filters.source = data);
  }
  loadDatabaseData(type: string) {
    this._dataService.getFrequencies().subscribe(data=>this.frequencies = data);
    if(type=='source') {
      this._dataService.getSourceDatabase().subscribe(data => this.databases.source.db = data);
      this._dataService.getSourceSchema().subscribe(data => this.databases.source.schema = data);
      this._dataService.getSourceTable().subscribe(data => this.databases.source.table = data);
    }
    if(type=='target') {
      this._dataService.getTargetDatabase().subscribe(data => this.databases.target.db = data);
      this._dataService.getTargetSchema().subscribe(data => this.databases.target.schema = data);
      this._dataService.getTargetTable().subscribe(data => this.databases.target.table = data);
    }
    if(type=='variance') {
      this._dataService.getVarianceDatabase().subscribe(data => this.databases.variance.db = data);
      this._dataService.getVarianceSchema().subscribe(data => this.databases.variance.schema = data);
      this._dataService.getVarianceTable().subscribe(data => this.databases.variance.table = data);
    }
    if(type=='adjustment') {
      this._dataService.getAdjustmentDatabase().subscribe(data => this.databases.adjustment.db = data);
      this._dataService.getAdjustmentSchema().subscribe(data => this.databases.adjustment.schema = data);
      this._dataService.getAdjustmentTable().subscribe(data => this.databases.adjustment.table = data);
    }
  }
 
  saveRecon() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.router.navigate(['./key-measure'])
    } else {
      this.router.navigate(['./key-measure'])
    }
  }
    cancelRecon() {
      const dialogRef = this.dialog.open(MessageActionDialogComponent, {
        width: '365px',
        data: {
          title: `Cancel Recon`,
          message: 'There are unsaved changes. Do you want to Cancel?',
          firstButtonName: 'No',
          secondButtonName: 'Yes'
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'ok') {
            this.router.navigate(['./default-recon'])
        }
      });
    }
}
