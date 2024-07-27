import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AddModuleComponent } from '../../components/add-module/add-module.component';
import { Subscription } from 'rxjs';
import { ModulesService } from '../../services/modules.service';
import { SwallService } from '../../../../shared/services/swall.service';

@Component({
  selector: 'app-add-modules-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    AddModuleComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-modules-modal.component.html',
  styleUrl: './add-modules-modal.component.scss'
})
export class AddModulesModalComponent {
  private subscriptions = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly _swall = inject(SwallService);
  private readonly _modules = inject(ModulesService);
  public newModule: FormGroup;
  public formStatus:boolean= false;

  constructor(private dialogRef: MatDialogRef<AddModulesModalComponent>) {
    this.newModule = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      idStr: [''],
      type: ['', Validators.required],
    });
  }

  public submit(){
    this.formStatus = true
    if (this.newModule.invalid) return
    this.newModule.patchValue({
      idStr: this.newModule.value.title.replace(/\s+/g, '')
    })
    this.subscriptions.add(
      this._modules.newModule(this.newModule.value).subscribe({
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
