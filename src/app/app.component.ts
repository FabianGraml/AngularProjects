import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from './notifier.service';

interface IClass {
  clazzId: number;
  clazzName: string;
}
interface IStudent {
  studentId: number;
  studentName: string;
  gender: string;
  clazzId: number;
  clazzName: string;
  email: string;
  country: string;
  age: number;
  registered: number;
}
interface IStudentClazz {
  clazzId: number;
  studentId: number;
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
  students: IStudent[] = []
  result: string = '';
  selectedClazzName: string = '4a';

  constructor(private http: HttpClient, private notifier: NotifierService) { }

  ngOnInit() {
    this.http.get<IClass[]>('https://localhost:5001/Values/GetClazzs').subscribe(data => {
      this.clazzs = data;
    });
    this.http.get<IStudent[]>('https://localhost:5001/Values/GetStudentsFromClazz/' + this.selectedClazzName).subscribe(data => {
      this.students = data;
    });
  

  }
  onclassSelected(name: string){
    this.selectedClazzName = name;
    this.result = '';
    this.http.get<[]>('https://localhost:5001/Values/GetStudentsFromClazz/' + name).subscribe(data => {
      this.students = data;
      this.result = JSON.stringify(data);
    });
  }
  onStudentClazzChangedHandler(studentClazz: IStudentClazz){

    this.notifier.notify(`${this.students.find(x => x.studentId == studentClazz.studentId)?.studentName} --> ${this.clazzs.find(x => x.clazzId == studentClazz.clazzId)?.clazzName}`);
    var idx = this.students.findIndex(x => x.studentId == studentClazz.studentId);
    this.students.splice(idx, 1);
     

      var body = {
      'studentId': studentClazz.studentId,
      'clazzId': studentClazz.clazzId
    }
    this.http.put<IStudentClazz>('https://localhost:5001/Values/AddStudentToOtherClazz', body).subscribe(data => {
      console.log(data);
    });
  }
  
}
