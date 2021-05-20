import {register} from "../api";

const SignUpScreen = {
    after_render: () => {
        document.getElementById('sign-in-redirect').addEventListener('click', () => {
            location.hash = '/sign-in';
        })
        document.getElementById('sign-up-form').addEventListener('submit', () => {
            const response = register(
                {
                    username: document.getElementById('username').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                }
            )
        })
    },
    render: async () => {
        return `
            <div class="form-wrapper">
                <div class="form-container">
                    <div class="header">
                        <h2> Create an account </h2>
                    </div>
                    <form class="form" id="sign-up-form"">
                    <div class="form-control">
                        <label>
                            Username
                        </label>
                        <input type="text" placeholder="Username" id="username" required>
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="email">
                            Email
                        </label>
                        <input type="text" placeholder="example@gmail.com" id="email" required>
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="password">
                            Password
                        </label>
                        <input type="password" placeholder="Password" id="password" required>
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="confirmedPassword">
                            Confirm password
                        </label>
                        <input type="text" placeholder="Confirm password" id="confirmedPassword" required>
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <button type="submit"> Submit </button>
                    <p id="sign-in-redirect"> Already have an account? <span> Sign in </span> </p>
                </form>
            </div>
        </div>
    `
    }
}

export default SignUpScreen;