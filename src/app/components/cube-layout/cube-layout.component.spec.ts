import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeLayoutComponent } from './cube-layout.component';

describe('CubeLayoutComponent', () => {
  let component: CubeLayoutComponent;
  let fixture: ComponentFixture<CubeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CubeLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
