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
    <div class="speech-message"></div>
</div>
```