import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAccesibleComponent } from './not-accesible.component';

describe('NotAccesibleComponent', () => {
  let component: NotAccesibleComponent;
  let fixture: ComponentFixture<NotAccesibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAccesibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAccesibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
