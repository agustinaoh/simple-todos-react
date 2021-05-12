import React, { Fragment, useState } from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { TasksCollection } from '../db/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm'
import { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';



const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const App = () => {

  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const pendingTasksTitle = `${
    pendingTasksCount ? ` Pending tasks (${pendingTasksCount})` : ''
  }`;

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 }
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount }
  });

  const logout = () => Meteor.logout();

  return (
    <div className='app'>
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Focus on being productive instead of busy</h1>
            <h2>{pendingTasksTitle}</h2>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>

            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>

            <TaskForm user={user} />

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
