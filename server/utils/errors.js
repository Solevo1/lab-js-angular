class NodeCourseError extends Error {
    constructor (message) {
        super(message);
        this.status = 500;
    }
}

class InvalidRequestError extends NodeCourseError {
    constructor (message = 'Invalid request') {
        super(message);
        this.status = 400;
    }
}

module.exports = {
    NodeCourseError,
    InvalidRequestError
};