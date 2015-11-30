# Reddit Video Stream

- Full screen plays videos in order with no user need for interaction
- Skip button. Maybe "n"=next, "p"=previous, "space"=pause Players may take care of this
- hover top for HUD. HUD provides title/rank/play/pause/next/prev
- Cache https://pythonhosted.org/Flask-Cache/
- Use cookie for revisits within a certain time to continue where they left off
- Sort by top(diff timeframes)/hot/new/rising/controversial

## React setup

- You need node to install node with [homebrew](http://brew.sh/) `brew install node`

- You need v5.0.0 of node. I use [`n`](https://github.com/tj/n) for node versioning `npm i -g n`. Using `n` run `n 5.0.0`

- For editor linting and language syntax you need babel and eslint. I am using [Atom](https://atom.io/). To install needed packages run `apm install language-babel linter linter-eslint`.

- Makefile should cover pretty much everything else
