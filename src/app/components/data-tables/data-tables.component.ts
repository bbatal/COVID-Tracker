import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnInit {
  country = false;
  displayedColumns: string[] = ['id', 'country', 'cases'];
  dataSource: MatTableDataSource<any>;
  constructor(private service: ConfigService) { }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    setTimeout(() => {
      this.service.returnConfirmed().subscribe(x => {
        this.dataSource = new MatTableDataSource<any>(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.country = true;
      })
    },400)
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

    this.dataSource.filter = filterValue;
  }

}
