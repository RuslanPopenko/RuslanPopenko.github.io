function SpeechRecognitionSupport(src) {
    if (window.webkitSpeechRecognition) {
        var speechRecognitionScript = document.createElement('script');
        speechRecognitionScript.setAttribute('src', src);
        speechRecognitionScript.setAttribute('type', 'text/javascript');
        document.head.appendChild(speechRecognitionScript);

        return {
            load: function (callback) {
                speechRecognitionScript.onload = function () {
                    callback(new SpeechRecognition());
                };
            }
        }
    } else {
        return {
            load: function () {
                console.error("Speech recognition isn't supported by your browser.");
            }
        }
    }
}

SpeechRecognitionSupport.prototype = {};