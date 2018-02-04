import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';

export const meteorActionCreator = function meteorActionCreator(methodOptions){
    const newMethodOptions = methodOptions;

    newMethodOptions.action = function action(args){
        return async (dispatch) => {
            dispatch({
                type: `${methodOptions.name}/begin`,
            });

            try {
                //this.validate(args);

                //console.log('validation', valid, this.validate);

                const payload = await this.callPromise(args);

                dispatch({
                    type: `${methodOptions.name}/success`,
                    payload,
                });

                return payload;

            } catch (err) {
                dispatch({
                    type: `${methodOptions.name}/fail`,
                    error: true,
                    payload: err,
                });

                throw new Error(err);
            }
        };
    };

    return newMethodOptions;
};

export class ValidatedActionMethod extends ValidatedMethod {
  constructor(props) {
    const newProps = props;
    newProps.mixins = [CallPromiseMixin, meteorActionCreator];
    //newProps.action = meteorActionCreator(props.name);
    super(newProps);
  }
}
