import { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export function usePosts(refreshMs = 15000) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [updateNotice, setUpdateNotice] = useState(false);

  useEffect(() => {
    let ignore = false;
    let timerId;
    let noticeId;

    async function loadPosts(isRefresh = false) {
      try {
        setStatus((currentStatus) =>
          currentStatus === 'idle' ? 'loading' : 'refreshing',
        );
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`API request failed with ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setPosts(data.slice(0, 12));
          setLastUpdated(new Date());
          setError('');
          setStatus('success');

          if (isRefresh) {
            setUpdateNotice(true);
            clearTimeout(noticeId);
            noticeId = setTimeout(() => setUpdateNotice(false), 2500);
          }
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message);
          setStatus('error');
        }
      }
    }

    loadPosts();
    timerId = setInterval(() => loadPosts(true), refreshMs);

    return () => {
      ignore = true;
      clearInterval(timerId);
      clearTimeout(noticeId);
    };
  }, [refreshMs]);

  return {
    posts,
    loading: status === 'loading',
    refreshing: status === 'refreshing',
    error,
    lastUpdated,
    updateNotice,
  };
}
