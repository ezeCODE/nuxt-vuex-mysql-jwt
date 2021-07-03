export default function({ redirect, store }) {

    console.log("checkingStateSession");
    console.log(store.state.profile.tokenProfile);

    if (store.state.profile.tokenProfile != '') {
        redirect({ name: '/' })

    }
}