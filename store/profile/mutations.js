export default {

    chargedToken: (state, data) => {
        console.log("token id");

        state.tokenProfile = data.token
        state.emailProfile = data.email
        console.log(data);
    },


    deleteToken: (state, data) => {

        state.tokenProfile = ''

    }


}