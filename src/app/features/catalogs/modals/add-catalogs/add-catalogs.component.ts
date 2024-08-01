import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SwallService } from 'app/shared/services/swall.service';
import { CompaniesService } from 'app/features/administration/companies/services/companies.service';
import { CatalogsService } from '../../services/catalogs.service';

@Component({
  selector: 'app-add-catalogs',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-catalogs.component.html',
  styleUrl: './add-catalogs.component.scss'
})
export class AddCatalogsComponent {
  private subscriptions = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly _swall = inject(SwallService);
  private readonly _modules = inject(CatalogsService);
  public newModule: FormGroup;
  public formStatus:boolean= false;
  public types:any = signal([])

  constructor(private dialogRef: MatDialogRef<AddCatalogsComponent>) {
    this.getAllTypes()
    this.newModule = this.fb.group({
      name: ['', Validators.required],
      type: ["",Validators.required]
    });
  }

  public submit(){
    this.formStatus = true
    if (this.newModule.invalid) return
    this.subscriptions.add(
      this._modules.new(this.newModule.value).subscribe({
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

  getAllTypes() {
    this.subscriptions.add(
      this._modules.getTypes().subscribe({
        next: (value: any) => {
          if (value?.response?.length != 0) {
            console.log("types----",value?.response);
            this.types.set(value.response)
          } else {
            this.types.set([]);
          }
        },
        error: (error: any) => {
          console.error('error', error);
        },
      })
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newModule.controls;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
