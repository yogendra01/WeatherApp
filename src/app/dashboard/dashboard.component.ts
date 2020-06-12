import { Component, OnInit } from '@angular/core';
import {DashboardService } from './dashboard.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DashboardService]
})

export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) { }

  public showTable:boolean = false;
  public data: any = {};
  public city:string;
  public cloudiness:string;
  public temp:string;
  public pressure:string;
  public humidity:string;
  public favCity:string;
  public tempInCelsius: any;
  public weatherReport:WeatherReport;
  public main: Main;
 
  ngOnInit() {
    this.getFavouriteLocation();
  }

getWeatherReportByCity(){
  this.dashboardService.getData(this.city)
    .subscribe(result => {
        this.weatherReport = result;
        console.log(this.weatherReport)
        this.main = this.weatherReport.list[0].main;
        this.cloudiness = this.weatherReport.list[0].weather[0].description;        
        this.showTable = true;
      },
    error => {console.log("error : " + error),
    alert("Please enter the correct city name ...!!!")},
    function () { 
    });    
}

setFavouriteLoction(){
  localStorage.setItem("City",this.city);
}

getFavouriteLocation(){
  this.favCity=localStorage.getItem("City");  
  if(!isNullOrUndefined(this.favCity)){
    this.city = this.favCity;
    this.getWeatherReportByCity();
  }
}

}


export class WeatherReport{
list:Detail;
city:City;
}

class City{
id: number;
name: string;
coord: any;
country: string;
population: number;
timezone: number;
sunrise: number;
sunset: number;
}

class Detail{
  dt: number;
  main: Main;
  weather: WeatherDetail[];
}

class Main{
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

class WeatherDetail{
   id: number;
   main: string;
   description: string;
   icon: string;
}