import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeSignIn } from '../../reducers/modal';
import ModalWrapper from '../ModalWrapper';
import styles from '../../styles/SignIn.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from '../ui/Button.js'

export default function SignInModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.result) {
      console.log('Utilisateur connecté');
      console.log(data.token);
      dispatch(closeSignIn());
    }
  };

  return (
    <ModalWrapper onClose={() => dispatch(closeSignIn())}>
      <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(closeSignIn())} className={styles.closeModal} 
            />

      <FontAwesomeIcon className={styles.iconTwitter} icon={faTwitter} />
      <h2>Connect to Hackatweet</h2>

      <input
        className={styles.input}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} title="Sign in" backgroundColor ='#fff' backgroundColorHover ='#fff' borderHover ='2px solid #fff' textColor='#000' textColorHover='#000'/>
 
    </ModalWrapper>
  );
}