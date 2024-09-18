const url = 'http://localhost:8000/api'
export const api = {
    add: `${url}/category/update`,
    auth: `${url}/user/auth`,
    current: `${url}/user/current`,
    all: `${url}/category/all`,
    id: `${url}/category/id`,
    remove: `${url}/category/remove`,
}

export const headers = (token) => {
    return (
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    )
}
