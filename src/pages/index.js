import { observer } from 'mobx-react';
import { Container, Typography, Paper } from '@mui/material';
import TodoFilters from '@/components/TodoFilters';
import TodoForm from '@/components/TodoForm';
import TodoEditForm from '@/components/TodoEditForm';
import TodoList from '@/components/TodoList';
import todoStore from '@/stores/TodoStore';

const TodoApp = observer(() => {
  const filteredTodos = todoStore.todos.filter(todo => {
    if (todoStore.filter === 'completed') return todo.completed;
    if (todoStore.filter === 'pending') return !todo.completed;
    if (todoStore.filter === 'today') return todo.date === new Date().toISOString().split('T')[0];
    return true;
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        To-Do App
      </Typography>
      
      <TodoFilters 
        filter={todoStore.filter} 
        setFilter={todoStore.setFilter} 
      />
      
      <TodoForm 
        value={todoStore.inputValue}
        onChange={(e) => (todoStore.inputValue = e.target.value)}
        onSubmit={todoStore.addTodo}
      />
      
      <TodoEditForm
        isEditing={todoStore.editId !== null}
        value={todoStore.editInputValue}
        onChange={(e) => (todoStore.editInputValue = e.target.value)}
        onSave={todoStore.saveEdit}
        onCancel={todoStore.cancelEdit}
      />
      
      <Paper elevation={3}>
        <TodoList
          todos={filteredTodos}
          filter={todoStore.filter}
          onToggle={todoStore.toggleTodo}
          onEdit={todoStore.startEdit}
          onDelete={todoStore.deleteTodo}
          editId={todoStore.editId}
        />
      </Paper>
    </Container>
  );
});

export default TodoApp;