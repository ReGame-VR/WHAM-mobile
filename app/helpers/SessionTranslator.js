export function ratingToString(rating, noun) {
    var str;
    if(rating < 3) {
        str = "Not " + noun + " 😞"
    } else if(rating < 6) {
        str = "Mildly " + noun + " 😕"
    } else { 
        str = "Very " + noun + " 😊"
    }
    return str
}