$(function () {
    var supported = window.webkitSpeechRecognition,
        elements = [];

    $('.imcms-speech-recognition').each(processTextField);

    if (supported) {
        var $thisScript = $("script[src$='ImcmsSpeechRecognition.js']"),
            src = $thisScript
                .attr('src')
                .replace('ImcmsSpeechRecognition', 'SpeechRecognition'),
            speechRecognitionScript = document.createElement('script');

        document.head.appendChild(speechRecognitionScript);
        speechRecognitionScript.setAttribute('src', src);
        speechRecognitionScript.onload = function () {
            new SpeechRecognition()
                .setLanguageCode($thisScript.data('language'))
                .setElements(elements)
                .onSpeechListening(onSpeechListening)
                .onSpeechOver(onSpeechOver)
                .build();
        };

        function onSpeechListening($button) {
            $button.removeClass('speech-button--disabled')
                .addClass('speech-button--enabled');
        }

        function onSpeechOver($button) {
            $button.removeClass('speech-button--enabled')
                .addClass('speech-button--disabled');
        }
    }

    function processTextField() {
        var $textField = $(this),
            $button = $('<button>', {'class': 'speech-button speech-button--disabled'}),
            $message = $('<div>', {'class': 'speech-message'});

        $textField
            .wrap('<div class="speech-wrapper"></div>')
            .parent()
            .append($button)
            .append($message)
            .addClass(supported ? 'speech-supported' : 'speech-unavailable');

        elements.push({
            textField: $textField,
            button: $button,
            message: $message
        });
    }
});

