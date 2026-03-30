import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardUser from './card-user';
import CardUserList from './card-user-list';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || 'img'} />;
  },
}));

describe('CardUser Component', () => {
  const mockProps = {
    name: 'Pedro Victor',
    username: '@PedroVOliveira',
    avatar: 'https://github.com/PedroVOliveira.png',
  };

  it('deve renderizar as informações do usuário corretamente', () => {
    render(<CardUser {...mockProps} />);

    expect(screen.getByText('Pedro Victor')).toBeInTheDocument();
    expect(screen.getByText('@PedroVOliveira')).toBeInTheDocument();

    const image = screen.getByAltText('Github');
    expect(image).toHaveAttribute('src', mockProps.avatar);
  });

  it('deve conter o link correto para detalhes', () => {
    render(<CardUser {...mockProps} />);

    const link = screen.getByRole('link', { name: /ver detalhes/i });
    expect(link).toHaveAttribute('href', '/user/PedroVOliveira');
  });
});

describe('CardUserList Component', () => {
  const mockUsers = [
    {
      name: 'Pedro Victor',
      username: '@pedrovoliveira',
      avatar: 'https://github.com/pedrovoliveira.png',
    },
    {
      name: 'Akita',
      username: '@akitaonrails',
      avatar: 'https://github.com/akitaonrails.png',
    },
  ];

  it('deve renderizar uma lista de usuários', () => {
    render(<CardUserList users={mockUsers} />);

    expect(screen.getByText('Pedro Victor')).toBeInTheDocument();
    expect(screen.getByText('@pedrovoliveira')).toBeInTheDocument();
    expect(screen.getByText('Akita')).toBeInTheDocument();
    expect(screen.getByText('@akitaonrails')).toBeInTheDocument();

    const images = screen.getAllByAltText('Github');
    expect(images).toHaveLength(2);
  });
});
