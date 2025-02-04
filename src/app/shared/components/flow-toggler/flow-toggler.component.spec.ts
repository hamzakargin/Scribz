import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FlowTogglerComponent} from './flow-toggler.component';

describe('FlowTogglerComponent', () => {
  let component: FlowTogglerComponent;
  let fixture: ComponentFixture<FlowTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowTogglerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlowTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
