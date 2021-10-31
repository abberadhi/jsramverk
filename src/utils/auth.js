import axios from 'axios';
class Auth {
    constructor() {
        this.email = false;
        this.token = false;
        this.id = false;
        this.authenticated = false;
    }

    login(email, password, setLoading, setErrMsg) {

        return new Promise((resolve, reject) => {
            axios({
                url: "/graphql",
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                data: {
                    query: `mutation { userLogin(email: "${email}", password: "${password}") {  id, email, token, msg }}`}
            }).then((response => {
                let res = response.data.data.userLogin;
                setLoading(false);
    
                if (res.msg) { 
                    setErrMsg(res.msg)
                    reject()
                    return false;
                }
    
                this.authenticated = true;
                this.email = res.email;
                this.id = res.id;
                this.token = res.token;

                resolve()
            }))
          });


    }

    logout() {
        this.email = false;
        this.token = false;
        this.id = false;
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();