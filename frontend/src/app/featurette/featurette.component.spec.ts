import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturetteComponent } from './featurette.component';

describe('FeaturetteComponent', () => {
  let component: FeaturetteComponent;
  let fixture: ComponentFixture<FeaturetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturetteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
