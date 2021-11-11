import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
interface IClass {
  clazzId: number;
  clazzName: string;
}
interface IStudentClazz {
  clazzId: number;
  studentId: number;
}
@Component({
  selector: 'app-student-row',
  templateUrl: './student-row.component.html',
  styleUrls: ['./student-row.component.scss']
})
export class StudentRowComponent implements OnInit {

  @Input() student: IStudent = {} as IStudent;
  @Input() clazzs: IClass[] = [];
  @Input() clazzOfStudent: number = 0;
  @Input() age: number = 0;	
  @Output() studentClazzChanged = new EventEmitter<IStudentClazz>();


  constructor() { }

  ngOnInit(): void {
  }

  getClazzsWhereStudentIsNotPart(): IClass[] {
    return this.clazzs.filter(clazz => clazz.clazzId != this.clazzOfStudent);   
  }
  getAgeString(): string {
    return Math.floor(this.age / 10) * 10+'+'; 
  }
  registeredChanged(): void {
    var currentStateOfStud = this.student.registered;
    if(currentStateOfStud == 1){
      this.student.registered = 0;
    }else{
      this.student.registered = 1;
    }
      
    }
    studentClazzChangedHandler(studentClazzChanged: IStudentClazz): void {
      this.studentClazzChanged.emit({
        clazzId: studentClazzChanged.clazzId,
        studentId: studentClazzChanged.studentId
      });

    }
}

