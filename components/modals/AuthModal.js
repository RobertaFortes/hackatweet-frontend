import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { closeAuth } from '../../reducers/modal';
import { login } from '../../reducers/user';
import ModalWrapper from '../ModalWrapper';
import styles from '../../styles/SignIn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button.js';
import { API_URL } from '../../config';

export default function AuthModal({ mode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isSignup = mode === 'signup';

  const handleSubmit = () => {
    const endpoint = isSignup ? 'signup' : 'signin';
    const body = isSignup
      ? { username, email, password }
      : { email, password };

    fetch(`${API_URL}/api/users/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: data.username,
              token: data.token,
              password,
            })
          );
          dispatch(closeAuth());
          router.push('/home');
        } else {
          setError(data.error || (isSignup ? 'Sign up failed' : 'Sign in failed'));
        }
      })
      .catch(() => setError('Network error'));
  };

  return (
    <ModalWrapper onClose={() => dispatch(closeAuth())}>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => dispatch(closeAuth())}
        className={styles.closeModal}
      />

      <FontAwesomeIcon className={styles.iconTwitter} icon={faTwitter} />
      <h2>{isSignup ? 'Create your Hackatweet account' : 'Connect to Hackatweet'}</h2>

      {isSignup && (
        <input
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className={styles.error}>{error}</p>}

      <Button
        onClick={handleSubmit}
        title={isSignup ? 'Sign up' : 'Sign in'}
        backgroundColor="#fff"
        backgroundColorHover="#fff"
        borderHover="2px solid #fff"
        textColor="#000"
        textColorHover="#000"
      />
    </ModalWrapper>
  );
}
