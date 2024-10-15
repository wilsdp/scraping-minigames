const tools = {
    left(str, n) {
        return str.substring(0, n)
    },
    right(str, n) {
        return str.substring(str.length - n, str.length)
    }
}

module.exports = tools