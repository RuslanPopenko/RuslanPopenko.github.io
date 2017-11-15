class SpeechRecognition {
    constructor() {
        this.language = 'sv-SE';
        this.textFieldsButtons = [];
        this.onStateChangeEvents = [];
    }

    static supportedLanguages() {
        return [['Afrikaans', ['af-ZA']],
            ['አማርኛ', ['am-ET']],
            ['Azərbaycanca', ['az-AZ']],
            ['বাংলা', ['bn-BD', 'বাংলাদেশ'],
                ['bn-IN', 'ভারত']],
            ['Bahasa Indonesia', ['id-ID']],
            ['Bahasa Melayu', ['ms-MY']],
            ['Català', ['ca-ES']],
            ['Čeština', ['cs-CZ']],
            ['Dansk', ['da-DK']],
            ['Deutsch', ['de-DE']],
            ['English', ['en-AU', 'Australia'],
                ['en-CA', 'Canada'],
                ['en-IN', 'India'],
                ['en-KE', 'Kenya'],
                ['en-TZ', 'Tanzania'],
                ['en-GH', 'Ghana'],
                ['en-NZ', 'New Zealand'],
                ['en-NG', 'Nigeria'],
                ['en-ZA', 'South Africa'],
                ['en-PH', 'Philippines'],
                ['en-GB', 'United Kingdom'],
                ['en-US', 'United States']],
            ['Español', ['es-AR', 'Argentina'],
                ['es-BO', 'Bolivia'],
                ['es-CL', 'Chile'],
                ['es-CO', 'Colombia'],
                ['es-CR', 'Costa Rica'],
                ['es-EC', 'Ecuador'],
                ['es-SV', 'El Salvador'],
                ['es-ES', 'España'],
                ['es-US', 'Estados Unidos'],
                ['es-GT', 'Guatemala'],
                ['es-HN', 'Honduras'],
                ['es-MX', 'México'],
                ['es-NI', 'Nicaragua'],
                ['es-PA', 'Panamá'],
                ['es-PY', 'Paraguay'],
                ['es-PE', 'Perú'],
                ['es-PR', 'Puerto Rico'],
                ['es-DO', 'República Dominicana'],
                ['es-UY', 'Uruguay'],
                ['es-VE', 'Venezuela']],
            ['Euskara', ['eu-ES']],
            ['Filipino', ['fil-PH']],
            ['Français', ['fr-FR']],
            ['Basa Jawa', ['jv-ID']],
            ['Galego', ['gl-ES']],
            ['ગુજરાતી', ['gu-IN']],
            ['Hrvatski', ['hr-HR']],
            ['IsiZulu', ['zu-ZA']],
            ['Íslenska', ['is-IS']],
            ['Italiano', ['it-IT', 'Italia'],
                ['it-CH', 'Svizzera']],
            ['ಕನ್ನಡ', ['kn-IN']],
            ['ភាសាខ្មែរ', ['km-KH']],
            ['Latviešu', ['lv-LV']],
            ['Lietuvių', ['lt-LT']],
            ['മലയാളം', ['ml-IN']],
            ['मराठी', ['mr-IN']],
            ['Magyar', ['hu-HU']],
            ['ລາວ', ['lo-LA']],
            ['Nederlands', ['nl-NL']],
            ['नेपाली भाषा', ['ne-NP']],
            ['Norsk bokmål', ['nb-NO']],
            ['Polski', ['pl-PL']],
            ['Português', ['pt-BR', 'Brasil'],
                ['pt-PT', 'Portugal']],
            ['Română', ['ro-RO']],
            ['සිංහල', ['si-LK']],
            ['Slovenščina', ['sl-SI']],
            ['Basa Sunda', ['su-ID']],
            ['Slovenčina', ['sk-SK']],
            ['Suomi', ['fi-FI']],
            ['Svenska', ['sv-SE']],
            ['Kiswahili', ['sw-TZ', 'Tanzania'],
                ['sw-KE', 'Kenya']],
            ['ქართული', ['ka-GE']],
            ['Հայերեն', ['hy-AM']],
            ['தமிழ்', ['ta-IN', 'இந்தியா'],
                ['ta-SG', 'சிங்கப்பூர்'],
                ['ta-LK', 'இலங்கை'],
                ['ta-MY', 'மலேசியா']],
            ['తెలుగు', ['te-IN']],
            ['Tiếng Việt', ['vi-VN']],
            ['Türkçe', ['tr-TR']],
            ['اُردُو', ['ur-PK', 'پاکستان'],
                ['ur-IN', 'بھارت']],
            ['Ελληνικά', ['el-GR']],
            ['български', ['bg-BG']],
            ['Pусский', ['ru-RU']],
            ['Српски', ['sr-RS']],
            ['Українська', ['uk-UA']],
            ['한국어', ['ko-KR']],
            ['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'],
                ['cmn-Hans-HK', '普通话 (香港)'],
                ['cmn-Hant-TW', '中文 (台灣)'],
                ['yue-Hant-HK', '粵語 (香港)']],
            ['日本語', ['ja-JP']],
            ['हिन्दी', ['hi-IN']],
            ['ภาษาไทย', ['th-TH']]];
    }

    setLanguageCode(languageCode) {
        const isSupported = SpeechRecognition.supportedLanguages()
            .map(mapLanguageToCode)
            .reduce((l1, l2) => l1.concat(l2), [])
            .some(langCode => langCode === languageCode);
        if (!isSupported) {
            throw new Error('Language ' + languageCode + ' isn\'t supported');
        }
        this.language = languageCode;
        return this;

        function mapLanguageToCode(lang) {
            const result = [];
            for (let i = 1; i < lang.length; i++) {
                result.push(lang[i][0]);
            }
            return result;
        }
    }

    addTextFieldAndButton(textField, button) {
        this.textFieldsButtons.push({
            textField: textField,
            button: button
        });

        return this;
    }

    addOnStateChangeEvent(onStateChangeEvent) {
        this.onStateChangeEvents.push(onStateChangeEvent);
        return this;
    }

    build() {
        return configureRecognition(this.textFieldsButtons, this.onStateChangeEvents, this.language);

        function configureRecognition(textFieldsButtons, onStateChangeEvents, language) {
            const recognition = new webkitSpeechRecognition();

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = language;

            let recognizing = false,
                finalTranscript = '';

            recognition.onstart = function () {
                recognizing = true;
            };

            recognition.onerror = function (event) {
                console.error(event.error);
            };

            recognition.onend = function () {
                recognizing = false;
                invokeOnStateChangeEvents(false);
                finalTranscript = '';
            };

            recognition.onresult = function (event) {
                let interimTranscript = '';
                const results = event.results;
                if (!results) {
                    recognition.stop();
                    return;
                }

                for (let i = event.resultIndex; i < results.length; ++i) {
                    if (results[i].isFinal) {
                        finalTranscript += results[i][0].transcript;
                    } else {
                        interimTranscript += results[i][0].transcript;
                    }
                }

                writeToActiveTextField(finalTranscript + interimTranscript);

                function writeToActiveTextField(text) {
                    const activeTextFieldButton = textFieldsButtons.find(t => !!t.active);

                    if (activeTextFieldButton) {
                        const activeTextField = activeTextFieldButton.textField;
                        if (activeTextField.val) {
                            activeTextField.val(text);
                        } else {
                            activeTextField.value += text;
                        }
                    }
                }
            };

            textFieldsButtons.forEach(addOnClickEventToEveryButton);

            return recognition;

            function addOnClickEventToEveryButton(textFieldButton, index) {
                textFieldButton.button.click(() => {
                    const id = textFieldsButtons.findIndex(t => !!t.active),
                        restart = id !== -1 && id !== index;

                    if (recognizing && restart) {
                        stopRecognition();
                        setTimeout(() => startRecognition(), 1500);
                    } else if (recognizing) {
                        stopRecognition();
                    } else {
                        startRecognition();
                    }

                    function stopRecognition() {
                        recognition.stop();
                        invokeOnStateChangeEvents(false);
                        textFieldsButtons.forEach(tfb => delete tfb.active);
                    }

                    function startRecognition() {
                        recognition.start();
                        textFieldButton.active = true;
                        invokeOnStateChangeEvents(true);
                    }
                });
            }


            function invokeOnStateChangeEvents(speechListening) {
                const activeTextFieldButton = textFieldsButtons.find(t => !!t.active);
                if (activeTextFieldButton) {
                    onStateChangeEvents.forEach((e) => {
                        e(activeTextFieldButton.textField, activeTextFieldButton.button, speechListening);
                    });
                }
            }
        }
    }


}