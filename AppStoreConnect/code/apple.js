let codeList = [
    'ar',
    'am',
    'bg',
    'bn',
    'ca',
    'cs',
    'da',
    'de',
    'el',
    'en_GB',
    'en_US',
    'es',
    'es_419',
    'et',
    'fa',
    'fi',
    'fil',
    'fr',
    'gu',
    'he',
    'hi',
    'hr',
    'hu',
    'id',
    'it',
    'ja',
    'kn',
    'ko',
    'lt',
    'lv',
    'ml',
    'mr',
    'ms',
    'nl',
    'no',
    'pl',
    'pt_BR',
    'pt_PT',
    'ro',
    'ru',
    'sk',
    'sl',
    'sr',
    'sv',
    'sw',
    'ta',
    'te',
    'th',
    'tr',
    'uk',
    'vi',
    // 'zh_TW',

    'en',
]

let codeMap = {
    ar: 'Arabic',
    am: 'Amharic',
    bg: 'Bulgarian',
    bn: 'Bengali',
    ca: 'Catalan',
    cs: 'Czech',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    en: 'English',
    en_GB: 'English (Great Britain)',
    en_US: 'English (USA)',
    es: 'Spanish',
    es_419: 'Spanish (Latin America and Caribbean)',
    et: 'Estonian',
    fa: 'Persian',
    fi: 'Finnish',
    fil: 'Filipino',
    fr: 'French',
    gu: 'Gujarati',
    he: 'Hebrew',
    hi: 'Hindi',
    hr: 'Croatian',
    hu: 'Hungarian',
    id: 'Indonesian',
    it: 'Italian',
    ja: 'Japanese',
    kn: 'Kannada',
    ko: 'Korean',
    lt: 'Lithuanian',
    lv: 'Latvian',
    ml: 'Malayalam',
    mr: 'Marathi',
    ms: 'Malay',
    nl: 'Dutch',
    no: 'Norwegian',
    pl: 'Polish',
    pt_BR: 'Portuguese (Brazil)',
    pt_PT: 'Portuguese (Portugal)',
    ro: 'Romanian',
    ru: 'Russian',
    sk: 'Slovak',
    sl: 'Slovenian',
    sr: 'Serbian',
    sv: 'Swedish',
    sw: 'Swahili',
    ta: 'Tamil',
    te: 'Telugu',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    vi: 'Vietnamese',
    zh_CN: 'Chinese (China)',
    zh_TW: 'Chinese (Taiwan)',
}

codeMap = {
    ...codeMap,
    ...{
        zh_CN: 'Chinese (Simplified)',
        zh_TW: 'Chinese (Traditional)',
        en_US: 'English (U.S.)',
        en_GB: 'English (U.K.)',
        es: 'Spanish (Spain)',
        // noop
        es_MX: 'Spanish (Mexico)',
        fr_CA: 'French (Canada)',
        en_AU: 'English (Australia)',
        en__CA: 'English (Canada)',
    },
}

const valueMap = {
    es_MX: 'es',
    fr_CA: 'fr',
    en_AU: 'en',
    en_CA: 'en',
}

codeList = codeList.concat(['es_MX', 'fr_CA', 'en_AU', 'en_CA'])

async function openSelect() {
    let menu = document.querySelector('body > div > div[role="menu"]')

    const button = document.querySelector('.locale-switcher___1hMpc button')
    !menu && button.click()

    let wait = !menu
    while (wait) {
        menu = document.querySelector('body > div > div[role="menu"]')
        wait = !menu
    }
    return menu
}

async function select(code) {
    let menu = document.querySelector('body > div > div[role="menu"]')
    let language = codeMap[code]
    const xpath = `./div/ul/li/button[contains(.,"${language}")]`
    const iterator = document.evaluate(
        xpath,
        menu,
        null,
        XPathResult.ANY_TYPE,
        null
    )
    const button = iterator.iterateNext()

    button && button.click()
    !button && console.log('select failed: ', code)

    return !!button
}

async function inputText(inputElement, text) {
    await new Promise((resolve) => {
        setTimeout(resolve, 300)
    })
    // inputElement.select()
    // document.execCommand('paste', text)
    inputElement.value = text

    const ev = new Event('input', { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(ev)

    const ev3 = new Event('keydown', {
        key: 'a',
        bubbles: true,
        cancelable: true,
    })
    inputElement.dispatchEvent(ev3)

    const ev4 = new Event('keyup', {
        key: 'a',
        bubbles: true,
        cancelable: true,
    })
    inputElement.dispatchEvent(ev4)

    const ev5 = new Event('keypress', { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(ev5)

    const changeEv = new Event('change', { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(changeEv)

    await new Promise((resolve) => {
        setTimeout(resolve, 300)
    })
}

async function pythonInputText(inputElement, text) {
    let wait = true
    while (wait) {
        inputElement.select()
        inputElement.focus()

        let focus =
            document.visibilityState === 'visible' && document.hasFocus()

        if (focus) {
            try {
                await fetch('http://localhost:8000/type', {
                    method: 'post',
                    body: text,
                    mode: 'no-cors',
                })
            } catch (e) { }
        }

        !focus && console.log('waiting doc focus...')

        await new Promise((resolve) => {
            setTimeout(resolve, 500)
        })

        let correct = inputElement.value === text
        !correct && console.log('check type...')

        wait = !(focus && correct)
    }

    console.log('python input done!')
}

async function inputPromotionalText(text) {
    const inputDiv = document.querySelector('div[name="promotionalText"]')
    await inputText(inputDiv, text)
}

async function inputDescription(text) {
    const inputDiv = document.querySelector('div[name="description"]')
    await inputText(inputDiv, text)
}

async function inputWhatsNew(text) {
    const inputDiv = document.querySelector('div[name="whatsNew"]')
    await inputText(inputDiv, text)
}

async function inputKeywords(text) {
    const input = document.querySelector('input#keywords')
    text = text.split('\n').join(',')
    await inputText(input, text)
}

async function inputTitle(text) {
    const input = document.querySelector('input#name')
    await pythonInputText(input, text)
}

async function inputSubtitle(text) {
    const input = document.querySelector('input#subtitle')
    await pythonInputText(input, text)
}

// conduct
async function test() {
    // codeList = ['en', 'ar', 'ca']
    for (let code of codeList) {
        console.log('test code: ', code)
        // await openSelect()
        // await select(code)
        // await inputPromotionalText(code + ': aaa')

        const valueCode = valueMap[code] || code
        let pText = window.AS_IOS_DICT[valueCode].promotional
        if (pText.length > 170) {
            pText = window.AS_IOS_DICT[valueCode].pro_1
        }

        console.log(code, pText)

        await new Promise((resolve) => {
            setTimeout(resolve, 100)
        })
    }
}

async function view() {
    // let codeList = ['en', 'ar', 'ca']
    for (let code of codeList) {

        await openSelect()
        const ok = await select(code)
        if (!ok) continue

        console.log('view code: ', code)

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
}

// AS_IOS_DICT = {}
// DESCRIPTION_DICT = {}
// WHATSNEW_DICT = {}
async function start() {
    // let codeList = ['ja', 'sv', 'ar']
    let langList = [...codeList]
    for (let code of langList) {
        await openSelect()
        const ok = await select(code)
        if (!ok) continue

        console.log('code: ', code)
        const valueCode = valueMap[code] || code

        // let promotionalText = window.AS_IOS_DICT[valueCode].promotional
        // if (promotionalText.length > 170) {
        //     promotionalText = window.AS_IOS_DICT[valueCode].pro_1
        // }
        // await inputPromotionalText(promotionalText)

        const descriptionText = window.DESCRIPTION_DICT[valueCode]
        await inputDescription(descriptionText)

        // let keywordsText = window.AS_IOS_DICT[valueCode].keywords
        // await inputKeywords(keywordsText)

        // let whatsNewText = window.AS_IOS_DICT[valueCode].whatsnew
        // await inputWhatsNew(whatsNewText)

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
    console.log('done')
}

// WHATSNEW_DICT = {}
async function startWhatsNew() {
    let langList = [...codeList, 'zh_CN', 'zh_TW']
    for (let code of langList) {
        await openSelect()
        const ok = await select(code)
        if (!ok) continue

        console.log('code: ', code)
        const valueCode = valueMap[code] || code

        let whatsNewText = window.WHATSNEW_DICT[valueCode]['0']
        // if (whatsNewText.length < 7) whatsNewText = window.WHATSNEW_DICT[valueCode]['1']
        await inputWhatsNew(whatsNewText)

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    }
    console.log('done')
}

// AS_IOS_DICT = {}
async function startAppInfo() {
    // let codeList = ['ja', 'en', 'zh']
    for (let code of codeList) {
        console.log('view code: ', code)
        await openSelect()
        const ok = await select(code)
        if (!ok) continue
        const valueCode = valueMap[code] || code
        let title = window.AS_IOS_DICT[valueCode].title
        await inputTitle(title)
        let subtitle = window.AS_IOS_DICT[valueCode].subtitle
        if (subtitle.length > 30) {
            subtitle = window.AS_IOS_DICT[valueCode].subtitle_1
        }
        await inputSubtitle(subtitle)

        await new Promise((resolve) => {
            setTimeout(resolve, 300)
        })
    }
    console.log('done')
}
