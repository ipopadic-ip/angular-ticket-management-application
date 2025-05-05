import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevoznikListComponent } from './prevoznik-list.component';

describe('PrevoznikListComponent', () => {
  let component: PrevoznikListComponent;
  let fixture: ComponentFixture<PrevoznikListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevoznikListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevoznikListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
