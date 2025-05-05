import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Karta } from '../../../../core/model/karta.model';
import { KartaService } from '../../../../core/services/karta.service';

@Component({
  selector: 'app-prevoznik-statistika',
  imports: [CommonModule, MatTableModule],
  templateUrl: './prevoznik-statistika.component.html',
  styleUrl: './prevoznik-statistika.component.css'
})
export class PrevoznikStatistikaComponent  implements OnInit {
  karte: Karta[] = [];
  realizovaneKarte: number = 0;
  ukupnaZarada: number = 0;
  idPrevoznika: number = 0;
  displayedColumns = ['imeVlasnika', 'odrediste', 'datumPolaska', 'datumDolaska', 'cena'];

  constructor(private kartaService: KartaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idPrevoznika = +this.route.snapshot.paramMap.get('idPrevoznika')!;
    this.kartaService.getAll().subscribe(karte => {
      this.karte = karte.filter(k => k.idPrevoznika === this.idPrevoznika);
      this.realizovaneKarte = this.karte.filter(k => !!k.datumDolaska).length;
      this.ukupnaZarada = this.karte.reduce((sum, k) => sum + k.cena, 0);
    });
  }
}
