import { rest } from 'msw'

export const handlers = [
  rest.get('*/:username', (req, res, ctx) => {
    const { username } = req.params

    if (username === 'nonexistent-user') {
      return res(ctx.status(404))
    }

    if (username === 'rate-limit-user') {
      return res(ctx.status(403))
    }

    return res(
      ctx.status(200),
      ctx.json({
        login: username,
        name: `User ${username}`,
        avatar_url: `https://github.com/${username}.png`,
        public_repos: 10,
        html_url: `https://github.com/${username}`,
        bio: 'Mocked bio',
        location: 'Mocked location',
        followers: 100,
        following: 50,
      })
    )
  }),
]
