import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { BreadcrumbService } from '../../../services/bredcrumb.servcie';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

export interface ReconData {
  reconId: number;
  reconName: string;
  source: string;
  target: string;
  status: string;
  createdBy: string;
  createdOn: Date;
  isEditMode?: boolean;
}
@Component({
  selector: 'app-default-recon-list',
  templateUrl: './default-recon-list.component.html',
  styleUrls: ['./default-recon-list.component.scss']
})
export class DefaultReconListComponent {
  dataSource: MatTableDataSource<ReconData>;
  displayedColumns: string[] = [
    'reconId',
    'reconName',
    'source',
    'target',
    'status',
    'createdBy',
    'createdOn',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; //the ! (non-null assertion operator) or by providing an initial value
  searchQuery: string = '';
  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) {
    this.dataSource = new MatTableDataSource<ReconData>([]);
  }
  getAllReacon() {
      this.dataSource = new MatTableDataSource<ReconData>([]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Client side
    this.searchQuery = filterValue.trim().toLowerCase(); // Server side
  }
  createRecon() {
    // Navigate to the create recon page
    this._router.navigate(['/create-recon']);
  }
  editRecon(recon: any) {
    recon.isEditMode = true;
  }
}
