import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const H1 = ({ text }) => {
  return <h1>{text}</h1>;
};
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  return all !== 0 ? (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={(good - bad) / all || 0} />
      <StatisticLine text='positive' value={((100 * good) / all || 0) + ' %'} />
    </table>
  )
  : <p>No feedback given</p>
};
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveGood = () => setGood(good + 1);
  const giveNeutral = () => setNeutral(neutral + 1);
  const giveBad = () => setBad(bad + 1);

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
