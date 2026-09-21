import { useState, type FormEvent } from 'react';
import { getSignupErrorMessage } from '../../shared/api/signup';
import { useSignupMutation } from '../../shared/api/signupApi';
import '../SignupPage/signupPage.css';

export const SignupRtkQueryPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { isLoading, isSuccess, error, reset }] = useSignupMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    await signup({ email, password });
  };

  return (
    <section className="signupPage">
      <div className="signupPage__header">
        <h1 className="signupPage__title">Sign up with RTK Query</h1>
        <p className="signupPage__hint">RTK Query mutation manages the request state.</p>
      </div>
      <form className="signupPage__form" onSubmit={handleSubmit} noValidate>
        <label className="signupPage__field">
          <span>Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} inputMode="email" autoComplete="email" />
        </label>
        <label className="signupPage__field">
          <span>Password</span>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="new-password" />
        </label>
        {error ? <p className="signupPage__message signupPage__message--error" role="alert">{getSignupErrorMessage(error)}</p> : null}
        {isSuccess ? <p className="signupPage__message signupPage__message--success">User registered successfully.</p> : null}
        <button className="signupPage__submit" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </section>
  );
};
