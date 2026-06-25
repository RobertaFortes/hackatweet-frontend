import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../reducers/user';
import styles from '../../styles/Home.module.css';

export default function UserCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <FontAwesomeIcon icon={faUser} className={styles.avatarIcon} />
        </div>
        <div className={styles.userNames}>
          <span className={styles.author}>{username}</span>
          <span className={styles.handle}>@{username}</span>
        </div>
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Logout</span>
      </button>
    </div>
  );
}
