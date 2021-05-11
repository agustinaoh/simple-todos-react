import React from 'react';
import { Task } from './Task';

const tasks = [
  {_id: 1, text: 'Pet Cava'},
  {_id: 2, text: 'Get some tacos'},
  {_id: 3, text: 'Ride to the beach'}
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>

    <ul>
      { tasks.map(task => <Task key={ task._id } task={ task }/>) }
    </ul>

  </div>
);
