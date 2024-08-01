import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwallService } from '../../../../../shared/services/swall.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-add-companies',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-companies.component.html',
  styleUrl: './add-companies.component.scss'
})
export class AddCompaniesComponent {
  private subscriptions = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly _swall = inject(SwallService);
  private readonly _modules = inject(CompaniesService);
  public newModule: FormGroup;
  public formStatus:boolean= false;

  constructor(private dialogRef: MatDialogRef<AddCompaniesComponent>) {
    this.newModule = this.fb.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
    });
  }

  public submit(){
    this.formStatus = true
    if (this.newModule.invalid) return
    console.log("form", this.newModule.value);

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



  get f(): { [key: string]: AbstractControl } {
    return this.newModule.controls;
  }


}
