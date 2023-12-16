import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const H1 = ({ text }) => {
  return <h1>{text}</h1>;
};
const P = ({ text, num }) => {
  return <p>{text} {num}</p>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveGood = () => setGood(good + 1);
  const giveNeutral = () => setNeutral(neutral + 1);
  const giveBad = () => setBad(bad + 1);

  const Statistics = (props) => {
    const { good, neutral, bad } = props;
    const all = good + neutral + bad;
    return all !== 0 ? (
      <>
        <P text='good' num={good} />
        <P text='neutral' num={neutral} />
        <P text='bad' num={bad} />
        <P text='all' num={all} />
        <P text='average' num={(good - bad) / all || 0} />
        <P text='positive' num={((100 * good) / all || 0) + ' %'} />
      </>
    )
    : <p>No feedback given</p>
  };

  return (
    <>
      <H1 text='give feedback' />
      <Button handleClick={giveGood} text='good' />
      <Button handleClick={giveNeutral} text='neutral' />
      <Button handleClick={giveBad} text='bad' />
      <H1 text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
