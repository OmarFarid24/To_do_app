import { ListItem, ListItemIcon, ListItemText, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import TodoCheckbox from '@/components/TodoCheckbox';

const TodoItem = ({ todo, onToggle, onEdit, onDelete, isEditing, filter 
}) => (
  <ListItem>
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
        onClick={() => onEdit(todo.id)}
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

export default TodoItem;