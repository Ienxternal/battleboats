async function signUp(user) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
}
