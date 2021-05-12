import React, { Fragment, useState } from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm'
import { LoginForm } from './LoginForm';


const toggleChecked = ({ _id, isChecked}) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const App = () => {

  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);
  
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` Pending tasks (${pendingTasksCount})` : ''
  }`;

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 }
    }).fetch());

  return (
    <div className='app'>
      <div className="app-bar">
        <div className="app-header">
          <h1>Focus on being productive instead of busy</h1>
          <h2>{pendingTasksTitle}</h2>
        </div>
      </div>

      <div className="main">
        {user ? (
          <Fragment>

            <TaskForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show all' : 'Hide Completed'}
              </button>
            </div>
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
    
            {/* <label for="color">Choose a background color</label>
            <input id="color" type="color" name="color" value="#ffecd7"></input> */}
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
};
