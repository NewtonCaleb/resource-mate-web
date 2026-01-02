import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsComponent } from './service-details.component';

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
