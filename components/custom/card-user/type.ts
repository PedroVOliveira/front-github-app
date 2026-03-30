export type CardUserGithubProps = {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  html_url: string;
}

export type CardUserProps = {
  user: CardUserGithubProps;
}