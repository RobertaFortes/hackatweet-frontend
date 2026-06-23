import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeSignUp } from '../../reducers/modal';
import ModalWrapper from '../ModalWrapper';
import styles from '../../styles/SignUp.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SignUpModal() {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log(username, password);
    dispatch(closeSignUp());
  };

  return (
    <ModalWrapper onClose={() => dispatch(closeSignUp())}>
      <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(closeSignUp())} className={styles.closeModal} 
            />
      <FontAwesomeIcon className={styles.iconTwitter} icon={faTwitter} />
      <h2>Create your Hackatweet account</h2>
      
      <input
        className={styles.input}
        placeholder="Firstname"
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <button className={styles.button} onClick={handleRegister}>
        Sign Up
      </button>
    </ModalWrapper>
  );
}