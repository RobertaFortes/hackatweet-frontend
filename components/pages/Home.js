import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getTweets } from '../../services/tweets';
import NewTweet from '../sections/NewTweet';
import Tweet from '../sections/tweet';
import styles from '../../styles/Home.module.css';

function Home() {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);

  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (!token) return;
    getTweets(token)
      .then((data) => {
        if (data.result) setTweets(data.tweets);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return null;
  }

  const handleCreated = (tweet) => {
    const withAuthor = {
      ...tweet,
      author: tweet.author?.username ? tweet.author : { username },
    };
    setTweets((prev) => [withAuthor, ...prev]);
  };

  const handleDeleted = (id) => {
    setTweets((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebarLeft} />

      <main className={styles.feed}>
        <h1 className={styles.feedTitle}>Home</h1>
        <NewTweet onCreated={handleCreated} />
        {loading ? (
          <p className={styles.muted}>Loading...</p>
        ) : (
          tweets.map((tweet) => (
            <Tweet
              key={tweet._id}
              tweet={tweet}
              currentUsername={username}
              token={token}
              onDeleted={handleDeleted}
            />
          ))
        )}
      </main>

      <aside className={styles.sidebarRight}>
        <h2 className={styles.trendsTitle}>Trends</h2>
      </aside>
    </div>
  );
}

export default Home;
