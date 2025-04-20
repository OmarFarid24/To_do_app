import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';

class TodoStore {
  todos = [];
  filter = 'all';
  inputValue = '';
  editInputValue = '';
  editId = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  addTodo = () => {
    if (this.inputValue.trim() === '') return;
    
    this.todos.push({
      id: uuidv4(),
      text: this.inputValue,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    });
    this.inputValue = '';
    this.saveToLocalStorage();
  };

  deleteTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToLocalStorage();
  };

  toggleTodo = (id) => {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    }
  };

  startEdit = (id) => {
    const todoToEdit = this.todos.find(todo => todo.id === id);
    if (todoToEdit) {
      this.editInputValue = todoToEdit.text;
      this.editId = id;
    }
  };

  saveEdit = () => {
    if (this.editInputValue.trim() === '') return;
    
    const todoToEdit = this.todos.find(todo => todo.id === this.editId);
    if (todoToEdit) {
      todoToEdit.text = this.editInputValue;
      this.editInputValue = '';
      this.editId = null;
      this.saveToLocalStorage();
    }
  };

  cancelEdit = () => {
    this.editInputValue = '';
    this.editId = null;
  };

  setFilter = (filter) => {
    this.filter = filter;
  };

  loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    }
  };

  saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  };
}

const todoStore = new TodoStore();
export default todoStore;