import { observer } from 'mobx-react';
import { List, ListItem, ListItemText } from '@mui/material';
import TodoItem from '@/components/TodoItem';

const TodoList = observer(({ 
  todos, 
  filter, 
  onToggle, 
  onEdit, 
  onDelete, 
  editId 
}) => {
  if (todos.length === 0) {
    return (
      <ListItem>
        <ListItemText primary={
          filter === 'completed' ? "No hay tareas completadas" :
          filter === 'pending' ? "No hay tareas pendientes" :
          filter === 'today' ? "No hay tareas para hoy" :
          "No hay tareas, añade una!"
        } />
      </ListItem>
    );
  }

  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          filter={filter}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditing={editId !== null && editId !== todo.id}
        />
      ))}
    </List>
  );
});

export default TodoList;