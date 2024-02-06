import * as React from 'react';
import Stack from '@mui/material/Stack';
import {IconButton, OutlinedInput, InputLabel,
    InputAdornment, FormControl, Button} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import loguearUsuario from "../../services/LoginService";
import registrarUsuario from "../../services/SignUpService";
import {  useNavigate } from 'react-router-dom';

interface State {
  user: string;
  password: string;
  showPassword: boolean;
}

const HandleSignUp = async (user: string, password: string, navigate:any) => {
	try{
		const data = await registrarUsuario(user, password);
		if(data.jwt) {
			window.localStorage.setItem(
				'tokenUser', data.jwt
			)
			navigate("/products")
		} else {
			alert(data.error)
		}
		
	} catch (error) {
		alert(error);
	}
    window.location.reload();
}

const handleLogin = async (user: string, password: string, navigate:any) => {
	try{
		const data = await loguearUsuario(user, password);
		if(data.jwt) {
			window.localStorage.setItem(
				'tokenUser', data.jwt
			)
      navigate("/products")
		} else {
			alert(data.error)
		}		
	} catch (error) {
		alert(error);
	}
    window.location.reload();

}

function LoginForm (){
	let navigate = useNavigate();
	const [values, setValues] = React.useState<State>({
		user: '',
		password: '',
		showPassword: false,
	});

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
		};

	const handleClickShowPassword = () => {
		setValues({
		...values,
		showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

  return (
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        marginY={10}
    >
        <div>
            <h1>Market</h1>
            <h2>Access to place</h2>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-user">
					Username
                </InputLabel>
                <OutlinedInput
                    id="outlined-User"
                    value={values.user}
                    onChange={handleChange('user')}
                    label="Username"
                />
            </FormControl>
        </div>
        <div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-password">
                    Password
                </InputLabel>
                <OutlinedInput
                    id="outlined-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </div>
        <div>
			<Button
				variant="contained"
				disabled={!values.user || !values.password}
				onClick={() => handleLogin(values.user, values.password, navigate)}
            >
				LOG IN
			</Button>
        </div>
        <div>
            <Button
				variant="contained"
				color="success"
				disabled={!values.user || !values.password}
				onClick={()=> HandleSignUp(values.user, values.password, navigate)} >
				SIGN UP
			</Button>
      </div>
    </Stack>
  );
}

export default LoginForm;