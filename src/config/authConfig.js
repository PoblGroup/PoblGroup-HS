export const msalconfig = {
    auth: {
        clientId: "d30e66e5-5d45-4beb-b6b2-7b37887e332b",
        authority: "https://login.microsoftonline.com/5f0d9160-6b93-41c6-8db2-153e0d7f7960",
        redirectUri: "http://localhost:3000"
        // redirectUri: "https://main--gorgeous-flan-0ba665.netlify.app"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
}

// Add scopes to be used at Microsoft identity platform endpoints
export const loginRequest = {
    scopes: ["User.Read", "Team.ReadBasic.All"]
}

// Add endpoints for the Microsoft Grap API
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
}