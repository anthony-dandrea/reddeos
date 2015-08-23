import praw

def get_videos():
    """
    Returns top 400 video titles & urls on /r/videos
    """
    r = praw.Reddit(user_agent='reddeos_reddit_video_viewer')
    submissions = r.get_subreddit('videos').get_hot(limit=400)
    posts = []
    for idx, submission in enumerate(submissions):
        posts.append({'id': idx,
            'title': submission.title,
            'url': submission.url})
    return posts

if __name__ == '__main__':
    print 'Printing posts dict\n top 400 posts'
    print get_videos()
