import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import ReadingMan from '@assets/img/reading-man.svg';
import { HideIcon } from '@common/icons/hide-icon';
import { MailIcon } from '@common/icons/mail-icon';
import { ViewIcon } from '@common/icons/view-icon';
import { StyledButton } from '@common/styled-button';
import { registerUser } from '@redux/user/thunk';
import { useAppDispatch,useAppSelector } from '@redux/hooks';
import type { RegisterFormType } from '@utils/types';
import {
  registerValidateRepeatPassword,
  validateEmail,
  validatePassword
} from '@utils/validators';

import { Box, type BoxProps, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FormStyledInput } from './elements/form-styled-input';


export const Register = () => {
  const auth = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormType>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: ''
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    if (data.email.trim() && data.password.trim()) {
      dispatch(registerUser({ email: data.email, password: data.password }))
        .unwrap()
        .then(() => {
          setValue('email', '');
          setValue('password', '');
          setValue('repeatPassword', '');
        });
    }


    // clearErrors();

    // if ( !user.email.trim() || !checkValidEmail(user.email)) {
    //   setEmailError('Incorrect email');

    // return;


    // dispatch(registerUser({ email: user.email, password: user.password }))
    //   .unwrap()
    //   .then(() => {
    //     setUser({ email: '', password: '', repeatPassword: '' });
    //     // clearErrors();
    // });
    // .catch((e) => {
    // if (e.response.data.message === 'This email has already taken') {
    // setEmailError(e.response.data.message);
    // }
    //
    //       if(e.response.data.message === 'Incorrect email address') {
    //         setEmailError(e.response.data.message);
    //       }
    //     });
    // };
  };

  return (
    <StyledMain>
      <Container maxWidth="md">
        <StyledRegisterBox>
          <StyledFormBox
            component="form"
            noValidate="novalidate"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h1">Sign Up</Typography>

            <StyledFormInputBox>
              <FormStyledInput
                name="email"
                control={control}
                rules={{ validate: validateEmail }}
                icon={<MailIcon />}
                type="email"
                label="Your email"
                helperText="Enter your email"
                errorText={errors.email?.message}
              />

              <FormStyledInput
                name="password"
                control={control}
                rules={{ validate: validatePassword }}
                icon={showPassword
                  ? <ViewIcon onClick={handleTogglePassword} />
                  : <HideIcon onClick={handleTogglePassword} />
                }
                type={showPassword ? 'text' : 'password'}
                label="Password"
                helperText="Enter your password"
                errorText={errors.password?.message}

              />

              <FormStyledInput
                name="repeatPassword"
                control={control}
                rules={{ validate: registerValidateRepeatPassword }}
                icon={showRepeatPassword
                  ? <ViewIcon onClick={handleToggleRepeatPassword} />
                  : <HideIcon onClick={handleToggleRepeatPassword} />
                }
                type={showRepeatPassword ? 'text' : 'password'}
                label="Password replay"
                helperText='Repeat your password without errors'
                errorText={errors.repeatPassword?.message}
              />
            </StyledFormInputBox>

            <StyledButton type="submit" disabled={auth.isLoading}>
              Sign Up
            </StyledButton>
          </StyledFormBox>

          <img src={ReadingMan} alt="Reading man" />
        </StyledRegisterBox>
      </Container>
    </StyledMain>
  );
};

const StyledMain = styled('main')`
  padding: 90px 0;
`;

const StyledRegisterBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFormBox = styled(Box) <BoxProps & { noValidate?: string }>`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 60px;
  max-width: 413px;
  width: 100%;
`;

const StyledFormInputBox = styled(StyledFormBox)`
  gap: 30px;
`;
