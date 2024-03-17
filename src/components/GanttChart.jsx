import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function RoundRobinSimulator() {
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [burstTime, setBurstTime] = useState(1);
  const [timeline, setTimeline] = useState([]);
  
  const roundRobin = (tasks, timeQuantum) => {
    let timeline = [];
    let remainingTime = {};
    tasks.forEach(task => {
      remainingTime[task.name] = task.burstTime;
    });
    let queue = [...tasks];
    let currentTime = 0;
    
    while (queue.length > 0) {
      let currentTask = queue.shift();
      let taskName = currentTask.name;
      let burstTime = currentTask.burstTime;
      
      if (remainingTime[taskName] <= timeQuantum) {
        currentTime += remainingTime[taskName];
        timeline.push({ taskName, currentTime });
        remainingTime[taskName] = 0;
      } else {
        currentTime += timeQuantum;
        timeline.push({ taskName, currentTime });
        remainingTime[taskName] -= timeQuantum;
        queue.push({ name: taskName, burstTime: remainingTime[taskName] });
      }
    }
    
    return timeline;
  }
  
  const handleAddTask = () => {
    if (taskName !== '' && burstTime > 0) {
      setTasks([...tasks, { name: taskName, burstTime: burstTime }]);
      setTaskName('');
      setBurstTime(1);
    }
  }
  
  const handleClearTasks = () => {
    setTasks([]);
  }
  
  const handleSimulate = () => {
    if (tasks.length === 0) {
      alert('Please add tasks.');
    } else {
      const timelineData = roundRobin(tasks, timeQuantum);
      setTimeline(timelineData);
    }
  }
  
  return (
    <div>
      <h1>Round Robin Simulator</h1>
      <div>
        <div>
          <h2>Settings</h2>
          <label>Time Quantum:</label>
          <input 
            type="number" 
            value={timeQuantum} 
            min="1" 
            max="10" 
            onChange={(e) => setTimeQuantum(parseInt(e.target.value))} 
          />
        </div>
        <div>
          <h2>Tasks</h2>
          <label>Task Name:</label>
          <input 
            type="text" 
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
          />
          <label>Burst Time:</label>
          <input 
            type="number" 
            value={burstTime} 
            min="1" 
            step="1" 
            onChange={(e) => setBurstTime(parseInt(e.target.value))} 
          />
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={handleClearTasks}>Clear Tasks</button>
        </div>
        <button onClick={handleSimulate}>Simulate</button>
      </div>
      <div>
        {timeline.length > 0 && 
          <Plot
            data={[
              {
                x: timeline.map(item => item.currentTime),
                y: timeline.map(item => item.taskName),
                type: 'scatter',
                mode: 'markers',
                marker: {color: 'blue'},
              }
            ]}
            layout={{title: 'Round Robin Gantt Chart'}}
          />
        }
      </div>
    </div>
  );
}

export default RoundRobinSimulator;