import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KartaService } from '../../../core/services/karta.service';
import { Karta } from '../../../core/model/karta.model';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-karta-list',
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './karta-list.component.html',
  styleUrl: './karta-list.component.css'
})
export class KartaListComponent {
  dataSource: Karta[] = [];
  displayedColumns = ['imeVlasnika', 'odrediste', 'datumPolaska', 'datumDolaska', 'cena', 'actions'];

  constructor(private service: KartaService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(k => this.dataSource = k);
  }

  izmeni(karta: Karta) {
    this.router.navigate(['/karte/edit', karta.id], { queryParams: { idPrevoznika: karta.idPrevoznika } });
  }

  obrisi(id: number) {
    this.service.delete(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(k => k.id !== id);
    });
  }
}
