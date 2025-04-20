import { observer } from 'mobx-react';
import { Box, Button, TextField, Paper } from '@mui/material';

const TodoForm = observer(({ value, onChange, onSubmit }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
    <Box sx={{ display: 'flex' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Añade una nueva tarea..."
        value={value}
        onChange={onChange}
        onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onSubmit}
        sx={{ ml: 2 }}
      >
        Agregar
      </Button>
    </Box>
  </Paper>
));

export default TodoForm;