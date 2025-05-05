import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KartaService } from '../../../core/services/karta.service';
import { Karta } from '../../../core/model/karta.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PrevoznikService } from '../../../core/services/prevoznik.service';
import { Prevoznik } from '../../../core/model/prevoznik.model';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // za mat-option



@Component({
  selector: 'app-karta-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule  
  ],
  templateUrl: './karta-form.component.html',
  styleUrl: './karta-form.component.css'
})
export class KartaFormComponent {
  form: FormGroup;
  id: number | null = null;
  idPrevoznika: number;
  prevoznici: Prevoznik[] = [];


  constructor(
    private fb: FormBuilder,
    private service: KartaService,
    private route: ActivatedRoute,
    private router: Router,
    private prevoznikService: PrevoznikService,
  ) {
    this.form = this.fb.group({
      imeVlasnika: [''],
      odrediste: [''],
      datumPolaska: ['', [Validators.required, this.datumPolaskaValidator]],
      datumDolaska: ['', Validators.required],
      cena: [0],
      idPrevoznika: [null, Validators.required],
    });

    this.prevoznikService.getAll().subscribe(data => {
      this.prevoznici = data;
    });
    

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    this.idPrevoznika = +this.route.snapshot.queryParamMap.get('idPrevoznika')!;

    this.form.get('datumPolaska')?.valueChanges.subscribe(() => {
      this.form.get('datumDolaska')?.updateValueAndValidity();
    });

    this.form.get('datumDolaska')?.setValidators([
      Validators.required,
      this.datumDolaskaValidator
    ]);
    

    if (this.id) {
      this.service.getById(this.id).subscribe(k => {
        // Formatiranje datuma za datetime-local
        const datumPolaska = this.formatDateTimeLocal(k.datumPolaska);
        const datumDolaska = this.formatDateTimeLocal(k.datumDolaska);
    
        this.form.patchValue({
          ...k,
          datumPolaska,
          datumDolaska,
          idPrevoznika: k.idPrevoznika ?? this.idPrevoznika
        });
      });
    }
    
  }

  minDateTime = new Date().toISOString().slice(0, 16);

  // Validator da datum polaska nije u prošlosti
  datumPolaskaValidator(control: AbstractControl): ValidationErrors | null {
    const enteredDate = new Date(control.value);
    const now = new Date();

    if (enteredDate < now) {
      return { pastDate: true };
    }
    return null;
  }

  // Validator da datum dolaska nije pre datuma polaska
  datumDolaskaValidator = (control: AbstractControl): ValidationErrors | null => {
    const datumPolaska = this.form?.get('datumPolaska')?.value;
    const datumDolaska = control.value;

    if (!datumPolaska || !datumDolaska) return null;

    const polazak = new Date(datumPolaska);
    const dolazak = new Date(datumDolaska);

    if (dolazak < polazak) {
      return { beforeDeparture: true };
    }

    return null;
  };

  private formatDateTimeLocal(value: string): string {
    const date = new Date(value);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  

  sacuvaj() {
    if (this.form.valid) {
      const karta = { ...this.form.value, idPrevoznika: this.idPrevoznika } as Karta;

      if (this.id) {
        this.service.update(this.id, karta).subscribe(() => this.router.navigate(['/karte']));
      } else {
        this.service.create(karta).subscribe(() => this.router.navigate(['/karte']));
      }
    }
  }
}
