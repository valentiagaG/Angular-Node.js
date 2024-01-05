import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesibleComponent } from './accesible.component';

describe('AccesibleComponent', () => {
  let component: AccesibleComponent;
  let fixture: ComponentFixture<AccesibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccesibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
