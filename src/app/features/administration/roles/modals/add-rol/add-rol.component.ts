import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { SwallService } from '../../../../../shared/services/swall.service';
import { RolesService } from '../../services/roles.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-add-rol',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,

    MatChipsModule,

    MatFormFieldModule, MatSelectModule,  MatInputModule
  ],
  templateUrl: './add-rol.component.html',
  styleUrl: './add-rol.component.scss'
})
export class AddRolComponent {
  private subscriptions = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly _swall = inject(SwallService);
  private readonly _service = inject(RolesService);
  public newModule: FormGroup;
  public formStatus:boolean= false;
  public modules:any = signal([])
  pokemonGroups: any[] = [
    {
      name: 'Grass',
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'},
      ],
    },
    {
      name: 'Water',
      pokemon: [
        {value: 'squirtle-3', viewValue: 'Squirtle'},
        {value: 'psyduck-4', viewValue: 'Psyduck'},
        {value: 'horsea-5', viewValue: 'Horsea'},
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        {value: 'charmander-6', viewValue: 'Charmander'},
        {value: 'vulpix-7', viewValue: 'Vulpix'},
        {value: 'flareon-8', viewValue: 'Flareon'},
      ],
    },
    {
      name: 'Psychic',
      pokemon: [
        {value: 'mew-9', viewValue: 'Mew'},
        {value: 'mewtwo-10', viewValue: 'Mewtwo'},
      ],
    },
  ];



  constructor(private dialogRef: MatDialogRef<AddRolComponent>) {
    this.getAllModules()
    this.newModule = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      permissions_id: ['', Validators.required],
    });

  }

  public submit(){
    this.formStatus = true
    if (this.newModule.invalid) return
    console.log("form", this.newModule.value);

    this.subscriptions.add(
      this._service.new(this.newModule.value).subscribe({
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
      this._service.getAllModules().subscribe({
        next: (value: any) => {
          if (value?.response?.length != 0) {
            this.modules.set(value.response)
            console.log("this.modules",this.modules());

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
