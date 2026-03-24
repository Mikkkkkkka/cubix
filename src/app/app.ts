import {Component, signal} from '@angular/core';
import {CubeLayoutComponent} from './components/cube-layout/cube-layout.component';

@Component({
  selector: 'app-root',
  imports: [CubeLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cubix');
}
