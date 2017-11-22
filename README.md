# RuslanPopenko.github.io
Speech Recognition demonstration

See index.html and styles/styles.css.

How it works?

This code:

```html
<input class="imcms-speech-recognition">|<textarea class="imcms-speech-recognition"></textarea>
```

Transforms to this:

```html
<div class="speech-wrapper speech-supported|speech-unavailable">
    <input class="imcms-speech-recognition">|<textarea class="imcms-speech-recognition"></textarea>
    <button class="speech-button speech-button--enabled|speech-button--disabled"></button>
    <button class="speech-button speech-button--clear"></button>
    <div class="speech-message"></div>
</div>
```
By default it uses Swedish language - code sv-SE. List of the available languages and theirs codes you may get with ```SpeechRecognition.supportedLanguages()```. 

How setup language?

You just need to import script with attribute ```data-language```.

```html
<script data-language="uk-UA" src="speech_recognition/ImcmsSpeechRecognition.js"></script>
```