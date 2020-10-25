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
  EnrolleesData: any;
  displayedColumns = ['id', 'name', 'dateOfBirth', 'active', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: EnrolleeService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchEnrollees();
  }

  fetchEnrollees(): void {
    this.service.getEnrollees().subscribe((data: any) => {
      this.EnrolleesData = data;
      this.loadTable(this.EnrolleesData);
  });
  }

  loadTable(data: any): void {
    this.dataSource = new MatTableDataSource<Enrollee>(this.EnrolleesData);
    this.dataSource.paginator = this.paginator;
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
        const id = this.EnrolleesData.findIndex((item: any) => item.id === data.id);
        this.EnrolleesData[id] = data;
        this.loadTable(this.EnrolleesData);
      }
      });
      }
    });
  }
}
