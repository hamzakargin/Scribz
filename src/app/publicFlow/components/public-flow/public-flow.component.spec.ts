import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFlowComponent } from './public-flow.component';

describe('PublicFlowComponent', () => {
  let component: PublicFlowComponent;
  let fixture: ComponentFixture<PublicFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
