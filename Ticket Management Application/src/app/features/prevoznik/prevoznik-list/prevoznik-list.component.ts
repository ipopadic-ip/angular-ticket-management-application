import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrevoznikService } from '../../../core/services/prevoznik.service';
import { Prevoznik } from '../../../core/model/prevoznik.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-prevoznik-list',
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './prevoznik-list.component.html',
  styleUrl: './prevoznik-list.component.css'
})
export class PrevoznikListComponent {
  prevoznici: Prevoznik[] = [];
  kolone = ['naziv', 'adresa', 'aktivan', 'akcije'];

  constructor(private service: PrevoznikService) {
    this.ucitaj();
  }

  ucitaj() {
    this.service.getAll().subscribe(data => this.prevoznici = data);
  }

  obrisi(id?: number) {
    if (!id) return;
  
    const prevoznik = this.prevoznici.find(p => p.id === id);
    if (!prevoznik) return;
  
    if (prevoznik.aktivan) {
      // Logičko brisanje (setuj aktivan na false)
      if (confirm("Prevoznik je aktivan. Želiš li da ga deaktiviraš (logičko brisanje)?")) {
        const deaktiviran = { ...prevoznik, aktivan: false };
        this.service.update(id, deaktiviran).subscribe(() => this.ucitaj());
      }
    } else {
      // Trajno brisanje
      if (confirm("Prevoznik je već deaktiviran. Želiš li trajno da ga obrišeš?")) {
        this.service.delete(id).subscribe(() => this.ucitaj());
      }
    }
  }
  

  // obrisi(id?: number) {
  //   if (id && confirm("Obriši prevoznika?")) {
  //     this.service.delete(id).subscribe(() => this.ucitaj());
  //   }
  // }
}
