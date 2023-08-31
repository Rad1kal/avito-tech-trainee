export default class toRussiaDate {
    toRussiaDate = (date) => { 
        const data = date.split('-');
        return data.reverse().join('-');
    }
}