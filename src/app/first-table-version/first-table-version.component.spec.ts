import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTableVersionComponent } from './first-table-version.component';

describe('FirstTableVersionComponent', () => {
  let component: FirstTableVersionComponent;
  let fixture: ComponentFixture<FirstTableVersionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstTableVersionComponent]
    });
    fixture = TestBed.createComponent(FirstTableVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
