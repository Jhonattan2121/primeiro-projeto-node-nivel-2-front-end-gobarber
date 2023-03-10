import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail, FiUser , FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link , useHistory} from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from "../../assets/logo.svg";

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content , Background , AnimationContainer } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string()
                .required('Nome Obrigatorio'),
                email: Yup.string()
                .required('E-mail obrigatorio')
                .email('Digite um e-mail valido'),
                password: Yup.string()
                .required('Senha Obrigatoria')
                .min(6, 'No minimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            history.push('/');
            addToast({
                type: 'success',
                title: 'Cadastro Realizado!',
                description: 'Você já pode fazer seu logon no Gobarber!',
            });
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
    
                formRef.current?.setErrors(errors);
    
                return;
                }
                addToast({
                    type: 'error',
                    title: 'Erro na cadastro',
                    description: 'Ocorreu um erro ao fazer cadastro, tente novamente'
            });
        }
    }, [addToast, history]);

    return (
        <Container>
        <Background />
        <Content>   
            <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faca seu cadastro</h1>

                <Input name='name' icon={FiUser} placeholder='Nome' />
                <Input name='email' icon={FiMail} placeholder='E-mail' />

                <Input name='password' icon={FiLock} type="password" placeholder='Senha'/>

                <Button type='submit'>Cadastrar</Button>

            </Form>
            <Link to="/">
                <FiArrowLeft />
                Voltar para logon </Link>
            </AnimationContainer>
        </Content>
        
    </Container>
    )
};

export default Signup;