import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-layout',
  imports: [Navbar, Hero],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
