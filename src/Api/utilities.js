export function getField(input, field) {
    let output = [];

    for (let i = 0; i < input.length; ++i) {
        output.push(input[i][field]);
    }
    return output;
}