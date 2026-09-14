import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthFormConnected } from '../../features/forms/AuthForm';
import { fakeLogin } from '../../app/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import './loginPage.css';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pending, token } = useAppSelector((state) => state.auth);
  const from = (location.state as { from?: string } | null)?.from ?? '/profile';

  if (token) {
    return <Navigate to={from} replace />;
  }

  return (
    <section className="loginPage">
      <div className="loginPage__header">
        <h1 className="loginPage__title">Sign in</h1>
        <p className="loginPage__hint">
          Use admin@example.com for administrator access. Any other valid email signs in as a customer.
        </p>
      </div>
      <AuthFormConnected
        className="loginPage__form"
        disabled={pending}
        onSubmit={async ({ email }) => {
          await dispatch(fakeLogin(email)).unwrap();
          navigate(from, { replace: true });
        }}
      />
    </section>
  );
};

