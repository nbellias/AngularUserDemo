import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MyheaderComponent} from './components/shared/myheader/myheader.component';
import {MyfooterComponent} from './components/shared/myfooter/myfooter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyheaderComponent, MyfooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
