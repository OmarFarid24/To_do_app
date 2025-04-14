import React, { useState, useEffect } from 'react';
import {
  Box, Button, Checkbox, Container, TextField, List, ListItem, ListItemIcon,
  ListItemText, IconButton, Paper, Typography, ButtonGroup, Collapse
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Save as SaveIcon
} from '@mui/icons-material';

const TodoApp = () => {
  // Estado para controlar si estamos en el cliente (para SSR)
  const [isClient, setIsClient] = useState(false);
  
  // Estado para las tareas (inicializado vacío, se carga desde localStorage después del montaje)
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');

  // Efecto para marcar cuando el componente se monta en el cliente
  useEffect(() => {
    setIsClient(true);
    // Cargar tareas desde localStorage solo en el cliente
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Efecto para guardar tareas en localStorage cuando cambian
  useEffect(() => {
    if (isClient) { // Solo guardar en el cliente
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isClient]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    // cambiar id por libreria UUID
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
    cancelEdit();
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

  // Evitar renderizado en el servidor para prevenir errores de hidratación
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
      
      {/* mover todo el componente paper a otro archivo */}
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
      
      {/* Container 2: es para añadir nuevas tareas */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Añade una nueva tarea..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={addTodo}
            sx={{ ml: 2 }}
          >
            Agregar
          </Button>
        </Box>
      </Paper>
      
      {/* Container 3: Es para la barra de editar tareas */}
      <Collapse in={editId !== null}>
        <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: 'action.selected' }}>
          <Typography variant="subtitle1" gutterBottom>
            Editando tarea:
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Editar tarea..."
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
            />
            <IconButton 
              color="primary" 
              onClick={saveEdit}
              sx={{ ml: 1 }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton 
              color="error" 
              onClick={cancelEdit}
              sx={{ ml: 1 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      </Collapse>
      
      {/* Container 4: esta es la lista de tareas */}
      <Paper elevation={3}>
        <List>
          {filteredTodos.length === 0 ? (
            <ListItem>
              <ListItemText primary={
                filter === 'completed' ? "No hay tareas completadas" :
                filter === 'pending' ? "No hay tareas pendientes" :
                filter === 'today' ? "No hay tareas para hoy" :
                "No hay tareas, añade una!"
              } />
            </ListItem>
          ) : (
            filteredTodos.map(todo => (
              <ListItem key={todo.id} divider>
                {/* separar en un cmpomente nuevo desde la linea 178 despues del :*/}
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
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
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={todo.text}
                  secondary={filter === 'all' ? `Creada: ${todo.date}` : null}
                  sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                />
                <Box>
                  <IconButton 
                    onClick={() => startEdit(todo.id)}
                    disabled={editId !== null && editId !== todo.id}
                  >
                    <EditIcon color={editId === todo.id ? "secondary" : "primary"} />
                  </IconButton>
                  <IconButton 
                    onClick={() => deleteTodo(todo.id)}
                    disabled={editId !== null}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default TodoApp;