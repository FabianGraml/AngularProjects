using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studentsManager.DTOs;
using studentsManagerDb;

namespace studentsManager.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class ValuesController : ControllerBase
  {
	private readonly studentsManagerContext db;
	public ValuesController(studentsManagerContext db)
	{
	  this.db = db;
	}
	  
    [HttpGet("GetStudents")]
    public object GetStudents()
    {
      try
      {
        int nr = db.Students.Count();
        return new { IsOk = true, Nr = nr };
      }
      catch (Exception exc)
      {
        return new { IsOk = false, Nr = -1, Error = exc.Message };
      }
    }
     [HttpGet("GetAllStudents")]
     public IActionResult GetAllStudents()
        {
            var students = new List<StudentsOfClassDTO>();
            db.Students.ToList().ForEach(x => students.Add(new StudentsOfClassDTO
            {
                Age = x.Age,
                Gender = x.Gender,
                ClazzId = x.ClazzId,
                Country = x.Country,
                Clazzname = db.Clazzs.Where(y => y.Id == x.ClazzId).First().Name,
                Email = x.Email,
                Registered = x.Registered,
                StudentId = x.Id,
                StudentName = $"{x.Firstname} {x.Lastname}",
            }));
            return Ok(students);

        }
    [HttpGet("GetStudentsFromClazz/{clazz}")]
    public IActionResult GetStudentsFromClazz(string clazz)
        {
            var studentOfClazz = new List<StudentsOfClassDTO>() ;
            db.Students.ToList().ForEach(x => studentOfClazz.Add(new StudentsOfClassDTO
            {
                Age = x.Age,
                Gender = x.Gender,
                ClazzId = x.ClazzId,
                Country = x.Country,
                Clazzname = db.Clazzs.Where(y => y.Id == x.ClazzId).First().Name,
                Email = x.Email,
                Registered = x.Registered,
                StudentId = x.Id,
                StudentName = $"{x.Firstname} {x.Lastname}",
            }));
            return Ok(studentOfClazz.Where(x => x.Clazzname == clazz).ToList());
          
        }
      [HttpPut("AddStudentToOtherClazz")]
      public IActionResult AddStudentToOtherClazz([FromBody] StudentClazzDto studentClazzDto)
        {
            var student = db.Students.Where(x => x.Id == studentClazzDto.StudentId).FirstOrDefault();
            if(student != null)
            {
                student.ClazzId = studentClazzDto.ClazzId;
                db.SaveChanges();
                var clazz = db.Clazzs.Where(x => x.Id == studentClazzDto.ClazzId).FirstOrDefault().Name;
                return Ok($"Student with id: {studentClazzDto.StudentId} was added to class ${clazz}");
            }
            else
            {
                return BadRequest($"No Student with id {studentClazzDto.StudentId} was found");
            }
        }
        [HttpGet("GetClazzs")]
        public IActionResult GetClazzs()
        {
            var clazz = new List<ClassDto>();
            db.Clazzs.ToList().ForEach(x => clazz.Add(new ClassDto { ClazzId = x.Id, ClazzName = x.Name }));
            return Ok(clazz);
        }

  }
}
