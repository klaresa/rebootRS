import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string; // ela nao pode ser obrigatoria pois se o erro nao existe ela n pode existir
  // ou entao vai dar erro
}

const Tooltip: React.FC<TooltipProps> = ({ title, className ,children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
