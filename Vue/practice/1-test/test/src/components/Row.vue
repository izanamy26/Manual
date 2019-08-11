import data from './config/data.js';

Vue.component('row', {
    data: data,
    template: () => {
        return data.map((item, key) => {
           return (
               <tr key="key">
                   Object.key(item).map((td, i) => <td key="i">td</td>);
                </tr>
           );
        });
    }
  });
