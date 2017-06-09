import updateReducerCreator from './updateReducerCreator';
import replacementReducerCreator from './replacementReducerCreator';

export default function itemReducerCreator({ itemName, object = false, defaultState }) {
    if (object) {
        return updateReducerCreator(itemName);
    }
    return replacementReducerCreator({ itemName, defaultState });
}
