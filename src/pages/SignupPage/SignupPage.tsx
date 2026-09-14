import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../../app/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { AuthFormConnected } from '../../features/forms/AuthForm';
import './signupPage.css';

export const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pending, token, error } = useAppSelector((state) => state.auth);
  const from = (location.state as { from?: string } | null)?.from ?? '/products';
  if (token) return <Navigate to={from} replace />;

  return (
    <section className="signupPage">
      <div className="signupPage__header"><h1 className="signupPage__title">Account</h1></div>
      <AuthFormConnected
        className="signupPage__form"
        disabled={pending}
        onSubmit={async ({ email, password, confirmPassword }) => {
          const mode = confirmPassword ? 'signup' : 'signin';
          await dispatch(authenticate({ email, password, mode })).unwrap();
          navigate(from, { replace: true });
        }}
      />
      {error ? <p className="signupPage__message signupPage__message--error" role="alert">{error}</p> : null}
    </section>
  );
};
