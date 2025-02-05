import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFlowComponent } from './tag-flow.component';

describe('TagFlowComponent', () => {
  let component: TagFlowComponent;
  let fixture: ComponentFixture<TagFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
