const ORDER_DESC = 'desc';
const ORDER_ASC = 'asc';

const Sorter = {
    sortByDate(data, column, order) {

    },
  

    sortByNumber(data, column, order){   
        switch (order) {
            case ORDER_DESC:
                var sortCallback =  (A, B) => A[column].value - B[column].value;
                break;

            case ORDER_ASC:
                var sortCallback =  (A, B) => B[column].value - A[column].value;
                break;
            };
        
        data.sort(sortCallback);
    },

    sortByString(data, column, order) {
        console.log(column, order);

    },

    getSortedData(data, column, typeData, order) {
        switch(typeData){

            case 'date':
                return this.sortByDate(data, column, order);
            
            case 'number':
                return this.sortByNumber(data, column, order);
            
            case 'string':
                return this.sortByString(data, column, order);
            
            default:
                return data;    
        }
    }
}

export default Sorter;
