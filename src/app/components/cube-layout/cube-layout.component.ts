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
    return [...this._leftFace]
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

  public u() {
    // top face corners
    let keep: CubeSquare = {id: 10, color: SquareColor.WHITE};
    [keep, this._topFace[0][0]] = [this._topFace[0][0], keep];
    [keep, this._topFace[0][2]] = [this._topFace[0][2], keep];
    [keep, this._topFace[2][2]] = [this._topFace[2][2], keep];
    [keep, this._topFace[2][0]] = [this._topFace[2][0], keep];
    [keep, this._topFace[0][0]] = [this._topFace[0][0], keep];

    // top face edges
    [keep, this._topFace[0][1]] = [this._topFace[0][1], keep];
    [keep, this._topFace[1][2]] = [this._topFace[1][2], keep];
    [keep, this._topFace[2][1]] = [this._topFace[2][1], keep];
    [keep, this._topFace[1][0]] = [this._topFace[1][0], keep];
    [keep, this._topFace[0][1]] = [this._topFace[0][1], keep];

    // top row
    let keepRow: CubeSquare[] = [];
    [keepRow, this._rightFace[0]] = [this._rightFace[0], keepRow];
    [keepRow, this._frontFace[0]] = [this._frontFace[0], keepRow];
    [keepRow, this._leftFace[0]] = [this._leftFace[0], keepRow];
    [keepRow, this._backFace[0]] = [this._backFace[0], keepRow];
    [keepRow, this._rightFace[0]] = [this._rightFace[0], keepRow];
  }

  public r() {
    // right face corners
    let keep: CubeSquare = {id: 10, color: SquareColor.WHITE};
    [keep, this._rightFace[0][0]] = [this._rightFace[0][0], keep];
    [keep, this._rightFace[0][2]] = [this._rightFace[0][2], keep];
    [keep, this._rightFace[2][2]] = [this._rightFace[2][2], keep];
    [keep, this._rightFace[2][0]] = [this._rightFace[2][0], keep];
    [keep, this._rightFace[0][0]] = [this._rightFace[0][0], keep];

    // right face edges
    [keep, this._rightFace[0][1]] = [this._rightFace[0][1], keep];
    [keep, this._rightFace[1][2]] = [this._rightFace[1][2], keep];
    [keep, this._rightFace[2][1]] = [this._rightFace[2][1], keep];
    [keep, this._rightFace[1][0]] = [this._rightFace[1][0], keep];
    [keep, this._rightFace[0][1]] = [this._rightFace[0][1], keep];

    // right column
    let keepColumn: CubeSquare[] = [{id: 10, color: SquareColor.WHITE}, {id: 10, color: SquareColor.WHITE}, {id: 10, color: SquareColor.WHITE}];
    this._frontFace.forEach((row, i) => [keepColumn[i], row[2]] = [row[2], keepColumn[i]])
    this._topFace.forEach((row, i) => [keepColumn[i], row[2]] = [row[2], keepColumn[i]])
    this._backFace.forEach((row, i) => [keepColumn[i], row[0]] = [row[0], keepColumn.reverse()[i]])
    this._bottomFace.forEach((row, i) => [keepColumn[i], row[2]] = [row[2], keepColumn.reverse()[i]])
    this._frontFace.forEach((row, i) => [keepColumn[i], row[2]] = [row[2], keepColumn[i]])
  }

  public f() {
    // right face corners
    let keep: CubeSquare = {id: 10, color: SquareColor.WHITE};
    [keep, this._frontFace[0][0]] = [this._frontFace[0][0], keep];
    [keep, this._frontFace[0][2]] = [this._frontFace[0][2], keep];
    [keep, this._frontFace[2][2]] = [this._frontFace[2][2], keep];
    [keep, this._frontFace[2][0]] = [this._frontFace[2][0], keep];
    [keep, this._frontFace[0][0]] = [this._frontFace[0][0], keep];

    // right face edges
    [keep, this._frontFace[0][1]] = [this._frontFace[0][1], keep];
    [keep, this._frontFace[1][2]] = [this._frontFace[1][2], keep];
    [keep, this._frontFace[2][1]] = [this._frontFace[2][1], keep];
    [keep, this._frontFace[1][0]] = [this._frontFace[1][0], keep];
    [keep, this._frontFace[0][1]] = [this._frontFace[0][1], keep];

    // right column
    let keepColumn: CubeSquare[] = [{id: 10, color: SquareColor.WHITE}, {id: 10, color: SquareColor.WHITE}, {id: 10, color: SquareColor.WHITE}];
    this._rightFace.forEach((row, i) => [keepColumn[i], row[0]] = [row[0], keepColumn[i]]);
    [keepColumn, this._topFace[2]] = [this._topFace[2], keepColumn];
    this._leftFace.forEach((row, i) => [keepColumn[i], row[2]] = [row[2], keepColumn.reverse()[i]]);
    [keepColumn, this._bottomFace[0]] = [this._bottomFace[0], keepColumn];
    this._rightFace.forEach((row, i) => [keepColumn[i], row[0]] = [row[0], keepColumn.reverse()[i]])
  }

  private generateFace(color: SquareColor): CubeSquare[][] {
    let squares: CubeSquare[][] = [];
    for (let i = 0; i < this.size; i++) {
      squares[i] = [];
      for (let j = 0; j < this.size; j++) {
        squares[i].push({id: i * this.size + j, color: color});
      }
    }
    return squares;
  }
}
