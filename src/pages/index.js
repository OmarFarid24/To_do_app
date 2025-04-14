import { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@/pages/useLocalStorage';
import TodoFilters from '@/components/TodoFilters';
import TodoForm from '@/components/TodoForm';
import TodoEditForm from '@/components/TodoEditForm';
import TodoList from '@/components/TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: uuidv4(),
      text: inputValue,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditInputValue(todoToEdit.text);
    setEditId(id);
  };

  const saveEdit = () => {
    if (editInputValue.trim() === '') return;
    
    setTodos(todos.map(todo => 
      todo.id === editId ? { ...todo, text: editInputValue } : todo
    ));
    setEditId(null);
    setEditInputValue('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditInputValue('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    if (filter === 'today') return todo.date === new Date().toISOString().split('T')[0];
    return true;
  });

  if (!isClient) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do App
        </Typography>
        <Typography align="center" sx={{ p: 4 }}>
          Cargando aplicación...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        To-Do App
      </Typography>
      
      <TodoFilters filter={filter} setFilter={setFilter} />
      
      <TodoForm 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSubmit={addTodo}
      />
      
      <TodoEditForm
        isEditing={editId !== null}
        value={editInputValue}
        onChange={(e) => setEditInputValue(e.target.value)}
        onSave={saveEdit}
        onCancel={cancelEdit}
      />
      
      <Paper elevation={3}>
        <TodoList
          todos={filteredTodos}
          filter={filter}
          onToggle={toggleTodo}
          onEdit={startEdit}
          onDelete={deleteTodo}
          editId={editId}
        />
      </Paper>
    </Container>
  );
};

export default TodoApp;