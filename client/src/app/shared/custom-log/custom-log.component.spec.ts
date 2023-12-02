import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLogComponent } from './custom-log.component';

describe('CustomLogComponent', () => {
  let component: CustomLogComponent;
  let fixture: ComponentFixture<CustomLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
