import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDetailsComponent } from './agency-details.component';

describe('AgencyDetailsComponent', () => {
  let component: AgencyDetailsComponent;
  let fixture: ComponentFixture<AgencyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
