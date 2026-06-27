import styles from '../../styles/Login.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from '../ui/Button.js'
import { useSelector, useDispatch } from 'react-redux';
import AuthModal from '../modal/AuthModal';
import { openAuth } from '../../reducers/modal';

function Login() {
  const dispatch = useDispatch();
  const authMode = useSelector((state) => state.modal.authMode);
  
  return (
     <div className={styles.container}>
      {/* Partie gauche */}
      <div className={styles.leftSide}>
        <img
          src="/BG_twitter.png"
          alt="Background"
          className={styles.backgroundImage}
        />
      </div>

      {/* Partie droite */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <FontAwesomeIcon className={styles.iconTwitter} icon={faTwitter} />
          <h1>See what's happening</h1>
          <h2>Join Hackatweet today.</h2>
          <Button onClick={() => dispatch(openAuth('signup'))} title="Sign up" />
          <p>Already have an account?</p>
          <Button variant="transparent" onClick={() => dispatch(openAuth('signin'))} title="Sign in" />
            {authMode && <AuthModal mode={authMode} />}
        </div>
      </div>
    </div>

        
  );
}

export default Login;