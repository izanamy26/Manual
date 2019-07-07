const Generator = {

    getRandomDate(beginDate, endDate) {
        return new Date(beginDate.getTime() + Math.random() * (endDate.getTime() - beginDate.getTime()))
                        .toLocaleDateString('ru-RU');
                    
    },
   
    getRandomNumber(beginNumber, endNumber) {
        return  Math.floor(beginNumber + Math.random() * (endNumber - beginNumber));
    },

    getRandomString(length) {
        const startASCIICodeLatinUpper = 65;
        const endASCIICodeLatinUpper = 90;

        let arrCode = Array(length).fill('')
                    .map(() => {
                       return this.getRandomNumber(startASCIICodeLatinUpper, endASCIICodeLatinUpper);
                    });
  
       return String.fromCharCode(...arrCode);
    },

    getRandomData(options) {
       const defaultValue = '';

       switch (options.type) {
            case 'date':
                return (options.begin !== undefined) 
                        ? this.getRandomDate(new Date(options.begin), new Date())
                        : defaultValue;

            case 'string':
                return (options.lengtn !== undefined)
                        ? this.getRandomString(options.lengtn)
                        : defaultValue;  
                
            case 'number':
                return (options.begin !== undefined && options.end )
                        ? this.getRandomNumber(options.begin, options.end)
                        : defaultValue;
           
            default:
                return defaultValue;      
       }
    },
};

export default Generator;