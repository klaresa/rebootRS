import React, { useCallback, useRef, useContext } from 'react';
import * as Yup from "yup";
import { Form } from '@unform/web'
import { FormHandles } from "@unform/core";
import AuthContext from '../../context/AuthContext';
import getValidationErrors from "../../utils/getValidationErrors";

import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { name } = useContext(AuthContext);
  console.log(name);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Email precisa ser valido').required('Email obrigatorio'),
        password: Yup.string().required('Senha obrigatoria'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

    } catch (err) {
      console.log(err);
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);

    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo GoBarber"/>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faca seu logon</h1>
          <Input name ="email" icon={FiMail} placeholder="Email"/>
          <Input name ="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button name="enter" type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="register">
          <FiLogIn/>
          Criar conta
        </a>

      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
