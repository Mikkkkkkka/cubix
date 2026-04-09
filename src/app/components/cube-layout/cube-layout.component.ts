import {Component, computed, signal} from '@angular/core';
import {CubeSquare, SquareColor} from '../../models/cube-square';

@Component({
  selector: 'app-cube-layout',
  imports: [],
  templateUrl: './cube-layout.component.html',
  styleUrl: './cube-layout.component.css',
})
export class CubeLayoutComponent {
  private readonly size = 3;
  private readonly topFace = signal(this.generateFace(SquareColor.WHITE));
  private readonly leftFace = signal(this.generateFace(SquareColor.ORANGE));
  private readonly frontFace = signal(this.generateFace(SquareColor.GREEN));
  private readonly rightFace = signal(this.generateFace(SquareColor.RED));
  private readonly backFace = signal(this.generateFace(SquareColor.BLUE));
  private readonly bottomFace = signal(this.generateFace(SquareColor.YELLOW));

  readonly faces = computed(() => [
    { name: 'top', face: this.topFace(), move: () => this.u() },
    { name: 'left', face: this.leftFace(), move: null },
    { name: 'front', face: this.frontFace(), move: () => this.f() },
    { name: 'right', face: this.rightFace(), move: () => this.r() },
    { name: 'back', face: this.backFace(), move: null },
    { name: 'bottom', face: this.bottomFace(), move: null },
  ]);

  public u() {
    this.topFace.update((face) => this.rotateFaceClockwise(face));

    const front = this.getRow(this.frontFace(), 0);
    const right = this.getRow(this.rightFace(), 0);
    const back = this.getRow(this.backFace(), 0);
    const left = this.getRow(this.leftFace(), 0);

    this.frontFace.update((face) => this.setRow(face, 0, right));
    this.leftFace.update((face) => this.setRow(face, 0, front));
    this.backFace.update((face) => this.setRow(face, 0, left));
    this.rightFace.update((face) => this.setRow(face, 0, back));
  }

  public r() {
    this.rightFace.update((face) => this.rotateFaceClockwise(face));

    const top = this.getColumn(this.topFace(), this.size - 1);
    const front = this.getColumn(this.frontFace(), this.size - 1);
    const bottom = this.getColumn(this.bottomFace(), this.size - 1);
    const back = this.getColumn(this.backFace(), 0);

    this.frontFace.update((face) => this.setColumn(face, this.size - 1, top));
    this.bottomFace.update((face) => this.setColumn(face, this.size - 1, front));
    this.backFace.update((face) => this.setColumn(face, 0, [...bottom].reverse()));
    this.topFace.update((face) => this.setColumn(face, this.size - 1, [...back].reverse()));
  }

  public f() {
    this.frontFace.update((face) => this.rotateFaceClockwise(face));

    const top = this.getRow(this.topFace(), this.size - 1);
    const right = this.getColumn(this.rightFace(), 0);
    const bottom = this.getRow(this.bottomFace(), 0);
    const left = this.getColumn(this.leftFace(), this.size - 1);

    this.rightFace.update((face) => this.setColumn(face, 0, top));
    this.bottomFace.update((face) => this.setRow(face, 0, [...right].reverse()));
    this.leftFace.update((face) => this.setColumn(face, this.size - 1, bottom));
    this.topFace.update((face) => this.setRow(face, this.size - 1, [...left].reverse()));
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

  private rotateFaceClockwise(face: CubeSquare[][]): CubeSquare[][] {
    return face.map((_, rowIndex) => face.map((row) => row[rowIndex]).reverse(),);
  }

  private getRow(face: CubeSquare[][], rowIndex: number): CubeSquare[] {
    return [...face[rowIndex]];
  }

  private setRow(face: CubeSquare[][], rowIndex: number, values: CubeSquare[]): CubeSquare[][] {
    return face.map((row, index) => index === rowIndex ? [...values] : [...row]);
  }

  private getColumn(face: CubeSquare[][], columnIndex: number): CubeSquare[] {
    return face.map((row) => row[columnIndex]);
  }

  private setColumn(face: CubeSquare[][], columnIndex: number, values: CubeSquare[]): CubeSquare[][] {
    return face.map((row, rowIndex) => row.map((square, squareIndex) => squareIndex === columnIndex ? values[rowIndex] : square),);
  }
}
