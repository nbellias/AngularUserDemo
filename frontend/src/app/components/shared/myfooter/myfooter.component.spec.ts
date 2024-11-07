import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfooterComponent } from './myfooter.component';

describe('MyfooterComponent', () => {
  let component: MyfooterComponent;
  let fixture: ComponentFixture<MyfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyfooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
