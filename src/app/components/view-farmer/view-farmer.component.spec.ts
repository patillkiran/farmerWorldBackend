import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFarmerComponent } from './view-farmer.component';

describe('ViewFarmerComponent', () => {
  let component: ViewFarmerComponent;
  let fixture: ComponentFixture<ViewFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFarmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
