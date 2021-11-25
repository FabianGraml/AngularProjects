import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboardItemComponent } from './gameboard-item.component';

describe('GameboardItemComponent', () => {
  let component: GameboardItemComponent;
  let fixture: ComponentFixture<GameboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameboardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
