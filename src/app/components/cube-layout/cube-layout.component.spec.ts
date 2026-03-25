import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CubeLayoutComponent} from './cube-layout.component';
import {CubeSquare, SquareColor} from '../../models/cube-square';

describe('CubeLayoutComponent', () => {
  let component: CubeLayoutComponent;
  let fixture: ComponentFixture<CubeLayoutComponent>;

  let isSolved = () => {
    let original = new CubeLayoutComponent();
    expect(component.topFace).toEqual(original.topFace);
    expect(component.frontFace).toEqual(original.frontFace);
    expect(component.rightFace).toEqual(original.rightFace);
    expect(component.leftFace).toEqual(original.leftFace);
    expect(component.backFace).toEqual(original.backFace);
    expect(component.bottomFace).toEqual(original.bottomFace);
  };

  let rowColors = (face: CubeSquare[][], row: number) =>
    face[row].map((square) => square.color);

  let columnColors = (face: CubeSquare[][], column: number) =>
    face.map((row) => row[column].color);

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

  it('should be solved after 4 U\'s', () => {
    for (let i = 0; i < 4; i++) {
      component.u();
    }
    isSolved();
  });

  it('should be solved after 4 R\'s', () => {
    for (let i = 0; i < 4; i++) {
      component.r();
    }
    isSolved();
  });

  it('should be solved after 4 F\'s', () => {
    for (let i = 0; i < 4; i++) {
      component.f();
    }
    isSolved();
  });

  it('should move the top layer correctly on U', () => {
    component.u();

    expect(rowColors(component.frontFace, 0)).toEqual([
      SquareColor.RED,
      SquareColor.RED,
      SquareColor.RED,
    ]);
    expect(rowColors(component.leftFace, 0)).toEqual([
      SquareColor.GREEN,
      SquareColor.GREEN,
      SquareColor.GREEN,
    ]);
    expect(rowColors(component.backFace, 0)).toEqual([
      SquareColor.ORANGE,
      SquareColor.ORANGE,
      SquareColor.ORANGE,
    ]);
    expect(rowColors(component.rightFace, 0)).toEqual([
      SquareColor.BLUE,
      SquareColor.BLUE,
      SquareColor.BLUE,
    ]);
  });

  it('should move the right layer correctly on R', () => {
    component.r();

    expect(columnColors(component.frontFace, 2)).toEqual([
      SquareColor.WHITE,
      SquareColor.WHITE,
      SquareColor.WHITE,
    ]);
    expect(columnColors(component.bottomFace, 2)).toEqual([
      SquareColor.GREEN,
      SquareColor.GREEN,
      SquareColor.GREEN,
    ]);
    expect(columnColors(component.backFace, 0)).toEqual([
      SquareColor.YELLOW,
      SquareColor.YELLOW,
      SquareColor.YELLOW,
    ]);
    expect(columnColors(component.topFace, 2)).toEqual([
      SquareColor.BLUE,
      SquareColor.BLUE,
      SquareColor.BLUE,
    ]);
  });

  it('should move the front layer correctly on F', () => {
    component.f();

    expect(columnColors(component.rightFace, 0)).toEqual([
      SquareColor.WHITE,
      SquareColor.WHITE,
      SquareColor.WHITE,
    ]);
    expect(rowColors(component.bottomFace, 0)).toEqual([
      SquareColor.RED,
      SquareColor.RED,
      SquareColor.RED,
    ]);
    expect(columnColors(component.leftFace, 2)).toEqual([
      SquareColor.YELLOW,
      SquareColor.YELLOW,
      SquareColor.YELLOW,
    ]);
    expect(rowColors(component.topFace, 2)).toEqual([
      SquareColor.ORANGE,
      SquareColor.ORANGE,
      SquareColor.ORANGE,
    ]);
  });

  it('should be solved after 6 sexy-ies', () => {
    for (let i = 0; i < 6; i++) {
      component.r();
      component.u();
      for (let j = 0; j < 3; j++) component.r();
      for (let j = 0; j < 3; j++) component.u();
    }
    isSolved();
  });
});
