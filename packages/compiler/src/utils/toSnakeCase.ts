// In the land of Ruby we love underscores
const toSnakeCase = (string: string) => string.replace( /([A-Z])/g, " $1" ).split(' ').join('_').toLowerCase();

export { toSnakeCase }