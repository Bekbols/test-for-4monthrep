import React, { useState, useEffect } from 'react';
import Modal from "../../components/modal/Modal";

const URL = 'http://localhost:8000/users'

const MainPage = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setUsers(data));
    };

    const handleCreateUser = () => {
        if (!name || !email || !username) {
            return;
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, username }),
        }).then(() => {
            setModalMessage('Пользователь успешно создан');
            setModalIsOpen(true);
            fetchUsers();
            setName('');
            setEmail('');
            setUsername('');
        });
    };

    const handleDeleteUser = (id) => {
        fetch(`${URL}/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setModalMessage('Пользователь удален');
            setModalIsOpen(true);
            fetchUsers();
        });
    };

    return (
        <div>
            <h1>Управление пользователями</h1>
            <div>
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleCreateUser}>Создать пользователя</button>
            </div>
            {users.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Имя пользователя</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Список пуст</p>
            )}
            <Modal
                isOpen={modalIsOpen}
                message={modalMessage}
                onClose={() => setModalIsOpen(false)}
            />
        </div>
    )
}

export default MainPage;
