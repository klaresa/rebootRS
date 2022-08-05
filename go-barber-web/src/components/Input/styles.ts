import styled, { css } from 'styled-components';
import Tooltip from "../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  
  border: 2px solid #232129;
  color: #7e7e7e;

  display: flex;
  align-items: center;
  
  ${(props) => props.isErrored && css`
    border-color: #c53030;
  `}
  
  ${(props) => props.isFocused && css`
    color: #FF9000;
    border: 2px solid #FF9000;
  `}
  
  ${(props) => props.isFilled && css`
    color: #FF9000;
  `}
    
  
  & + div {
    margin-top: 8px;
  }  
  
    input {
      flex: 1;
      background: transparent;
      border: 0;
      color: #F4f4f4;

      
      &::placeholder {
        color: #7e7e7e;
      }
    }
    
    svg {
      margin-right: 16px;  
    }
`;

export const Error = styled(Tooltip)`
  height: 20px; // eh o tamanho do icone
  margin-left: 16px; // para nao encostar no icone

  svg {
    margin: 0;
  }
  
  span {
    background: #c53030;
    color: #fff;
    
    // isso aqui eh para determinar a estilizacao aqui de vermelho e nao la no tooltip (pq pode ser que se queira reaproveitar para casos em que n tem erro)
    &::before {
      border-color: #c53030 transparent;
    }
  }
  
`;
