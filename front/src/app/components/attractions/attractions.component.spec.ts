import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsComponent } from './attractions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AttractionsComponent', () => {
  let component: AttractionsComponent;
  let fixture: ComponentFixture<AttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
