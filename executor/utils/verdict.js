exports.getVerdict = (expected, actual) => {

    if(expected.trim() === actual.trim())
        return "Accepted";

    return "Wrong Answer";

}