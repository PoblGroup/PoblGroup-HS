
async function GetDynamicsToken() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/auth/dynamics`, requestOptions)
        const result = await response.json()
        return result.access_token
    } catch (error) {
        console.error(error)
        return error
    }
 } 

export { GetDynamicsToken };

