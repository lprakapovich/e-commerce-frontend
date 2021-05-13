import {getUserInfo} from "../localStorage";

const AdminScreen = {
    render: async () => {

        return `<div> Admin area </div>`
    },
    after_render: () => {
        const {role} = getUserInfo();
        if (role !== 'Admin') {
            document.location.hash = '/sign-in';
        } else {
            console.log(admin)
        }
    }
}

export default AdminScreen;