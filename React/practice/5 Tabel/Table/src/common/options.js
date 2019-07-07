const structureTable= {
    col1: {
        type: 'date',
        begin: '2012-11-31',
        title: 'Дата' 
    },
    col2: {
        type: 'number',
        begin: 1,
        end: 200,
        title: 'Число 1' 
    },
    col3: {
        type: 'number',
        begin: 200,
        end: 400,
        title: 'Число 2'     
    },
    col4: {
        type: 'string',
        lengtn: 10,
        title: 'Строка' 
    },
    col5: {
        type: 'number',
        begin: 400,
        end: 500,
        title: 'Число 3'     
    }
};

const settingsTable = {
    length: 10
};

export {settingsTable, structureTable};