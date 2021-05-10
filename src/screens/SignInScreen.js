const SignInScreen = {
    after_render: () => {
        document.getElementById('sign-up-redirect').addEventListener('click', () => {
            location.hash = '/sign-up';
        })
    },
    render: async () => {
        return `
        <div class="form-wrapper">
            <div class="form-container">
                <div class="header">
                    <h2> Sign In </h2>
                </div>
                <form class="form" id="form">
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
                    <input type="text" placeholder="Password" id="password">
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