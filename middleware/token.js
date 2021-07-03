    function checkingToken(req, res, next) {

        const bearerHeader = req.headers['authorization']

        if (typeof bearerHeader !== 'undefined') {

            const bearerToken = bearerHeader.split(" ")[1]
            console.log(bearerToken);
            req.token = bearerToken
            next()

        } else {
            res.sendStatus(403)

        }


    }

    export default checkingToken