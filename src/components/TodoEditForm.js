import { Box, IconButton, Paper, Typography, TextField, Collapse } from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';

const TodoEditForm = ({ isEditing, value, onChange, onSave, onCancel 
}) => (
  <Collapse in={isEditing}>
    <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: 'action.selected' }}>
      <Typography variant="subtitle1" gutterBottom>
        Editando tarea:
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Editar tarea..."
          value={value}
          onChange={onChange}
          onKeyPress={(e) => e.key === 'Enter' && onSave()}
        />
        <IconButton 
          color="primary" 
          onClick={onSave}
          sx={{ ml: 1 }}
        >
          <SaveIcon />
        </IconButton>
        <IconButton 
          color="error" 
          onClick={onCancel}
          sx={{ ml: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Paper>
  </Collapse>
);

export default TodoEditForm;