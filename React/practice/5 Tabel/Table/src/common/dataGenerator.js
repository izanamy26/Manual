const Generator = {
    getRandomDate: function (beginDate, endDate) {
            return new Date(beginDate.getTime() + Math.random() * (endDate.getTime() - beginDate.getTime()));
    },

    getRandomNumber: function(beginNumber, endNumber) {
           return  Math.random() * (endNumber - beginNumber);
    },

    getRandomString: function(length) {

    },

    getRandomObjectDate: function(obj) {

    },

    getArrayDate: function(length) {

    }
};

export default Generator;