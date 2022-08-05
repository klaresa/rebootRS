import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { Container, Error } from "./styles";
// eh uma biblioteca para lidar com formularios by rocketseat
import { useField } from "@unform/core";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string; // estou dizendo que eh obrigatorio
  icon?: React.ComponentType<IconBaseProps>; // uma tipagem de Component
  /*
    Sim, um componente tambem pode ter suas proprias propriedades e podemos passar uma
    tipagem para ele atraves de IconBaseProps
   */
}

// aqui eu desestruturo o icon (que eh um componente) e ponho o resto em rest
/*
  o react apenas entende componentes aqueles que iniciam com letra maiuscula,
  entao eh preciso transformar o icon em "tipo":Icon
*/

// o Icon soh aparece se houver um icon
// as propriedades aqui sao passadas pro form
const Input: React.FC<InputProps> = ({name,  icon: Icon, ...rest }) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [ isFocused, setIsFocused] = useState(false);
  const [ isFilled, setIsFilled] = useState(false);

  // essa funcao foi transformada em um callback arrow function
  // if (inputRef.current?.value) { // se tem um valor se nao for nulo
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    //   setIsFilled(true);
    // } else {
    //   setIsFilled(false);
    // }
    setIsFilled(!!inputRef.current?.value); // isso aqui eh aquela verificacao ali em cima
  }, []);

  //FUNCOES DENTRO DE FUNCOES SAO CALLBACK - UMA FUNCAO DENTRO DE UM COMPONENTE => use um HOOK
  // pq? pq estas funcoes sao SEMPRE recriadas quando o componente eh renderizado: PERFORMANCE
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);



  useEffect(() => {
    // funcao que registra quando eh submetido o form
    registerField({
      name: fieldName, // apenas o nome do campo inalterado
      ref: inputRef.current, // onde ta contido o valor do ref do elemento
      path: 'value', // eh o path mesmo => document.querySelector('#input').value
    });
  }, [fieldName, registerField]);

  // o defaultvalue eh um valor inicial padrao do form
  return(
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled} >
      { Icon && <Icon size={20}/> }
      {/*vc sabe que esse arrow function eh para a funcao nao disparar logo no useState*/}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest} />

        {/*aqui o erro ta sendo passado para o styled e la estilizando atraves de styled(Tooltip)*/}
      { error &&
      <Error title={error}>
        <FiAlertCircle color="#c53030" size={20} />
      </Error> }
    </Container>
  );
};

export default Input;
