import {Component} from '@angular/core';
import {CubeSquare, SquareColor} from '../../models/cube-square';

@Component({
  selector: 'app-cube-layout',
  imports: [],
  templateUrl: './cube-layout.component.html',
  styleUrl: './cube-layout.component.css',
})
export class CubeLayoutComponent {
  private readonly _topFace: CubeSquare[][];
  private readonly _leftFace: CubeSquare[][];
  private readonly _frontFace: CubeSquare[][];
  private readonly _rightFace: CubeSquare[][];
  private readonly _backFace: CubeSquare[][];
  private readonly _bottomFace: CubeSquare[][];
  private size: number = 3;

  constructor() {
    this._topFace = this.generateFace(SquareColor.WHITE);
    this._leftFace = this.generateFace(SquareColor.ORANGE);
    this._frontFace = this.generateFace(SquareColor.GREEN);
    this._rightFace = this.generateFace(SquareColor.RED);
    this._backFace = this.generateFace(SquareColor.BLUE);
    this._bottomFace = this.generateFace(SquareColor.YELLOW);
  }

  get topFace(): CubeSquare[][] {
    return [...this._topFace];
  }

  get leftFace(): CubeSquare[][] {
    return [...this._leftFace];
  }

  get frontFace(): CubeSquare[][] {
    return [...this._frontFace];
  }

  get rightFace(): CubeSquare[][] {
    return [...this._rightFace];
  }

  get backFace(): CubeSquare[][] {
    return [...this._backFace];
  }

  get bottomFace(): CubeSquare[][] {
    return [...this._bottomFace];
  }

  get faces() {
    return [
      { face: this.topFace, move: this.u },
      { face: this.leftFace, move: null },
      { face: this.frontFace, move: this.f },
      { face: this.rightFace, move: this.r },
      { face: this.backFace, move: null },
      { face: this.bottomFace, move: null },
    ]
  }

  public u() {
    this.rotateFaceClockwise(this._topFace);

    const front = this.getRow(this._frontFace, 0);
    const right = this.getRow(this._rightFace, 0);
    const back = this.getRow(this._backFace, 0);
    const left = this.getRow(this._leftFace, 0);

    this.setRow(this._frontFace, 0, right);
    this.setRow(this._leftFace, 0, front);
    this.setRow(this._backFace, 0, left);
    this.setRow(this._rightFace, 0, back);
  }

  public r() {
    this.rotateFaceClockwise(this._rightFace);

    const top = this.getColumn(this._topFace, this.size - 1);
    const front = this.getColumn(this._frontFace, this.size - 1);
    const bottom = this.getColumn(this._bottomFace, this.size - 1);
    const back = this.getColumn(this._backFace, 0);

    this.setColumn(this._frontFace, this.size - 1, top);
    this.setColumn(this._bottomFace, this.size - 1, front);
    this.setColumn(this._backFace, 0, [...bottom].reverse());
    this.setColumn(this._topFace, this.size - 1, [...back].reverse());
  }

  public f() {
    this.rotateFaceClockwise(this._frontFace);

    const top = this.getRow(this._topFace, this.size - 1);
    const right = this.getColumn(this._rightFace, 0);
    const bottom = this.getRow(this._bottomFace, 0);
    const left = this.getColumn(this._leftFace, this.size - 1);

    this.setColumn(this._rightFace, 0, top);
    this.setRow(this._bottomFace, 0, [...right].reverse());
    this.setColumn(this._leftFace, this.size - 1, bottom);
    this.setRow(this._topFace, this.size - 1, [...left].reverse());
  }

  private generateFace(color: SquareColor): CubeSquare[][] {
    let squares: CubeSquare[][] = [];
    for (let i = 0; i < this.size; i++) {
      squares[i] = [];
      for (let j = 0; j < this.size; j++) {
        squares[i].push({id: i * this.size + j, color});
      }
    }
    return squares;
  }

  private rotateFaceClockwise(face: CubeSquare[][]): void {
    const rotated = face.map((_, rowIndex) =>
      face.map((row) => row[rowIndex]).reverse(),
    );

    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        face[row][column] = rotated[row][column];
      }
    }
  }

  private getRow(face: CubeSquare[][], rowIndex: number): CubeSquare[] {
    return [...face[rowIndex]];
  }

  private setRow(face: CubeSquare[][], rowIndex: number, values: CubeSquare[]): void {
    face[rowIndex] = [...values];
  }

  private getColumn(face: CubeSquare[][], columnIndex: number): CubeSquare[] {
    return face.map((row) => row[columnIndex]);
  }

  private setColumn(face: CubeSquare[][], columnIndex: number, values: CubeSquare[]): void {
    values.forEach((value, rowIndex) => {
      face[rowIndex][columnIndex] = value;
    });
  }
}
