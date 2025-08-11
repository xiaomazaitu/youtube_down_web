// 多语言支持配置
const languages = {
    // 中文 (默认)
    'zh-CN': {
        'title': 'VKdown - 在线视频下载工具',
        'description': 'VKdown免费在线视频下载工具，支持多种平台视频下载，操作简单快捷',
        'keywords': '视频下载,在线下载,视频解析,免费下载,VKdown',
        'navbar_brand': 'VKdown.com',
        'main_title': '在线视频下载工具',
        'main_subtitle': '支持多平台视频下载，简单三步即可获取视频',
        'form_label': '视频链接',
        'form_placeholder': '请输入视频链接，如：https://www.example.com/video',
        'submit_button': '解析视频',
        'submit_loading': '解析中...',
        'supported_platforms': '支持多种视频平台链接',
        'result_title': '视频信息',
        'download_button': '下载视频',
        'error_title': '错误提示',
        'feature_1_title': '粘贴链接',
        'feature_1_desc': '复制您想要下载的视频链接并粘贴到输入框',
        'feature_2_title': '解析视频',
        'feature_2_desc': '点击解析按钮，系统将分析视频信息',
        'feature_3_title': '下载视频',
        'feature_3_desc': '获取视频下载链接，点击下载按钮保存视频',
        'footer_title': 'VKdown.com',
        'footer_desc': '提供简单易用的在线视频下载服务',
        'footer_copyright': '&copy; 2025 vkdown.com. 保留所有权利.',
        'paste_button': '粘贴失败，请手动粘贴或检查浏览器权限',
        'clear_button': '请输入视频链接',
        'parse_error': '解析失败，请检查链接是否正确',
        'network_error': '网络错误，请稍后重试',
        'download_alert': '视频开始下载，请查看浏览器下载列表',
        'invalid_download': '下载链接无效，请重新解析视频'
    },
    
    // English
    'en': {
        'title': 'VKdown - Online Video Download Tool',
        'description': 'VKdown free online video download tool, supports downloading videos from multiple platforms, simple and fast operation',
        'keywords': 'video download, online download, video parsing, free download, VKdown',
        'navbar_brand': 'VKdown.com',
        'main_title': 'Online Video Download Tool',
        'main_subtitle': 'Supports downloading videos from multiple platforms, get videos in three simple steps',
        'form_label': 'Video URL',
        'form_placeholder': 'Please enter video URL, e.g.: https://www.example.com/video',
        'submit_button': 'Parse Video',
        'submit_loading': 'Parsing...',
        'supported_platforms': 'Supports links from multiple video platforms',
        'result_title': 'Video Information',
        'download_button': 'Download Video',
        'error_title': 'Error',
        'feature_1_title': 'Paste Link',
        'feature_1_desc': 'Copy the video link you want to download and paste it into the input box',
        'feature_2_title': 'Parse Video',
        'feature_2_desc': 'Click the parse button, the system will analyze video information',
        'feature_3_title': 'Download Video',
        'feature_3_desc': 'Get the video download link, click the download button to save the video',
        'footer_title': 'VKdown.com',
        'footer_desc': 'Providing simple and easy-to-use online video download service',
        'footer_copyright': '&copy; 2025 vkdown.com. All rights reserved.',
        'paste_button': 'Failed to paste, please paste manually or check browser permissions',
        'clear_button': 'Please enter a video link',
        'parse_error': 'Parsing failed, please check if the link is correct',
        'network_error': 'Network error, please try again later',
        'download_alert': 'Video download started, please check your browser download list',
        'invalid_download': 'Invalid download link, please re-parse the video'
    },
    
    // Russian
    'ru': {
        'title': 'VKdown - Инструмент для загрузки видео онлайн',
        'description': 'VKdown бесплатный онлайн-инструмент для загрузки видео, поддерживает загрузку видео с нескольких платформ, простая и быстрая работа',
        'keywords': 'загрузка видео, онлайн загрузка, анализ видео, бесплатная загрузка, VKdown',
        'navbar_brand': 'VKdown.com',
        'main_title': 'Инструмент для загрузки видео онлайн',
        'main_subtitle': 'Поддерживает загрузку видео с нескольких платформ, получите видео за три простых шага',
        'form_label': 'Ссылка на видео',
        'form_placeholder': 'Пожалуйста, введите ссылку на видео, например: https://www.example.com/video',
        'submit_button': 'Анализировать видео',
        'submit_loading': 'Анализ...',
        'supported_platforms': 'Поддерживает ссылки с нескольких видео платформ',
        'result_title': 'Информация о видео',
        'download_button': 'Скачать видео',
        'error_title': 'Ошибка',
        'feature_1_title': 'Вставить ссылку',
        'feature_1_desc': 'Скопируйте ссылку на видео, которое хотите скачать, и вставьте в поле ввода',
        'feature_2_title': 'Анализировать видео',
        'feature_2_desc': 'Нажмите кнопку анализа, система проанализирует информацию о видео',
        'feature_3_title': 'Скачать видео',
        'feature_3_desc': 'Получите ссылку для загрузки видео, нажмите кнопку загрузки, чтобы сохранить видео',
        'footer_title': 'VKdown.com',
        'footer_desc': 'Предоставление простого и удобного сервиса загрузки видео онлайн',
        'footer_copyright': '&copy; 2025 vkdown.com. Все права защищены.',
        'paste_button': 'Не удалось вставить, вставьте вручную или проверьте разрешения браузера',
        'clear_button': 'Пожалуйста, введите ссылку на видео',
        'parse_error': 'Ошибка анализа, проверьте правильность ссылки',
        'network_error': 'Ошибка сети, повторите попытку позже',
        'download_alert': 'Загрузка видео началась, проверьте список загрузок в браузере',
        'invalid_download': 'Неверная ссылка для загрузки, повторно проанализируйте видео'
    },
    
    // Japanese
    'ja': {
        'title': 'VKdown - オンライン動画ダウンロードツール',
        'description': 'VKdown 無料のオンライン動画ダウンロードツール、複数のプラットフォームの動画ダウンロードをサポート、シンプルで高速な操作',
        'keywords': '動画ダウンロード, オンラインダウンロード, 動画解析, 無料ダウンロード, VKdown',
        'navbar_brand': 'VKdown.com',
        'main_title': 'オンライン動画ダウンロードツール',
        'main_subtitle': '複数のプラットフォームの動画ダウンロードをサポート、簡単な3ステップで動画を取得',
        'form_label': '動画URL',
        'form_placeholder': '動画URLを入力してください、例：https://www.example.com/video',
        'submit_button': '動画を解析',
        'submit_loading': '解析中...',
        'supported_platforms': '複数の動画プラットフォームのリンクをサポート',
        'result_title': '動画情報',
        'download_button': '動画をダウンロード',
        'error_title': 'エラー',
        'feature_1_title': 'リンクを貼り付け',
        'feature_1_desc': 'ダウンロードしたい動画リンクをコピーして入力ボックスに貼り付け',
        'feature_2_title': '動画を解析',
        'feature_2_desc': '解析ボタンをクリックすると、システムが動画情報を分析します',
        'feature_3_title': '動画をダウンロード',
        'feature_3_desc': '動画ダウンロードリンクを取得し、ダウンロードボタンをクリックして動画を保存',
        'footer_title': 'VKdown.com',
        'footer_desc': 'シンプルで使いやすいオンライン動画ダウンロードサービスを提供',
        'footer_copyright': '&copy; 2025 vkdown.com. 無断複写・転載を禁じます.',
        'paste_button': '貼り付けに失敗しました。手動で貼り付けるか、ブラウザの権限を確認してください',
        'clear_button': '動画リンクを入力してください',
        'parse_error': '解析に失敗しました。リンクが正しいか確認してください',
        'network_error': 'ネットワークエラー、後でもう一度お試しください',
        'download_alert': '動画のダウンロードが開始されました。ブラウザのダウンロードリストを確認してください',
        'invalid_download': '無効なダウンロードリンクです。動画を再解析してください'
    },
    
    // Spanish
    'es': {
        'title': 'VKdown - Herramienta de Descarga de Videos en Línea',
        'description': 'VKdown herramienta de descarga de videos en línea gratuita, compatible con la descarga de videos de múltiples plataformas, operación simple y rápida',
        'keywords': 'descarga de videos, descarga en línea, análisis de videos, descarga gratuita, VKdown',
        'navbar_brand': 'VKdown.com',
        'main_title': 'Herramienta de Descarga de Videos en Línea',
        'main_subtitle': 'Compatible con la descarga de videos de múltiples plataformas, obtén videos en tres simples pasos',
        'form_label': 'Enlace del Video',
        'form_placeholder': 'Por favor ingrese el enlace del video, por ejemplo: https://www.example.com/video',
        'submit_button': 'Analizar Video',
        'submit_loading': 'Analizando...',
        'supported_platforms': 'Compatible con enlaces de múltiples plataformas de video',
        'result_title': 'Información del Video',
        'download_button': 'Descargar Video',
        'error_title': 'Error',
        'feature_1_title': 'Pegar Enlace',
        'feature_1_desc': 'Copia el enlace del video que deseas descargar y pégalo en el cuadro de entrada',
        'feature_2_title': 'Analizar Video',
        'feature_2_desc': 'Haz clic en el botón de análisis, el sistema analizará la información del video',
        'feature_3_title': 'Descargar Video',
        'feature_3_desc': 'Obtén el enlace de descarga del video, haz clic en el botón de descarga para guardar el video',
        'footer_title': 'VKdown.com',
        'footer_desc': 'Proporcionando un servicio de descarga de videos en línea simple y fácil de usar',
        'footer_copyright': '&copy; 2025 vkdown.com. Todos los derechos reservados.',
        'paste_button': 'Error al pegar, por favor pega manualmente o verifica los permisos del navegador',
        'clear_button': 'Por favor ingrese un enlace de video',
        'parse_error': 'Error al analizar, por favor verifique si el enlace es correcto',
        'network_error': 'Error de red, por favor inténtelo de nuevo más tarde',
        'download_alert': 'La descarga del video ha comenzado, por favor revise la lista de descargas de su navegador',
        'invalid_download': 'Enlace de descarga inválido, por favor vuelva a analizar el video'
    }
};

// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh-CN';
}

// 设置当前语言
function setCurrentLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
}

// 获取翻译文本
function getTranslation(key) {
    const currentLang = getCurrentLanguage();
    return languages[currentLang] && languages[currentLang][key] ? languages[currentLang][key] : key;
}

// 应用翻译
function applyTranslations() {
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // 更新页面元信息
    document.title = getTranslation('title');
    document.querySelector('meta[name="description"]').setAttribute('content', getTranslation('description'));
    document.querySelector('meta[name="keywords"]').setAttribute('content', getTranslation('keywords'));
}