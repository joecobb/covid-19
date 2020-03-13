import { ServiceService } from './service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'corona';
  summary = null;
  breakpoint = 5;
  query = '';
  countries = null;
  filteredCountries = [];
  constructor(private service: ServiceService) {
  }
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 5;
    this.service.getCasesByCountry().subscribe(
      res => {
        console.log(res);
        this.countries = (res as any).countries_stat;
        this.filteredCountries = [...this.countries];
      },
      err => {
        console.log(err);
      }
    );

    this.service.getTotalStats().subscribe(
      res => {
        console.log(res);
        this.summary = res;
      },
      err => {
        console.log(err);
      }
    );

    setInterval(() => {
      this.refreshData();
    }, 60 * 60 * 1000);

  }
  refreshData() {
    this.service.getCasesByCountry().subscribe(
      res => {
        console.log(res);
        this.countries = (res as any).countries_stat;
        this.filteredCountries =
          [...this.countries.filter(country => country.country_name.toLowerCase().includes(this.query.toLowerCase()))];
      },
      err => {
        console.log(err);
      }
    );

    this.service.getTotalStats().subscribe(
      res => {
        console.log(res);
        this.summary = res;
      },
      err => {
        console.log(err);
      }
    );

  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 5;
  }
  filterList() {
    this.filteredCountries = [...this.countries.filter(country => country.country_name.toLowerCase().includes(this.query.toLowerCase()))];
  }

}



