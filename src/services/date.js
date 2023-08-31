export const toRussiaDate = (date) => { 
    return new Date(date).toLocaleString('ru-RU', { dateStyle: 'short' })
}