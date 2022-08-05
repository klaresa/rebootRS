import styled from 'styled-components';
import signInBackgroundImg from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh; // view disponivel
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  
  width: 100%; 
  max-width: 700px;
  
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
       
    h1 {
      margin-bottom: 24px;
    }

    a {
      display: block;
      text-decoration: none;
      color: #F4f4f4;
      margin-top: 24px;
      transition: color 0.2s;
      
      &:hover {
        color: ${shade(0.2, '#ff9000')};
      }
    }
  }
  
    // pega apenas a ancora fora do form
    > a {
      color: #ff9000;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      
      &:hover {
        color: ${shade(0.2, '#ff9000')};
      }
     
      svg {
        margin-right: 16px;
      }
    }
`;

export const Background = styled.div`
  flex: 1; // ocupa o espaco inteiro menos o 700px
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

`;
