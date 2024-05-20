import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialBlogs = [
  { id: 1, title: 'Blog 1', content: 'Contenido del Blog 1' },
  { id: 2, title: 'Blog 2', content: 'Contenido del Blog 2' },
  { id: 3, title: 'Blog 3', content: 'Contenido del Blog 3' },
  { id: 4, title: 'Blog 4', content: 'Contenido del Blog 4' },
  { id: 5, title: 'Blog 5', content: 'Contenido del Blog 5' },
];

const BlogList = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setEditedTitle(blog.title);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedBlog(null);
    setOpenDialog(false);
  };

  const handleSave = () => {
    const updatedBlogs = blogs.map(blog =>
      blog.id === selectedBlog.id ? { ...blog, title: editedTitle } : blog
    );
    setBlogs(updatedBlogs);
    setSelectedBlog(null);
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleAddBlog = () => {
    const newId = blogs.length + 1;
    const newBlog = { id: newId, title: newBlogTitle, content: '' };
    setBlogs([...blogs, newBlog]);
    setNewBlogTitle('');
  };

  return (
    <>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a la lista de Blogs
        </Typography>
        <IconButton
          onClick={() => setOpenDialog(true)}
          // sx={{ position: "fixed", bottom: 20, right: 20 }}
          aria-label="Agregar"
        >
          <AddIcon />Agregar
        </IconButton>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.id}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(blog)}
                      aria-label="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(blog.id)}
                      aria-label="Eliminar"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedBlog && selectedBlog.title}</DialogTitle>
          <DialogContent>
            {selectedBlog ? (
              <TextField
                margin="normal"
                fullWidth
                label="Título"
                name="titulo"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                multiline
                rows={4}
              />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                label="Título"
                name="titulo"
                value={newBlogTitle}
                onChange={(e) => setNewBlogTitle(e.target.value)}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cerrar</Button>
            {selectedBlog ? (
              <Button onClick={handleSave}>Guardar</Button>
            ) : (
              <Button onClick={handleAddBlog}>Agregar</Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default BlogList;
