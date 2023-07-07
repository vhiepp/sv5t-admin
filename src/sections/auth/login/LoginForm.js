import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useStateContext } from '../../../contexts/ContextProvider';
import api from '../../../api';

// ----------------------------------------------------------------------

export default function LoginForm() {
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleUrl, setGoogleUrl] = useState(null)

  useEffect(() => {
    api.post(
      'admin/auth/google/url'
    )
      .then(({ data }) => {
        setGoogleUrl(data.url)
      })
  }, [])

  const handleLogin = () => {

    if (email && password) {
      api.post(
        'admin/auth/login',
        {
          email,
          password
        }
      )
        .then((response) => {
          try {

            localStorage.setItem('access_token', response.data.access_token)
            setToken(response.data.access_token)
            setUser(response.data.user)

          } catch (error) {
            console.log(error);
          }
        })
    }

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
    </>
  );
}
