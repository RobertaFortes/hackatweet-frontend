import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getTweets, getTrends, getTweetsByHashtag  } from '../../services/tweets';
import NewTweet from '../sections/NewTweet';
import Tweet from '../sections/tweet';
import Trend from '../sections/trend';
import UserCard from '../sections/user';
import styles from '../../styles/Home.module.css';

function Home() {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);

  const [tweets, setTweets] = useState([]);
  const [trends, setTrends] = useState([]);
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
  
  useEffect(() => {
    if (!token) return;
    getTrends(token)
      .then((data) => {console.log(data);
        if (data.result) setTrends(data.trends);
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

  const handleTrendClick = (tag) => {
    getTweetsByHashtag(token, tag)
      .then(data => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  };
    const loadTweets = () => {
    getTweets(token, "")
      .then(data => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebarLeft}>
        <UserCard />
      </aside>

      <main className={styles.feed}>
        <div className={styles.feedHeader}>
          <h1 className={styles.feedTitle}>Home</h1>
          <NewTweet onCreated={handleCreated} />
        </div>
        <div className={styles.tweetList}>
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
        </div>
      </main>

      <aside className={styles.sidebarRight}>
        <h2 className={styles.trendsTitle} onClick={loadTweets}>Trends</h2>
        <div className={styles.trendsList}>
          {loading ? (
            <p className={styles.muted}>Loading...</p>
          ) : (
            trends.map((trend) => (
              <Trend
                key={trend._id}
                trend={trend}
                token={token}
                onClick={handleTrendClick}
              />
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

export default Home;
