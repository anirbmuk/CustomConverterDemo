define(['ojs/ojcore',
        'knockout',
        'ojs/ojvalidation-base',
        './PhoneNumberConverter',
        'ojs/ojknockout',
        'ojs/ojinputtext',
        'ojs/ojlabel'],
    function (oj, ko, ValidationBase) {
        function ControllerViewModel() {
            var self = this;

            var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

            self.appName = ko.observable("JET Custom Converter");
            self.userLogin = ko.observable("anirbmuk");
            
            self.value = ko.observable();
            
            self.phoneNumberConverter = ValidationBase
                                              .Validation
                                              .converterFactory("phonenumber")
                                              .createCustomConverter();

        }

        return new ControllerViewModel();
    }
);
