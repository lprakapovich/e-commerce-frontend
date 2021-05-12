import {login} from "../api";
import {getUserInfo, setUserInfo} from "../localStorage";

const SignInScreen = {
    after_render: () => {
        document.getElementById('sign-in-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const data = await login({email, password});
                if (data.error) {
                    alert(data.error)
                } else {
                    setUserInfo(data);
                    document.location.hash = '/';
                }
            });
        document.getElementById('sign-up-redirect')
            .addEventListener('click', () => {
            document.location.hash = '/sign-up';
        })
    },
    render: async () => {

        if (getUserInfo().name) {
            document.location.hash = '/';
        }

        return `
        <div class="form-wrapper">
            <div class="form-container">
                <div class="header">
                    <h2> Sign In </h2>
                </div>
                <form class="form" id="sign-in-form">
                    <div class="form-control">
                        <label for="email">
                            Email
                        </label>
                        <input type="text" placeholder="example@gmail.com" id="email">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="password">
                            Password
                        </label>
                    <input type="password" placeholder="Password" id="password">
                    <i class="fa fa-check-circle"></i>
                    <i class="fa fa-exclamation-circle"></i>
                    <small>Error message</small>
                    <button type="submit"> Submit </button>
                    <p id="sign-up-redirect"> Don't have an account? <span> Sign up </span> </p>
                </form>
            </div>
        </div>
    `
    }
}

export default SignInScreen;