'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';

export function PostLikeButton({ slug, title }: { slug: string; title: string }) {
  const likeKey = `like:log:${slug}`;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(likeKey) === '1');
  }, [likeKey]);

  function handleLike() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(likeKey, next ? '1' : '0');
    if (next) {
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'feedback',
          message: `Post liked: ${title}`,
          page: `log/${slug}`,
        }),
      }).catch(() => {});
    }
  }

  return (
    <button
      onClick={handleLike}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      className={`group flex cursor-pointer items-center gap-1.5 border px-3 py-1.5 font-mono text-xs transition-colors ${
        liked
          ? 'border-amber bg-amber/10 text-amber'
          : 'border-border text-muted-foreground hover:border-amber/50 hover:text-amber'
      }`}
    >
      <ThumbsUp className="h-3.5 w-3.5" />
      {liked ? 'liked' : 'like this'}
    </button>
  );
}
