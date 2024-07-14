import { Component } from '@angular/core';
import { DataService } from './services/data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GL-RECON-APP';
  constructor(private _dataService: DataService) {}
   
  ngOnInit() {
    this.getDatabase();
    this.getSchemas();
    this.getTables();
    this.getKeyMeasures()
  }

  getDatabase() {
    this._dataService.getDatabase().subscribe((data:any) => {
      localStorage.setItem('DATABASE_DATA', JSON.stringify(data));
    })
  }
  getSchemas() {
    this._dataService.getSchemas().subscribe((data:any) => {
      localStorage.setItem('SCHEMAS_DATA', JSON.stringify(data));
    })
  }
  getTables() {
    this._dataService.getTables().subscribe((data:any) => {
      localStorage.setItem('TABLES_DATA', JSON.stringify(data));
    })
  }
  getKeyMeasures() {
    this._dataService.getKeyMeasures().subscribe((data:any) => {
      const keysData = data[0].keys;
      const measuresData = data[1].measures;
      console.log(keysData, measuresData)
      localStorage.setItem('KEYS_DATA', JSON.stringify(keysData));
      localStorage.setItem('MEASURES_DATA', JSON.stringify(measuresData));
    })
  }




  
}
