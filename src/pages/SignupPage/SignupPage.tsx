import { useState, type FormEvent } from 'react';
import { getSignupErrorMessage, signup } from '../../shared/api/signup';
import './signupPage.css';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSuccess(false);
    setIsLoading(true);

    try {
      await signup({ email, password });
      setIsSuccess(true);
    } catch (requestError) {
      setError(getSignupErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="signupPage">
      <div className="signupPage__header">
        <h1 className="signupPage__title">Sign up with fetch</h1>
        <p className="signupPage__hint">The request is sent directly from this functional component.</p>
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
        {error ? <p className="signupPage__message signupPage__message--error" role="alert">{error}</p> : null}
        {isSuccess ? <p className="signupPage__message signupPage__message--success">User registered successfully.</p> : null}
        <button className="signupPage__submit" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </section>
  );
};
