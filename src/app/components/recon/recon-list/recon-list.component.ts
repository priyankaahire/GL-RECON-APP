import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service'
import { BreadcrumbService } from '../../../services/bredcrumb.servcie'
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
  isEditing?:boolean
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
  namesList = ["data", "data2", "data3"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; //the ! (non-null assertion operator) or by providing an initial value
  ITEM_PER_PAGE = 5;
  constructor(private dialog: MatDialog, private _apiService: ApiService, 
    private _breadcrumbService: BreadcrumbService, private _router: Router) {
    this.dataSource = new MatTableDataSource<ReconData>([]);

  }
  ngOnInit(): void {
    // Initialize any additional logic
    this.getAllReacon();
  }
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = this.ITEM_PER_PAGE; // Set default page size
      this.dataSource.sort = this.sort;
  }
  getAllReacon() {
    this._apiService.getAllRecon().subscribe((data:ReconData[])=> {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort  = this.sort
     })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("this.dataSource", this.dataSource)
  }
  createRecon() {
    this._breadcrumbService.setBreadcrumbs([
      { label: 'Home', route: '/recon' },
      { label: 'Create Recon', route: '/create-recon' }
    ]);
    // Navigate to the create recon page
    this._router.navigate(['/create-recon']);
  }

  editRecon(recon:any) {
     recon.isEditing = true;
  }
}
