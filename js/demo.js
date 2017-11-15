$(function () {

    /*
    SpeechRecognitionSupport is the class for fail safe check that speech recognition is supported by your browser,
    otherwise it displays to the console error message: "Speech recognition isn't supported by your browser.".
    */
    new SpeechRecognitionSupport("speech_recognition/SpeechRecognition.js")
        .load(speechRecognition);

    /**
     * Speech recognition load function it passes SpeechRecognition constructed instance as parameter.
     * It serves to configure speechRecognition instance.
     * @param speechRecognition - instance of the SpeechRecognition
     */
    function speechRecognition(speechRecognition) {
        var $container = $('#container');

        for (var i = 0; i < 4; i++) {
            var textField = i % 2 === 0 ? 'input' : 'textarea',
                $textField = $('<' + textField + '>', {id: 'test-textfield-' + i}),
                $button = $('<button>', {id: 'test-button-' + i, text: 'Start'}),
                $p = $('<p>');

            if (textField === 'input') {
                $textField.attr('size', 100);
            } else {
                $textField.attr('cols', 100)
                    .attr('rows', 15);
            }

            $p.append($textField, $button)
                .appendTo($container);

            // first param - html or jquery element input or textarea
            // second param - html or jquery element which should have onclick event
            speechRecognition.addTextFieldAndButton($textField, $button);
        }

        speechRecognition
            //Specify language code, list of available language codes you can find at SpeechRecognition.supportedLanguages()
            // as default Swedish language code sv-SE
            //.setLanguageCode('uk-UA')
            .addOnStateChangeEvent(onStateChangeEvent)
            // invoke to end construction
            .build();

        /**
         * Function that fires every time when recognition was started or stopped
         * @param $textField - textField (html or jquery element input or textarea) which you pass as parameter
         * to {@link SpeechRecognition#addTextFieldAndButton}
         * @param $button - button (html or jquery element which should have onclick event)  which you pass as parameter
         * to {@link SpeechRecognition#addTextFieldAndButton}
         * @param speechListening - boolean indicator of state
         * true - started recognition
         * false - stopped recognize
         */
        function onStateChangeEvent($textField, $button, speechListening) {
            if (speechListening) {
                $button.text('Stop');
            } else {
                $button.text('Start');
            }
        }
    }

});