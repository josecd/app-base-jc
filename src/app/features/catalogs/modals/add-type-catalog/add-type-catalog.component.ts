import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SwallService } from 'app/shared/services/swall.service';
import { CatalogsService } from '../../services/catalogs.service';

@Component({
  selector: 'app-add-type-catalog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-type-catalog.component.html',
  styleUrl: './add-type-catalog.component.scss'
})
export class AddTypeCatalogComponent {
  private subscriptions = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly _swall = inject(SwallService);
  private readonly _modules = inject(CatalogsService);
  public newModule: FormGroup;
  public formStatus:boolean= false;

  constructor(private dialogRef: MatDialogRef<AddTypeCatalogComponent>) {
    this.newModule = this.fb.group({
      name: ['', Validators.required],
    });
  }

  public submit(){
    this.formStatus = true
    if (this.newModule.invalid) return

    this.subscriptions.add(
      this._modules.newType(this.newModule.value).subscribe({
        next: (value: any) => {
          this.dialogRef.close(true);
          this._swall.showMessage('Success', 'Creado correctamente', 'success');
        },
        error: (err) => {
          this.dialogRef.close(false);
          this._swall.showMessage('Error', 'Error al crear', 'error');
          console.error('Error creating workspace', err);
        },
      })
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newModule.controls;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
