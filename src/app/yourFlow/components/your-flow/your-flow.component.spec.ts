import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourFlowComponent } from './your-flow.component';

describe('YourFlowComponent', () => {
  let component: YourFlowComponent;
  let fixture: ComponentFixture<YourFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
