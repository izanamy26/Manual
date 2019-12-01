import auth0 from 'auth0-js';


// http://auth0.github.io/auth0.js/index.html
// https://github.com/negarineh/react-auth0/tree/master/src
export default class Auth {
    constructor(history) { // React Router
        this.history = history;
        console.log('env: ', process.env);
        this.auth = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENTID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
            responseType: "token id_token", // access token и JWT пользователя, когда он логинется
            scope: "openid profile email" // openID: issuer, subject, audience, expiration time, not before, issued at (скрины 8, 9)
                                          // email - по идеи подтверждение   
        });
    }

    login = () => {
        this.auth.authorize(); // перенаправляет на строницу логирования
    }
}