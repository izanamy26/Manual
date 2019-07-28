const Generator = {

    getRandomDate(beginDate, endDate) {
        return new Date(beginDate.getTime() + Math.random() * (endDate.getTime() - beginDate.getTime()))
                        .toLocaleDateString('ru-RU')
                        .split('.')
                        .reverse()
                        .join('-');
                    
    },
   
    getRandomNumber(beginNumber, endNumber) {
        return  Math.floor(beginNumber + Math.random() * (endNumber - beginNumber));
    },

    getRandomString(length) {
        const startCodeLatinUpper = 65;
        const endCodeLatinUpper = 90;

       let arrCode = Array.from({ length: length }, 
                                () => this.getRandomNumber(startCodeLatinUpper, endCodeLatinUpper));

       return String.fromCharCode(...arrCode);
    },

    getRandomData({ type, begin, end, length }) {
       const defaultValue = '';

       switch (type) {
            case 'date':
                return (begin !== undefined) 
                        ? this.getRandomDate(new Date(begin), new Date())
                        : defaultValue;

            case 'string':
                return (length !== undefined)
                        ? this.getRandomString(length)
                        : defaultValue;  
                
            case 'number':
                return (begin !== undefined && end !== undefined)
                        ? this.getRandomNumber(begin, end)
                        : defaultValue;
           
            default:
                return defaultValue;      
       }
    },
};

export default Generator;