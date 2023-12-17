const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};
const Content = ({ parts }) => {
  return (
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </ul>
  );
};
const Part = ({ name, exercises }) => {
  return (
    <li>{name} {exercises}</li>
  );
};
const Total = ({ parts }) => {
  return (
    <p style={{ fontWeight: 900 }}>
      total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </p>
  );
};

export default Course