import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const meteorActionCreator = (name) => {
    return (...args) => {
        return async (dispatch) => {
            dispatch({
                type: `${name}/begin`,
            });

            try {
                const payload = await Meteor.callPromise(name, ...args);

                dispatch({
                    type: `${name}/success`,
                    payload,
                });

                return payload;

            } catch (err) {
                dispatch({
                    type: `${name}/fail`,
                    error: true,
                    payload: err,
                });
            }
        };
    };
};

export class ValidatedActionMethod extends ValidatedMethod {
  constructor(props) {
    const newProps = props;
    newProps.action = meteorActionCreator(props.name);
    super(newProps);
  }
}
