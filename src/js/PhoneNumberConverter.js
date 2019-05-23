define(['ojs/ojvalidation-base'],
function(ValidationBase) {
    const self = this;
    
    function PhoneNumberConverter() {}
    
    PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH = 10;
    
    /*
     * Logic for phone number formatting
     * @param {string | number} value
     * @returns {String}
     */
    PhoneNumberConverter.prototype.format = function(value) {
        let formattedValue = ``, initValue = ``;
        if (!value) {
            return formattedValue;
        }
        if (typeof value === 'string') {
            initValue = self.getExtractedNumbers(value.trim());
            if (initValue.length !== PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH) {
                return value;
            }
        } else if (typeof value === 'number') {
            initValue = self.getExtractedNumbers(value.toString());
            if (initValue.length !== PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH) {
                return value;
            }
        } else {
            return formattedValue;
        }
        const part1 = initValue.substring(0, 3);
        const part2 = initValue.substring(3, 6);
        const part3 = initValue.substring(6, 10);
        formattedValue = `(${part1}) ${part2}-${part3}`;
        return formattedValue;
    };
    
    /*
     * The factory method for getting a new instance of the custom converter
     * This method is written as an IIFE (Immediately Invoked Function Execution),
     * so that the converter gets registered as soon as the library is included in
     * the define block of the uptaking module.
     */
    PhoneNumberConverterFactory = (function() {
        function _createPhoneNumberConverter() {
            return new PhoneNumberConverter();
        }
        return { createCustomConverter: function() { return _createPhoneNumberConverter(); } };
    }());
    
    /*
     * Register the new converter with ojet validation library
     */
    ValidationBase.Validation.converterFactory("phonenumber", PhoneNumberConverterFactory);
    
    /*
     * This method extracts only the numbers out from the input string
     */
    self.getExtractedNumbers = function(value) {
        let extractedNumbers = ``;
        const lengthOfString = value.length;
        if (lengthOfString < PhoneNumberConverter._DEFAULT_PHONE_NUMBER_LENGTH) {
            return value;
        }
        for (let index=0; index<lengthOfString; index++) {
            const characterAtIndex = value.charAt(index);
            extractedNumbers += isNaN(characterAtIndex) ? `` : characterAtIndex;
        }
        return extractedNumbers;
    };
});