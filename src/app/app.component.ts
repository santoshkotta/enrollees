import { Component, OnInit } from '@angular/core';
import { EnrolleeService } from '../../src/app/service/enrollee.service';
import { Enrollee } from '../../src/app/model/enrollee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from './dailog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataSource: any;
  displayedColumns = ['id', 'name', 'dateOfBirth', 'active', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: EnrolleeService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchEnrollees();
  }

  fetchEnrollees(): void {
    this.service.getEnrollees().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Enrollee>(data);
      this.dataSource.paginator = this.paginator;
  });
  }

  editEnrollee(user: any): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '400px',
      data: {name: user.name, active: user.active, id: user.id, dateOfBirth: user.dateOfBirth}
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      if(result){
      this.service.updateEnrollee(result).subscribe((data: any) => {
      if(data) {
        this.fetchEnrollees();
      }
      });
      }
    });
  }
}
