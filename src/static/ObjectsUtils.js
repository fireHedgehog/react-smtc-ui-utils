/**
 * Empty checks
 * generate random numbers
 *  ...
 * @Author Rocky
 */

// check string empty or not
export function isStringEmpty(String) {
    if (String === undefined || String === null || String === '') {
        return true
    } else {
        return false
    }
}

//generate a random number by given bit
export function getRandomNumber(bit) {
    if(bit === undefined){
        bit = 100000000;
    }
    return Math.ceil(Math.random() * Math.floor(bit));
}

//check an Array empty or not
export function isArrayEmpty(arr) {
    if (arr === undefined || arr === null || arr.length <= 0) {
        return true;
    }else {
        return false;
    }
}


// Speed up calls to hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty;

// check Object empty or not
export function isObjEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}