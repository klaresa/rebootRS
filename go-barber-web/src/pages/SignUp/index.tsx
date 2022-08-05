import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Container, Content, Background } from './styles';
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  console.log(formRef);

  const handleSubmit = useCallback(async (data: object) => {
    formRef.current?.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string().email('Email precisa ser valido').required('Email obrigatorio'),
        password: Yup.string().min(6, 'Minimo de 6 digitos'),
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
      <Background />
      <Content>
        <img src={logo} alt="Logo GoBarber"/>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faca seu cadastro</h1>
          <Input name ="name" icon={FiUser} placeholder="Nome"/>
          <Input name ="email" icon={FiMail} placeholder="Email"/>
          <Input name ="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button name="enter" type="submit">Cadastrar</Button>
        </Form>

        <a href="register">
          <FiArrowLeft />
          Voltar para Logon
        </a>

      </Content>
    </Container>
  );
};

export default SignUp;
