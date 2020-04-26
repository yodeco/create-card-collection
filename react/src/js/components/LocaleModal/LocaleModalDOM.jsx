import { DOMModel, DOMComponent } from 'react-dom-components';
import LocaleModal from './LocaleModal';

class LocaleModalModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getAttribute('data-current-locale-text', 'currentLocaleText');
        this.getAttribute('data-current-locale-button-text', 'currentLocaleButtonText');
    }
}

export default class LocaleModalDOM extends DOMComponent {
    constructor() {
        super();
        this.nodeName = 'locale-modal';
        this.model = LocaleModalModel;
        this.component = LocaleModal;
    }
}
