import { Button, ButtonGroup, Paper } from '@mui/material';

const TodoFilters = ({ filter, setFilter }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
    <ButtonGroup fullWidth>
      <Button 
        variant={filter === 'today' ? 'contained' : 'outlined'}
        disabled
        title="Próximamente"
      >
        Today
      </Button>
      <Button 
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        onClick={() => setFilter('completed')}
        color="success"
      >
        Completed
      </Button>
      <Button 
        variant={filter === 'pending' ? 'contained' : 'outlined'}
        onClick={() => setFilter('pending')}
        color="warning"
      >
        Pending
      </Button>
      <Button 
        variant={filter === 'all' ? 'contained' : 'outlined'}
        onClick={() => setFilter('all')}
      >
        All
      </Button>
    </ButtonGroup>
  </Paper>
);

export default TodoFilters;