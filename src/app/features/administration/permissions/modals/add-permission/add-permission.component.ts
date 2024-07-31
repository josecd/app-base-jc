import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwallService } from '../../../../../shared/services/swall.service';
import { PermissionService } from '../../services/permission.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddModuleComponent } from '../../../modules/components/add-module/add-module.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-permission',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-permission.component.html',
  styleUrl: './add-permission.component.scss'
})
export class AddPermissionComponent {
  private subscriptions = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly _swall = inject(SwallService);
  private readonly _modules = inject(PermissionService);
  public newModule: FormGroup;
  public formStatus:boolean= false;
  public modules:any = signal([])

  constructor(private dialogRef: MatDialogRef<AddPermissionComponent>) {
    this.getAllModules()
    this.newModule = this.fb.group({
      name: ['', Validators.required],
      codename: ['', Validators.required],
      content: ['', Validators.required],
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

  getAllModules() {
    this.subscriptions.add(
      this._modules.getAllModules().subscribe({
        next: (value: any) => {
          if (value?.response?.length != 0) {
            console.log("value?.response",value?.response);

            this.modules.set(value.response)
          } else {
            this.modules.set([]);
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


}
