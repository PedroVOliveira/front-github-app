import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSelectionBar from './user-selection-bar';
import { createSelectionBarProps } from '@/test/factories/selection-bar-factory';

describe('UserSelectionBar Component', () => {
  it('deve renderizar quando isVisible é true', () => {
    const props = createSelectionBarProps({ selectedCount: 2 });
    render(<UserSelectionBar {...props} />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('itens')).toBeInTheDocument();
    expect(screen.getByText('Selecionar Todos')).toBeInTheDocument();
  });

  it('não deve renderizar quando isVisible é false', () => {
    const props = createSelectionBarProps({ isVisible: false });
    render(<UserSelectionBar {...props} />);

    const content = screen.queryByText('Selecionar Todos');
    if (content) {
      const container = content.closest('[data-state]');
      expect(container).toHaveAttribute('data-state', 'closed');
    }
  });

  it('deve chamar onSelectAll quando clicar no checkbox de selecionar todos', () => {
    const props = createSelectionBarProps();
    render(<UserSelectionBar {...props} />);
    
    const checkbox = screen.getByRole('checkbox', { name: /selecionar todos/i });
    fireEvent.click(checkbox);
    expect(props.onSelectAll).toHaveBeenCalled();
  });

  it('deve exibir "Desmarcar Todos" quando isAllSelected é true', () => {
    const props = createSelectionBarProps({ isAllSelected: true });
    render(<UserSelectionBar {...props} />);
    
    expect(screen.getByText('Desmarcar Todos')).toBeInTheDocument();
  });

  it('deve chamar onClear quando clicar em Cancelar', () => {
    const props = createSelectionBarProps();
    render(<UserSelectionBar {...props} />);
    
    fireEvent.click(screen.getByText('Cancelar'));
    expect(props.onClear).toHaveBeenCalled();
  });

  it('deve disparar a confirmação de exclusão ao clicar em Excluir', () => {
    const props = createSelectionBarProps({ selectedCount: 3 });
    render(<UserSelectionBar {...props} />);
    
    fireEvent.click(screen.getByText('Excluir'));
    expect(screen.getByText('Excluir usuários selecionados?')).toBeInTheDocument();
  });
});
