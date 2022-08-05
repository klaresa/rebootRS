import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Title, Repositories, Error } from './styles';
import logo from '../../assets/logo-git.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const [repositories, setRepositories] = useState<Repository[]>(() => {

        let storage = localStorage.getItem('@GithubExplorer:repositories');

        if (storage) {
            return JSON.parse(storage);
        } else {
            return [];
        }
    });
    const [newRepository, setNewRepository] = useState('');

    const [inputError, setInputError] = useState('');

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories)
        );
    }, [repositories]);

    async function uAddNewRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();


        if (!newRepository){
            setInputError("Digite o autor/nome do repositório");
            return;
        }
        try {
            const response = await api.get<Repository>(`repos/${newRepository}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepository('');
            setInputError('');
        } catch (err) {
            setInputError("Erro na busca por esse repositório!")
        }
    }

    return (
        <>
            <img src={logo} alt="Logo Github Explorer"/>
            <Title>Explore repositórios do Github!</Title>

            <Form hasError={!!inputError} onSubmit={uAddNewRepository}>
                <input
                    value={newRepository}
                    onChange={(event) => setNewRepository(event.target.value)}
                    placeholder="Digite aqui o nome do repositorio.."/>
                <button>Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>

                    <FiChevronRight size={20}/>
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;

// inputError = 'jashd';
// console.log(!!inputError); // true
//
// inputError = '';
// console.log(!!inputError); // false
