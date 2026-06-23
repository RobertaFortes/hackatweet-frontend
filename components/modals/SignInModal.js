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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(username, password);
    dispatch(closeSignIn());
  };

  return (
    <ModalWrapper onClose={() => dispatch(closeSignIn())}>
      <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(closeSignIn())} className={styles.closeModal} 
            />

      <FontAwesomeIcon className={styles.iconTwitter} icon={faTwitter} />
      <h2>Connect to Hackatweet</h2>

      <input
        className={styles.input}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} title="Sign in" backgroundColor ='#fff' backgroundColorHover ='#fff' borderHover ='2px solid #fff' textColor='#000' textColorHover='#000'/>
      {/* <button className={styles.button} onClick={handleLogin}>
        Sign In
      </button> */}
    </ModalWrapper>
  );
}