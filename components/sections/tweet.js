import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTweet, toggleLike } from '../../services/tweets';
import styles from '../../styles/Home.module.css';

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'a few seconds';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''}`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''}`;
}

function renderContent(content) {
  return content.split(/(#\w+)/g).map((part, i) =>
    part.startsWith('#') ? (
      <span key={i} className={styles.hashtag}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Tweet({ tweet, currentUsername, token, onDeleted }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(tweet.likes ? tweet.likes.length : 0);

  const username = tweet.author?.username ?? 'unknown';
  const isOwner = username === currentUsername;

  const handleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));
    toggleLike(token, tweet._id).then((data) => {
      if (data.result && typeof data.likesCount === 'number') {
        setCount(data.likesCount);
      }
    });
  };

  const handleDelete = () => {
    deleteTweet(token, tweet._id).then((data) => {
      if (data.result) onDeleted(tweet._id);
    });
  };

  return (
    <div className={styles.tweet}>
      <div className={styles.avatar} />
      <div className={styles.tweetBody}>
        <div className={styles.tweetHeader}>
          <span className={styles.author}>{username}</span>
          <span className={styles.handle}>@{username}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>{timeAgo(tweet.createdAt)}</span>
        </div>
        <p className={styles.tweetContent}>{renderContent(tweet.content)}</p>
        <div className={styles.tweetActions}>
          <button className={styles.actionBtn} onClick={handleLike}>
            <FontAwesomeIcon
              icon={faHeart}
              className={liked ? styles.liked : ''}
            />
            <span>{count}</span>
          </button>
          {isOwner && (
            <button className={styles.actionBtn} onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
