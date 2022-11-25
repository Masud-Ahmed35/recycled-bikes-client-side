export const setAuthToken = user => {
    console.log(user);
    fetch(`${process.env.REACT_APP_API_URL}/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('accessToken', data.token);
        })
        .catch(error => console.log(error))

}