import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IClass {
  clazzId: number;
  clazzName: string;

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  clazzs: IClass[] = [];
  studentsOfClazz: [] = [];

  result: string = '';
  selectedClazzName: string = '';


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<IClass[]>('https://localhost:5001/Values/GetClazzs').subscribe(data => {
      this.clazzs = data;
      console.log(data);
    });
  }
  onclassSelected(name: string){
    this.selectedClazzName = name;
    this.result = '';
    this.http.get<[]>('https://localhost:5001/Values/GetStudentsFromClazz/' + name).subscribe(data => {
      this.studentsOfClazz = data;
      this.result = JSON.stringify(data);
    });
  }
  
}
