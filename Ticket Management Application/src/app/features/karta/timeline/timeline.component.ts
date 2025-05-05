import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Karta } from '../../../core/model/karta.model';
import { KartaService } from '../../../core/services/karta.service';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, RouterModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {

  karte: Karta[] = [];
  imeVlasnika: string = '';

  constructor(private kartaService: KartaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.imeVlasnika = this.route.snapshot.paramMap.get('imeVlasnika') ?? '';

    if (this.imeVlasnika) {
      this.kartaService.getAll().subscribe(res => {
        this.karte = res
          .filter(k => k.imeVlasnika === this.imeVlasnika)
          .sort((a, b) => a.datumPolaska.localeCompare(b.datumPolaska));
      });
    }
  }

  idiNaDodavanje(): void {
    this.router.navigate(['/karte/add']);
  }
}
