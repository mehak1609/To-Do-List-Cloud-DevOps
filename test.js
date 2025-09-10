// test.js
const { addTask, deleteTask, resetTasks, tasks } = require('./tasks');

beforeEach(() => {
  resetTasks();
});

test('should add a task', () => {
  addTask('Buy milk');
  expect(tasks()).toEqual(
    expect.arrayContaining([{ text: 'Buy milk', completed: false }])
  );
});

test('should delete a task', () => {
  addTask('Buy milk');
  deleteTask('Buy milk');
  expect(tasks()).toEqual([]);
});
