import {getStorageUserInfo} from "../localStorage";

const UserProfileScreen = {
    render: async () => {
        const {name, email, password, role} = getStorageUserInfo();
        return `
            <div class="user-profile-wrapper">
                <div class="form-container">
                    <div class="header">
                        <h2> ${ !role || role === 'Customer' ? 'Customer' : 'Admin'} data </h2>
                    </div>
                    <form class="form" id="profile-form"">
                    <div class="form-control">
                        <label>
                            Username
                        </label>
                        <input type="text"  value="${name}" id="username">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="email">
                            Email
                        </label>
                        <input type="text" value="${email}" id="email">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="password">
                            Password
                        </label>
                        <input type="password" value="${password}" id="password">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <button type="submit"> Update </button>
                </form>
            </div>
        </div>
    `
    },
    after_render: () => {}
}

export default UserProfileScreen;