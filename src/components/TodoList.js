import { List, Paper, Typography, ListItem, ListItemText } from '@mui/material';
import TodoItem from '@/components/TodoItem';

const TodoList = ({ 
  todos, filter, onToggle, onEdit, onDelete, editId 
}) => {
  if (todos.length === 0) {
    return (
      <ListItem>
        <ListItemText primary={
          filter === 'completed' ? "There are no completed tasks" :
          filter === 'pending' ? "There are no pending tasks" :
          filter === 'today' ? "There are no tasks for today" :
          "There are no tasks, add one!"
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
};

export default TodoList;