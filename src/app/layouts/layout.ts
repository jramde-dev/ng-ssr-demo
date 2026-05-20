import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Hero } from './hero/hero';
import { About } from './about/about';

@Component({
  selector: 'app-layout',
  imports: [Navbar, Hero, About],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
