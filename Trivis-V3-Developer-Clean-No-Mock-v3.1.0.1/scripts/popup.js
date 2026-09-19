/**
 * Trivis Dev — Extension Popup Localization & Core Controller
 * Synchronizes selected language across chrome.storage.local & the floating dock.
 */
(function () {
  "use strict";

  const I18N_POPUP = {
    en: {
      brandSub: "QUANTUM ACCELERATOR",
      online: "READY",
      coreTitle: "NEURAL CORE STATUS",
      lblPlatform: "TARGET PLATFORM",
      lblPipeline: "TASK PIPELINE",
      valPipeline: "READY",
      lblEncryption: "ENCRYPTION",
      lblLatency: "INJECTION LATENCY",
      valLatency: "—",
      launchBtn: "INITIALIZE LOVABLE MATRIX",
      dirDockTitle: "FLOATING HUD DOCK",
      dirDockDesc: "On lovable.dev, a sleek obsidian dock appears at the bottom. Drag anywhere on screen.",
      dirTaskTitle: "NEURAL TASK PIPELINE",
      dirTaskDesc: "Send prompts seamlessly via auto-generated encrypted task files with instant execution.",
      dirDevTitle: "DEV MODES & EXPORT",
      dirDevDesc: "Switch between Plan and Build modes, or download full source with single click."
    },
    hi: {
      brandSub: "क्वांटम त्वरक",
      online: "तैयार",
      coreTitle: "न्यूरल कोर स्थिति",
      lblPlatform: "टारगेट प्लेटफॉर्म",
      lblPipeline: "टास्क पाइपलाइन",
      valPipeline: "तैयार",
      lblEncryption: "एन्क्रिप्शन",
      lblLatency: "इंजेक्शन लेटेंसी",
      valLatency: "—",
      launchBtn: "लवेबल मैट्रिक्स शुरू करें",
      dirDockTitle: "फ्लोटिंग HUD डॉक",
      dirDockDesc: "lovable.dev पर नीचे एक प्रीमियम ओब्सीडियन डॉक दिखाई देगा। इसे कहीं भी खींचें।",
      dirTaskTitle: "न्यूरल टास्क पाइपलाइन",
      dirTaskDesc: "एन्क्रिप्टेड टास्क फाइलों के माध्यम से तुरंत प्रॉम्ट भेजें।",
      dirDevTitle: "डेव मोड्स और एक्सपोर्ट",
      dirDevDesc: "प्लान और बिल्ड मोड के बीच स्विच करें, या एक क्लिक में पूरा सोर्स कोड डाउनलोड करें।"
    },
    es: {
      brandSub: "ACELERADOR CUÁNTICO",
      online: "LISTO",
      coreTitle: "ESTADO DEL NÚCLEO NEURAL",
      lblPlatform: "PLATAFORMA DESTINO",
      lblPipeline: "TUBERÍA DE TAREAS",
      valPipeline: "LISTO",
      lblEncryption: "CIFRADO",
      lblLatency: "LATENCIA DE INYECCIÓN",
      valLatency: "—",
      launchBtn: "INICIALIZAR MATRIZ LOVABLE",
      dirDockTitle: "DOCK HUD FLOTANTE",
      dirDockDesc: "En lovable.dev, aparece un elegante dock de obsidiana en la parte inferior. Arrástralo a cualquier lugar.",
      dirTaskTitle: "TUBERÍA DE TAREAS NEURAL",
      dirTaskDesc: "Envía prompts sin problemas mediante archivos de tareas encriptados generados automáticamente.",
      dirDevTitle: "MODOS DEV Y EXPORTACIÓN",
      dirDevDesc: "Cambia entre los modos Plan y Build, o descarga el código fuente completo con un solo clic."
    },
    pt: {
      brandSub: "ACELERADOR QUÂNTICO",
      online: "READY",
      coreTitle: "STATUS DO NÚCLEO NEURAL",
      lblPlatform: "PLATAFORMA ALVO",
      lblPipeline: "PIPELINE DE TAREFAS",
      valPipeline: "PRONTO",
      lblEncryption: "CRIPTOGRAFIA",
      lblLatency: "LATÊNCIA DE INJEÇÃO",
      valLatency: "—",
      launchBtn: "INICIALIZAR MATRIZ LOVABLE",
      dirDockTitle: "DOCK HUD FLUTUANTE",
      dirDockDesc: "No lovable.dev, um dock elegante aparece na parte inferior. Arraste para qualquer lugar.",
      dirTaskTitle: "PIPELINE DE TAREFAS NEURAL",
      dirTaskDesc: "Envie prompts facilmente por meio de arquivos de tarefas criptografados com execução instantânea.",
      dirDevTitle: "MODOS DEV E EXPORTAÇÃO",
      dirDevDesc: "Alterne entre os modos Plan e Build, ou baixe o código fonte completo com um clique."
    },
    ar: {
      brandSub: "المسرع الكمي",
      online: "جاهز",
      coreTitle: "حالة النواة العصبية",
      lblPlatform: "المنصة المستهدفة",
      lblPipeline: "خط أنابيب المهام",
      valPipeline: "جاهز",
      lblEncryption: "التشفير",
      lblLatency: "زمن استجابة الحقن",
      valLatency: "—",
      launchBtn: "بدء مصفوفة لوفابل",
      dirDockTitle: "قاعدة تحكم عائمة",
      dirDockDesc: "على lovable.dev، تظهر قاعدة تحكم سفلية أنيقة. اسحبها إلى أي مكان على الشاشة.",
      dirTaskTitle: "خط المهام العصبي",
      dirTaskDesc: "أرسل التوجيهات بسلاسة عبر ملفات مهام مشفرة ومؤتمتة مع تنفيذ فوري.",
      dirDevTitle: "أوضاع التطوير والتصدير",
      dirDevDesc: "بدّل بين وضعي التخطيط والبناء، أو حمّل الكود المصدري بالكامل بنقرة واحدة."
    },
    id: {
      brandSub: "AKSELERATOR KUANTUM",
      online: "READY",
      coreTitle: "STATUS INTI NEURAL",
      lblPlatform: "PLATFORM TARGET",
      lblPipeline: "PIPELINE TUGAS",
      valPipeline: "SIAP",
      lblEncryption: "ENKRIPSI",
      lblLatency: "LATENSI INJEKSI",
      valLatency: "—",
      launchBtn: "INISIALISASI MATRIKS LOVABLE",
      dirDockTitle: "DOCK HUD MENGAMBANG",
      dirDockDesc: "Di lovable.dev, dock obsidian ramping muncul di bagian bawah. Geser ke mana saja di layar.",
      dirTaskTitle: "PIPELINE TUGAS NEURAL",
      dirTaskDesc: "Kirim prompt dengan lancar melalui file tugas terenkripsi dengan eksekusi instan.",
      dirDevTitle: "MODE DEV & EKSPOR",
      dirDevDesc: "Beralih antara mode Plan dan Build, atau unduh kode sumber lengkap dengan satu klik."
    },
    fr: {
      brandSub: "ACCÉLÉRATEUR QUANTIQUE",
      online: "PRÊT",
      coreTitle: "ÉTAT DU CŒUR NEURAL",
      lblPlatform: "PLATEFORME CIBLE",
      lblPipeline: "PIPELINE DE TÂCHES",
      valPipeline: "ARMÉ & SYNCHRONISÉ",
      lblEncryption: "CHIFFREMENT",
      lblLatency: "LATENCE D'INJECTION",
      valLatency: "—",
      launchBtn: "INITIALISER LA MATRICE LOVABLE",
      dirDockTitle: "DOCK HUD FLOTTANT",
      dirDockDesc: "Sur lovable.dev, un dock obsidienne élégant apparaît en bas. Glissez-le n'importe où.",
      dirTaskTitle: "PIPELINE DE TÂCHES NEURAL",
      dirTaskDesc: "Envoyez des prompts de manière transparente via des fichiers de tâches chiffrés exécutés instantanément.",
      dirDevTitle: "MODES DEV & EXPORT",
      dirDevDesc: "Basculez entre les modes Plan et Build, ou téléchargez le code source complet en un clic."
    },
    de: {
      brandSub: "QUANTEN-BESCHLEUNIGER",
      online: "READY",
      coreTitle: "NEURALER KERN-STATUS",
      lblPlatform: "ZIELPLATTFORM",
      lblPipeline: "AUFGABEN-PIPELINE",
      valPipeline: "BEREIT",
      lblEncryption: "VERSCHLÜSSELUNG",
      lblLatency: "INJEKTIONS-LATENZ",
      valLatency: "—",
      launchBtn: "LOVABLE MATRIX STARTEN",
      dirDockTitle: "SCHWEBENDES HUD-DOCK",
      dirDockDesc: "Auf lovable.dev erscheint unten ein elegantes Obsidian-Dock. Ziehen Sie es an eine beliebige Stelle.",
      dirTaskTitle: "NEURALE AUFGABEN-PIPELINE",
      dirTaskDesc: "Senden Sie Prompts nahtlos über automatisch generierte, verschlüsselte Aufgabendateien.",
      dirDevTitle: "DEV-MODI & EXPORT",
      dirDevDesc: "Wechseln Sie zwischen Plan- und Build-Modus oder laden Sie den gesamten Quellcode mit einem Klick herunter."
    },
    ru: {
      brandSub: "КВАНТОВЫЙ АКСЕЛЕРАТОР",
      online: "ГОТОВ",
      coreTitle: "СТАТУС НЕЙРОЯДРА",
      lblPlatform: "ЦЕЛЕВАЯ ПЛАТФОРМА",
      lblPipeline: "ПАЙПЛАЙН ЗАДАЧ",
      valPipeline: "ГОТОВ",
      lblEncryption: "ШИФРОВАНИЕ",
      lblLatency: "ЗАДЕРЖКА ИНЪЕКЦИИ",
      valLatency: "—",
      launchBtn: "ЗАПУСТИТЬ МАТРИЦУ LOVABLE",
      dirDockTitle: "ПЛАВАЮЩИЙ HUD-ДОК",
      dirDockDesc: "На lovable.dev внизу появляется стильный док. Перетаскивайте его в любое место на экране.",
      dirTaskTitle: "НЕЙРОПАЙПЛАЙН ЗАДАЧ",
      dirTaskDesc: "Отправляйте промпты через автоматически сгенерированные зашифрованные файлы задач с мгновенным выполнением.",
      dirDevTitle: "РЕЖИМЫ DEV И ЭКСПОРТ",
      dirDevDesc: "Переключайтесь между режимами Plan и Build или скачивайте полный исходный код в один клик."
    },
    zh: {
      brandSub: "量子加速器",
      online: "已就绪",
      coreTitle: "神经核心状态",
      lblPlatform: "目标平台",
      lblPipeline: "任务流水线",
      valPipeline: "已就绪",
      lblEncryption: "加密方式",
      lblLatency: "注入延迟",
      valLatency: "—",
      launchBtn: "启动 LOVABLE 矩阵",
      dirDockTitle: "悬浮 HUD 扩展坞",
      dirDockDesc: "在 lovable.dev 底部将显示精致的黑曜石底座，可随意拖动至屏幕任意位置。",
      dirTaskTitle: "神经任务流水线",
      dirTaskDesc: "通过自动生成的加密任务文件无缝发送提示词，享受即时极速执行体验。",
      dirDevTitle: "开发模式与源码导出",
      dirDevDesc: "在计划（Plan）和构建（Build）模式之间自由切换，或一键打包下载完整源码。"
    },
    ja: {
      brandSub: "量子アクセラレーター",
      online: "オンライン",
      coreTitle: "ニューラルコア状態",
      lblPlatform: "対象プラットフォーム",
      lblPipeline: "タスクパイプライン",
      valPipeline: "待機＆同期完了",
      lblEncryption: "暗号化",
      lblLatency: "インジェクション遅延",
      valLatency: "0.02ms (超低遅延)",
      launchBtn: "LOVABLE マトリックスを起動",
      dirDockTitle: "フローティング HUD ドック",
      dirDockDesc: "lovable.dev の下部に洗練されたドックが表示されます。画面上のどこへでも自由にドラッグできます。",
      dirTaskTitle: "ニューラルタスクパイプライン",
      dirTaskDesc: "自動生成された暗号化タスクファイルを介して、プロンプトを即時実行します。",
      dirDevTitle: "開発モード＆書き出し",
      dirDevDesc: "PlanとBuildモードを瞬時に切り替え、またはワンクリックで完全なソースコードをダウンロードできます。"
    },
    ko: {
      brandSub: "양자 가속기",
      online: "온라인",
      coreTitle: "뉴럴 코어 상태",
      lblPlatform: "대상 플랫폼",
      lblPipeline: "작업 파이프라인",
      valPipeline: "준비 및 동기화됨",
      lblEncryption: "암호화",
      lblLatency: "주입 지연 시간",
      valLatency: "0.02ms (초저지연)",
      launchBtn: "LOVABLE 매트릭스 시작",
      dirDockTitle: "플로팅 HUD 독",
      dirDockDesc: "lovable.dev 하단에 세련된 흑요석 독이 나타납니다. 화면 어디로든 드래그하여 배치할 수 있습니다.",
      dirTaskTitle: "뉴럴 작업 파이프라인",
      dirTaskDesc: "자동 생성된 암호화 작업 파일을 통해 즉시 실행되는 프롬프트를 원활하게 전송합니다.",
      dirDevTitle: "개발 모드 및 내보내기",
      dirDevDesc: "Plan 및 Build 모드를 전환하거나 한 번의 클릭으로 전체 소스 코드를 다운로드하세요."
    }
  };

  let currentLang = "en";

  function applyLanguage(lang) {
    if (!I18N_POPUP[lang]) lang = "en";
    currentLang = lang;
    const dict = I18N_POPUP[lang] || I18N_POPUP.en;

    const setTxt = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setTxt("sp-brand-sub", dict.brandSub);
    setTxt("sp-online-tag", dict.online);
    setTxt("sp-core-title", dict.coreTitle);
    setTxt("sp-lbl-platform", dict.lblPlatform);
    setTxt("sp-lbl-pipeline", dict.lblPipeline);
    setTxt("sp-val-pipeline", dict.valPipeline);
    setTxt("sp-lbl-encryption", dict.lblEncryption);
    setTxt("sp-lbl-latency", dict.lblLatency);
    setTxt("sp-val-latency", dict.valLatency);
    setTxt("sp-launch-txt", dict.launchBtn);
    setTxt("sp-dir-dock-title", dict.dirDockTitle);
    setTxt("sp-dir-dock-desc", dict.dirDockDesc);
    setTxt("sp-dir-task-title", dict.dirTaskTitle);
    setTxt("sp-dir-task-desc", dict.dirTaskDesc);
    setTxt("sp-dir-dev-title", dict.dirDevTitle);
    setTxt("sp-dir-dev-desc", dict.dirDevDesc);

    const sel = document.getElementById("sp-lang-select");
    if (sel && sel.value !== lang) {
      sel.value = lang;
    }
  }

  function init() {
    const sel = document.getElementById("sp-lang-select");
    if (sel) {
      sel.addEventListener("change", function () {
        const next = sel.value;
        if (I18N_POPUP[next]) {
          currentLang = next;
          applyLanguage(next);
          try {
            if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
              chrome.storage.local.set({ trivis_ui_lang: next });
            }
          } catch (_) {}
          try { localStorage.setItem("trivis_ui_lang", next); } catch (_) {}
        }
      });
    }

    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(["trivis_ui_lang"], function (res) {
          if (res && res.trivis_ui_lang && I18N_POPUP[res.trivis_ui_lang]) {
            applyLanguage(res.trivis_ui_lang);
          } else {
            try {
              const ls = localStorage.getItem("trivis_ui_lang");
              if (ls && I18N_POPUP[ls]) applyLanguage(ls);
              else applyLanguage("en");
            } catch (_) {
              applyLanguage("en");
            }
          }
        });

        chrome.storage.onChanged.addListener(function (changes, area) {
          if (area === "local" && changes.trivis_ui_lang && changes.trivis_ui_lang.newValue) {
            applyLanguage(changes.trivis_ui_lang.newValue);
          }
        });
      } else {
        applyLanguage("en");
      }
    } catch (_) {
      applyLanguage("en");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
