import { observer } from 'mobx-react';
import { ListItem, ListItemIcon, ListItemText, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import TodoCheckbox from '@/components/TodoCheckbox';

const TodoItem = observer(({ 
  todo, 
  onToggle, 
  onEdit, 
  onDelete, 
  isEditing,
  filter 
}) => {
  
  const handleEdit = () => {
    if (typeof onEdit === 'function') {
      onEdit(todo.id);
    } else {
      console.error('Error: onEdit no es una función válida');
    }
  };

  return (
    <ListItem divider>
      <ListItemIcon>
        <TodoCheckbox 
          checked={todo.completed} 
          onChange={() => onToggle(todo.id)} 
        />
      </ListItemIcon>
      <ListItemText
        primary={todo.text}
        secondary={filter === 'all' ? `Creada: ${todo.date}` : null}
        sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
      <Box>
        <IconButton 
          onClick={handleEdit}
          disabled={isEditing}
        >
          <EditIcon color={isEditing ? "secondary" : "primary"} />
        </IconButton>
        <IconButton 
          onClick={() => onDelete(todo.id)}
          disabled={isEditing}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </ListItem>
  );
});

export default TodoItem;