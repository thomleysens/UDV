import { BaseDemo } from '../../../Utils/BaseDemo/js/BaseDemo.js'

let baseDemo = new BaseDemo({
    iconFolder: '../../../../examples/data/icons',
    imageFolder: '../../../../examples/data/img'
});

baseDemo.appendTo(document.body);

// Initialize iTowns 3D view
baseDemo.init3DView();

baseDemo.loadConfigFile(
    '../../../../examples/data/config/generalDemoConfig.json').then(() => {
    ////// REQUEST SERVICE
    const requestService = new udvcore.RequestService();

    ////// AUTHENTICATION MODULE
    const authenticationService =
        new udvcore.AuthenticationService(requestService, baseDemo.config);
    const authenticationView =
        new udvcore.AuthenticationView(authenticationService);
    baseDemo.addModuleView('authentication', authenticationView,
        { type: BaseDemo.AUTHENTICATION_MODULE });

    ////// DOCUMENTS MODULE
    const documents = new udvcore.DocumentController(baseDemo.view,
        baseDemo.controls, { temporal: baseDemo.temporal, active: false },
        baseDemo.config);
    baseDemo.addModuleView('documents', documents);

    ////// CONTRIBUTE EXTENSION
    const contributeController = new udvcore.ContributeController(documents,
        requestService);

    ////// DOCUMENTS TO VALIDATE
    const docToValidateService =
        new udvcore.DocToValidateService(requestService, baseDemo.config);
    const docToValidateView =
        new udvcore.DocToValidateView(docToValidateService, documents);
    baseDemo.addModuleView('docToValidate', docToValidateView,
        { name: 'Documents in validation', requireAuth: true });

    ////// DOCUMENTS COMMENTS EXTENSION
    const docCommentsService = new udvcore.DocumentCommentsService(documents,
        requestService, baseDemo.config);
    const docCommentsWindow = new udvcore.DocumentCommentsWindow(documents,
        docCommentsService);
});