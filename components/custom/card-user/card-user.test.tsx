import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardUser from './card-user';
import CardUserList from './card-user-list';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: any) => {
    return <img {...props} alt={props.alt || 'img'} />;
  },
}));

describe('CardUser Component', () => {
  const mockUser = {
    login: 'PedroVOliveira',
    name: 'Pedro Victor',
    avatar_url: 'https://github.com/PedroVOliveira.png',
    public_repos: 42,
    html_url: 'https://github.com/PedroVOliveira',
  };

  it('deve renderizar as informações do usuário corretamente', () => {
    render(<CardUser user={mockUser} />);

    expect(screen.getByText('Pedro Victor')).toBeInTheDocument();
    expect(screen.getByText('@PedroVOliveira')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();

    const image = screen.getByAltText('Pedro Victor');
    expect(image).toHaveAttribute('src', mockUser.avatar_url);
  });

  it('deve conter o link correto para detalhes', () => {
    render(<CardUser user={mockUser} />);

    const link = screen.getByRole('link', { name: /ver detalhes/i });
    expect(link).toHaveAttribute('href', '/user/PedroVOliveira');
  });
});

describe('CardUserList Component', () => {
  const mockUsers = [
    {
      login: 'pedrovoliveira',
      name: 'Pedro Victor',
      avatar_url: 'https://github.com/pedrovoliveira.png',
      public_repos: 42,
      html_url: 'https://github.com/pedrovoliveira',
    },
    {
      login: 'akitaonrails',
      name: 'Akita',
      avatar_url: 'https://github.com/akitaonrails.png',
      public_repos: 100,
      html_url: 'https://github.com/akitaonrails',
    },
  ];

  it('deve renderizar uma lista de usuários', () => {
    render(<CardUserList users={mockUsers} />);

    expect(screen.getByText('Pedro Victor')).toBeInTheDocument();
    expect(screen.getByText('@pedrovoliveira')).toBeInTheDocument();
    expect(screen.getByText('Akita')).toBeInTheDocument();
    expect(screen.getByText('@akitaonrails')).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });
});
