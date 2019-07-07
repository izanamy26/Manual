import Generator from "./dataGenerator";
import { structureTable } from "./options";

const getItemTableData = options => {
    return {
        value: Generator.getRandomData(options)
    }
};

const getRowTableData = () => {
    return Object.keys(structureTable).reduce((item, prev) => {
        item[prev] = getItemTableData(structureTable[prev])
        return item;
    }, {});
}

const getTableData = length => {
    return Array(length).fill({}).map(item => {
       return getRowTableData(); 
   });
};

export default {getTableData};

