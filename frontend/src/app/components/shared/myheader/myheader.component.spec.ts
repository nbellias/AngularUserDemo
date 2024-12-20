import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyheaderComponent } from './myheader.component';

describe('MyheaderComponent', () => {
  let component: MyheaderComponent;
  let fixture: ComponentFixture<MyheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
