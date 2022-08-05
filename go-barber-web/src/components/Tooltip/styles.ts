import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  
  span {
    width: 160px;
    background: #c13521;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    
    position: absolute;
    bottom: calc(100% + 12px); // para ficar um pouco mais acima
    
    // centralizando
    left: 50%;
    transform: translateX(-50%);
    
    color: #312e38;
   
    
    &::before {
      content: ''; // eh preciso de um content mesmo que vazio para ser mostrado
      
      // esses tres propriedades criam a flecha
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      
      top: 100%;
      position: absolute;
      
      // centralizando
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
