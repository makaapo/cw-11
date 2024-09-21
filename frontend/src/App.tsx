import {Route, Routes} from 'react-router-dom';
import {Container, Typography} from '@mui/material';
import Home from './features/Home/Home';
import Register from './features/User/Register';
import Login from './features/User/Login';
import AppToolbar from './UI/AppToolbar.tsx';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
