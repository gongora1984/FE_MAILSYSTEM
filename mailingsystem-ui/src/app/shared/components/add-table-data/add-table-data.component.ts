import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmDialog, ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {CoreComponent} from "../core/core.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-add-table-data',
  templateUrl: './add-table-data.component.html',
  styleUrls: ['./add-table-data.component.scss']
})
export class AddTableDataComponent extends CoreComponent implements OnInit {
  public dataSource = new MatTableDataSource([]);
  public displayedColumns: string[] = [];
  public id?: string;
  @ViewChild(MatPaginator, {static: false}) matPaginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort?: MatSort;

  @Input() isPageable: boolean = false;
  @Input() isScroller: boolean = false;
  @Input() isSortable: boolean = false;
  @Input() isFilterable: boolean = false;

  @Input() titleTable?: string;
  @Input() titleSearch: string = '';
  @Input() isOnlyShow: boolean = false;
  @Input() data: any[] = [];

  @Input() tableColumns?: TableColumn[] = [];
  @Input() rowActionIcon: string = "";
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  @Output() dataResult = new EventEmitter();

  public clearValue = new EventEmitter();

  message: string = `Do you want to retire?`;
  dialogData: ConfirmDialog = {
    title: 'Confirm Retire',
    message: this.message,
  };

  @Input() set tableData(data: any) {
    this.setTableDataSource(data);
  }

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns!.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator || null;
  }

  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<never>(data);
    this.dataSource.paginator = this.matPaginator || null;
    this.dataSource.sort = this.matSort || null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    sortParameters!.active = this.tableColumns!.find(column => column.name === sortParameters.active)!.dataKey;
    this.sort.emit(sortParameters);
  }

  dataTransform(data: any) {
    return data
  }

  // @ts-ignore
  onChangeData(event) {
    this.id = event;
  }

  addData(id: string) {
    let item = this.data?.find(a => a['id'] === id);
    let i;
    this.data.filter((a, index) => {
      if (a['id'] === id)
        i = index;
    });
    if (item) {
      this.dataSource.data.push(item as never);
      // @ts-ignore
      this.data.splice(i, 1);
      this.dataResult.emit(this.dataSource.data);
      this.dataSource._updateChangeSubscription();
      this.clearValue.emit();
    }
  }

  deleteData(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: this.dialogData,
    });

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(result => {
      if(result){
        let item = this.dataSource.data.find(a => a['id'] === id);
        let i;
        this.dataSource.data.filter((a, index) => {
          if (a['id'] === id)
            i = index;
        });
        if (item) {
          // @ts-ignore
          this.dataSource.data.splice(i, 1);
          this.data.push(item);
          this.dataResult.emit(this.dataSource.data);
          this.dataSource._updateChangeSubscription();
          this.clearValue.emit();
        }
      }
    });
  }

}

export interface TableColumn {
  name: string;
  dataKey: string;
  dataKeyObject?: string,
  position?: 'right' | 'left';
  isSortable?: boolean;
}
