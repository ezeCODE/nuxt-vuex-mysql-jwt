export default {

    clearDataUpdate: (state) => { state.dataPostSelected = [] },
    clearDataResult: (state) => { state.searchResults = [] },

    chargedDataResult: (state, data) => {

        state.searchResults = data

    },

    chargedToken: (state, data) => {

        state.tokenProfile = data.token
        state.emailProfile = data.email

    },

    DataUpdate: (state, data) => {

        state.dataPostSelected.push(data)

    },


    deleteToken: (state, data) => {

        state.tokenProfile = ''

    }


}