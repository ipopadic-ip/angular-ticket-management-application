import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevoznikStatistikaComponent } from './prevoznik-statistika.component';

describe('PrevoznikStatistikaComponent', () => {
  let component: PrevoznikStatistikaComponent;
  let fixture: ComponentFixture<PrevoznikStatistikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevoznikStatistikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevoznikStatistikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
