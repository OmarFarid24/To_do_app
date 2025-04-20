import { observer } from 'mobx-react';
import { Box, Checkbox } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const TodoCheckbox = observer(({ checked, onChange }) => (
  <Checkbox
    edge="start"
    checked={checked}
    onChange={onChange}
    icon={
      <Box
        sx={{
          width: 24,
          height: 24,
          border: '2px solid #bdbdbd',
          borderRadius: '50%',
          boxSizing: 'border-box'
        }}
      />
    }
    checkedIcon={
      <CheckCircleIcon 
        color="success" 
        sx={{ 
          fontSize: 28,
          borderRadius: '50%'
        }} 
      />
    }
    sx={{
      padding: '8px',
      '&:hover': { backgroundColor: 'transparent' }
    }}
  />
));

export default TodoCheckbox;