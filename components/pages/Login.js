import styles from '../../styles/Login.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from '../ui/Button.js'
import ButtonTrans from '../ui/ButtonTrans.js'
import { useSelector, useDispatch } from 'react-redux';
import SignInModal from '../modals/SignInModal';
import SignUpModal from '../modals/SignUpModal';
import { openSignIn, openSignUp } from '../../reducers/modal';

function Login() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  
  return (
     <div className={styles.container}>
      {/* Partie gauche */}
      <div className={styles.leftSide}>
        <img
          src="/BG_twitter.png"
          alt="Background"
          // width="100%"
          // height="100%"
          className={styles.backgroundImage}
        />
      </div>

      {/* Partie droite */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <FontAwesomeIcon className={styles.iconTwitter} icon={faTwitter} />
          <h1>See what's happening</h1>
          <h2>Join Hackatweet today.</h2>
          <Button onClick={() => dispatch(openSignUp())} title="Sign up" />
          <p>Already have an account?</p>
           <ButtonTrans  onClick={() => dispatch(openSignIn())} title='Sign in' backgroundColorHover='#212020' border = '1px solid #fff'/>
            {modal.signInOpen && <SignInModal />}
            {modal.signUpOpen && <SignUpModal />}
        </div>
      </div>
    </div>

        
  );
}

export default Login;