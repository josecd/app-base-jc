import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwallService } from '../../../../../shared/services/swall.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../services/users.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss'
})
export class AddUsersComponent {
  private subscriptions = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly _swall = inject(SwallService);
  private readonly _modules = inject(UsersService);
  public newModule: FormGroup;
  public formStatus:boolean= false;


  public roles:any = signal([])
  public companies:any = signal([])

  constructor(private dialogRef: MatDialogRef<AddUsersComponent>) {
    this.getAllRoles();
    this.getAllCompanies()
    this.newModule = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles_id: ['', Validators.required],
      companies_id: ['', Validators.required],
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

  getAllRoles() {
    this.subscriptions.add(
      this._modules.getAllRoles().subscribe({
        next: (value: any) => {
          if (value?.response?.length != 0) {
            console.log("roles",value?.response);
            this.roles.set(value.response)
          } else {
            this.roles.set([]);
          }
        },
        error: (error: any) => {
          console.error('error', error);
        },
      })
    );
  }

  getAllCompanies() {
    this.subscriptions.add(
      this._modules.getAllCompanies().subscribe({
        next: (value: any) => {
          if (value?.response?.length != 0) {
            console.log("companies",value?.response);
            this.companies.set(value.response)
          } else {
            this.companies.set([]);
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
