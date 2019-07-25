const structureTable= {
    date: {
        type: 'date',
        begin: '2012-11-31',
        title: 'Date' 
    },
    hits: {
        type: 'number',
        begin: 0,
        end: 5,
        title: 'Hits' 
    },
    unique: {
        type: 'number',
        begin: 0,
        end: 100,
        title: 'Unique'     
    },
    registrations: {
        type: 'string',
        length: 5,
        title: 'Registrations' 
    },
    demo: {
        type: 'string',
        length: 5,
        title: 'Demo registrations'     
    },
    conversions: {
        type: 'number',
        begin: 0,
        end: 100,
        title: 'Conversions'
    },
    deposit: {
        type: 'number',
        begin: 0,
        end: 80,
        title: 'Deposit'
    },
    ftd: {
        type: 'number',
        begin: 0,
        end: 100,
        title: 'Ftd'
    },
    deals: {
        type: 'number',
        begin: 0,
        end: 200,
        title: 'Deals'
    },
    profit: {
        type: 'number',
        begin: 0,
        end: 50,
        title: 'Profit'
    }
};

const settingsTable = {
    length: 20
};

const settingsPaginator = {
    itemsPerPage: 5,
    startActivePage: 1,
    totalItems: settingsTable.length
};

export {settingsTable, structureTable, settingsPaginator};