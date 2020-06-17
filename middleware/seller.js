module.exports = function(request, response, next) {
    if (!(request.user.role === 'SELLER')) return response.status(403).send('An authorized');
    next();
}