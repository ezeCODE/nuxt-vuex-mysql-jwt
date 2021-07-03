export default {

    prepareSearchResult: async({ commit }, params) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${params.token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "search": params.search,

        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        let data = await fetch(`http://localhost:3000/searchAbility`, requestOptions).then(res => res.json())
        console.log(data);
        commit('chargedDataResult', data)






    }


}