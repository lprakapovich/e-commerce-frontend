import {getUserInfo} from "../localStorage";

const UserProfileScreen = {

    render: async () => {

        const userInfo = getUserInfo();
        console.log(userInfo)

        return `
            <div class="user-profile-wrapper">
                <div class="form-container">
                    <div class="header">
                        <h2> ${ !userInfo.role || userInfo.role === 'Customer' ? 'Customer' : 'Admin'} data </h2>
                    </div>
                    <form class="form" id="profile-form"">
                    <div class="form-control">
                        <label>
                            Username
                        </label>
                        <input type="text"  value="${userInfo.name}" id="username">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="email">
                            Email
                        </label>
                        <input type="text" value="${userInfo.email}" id="email">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <div class="form-control">
                        <label for="password">
                            Password
                        </label>
                        <input type="password" value="${userInfo.password}" id="password">
                        <i class="fa fa-check-circle"></i>
                        <i class="fa fa-exclamation-circle"></i>
                        <small>Error message</small>
                    </div>
                    <button type="submit"> Save </button>
                </form>
            </div>
        </div>
    `
    },
    after_render: () => {}
}

export default UserProfileScreen;