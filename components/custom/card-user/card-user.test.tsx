import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardUser from './card-user';
import CardUserList from './card-user-list';
import { createUserMock, createManyUserMocks } from '@/test/factories/user-factory';

const mockUser = createUserMock({
  name: 'Pedro Victor',
  login: 'PedroVOliveira',
  public_repos: 42,
})
const mockUsers = createManyUserMocks(5)

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: any) => {
    return <img {...props} alt={props.alt || 'img'} />;
  },
}));

describe('CardUser Component', () => {

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

  it('deve renderizar uma lista de usuários', () => {
    render(<CardUserList users={mockUsers} currentPage={1} totalPages={1} />);

    mockUsers.forEach(user => {
      expect(screen.getByText(user.name!)).toBeInTheDocument()
      expect(screen.getByText(`@${user.login}`)).toBeInTheDocument()
    })

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockUsers.length);
  });
});


describe('CardUser Delete Interaction', () => {
  it('deve deletar o item após clicar no botão de delete', () => {
    const onDeleteMock = jest.fn();
    render(<CardUser user={mockUser} onDelete={onDeleteMock} />)

    const button = screen.getByRole('button', { name: /deletar/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(onDeleteMock).toHaveBeenCalledTimes(1)
    expect(onDeleteMock).toHaveBeenCalledWith(mockUser.login)

  })
})
