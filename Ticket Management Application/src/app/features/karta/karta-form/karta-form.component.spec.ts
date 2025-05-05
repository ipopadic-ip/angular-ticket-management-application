import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartaFormComponent } from './karta-form.component';

describe('KartaFormComponent', () => {
  let component: KartaFormComponent;
  let fixture: ComponentFixture<KartaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KartaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KartaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
