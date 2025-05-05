import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PrevoznikService } from '../../../core/services/prevoznik.service';
import { Prevoznik } from '../../../core/model/prevoznik.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-prevoznik-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './prevoznik-form.component.html',
  styleUrl: './prevoznik-form.component.css'
})
export class PrevoznikFormComponent {
  form: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: PrevoznikService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      naziv: [''],
      adresa: [''],
      aktivan: [false]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;

    if (this.id) {
      this.service.getById(this.id).subscribe(p => this.form.patchValue(p));
    }
  }

  sacuvaj() {
    if (this.form.valid) {
      const prevoznik = { ...this.form.value, id: this.id } as Prevoznik;

      if (this.id) {
        this.service.update(this.id, prevoznik).subscribe(() => this.router.navigate(['/prevoznici']));
      } else {
        this.service.create(prevoznik).subscribe(() => this.router.navigate(['/prevoznici']));
      }
    }
  }
}
