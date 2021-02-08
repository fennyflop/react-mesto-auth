class Api { // У меня вроде бы всё работает
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._token = config.token;
        this._headers = config.headers;
    }

    // Получает первоначальные карточки

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._token,
            },
        })
            .then(res => {
                return this._handleOriginalResponse(res);
            })
    }

    // Получиает информацию

    getInitialsInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._token,
            },
        })
            .then(res => {
                return this._handleOriginalResponse(res);
            })
    }

    // Patching profile

    postProfile(name, job) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._token,
            },
            body: JSON.stringify({
                name: name,
                about: job,
            }),
        }).then((res) => {
            return this._handleOriginalResponse(res);
        })
    }

    // Patching the avatar

    postAvatar(avatarInput) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._token,
            },
            body: JSON.stringify({
                avatar: avatarInput,
            }),
        }).then((res) => {
            return this._handleOriginalResponse(res);
        })
    }

    handleLike(id, isLiked) {
        if (!isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this._token,
                },
            }).then((res) => {
                return this._handleOriginalResponse(res);
            });
        } else {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": this._token,
                },
            }).then((res) => {
                return this._handleOriginalResponse(res);
            });
        }
    }

    // Card deletion

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._token,
            },
        }).then((res) => {
            return this._handleOriginalResponse(res);
        })
    }

    // Добавить карточку

    postCard(title, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this._token,
            },
            body: JSON.stringify({
                name: title,
                link: link,
            }),
        })
            .then(res => {
                return this._handleOriginalResponse(res);
            })
    }

    handleLogin(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                return this._handleOriginalResponse(res);
            })
    }

    handleRegister(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                return this._handleOriginalResponse(res);
            })
    }

    _handleOriginalResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: "https://auth.nomoreparties.co",
    headers: { 'Content-Type': 'application/json', },
    token: `Bearer ${localStorage.getItem('jwt')}`
});

export default api;