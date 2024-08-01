import { Component, CreateEffectOptions, effect, Inject, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogsService } from '../../services/catalogs.service';
import { AddTypeCatalogComponent } from '../../modals/add-type-catalog/add-type-catalog.component';

@Component({
  selector: 'app-list-type-catalgs',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './list-type-catalgs.component.html',
  styleUrl: './list-type-catalgs.component.scss'
})
export default class ListTypeCatalgsComponent {
  private subscriptions = new Subscription();
  readonly dialog = inject(MatDialog);
  readonly activatedRoute = inject(ActivatedRoute);
  private _sevice = inject(CatalogsService)
  private route= inject(ActivatedRoute)

  public dataList:any = signal([])
  public totalItems = signal<number>(0);
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(15);
  public totalPages = signal<number>(0);

  constructor() {
    effect(
      () => {
        if (this.currentPage()) {
          this.getAll();
        }
        if (true) {
          this.dataList.set([]);
        }
      },
      { allowSignalWrites: true } as CreateEffectOptions
    );
  }

  getAll() {
    console.log("getAll");
    const offset = (this.currentPage() - 1) * this.itemsPerPage();
    this.subscriptions.add(
      this._sevice.getAllTypes(this.itemsPerPage(), offset).subscribe({
        next: (value: any) => {
          console.log("value",value);

          if (value?.response?.data.length != 0) {
            this.dataList.set(value.response.data);
            this.totalItems.set(value.response.total);
            this.totalPages.set(
              Math.ceil(this.totalItems() / value.response.limit)
            );
            this.currentPage.set(
              Math.floor(value.response.offset / value.response.limit) + 1
            );
          } else {
            this.dataList.set([]);
          }
        },
        error: (error: any) => {
          console.error('error', error);
        },
      })
    );
  }



  ngOnInit(): void {
  }

  openAddModule() {
    const dialogRef = this.dialog.open(AddTypeCatalogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAll()
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }

}
