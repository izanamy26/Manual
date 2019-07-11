import Generator from "./DataGenerator";
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
    return Array.from({length: length}, () => getRowTableData());
};

export default {getTableData};

