import React, { useEffect, useState } from 'react';

export default function CounterHook() {
  const [count, setCount] = useState(0);
  const [counterText, setCounterText] = useState('You clicked me 0 times');

  useEffect(() => {
    setCounterText(`You clicked me ${count} times`);
  }, [count]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/counter/initialvalue', {
          method: 'GET',
          // mode: 'no-cors' // This will prevent you from accessing the response
        });

        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status);
        }

        const data = await response.json();
        console.log(data.initialCounter);
        setCount(data.initialCounter)
        // Process your data here
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{counterText}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
