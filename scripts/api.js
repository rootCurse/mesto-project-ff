const config = {
    baseUrl: '', //base url for api
    headers: {
      authorization: '', //token
      'Content-Type': 'application/json'
    }
}

export const getUserInfo = async () => {
    await fetch(config.baseUrl + '/users/me', {
        headers: config.headers
    }).then((response) => {
        if(response.ok)
            return response.data.json;
        //return Promise.reject(`Ошибка: ${response.status}`); uncomment after fill config
    }) 
    return []
}

export const getCards = async () => {
    await fetch(config.baseUrl + '/cards', {
        headers: config.headers
    }).then((response) => {
        if(response.ok)
            return response.data.json;
        //return Promise.reject(`Ошибка: ${response.status}`); uncomment after fill config
    })
    return []
}

export const updateProfile = async (data) => {
    await fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data),
    })
}

export const createCard = async (data) => {
    await fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data),
    })
}

export const removeCard = async (id) => {
    await fetch(config.baseUrl + '/cards/' + id,  {
        method: 'DELETE',
        headers: config.headers,
    })
}

export const updateAvatar = async (data) => {
    await fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data),
    })
}