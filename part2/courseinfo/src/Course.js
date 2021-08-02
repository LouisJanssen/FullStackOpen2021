import React from "react";

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
  };
  
  const Total = ({ parts }) => {
      const sum = parts.map((part) => part.exercises).reduce((total,value) => total+value)
      return <strong>Number of exercises {sum}</strong>;
  };
  
  const Part = ({ part }) => {
    return (
      <div>
          {part.map((part) => (
              <p key={part.id}>
                  {part.name} {part.exercises}
              </p>
          ))}
      </div>
    );
  };
  
  const Content = ({ course }) => {
    return (
      <div>
        <Part part={course.parts} />
      </div>
    );
  };
  
  const Course = ({ courses }) => {
    return (
      <div>
          {courses.map(course => (
              <div key={course.id}>
                  <Header course={course} />
                  <Content course={course} />
                  <Total parts={course.parts} />
              </div>
          ))}
      </div>
    );
  };

  export default Course;