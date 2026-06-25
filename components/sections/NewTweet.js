import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTweet } from '../../services/tweets';
import Button from '../ui/Button';
import styles from '../../styles/Home.module.css';

const MAX_LENGTH = 280;

export default function NewTweet({ onCreated }) {
  const token = useSelector((state) => state.user.token);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const trimmed = content.trim();
  const canSubmit = trimmed.length > 0 && !submitting;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    createTweet(token, trimmed)
      .then((data) => {
        if (data.result) {
          setContent('');
          onCreated(data.tweet);
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={styles.composer}>
      <textarea
        className={styles.composerInput}
        placeholder="What's up?"
        maxLength={MAX_LENGTH}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.composerActions}>
        <span className={styles.counter}>
          {content.length}/{MAX_LENGTH}
        </span>
        <Button title="Tweet" onClick={handleSubmit} />
      </div>
    </div>
  );
}
