import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartaListComponent } from './karta-list.component';

describe('KartaListComponent', () => {
  let component: KartaListComponent;
  let fixture: ComponentFixture<KartaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KartaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KartaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
