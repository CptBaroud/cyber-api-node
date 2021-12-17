let send = {
    sendData (res, data) {
        if (data) {
            res.status(200).send(data)
        } else {
            this.send404(null, res)
        }
    },

    sendError (res, code, error) {
        res.status(code).json({
            message: 'Internal Server Error',
            error: error,
            stack: error.stack ? error.stack : null
        })
    },

    send404 (req, res) {
        const payload = {
            message: 'Not found'
        }
        res.status(404).json(payload)
    }
}

module.exports = send
