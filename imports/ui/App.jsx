import React from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm'

const toggleChecked = ({ _id, isChecked}) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const App = () => {

  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div className='app'>
      <div className="app-bar">
        <div className="app-header">
          <h1>Focus on being productive instead of busy</h1>
        </div>
      </div>

      <div className="main">

        <TaskForm />
        
        <ul className='tasks'>
          { tasks.map(task => (
            <Task
            key={task._id}
            task={task}
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />
          ))}
        </ul>
      </div>
    </div>
  )
};
