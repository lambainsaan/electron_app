export function sTu(input: String) {
// Converts all the spaces in the strings in the array
// to underscores, which is the way it is stored in the database 
    return input.replace(/ /g, '_');
}

export function uTs(input: String) {
    // Converts all the spaces in the strings in the array
    // to underscores, which is the way it is stored in the database 
    return input.replace(/_/g, ' ');
}