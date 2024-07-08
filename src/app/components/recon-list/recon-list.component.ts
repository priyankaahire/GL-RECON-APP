import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from '../../services/api.service'
import { BreadcrumbService } from '../../services/bredcrumb.servcie'
import { Router } from '@angular/router';

export interface ReconData {
  reconId: number;
  reconName: string;
  source: string;
  target: string;
  status: string;
  createdBy: string;
  createdOn: Date;
}
@Component({
  selector: 'app-recon-list',
  templateUrl: './recon-list.component.html',
  styleUrls: ['./recon-list.component.scss']
})
export class ReconListComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<ReconData>;
  displayedColumns: string[] = [
    'reconId',
    'reconName',
    'source',
    'target',
    'status',
    'createdBy',
    'createdOn',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private _apiService: ApiService, 
    private _breadcrumbService: BreadcrumbService, private _router: Router) {
    this.dataSource = new MatTableDataSource<ReconData>([]);

  }
  ngOnInit(): void {
    // Initialize any additional logic
    this.getAllReacon();
  }
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 5; // Set default page size
    } else {
      console.error('MatPaginator is not available');
    }
  }
  getAllReacon() {
    this._apiService.getAllRecon().subscribe((data:ReconData[])=> {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
     })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  createRecon() {
    this._breadcrumbService.setBreadcrumbs([
      { label: 'Home', route: '/recon' },
      { label: 'Create Recon', route: '/create-recon' }
    ]);
    // Navigate to the create recon page
    this._router.navigate(['/create-recon']);
  }
}
