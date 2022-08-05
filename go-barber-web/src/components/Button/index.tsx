import React, { ButtonHTMLAttributes } from 'react';
import { Container } from "./styles";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLInputElement>{
//   name: string;
// }
// eh a mesma coisa mas em uma sintaxe menor
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

// aqui estou desestruturando as props pegando a prop children e colocanto o resto em rest
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest} >
      {children}
  </Container>
);
// dai em button eu passo o objeto com rest

export default Button;
