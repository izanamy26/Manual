import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Node: для любых типов данных. При передаче в один компонент другой
/*Component.propTypes = {
    node: PropTypes.node
}*/

//Element: в компанент в виде пропса передается другой элемент
/*Component.propTypes = {
    elem: PropTypes.element
}*/

//Instance of: в пропс передан экземпляр класса, например, new Date
/*Component.propTypes = {
    instance: PropTypes.instanceOf(Constructor)
}*/

//One of:
/*Component.propTypes = {
    elem: PropTypes.oneOf(['val1', 'val2'])
}*/

//One of type: одно из свойств может быть либо строкой либо числом
/*Component.propTypes = {
    elem: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}*/

//Array of / Object of: свойство представляет из себя либо массив, либо объект
/*Component.propTypes = {
    array: PropTypes.arrayOf(PropTypes.string),
    object: PropTypes.objectOf(PropTypes.number)
}*/

//Shape:
/*Component.propTypes = {
    obj: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number,
        lineHeight: PropTypes.number
    })
}*/

// ===============================================================
export const Counter = ({ counter = 0 }) => {
    return <h1>{`Counter component.Counter value is: ${counter}`}</h1>;
};

export const Button = () => (
    <button>Simple button</button>
);


export class Lesson extends Component {
    static  propTypes = {
        children : PropTypes.element
    }

    static defaultProps = {
        children: null
    }

    state = {
        counter : 0,
    }

    handleClick = () => {
        this.setState(({counter}) => ({
            counter: ++counter
        }));
    }

    render() {
        const { counter } = this.state;
        const { children, child } = this.props; //Обернутый компанент

        return (
            <div>
                {child}
                <div>{counter}</div>
                {React.cloneElement(children, {counter: this.state.counter})}
                <button onClick={this.handleClick}>+1</button>
            </div>

        )
    }
}
