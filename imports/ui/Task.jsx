import React from 'react';
import { TasksCollection } from '../api/TasksCollection';

export const Task = ({ task, onCheckboxClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      {task.text}
    </li>
  )
};