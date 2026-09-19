/**
 * Trivis — polished liquid glass dock (UI only; page-ws untouched)
 */
(function () {
  "use strict";
  if (window.__TRIVIS_VX_BAR_V9__) return;
  window.__TRIVIS_VX_BAR_V9__ = true;

  const LINKS = {
    youtube: "https://www.youtube.com/@Triv1s",
    discord: "https://discord.com/invite/SvxytM8Y2p",
    instagram: "https://www.instagram.com/trivis.dev/",
    telegram: "https://t.me/Trivisdev"
  };
  const PLANS = [
    { price: "₹99", label: "5 days", id: "5d", devices: "2 devices", tag: "STARTER", feats: ["Fix path active", "2 max devices", "Standard support"] },
    { price: "₹229", label: "12 days", id: "12d", devices: "3 devices", tag: "POPULAR", feats: ["Fix path active", "3 max devices", "Priority support"], hot: true },
    { price: "₹399", label: "22 days", id: "22d", devices: "5 devices", tag: "PRO", feats: ["Fix path active", "5 max devices", "Fast support"] },
    { price: "₹599", label: "35 days", id: "35d", devices: "Custom devices", tag: "MAX", feats: ["Fix path active", "Custom max devices", "VIP support"] },
    { price: "₹1999", label: "1 month", id: "res", devices: "Reseller", tag: "RESELLER", feats: ["Admin panel access", "Full source code updates", "Commission 30% to us"] },
    { price: "₹4999", label: "1 month", id: "pres", devices: "Pro Reseller", tag: "PRO RESELLER", feats: ["VIP admin panel", "Unlimited license keys", "Full source + setup", "Commission 0%"] }
  ];
  const LANGS = [
    { id: "en", label: "English", sub: "English · Global", code: "EN", flag: "🇺🇸", region: "Global / US" },
    { id: "hi", label: "हिन्दी", sub: "Hindi · भारत", code: "HI", flag: "🇮🇳", region: "India" },
    { id: "es", label: "Español", sub: "Spanish · España", code: "ES", flag: "🇪🇸", region: "Spain / LatAm" },
    { id: "pt", label: "Português", sub: "Portuguese · Brasil", code: "PT", flag: "🇧🇷", region: "Brazil / Portugal" },
    { id: "ar", label: "العربية", sub: "Arabic · الشرق الأوسط", code: "AR", flag: "🇸🇦", region: "Middle East" },
    { id: "id", label: "Indonesia", sub: "Indonesian · Bahasa", code: "ID", flag: "🇮🇩", region: "Indonesia" },
    { id: "fr", label: "Français", sub: "French · France", code: "FR", flag: "🇫🇷", region: "France" },
    { id: "de", label: "Deutsch", sub: "German · Deutschland", code: "DE", flag: "🇩🇪", region: "Germany" },
    { id: "ru", label: "Русский", sub: "Russian · Россия", code: "RU", flag: "🇷🇺", region: "Russia" },
    { id: "zh", label: "中文", sub: "Chinese · 简体中文", code: "ZH", flag: "🇨🇳", region: "China" },
    { id: "ja", label: "日本語", sub: "Japanese · 日本", code: "JA", flag: "🇯🇵", region: "Japan" },
    { id: "ko", label: "한국어", sub: "Korean · 대한민국", code: "KO", flag: "🇰🇷", region: "Korea" }
  ];

  let lang = "en", light = false, expanded = false, currentTab = "welcome";
  let root, panel, bodyEl, pos = null, dragState = null;

  const I18N = {
  "en": {
    "langName": "English",
    "tipOverview": "Trivis Dev Overview",
    "tipLang": "Language",
    "tipSocial": "Community & Channels",
    "tipFeatures": "Dev Automation",
    "tipChat": "Neural Studio",
    "tipKey": "Security Pass",
    "tipExpand": "Expand HUD",
    "tipCollapse": "Collapse HUD",
    "commandCenter": "Command Center",
    "operativeSession": "Operative session active. Lovable path locked in with ultra-low latency and automated dev pipeline.",
    "openSecurityPass": "Open Security Pass →",
    "secPassDesc": "Active VIP license & quota metrics",
    "devAutoDesc": "Auto-approve, cloud bridge & watermark strip",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "TACTICAL SUITE",
    "devAuto": "DEV AUTOMATION",
    "devSub": "Trivis Dev — mission-ready toolchain",
    "autoApprove": "Auto Approval Engine",
    "autoApproveSub": "Auto-click Lovable approve / allow prompts",
    "engineActive": "ENGINE ACTIVE // AUTO-APPROVING",
    "engineStandby": "ENGINE STANDBY",
    "featWm": "Watermark Annihilator",
    "featWmSub": "Strip all Lovable branding",
    "featCloud": "Supabase Cloud Bridge",
    "featCloudSub": "Instant DB & Auth hookup",
    "featScaffold": "Architecture Scaffold",
    "featScaffoldSub": "Clean workspace project prompt",
    "featVault": "Full Source Vault",
    "featVaultSub": "Export clean ZIP code package",
    "wmScrubbed": "Watermarks Annihilated ✓ (DOM + Code prompt armed)",
    "sbBridged": "Supabase Cloud Bridge Armed ✓",
    "archScaffolded": "Architecture Scaffold Dispatched ✓",
    "vaultExported": "Full Source Vault: ZIP Package Triggered ✓",
    "commNexus": "COMMUNITY NEXUS",
    "offChannels": "Official Channels",
    "offChannelsSub": "Official verified Trivis developer ecosystem",
    "subscribe": "SUBSCRIBE",
    "joinServer": "JOIN SERVER",
    "follow": "FOLLOW",
    "joinNow": "JOIN NOW",
    "vipPass": "VIP SECURITY PASS",
    "tier1Pro": "TIER 1 // PRO",
    "cryptoLicense": "CRYPTOGRAPHIC LICENSE KEY",
    "quotaBandwidth": "QUOTA & BANDWIDTH",
    "unlimited": "UNLIMITED",
    "quotaSub": "Sub-0.02ms latency · Dedicated Lovable channel",
    "timeRemaining": "TIME REMAINING",
    "cloudSync": "CLOUD SYNC",
    "projectSynced": "Project Synced",
    "standbyMode": "Standby Mode",
    "switchAccount": "Switch Account",
    "storeTiers": "Store / Tiers",
    "support": "Support",
    "disconnect": "Disconnect",
    "copy": "Copy",
    "copied": "Copied ✓",
    "activeVip": "Active VIP",
    "verifiedPro": "Verified Pro",
    "chatTitle": "Trivis",
    "chatSub": "Ship prompts as a secure task file. Lovable reads the file and finishes the job — stable, clean, automatic.",
    "askLovable": "Ask Lovable…",
    "planMode": "Plan",
    "buildMode": "Build",
    "promptHistory": "PROMPT HISTORY",
    "clearAll": "Clear All",
    "noHistory": "No prompt history recorded",
    "noHistorySub": "Dispatched prompts will be archived here",
    "use": "Use",
    "sent": "Dispatched to Lovable ✓",
    "sendFailed": "Send failed",
    "promptLoaded": "Prompt loaded into Lovable ✓",
    "langMatrix": "LOCALIZATION MATRIX",
    "langTitle": "Language Selection",
    "langSub": "Select preferred language for entire extension interface",
    "langChanged": "Language updated",
    "vipStore": "VIP STORE // SUBSCRIPTION TIERS",
    "vipStoreSub": "Select preferred tier to upgrade quota and unlock VIP pipeline",
    "getPlan": "Get plan →",
    "cancel": "Cancel"
  },
  "hi": {
    "langName": "हिन्दी",
    "tipOverview": "ट्रिविस अवलोकन",
    "tipLang": "भाषा चयन",
    "tipSocial": "कम्युनिटी और चैनल",
    "tipFeatures": "डेव ऑटोमेशन",
    "tipChat": "न्यूरल स्टूडियो",
    "tipKey": "सिक्योरिटी पास",
    "tipExpand": "HUD विस्तार करें",
    "tipCollapse": "HUD समेटें",
    "commandCenter": "कमांड सेंटर",
    "operativeSession": "सक्रिय सत्र। अल्ट्रा-लो लेटेंसी और स्वचालित डेव पाइपलाइन तैयार।",
    "openSecurityPass": "सिक्योरिटी पास खोलें →",
    "secPassDesc": "सक्रिय वीआईपी लाइसेंस और कोटा मेट्रिक्स",
    "devAutoDesc": "ऑटो-अप्रूव, क्लाउड ब्रिज और वॉटरमार्क निष्कासन",
    "offChanDesc": "यूट्यूब, डिस्कॉर्ड, इंस्टाग्राम, टेलीग्राम",
    "devSuite": "टैक्टिकल सूट",
    "devAuto": "डेव ऑटोमेशन",
    "devSub": "ट्रिविस डेव — मिशन-रेडी टूलचेन",
    "autoApprove": "ऑटो अप्रूवल इंजन",
    "autoApproveSub": "लवेबल अप्रूव प्रॉम्ट्स को स्वचालित क्लिक करें",
    "engineActive": "इंजन सक्रिय // ऑटो-अप्रूविंग",
    "engineStandby": "इंजन स्टैंडबाय",
    "featWm": "वॉटरमार्क एनीहिलेटर",
    "featWmSub": "सभी लवेबल ब्रांडिंग हटाएं",
    "featCloud": "सुपाबेस क्लाउड ब्रिज",
    "featCloudSub": "तुरंत डेटाबेस और ऑथ हुकअप",
    "featScaffold": "आर्किटेक्चर मचान",
    "featScaffoldSub": "क्लीन वर्कस्पेस प्रोजेक्ट प्रॉम्ट",
    "featVault": "फुल सोर्स वॉल्ट",
    "featVaultSub": "क्लीन ज़िप कोड पैकेज एक्सपोर्ट करें",
    "wmScrubbed": "वॉटरमार्क समाप्त ✓ (DOM + कोड प्रॉम्ट)",
    "sbBridged": "सुपाबेस क्लाउड ब्रिज सक्रिय ✓",
    "archScaffolded": "आर्किटेक्चर प्रॉम्ट भेजा गया ✓",
    "vaultExported": "फुल सोर्स वॉल्ट: ज़िप पैकेज शुरू ✓",
    "commNexus": "कम्युनिटी नेक्सस",
    "offChannels": "आधिकारिक चैनल",
    "offChannelsSub": "आधिकारिक सत्यापित ट्रिविस डेवलपर इकोसिस्टम",
    "subscribe": "सब्सक्राइब",
    "joinServer": "सर्वर जॉइन करें",
    "follow": "फॉलो",
    "joinNow": "अभी जॉइन करें",
    "vipPass": "वीआईपी सिक्योरिटी पास",
    "tier1Pro": "टियर 1 // प्रो",
    "cryptoLicense": "क्रिप्टोग्राफिक लाइसेंस की",
    "quotaBandwidth": "कोटा और बैंडविड्थ",
    "unlimited": "असीमित",
    "quotaSub": "0.02ms लेटेंसी · समर्पित लवेबल चैनल",
    "timeRemaining": "शेष समय",
    "cloudSync": "क्लाउड सिंक",
    "projectSynced": "प्रोजेक्ट सिंक",
    "standbyMode": "स्टैंडबाय मोड",
    "switchAccount": "अकाउंट बदलें",
    "storeTiers": "स्टोर / टियर्स",
    "support": "सपोर्ट",
    "disconnect": "डिस्कनेक्ट",
    "copy": "कॉपी",
    "copied": "कॉपी किया गया ✓",
    "activeVip": "सक्रिय वीआईपी",
    "verifiedPro": "सत्यापित प्रो",
    "chatTitle": "ट्रिविस",
    "chatSub": "प्रॉम्ट्स को सुरक्षित टास्क फाइल के रूप में भेजें। लवेबल काम पूरा करेगा — स्थिर, स्वच्छ, स्वचालित।",
    "askLovable": "लवेबल से पूछें…",
    "planMode": "प्लान",
    "buildMode": "बिल्ड",
    "promptHistory": "प्रॉम्ट हिस्ट्री",
    "clearAll": "सब साफ़ करें",
    "noHistory": "कोई प्रॉम्ट हिस्ट्री दर्ज नहीं",
    "noHistorySub": "भेजे गए प्रॉम्ट्स यहाँ सुरक्षित होंगे",
    "use": "उपयोग",
    "sent": "लवेबल को भेजा गया ✓",
    "sendFailed": "भेजना विफल",
    "promptLoaded": "प्रॉम्ट लवेबल में लोड हुआ ✓",
    "langMatrix": "स्थानीयकरण मैट्रिक्स",
    "langTitle": "भाषा चयन",
    "langSub": "पूरे एक्सटेंशन इंटरफेस के लिए पसंदीदा भाषा चुनें",
    "langChanged": "भाषा अपडेट की गई",
    "vipStore": "वीआईपी स्टोर // सदस्यता स्तर",
    "vipStoreSub": "कोटा अपग्रेड करने और वीआईपी पाइपलाइन अनलॉक करने के लिए प्लान चुनें",
    "getPlan": "प्लान प्राप्त करें →",
    "cancel": "रद्द करें"
  },
  "es": {
    "langName": "Español",
    "tipOverview": "Resumen Trivis Dev",
    "tipLang": "Idioma",
    "tipSocial": "Comunidad y Canales",
    "tipFeatures": "Automatización Dev",
    "tipChat": "Estudio Neural",
    "tipKey": "Pase de Seguridad",
    "tipExpand": "Expandir HUD",
    "tipCollapse": "Colapsar HUD",
    "commandCenter": "Centro de Comando",
    "operativeSession": "Sesión operativa activa con latencia ultra baja y tubería de desarrollo automatizada.",
    "openSecurityPass": "Abrir Pase de Seguridad →",
    "secPassDesc": "Licencia VIP activa y métricas de cuota",
    "devAutoDesc": "Auto-aprobación, puente cloud y borrado de marcas",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "SUITE TÁCTICA",
    "devAuto": "AUTOMATIZACIÓN DEV",
    "devSub": "Trivis Dev — kit listo para misión",
    "autoApprove": "Motor de Auto Aprobación",
    "autoApproveSub": "Auto-clic en avisos de aprobación de Lovable",
    "engineActive": "MOTOR ACTIVO // AUTO-APROBANDO",
    "engineStandby": "MOTOR EN ESPERA",
    "featWm": "Aniquilador de Marcas de Agua",
    "featWmSub": "Eliminar toda la marca de Lovable",
    "featCloud": "Puente Cloud Supabase",
    "featCloudSub": "Conexión instantánea de BD y Auth",
    "featScaffold": "Andamiaje de Arquitectura",
    "featScaffoldSub": "Prompt de proyecto limpio",
    "featVault": "Bóveda de Código Fuente",
    "featVaultSub": "Exportar paquete ZIP limpio",
    "wmScrubbed": "Marcas de agua eliminadas ✓",
    "sbBridged": "Puente Supabase activado ✓",
    "archScaffolded": "Andamiaje enviado ✓",
    "vaultExported": "Exportación ZIP iniciada ✓",
    "commNexus": "NEXO DE COMUNIDAD",
    "offChannels": "Canales Oficiales",
    "offChannelsSub": "Ecosistema oficial verificado de Trivis",
    "subscribe": "SUSCRIBIRSE",
    "joinServer": "UNIRSE AL SERVIDOR",
    "follow": "SEGUIR",
    "joinNow": "UNIRSE AHORA",
    "vipPass": "PASE DE SEGURIDAD VIP",
    "tier1Pro": "TIER 1 // PRO",
    "cryptoLicense": "CLAVE DE LICENCIA CRIPTOGRÁFICA",
    "quotaBandwidth": "CUOTA Y ANCHO DE BANDA",
    "unlimited": "ILIMITADO",
    "quotaSub": "Latencia <0.02ms · Canal dedicado Lovable",
    "timeRemaining": "TIEMPO RESTANTE",
    "cloudSync": "SINCRONIZACIÓN CLOUD",
    "projectSynced": "Proyecto Sincronizado",
    "standbyMode": "Modo de Espera",
    "switchAccount": "Cambiar Cuenta",
    "storeTiers": "Tienda / Niveles",
    "support": "Soporte",
    "disconnect": "Desconectar",
    "copy": "Copiar",
    "copied": "Copiado ✓",
    "activeVip": "VIP Activo",
    "verifiedPro": "Pro Verificado",
    "chatTitle": "Trivis",
    "chatSub": "Envía prompts como archivos de tarea seguros. Lovable completa el trabajo de forma limpia y automática.",
    "askLovable": "Pregunta a Lovable…",
    "planMode": "Plan",
    "buildMode": "Build",
    "promptHistory": "HISTORIAL DE PROMPTS",
    "clearAll": "Borrar Todo",
    "noHistory": "Sin historial de prompts",
    "noHistorySub": "Los prompts enviados se archivarán aquí",
    "use": "Usar",
    "sent": "Enviado a Lovable ✓",
    "sendFailed": "Error de envío",
    "promptLoaded": "Prompt cargado en Lovable ✓",
    "langMatrix": "MATRIZ DE LOCALIZACIÓN",
    "langTitle": "Selección de Idioma",
    "langSub": "Selecciona el idioma preferido para toda la extensión",
    "langChanged": "Idioma actualizado",
    "vipStore": "TIENDA VIP // NIVELES",
    "vipStoreSub": "Selecciona un nivel para ampliar cuota y desbloquear VIP",
    "getPlan": "Obtener plan →",
    "cancel": "Cancelar"
  },
  "pt": {
    "langName": "Português",
    "tipOverview": "Visão Geral Trivis",
    "tipLang": "Idioma",
    "tipSocial": "Comunidade e Canais",
    "tipFeatures": "Automação Dev",
    "tipChat": "Estúdio Neural",
    "tipKey": "Passe de Segurança",
    "tipExpand": "Expandir HUD",
    "tipCollapse": "Recolher HUD",
    "commandCenter": "Centro de Comando",
    "operativeSession": "Sessão operativa ativa com latência ultra baixa e pipeline de dev automatizado.",
    "openSecurityPass": "Abrir Passe de Segurança →",
    "secPassDesc": "Licença VIP ativa e métricas de cota",
    "devAutoDesc": "Auto-aprovação, ponte cloud e remoção de marcas",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "SUÍTE TÁTICA",
    "devAuto": "AUTOMAÇÃO DEV",
    "devSub": "Trivis Dev — pronto para missão",
    "autoApprove": "Motor de Auto Aprovação",
    "autoApproveSub": "Aprovar avisos do Lovable automaticamente",
    "engineActive": "MOTOR ATIVO // AUTO-APROVANDO",
    "engineStandby": "MOTOR EM ESPERA",
    "featWm": "Aniquilador de Marcas d'Água",
    "featWmSub": "Remover toda marca do Lovable",
    "featCloud": "Ponte Supabase Cloud",
    "featCloudSub": "Conexão instantânea de BD e Auth",
    "featScaffold": "Estrutura de Arquitetura",
    "featScaffoldSub": "Prompt de projeto limpo",
    "featVault": "Cofre de Código Fonte",
    "featVaultSub": "Exportar pacote ZIP completo",
    "wmScrubbed": "Marcas d'água removidas ✓",
    "sbBridged": "Ponte Supabase ativada ✓",
    "archScaffolded": "Estrutura enviada ✓",
    "vaultExported": "Exportação ZIP iniciada ✓",
    "commNexus": "NEXO DA COMUNIDADE",
    "offChannels": "Canais Oficiais",
    "offChannelsSub": "Ecossistema oficial verificado Trivis",
    "subscribe": "INSCREVER-SE",
    "joinServer": "ENTRAR NO SERVIDOR",
    "follow": "SEGUIR",
    "joinNow": "ENTRAR AGORA",
    "vipPass": "PASSE DE SEGURANÇA VIP",
    "tier1Pro": "TIER 1 // PRO",
    "cryptoLicense": "CHAVE DE LICENÇA CRIPTOGRÁFICA",
    "quotaBandwidth": "COTA E LARGURA DE BANDA",
    "unlimited": "ILIMITADO",
    "quotaSub": "Latência <0.02ms · Canal dedicado Lovable",
    "timeRemaining": "TEMPO RESTANTE",
    "cloudSync": "SINCRONIZAÇÃO CLOUD",
    "projectSynced": "Projeto Sincronizado",
    "standbyMode": "Modo de Espera",
    "switchAccount": "Trocar Conta",
    "storeTiers": "Loja / Planos",
    "support": "Suporte",
    "disconnect": "Desconectar",
    "copy": "Copiar",
    "copied": "Copiado ✓",
    "activeVip": "VIP Ativo",
    "verifiedPro": "Pro Verificado",
    "chatTitle": "Trivis",
    "chatSub": "Envie prompts como arquivos de tarefas seguros. Lovable conclui o trabalho de forma limpa e automática.",
    "askLovable": "Pergunte ao Lovable…",
    "planMode": "Plan",
    "buildMode": "Build",
    "promptHistory": "HISTÓRICO DE PROMPTS",
    "clearAll": "Limpar Tudo",
    "noHistory": "Nenhum histórico registrado",
    "noHistorySub": "Prompts enviados serão arquivados aqui",
    "use": "Usar",
    "sent": "Enviado ao Lovable ✓",
    "sendFailed": "Falha no envio",
    "promptLoaded": "Prompt carregado no Lovable ✓",
    "langMatrix": "MATRIZ DE LOCALIZAÇÃO",
    "langTitle": "Seleção de Idioma",
    "langSub": "Selecione o idioma preferido para toda a interface",
    "langChanged": "Idioma atualizado",
    "vipStore": "LOJA VIP // PLANOS",
    "vipStoreSub": "Escolha um plano para expandir a cota e liberar recursos VIP",
    "getPlan": "Obter plano →",
    "cancel": "Cancelar"
  },
  "ar": {
    "langName": "العربية",
    "tipOverview": "نظرة عامة تريفيس",
    "tipLang": "اللغة",
    "tipSocial": "المجتمع والقنوات",
    "tipFeatures": "أتمتة التطوير",
    "tipChat": "الاستوديو العصبي",
    "tipKey": "تصريح الأمان",
    "tipExpand": "توسيع الواجهة",
    "tipCollapse": "طي الواجهة",
    "commandCenter": "مركز القيادة",
    "operativeSession": "جلسة العمليات نشطة بزمن انتقال فائق السرعة وخط تطوير مؤتمت.",
    "openSecurityPass": "فتح تصريح الأمان →",
    "secPassDesc": "ترخيص VIP نشط ومقاييس الحصة",
    "devAutoDesc": "موافقة تلقائية وجسر سحابي وإزالة العلامات",
    "offChanDesc": "يوتيوب، ديسكورد، إنستغرام، تيليجرام",
    "devSuite": "الحزمة التكتيكية",
    "devAuto": "أتمتة التطوير",
    "devSub": "تريفيس ديف — أدوات جاهزة للمهام",
    "autoApprove": "محرك الموافقة التلقائية",
    "autoApproveSub": "الموافقة التلقائية على مطالبات لوفابل",
    "engineActive": "المحرك نشط // موافقة تلقائية",
    "engineStandby": "المحرك في وضع الاستعداد",
    "featWm": "إزالة العلامة المائية",
    "featWmSub": "إزالة جميع شعارات لوفابل",
    "featCloud": "جسر سوبابيس السحابي",
    "featCloudSub": "ربط فوري لقواعد البيانات والمصادقة",
    "featScaffold": "هيكلة البنية البرمجية",
    "featScaffoldSub": "موجه مساحة عمل نظيف",
    "featVault": "مستودع الكود المصدري",
    "featVaultSub": "تصدير حزمة ZIP نظيفة",
    "wmScrubbed": "تمت إزالة العلامات المائية ✓",
    "sbBridged": "تم تفعيل جسر سوبابيس ✓",
    "archScaffolded": "تم إرسال الهيكلة ✓",
    "vaultExported": "بدأ تصدير حزمة ZIP ✓",
    "commNexus": "ملتقى المجتمع",
    "offChannels": "القنوات الرسمية",
    "offChannelsSub": "بيئة مطوري تريفيس الرسمية المعتمدة",
    "subscribe": "اشتراك",
    "joinServer": "انضم إلى الخادم",
    "follow": "متابعة",
    "joinNow": "انضم الآن",
    "vipPass": "تصريح أمان VIP",
    "tier1Pro": "المستوى 1 // برو",
    "cryptoLicense": "مفتاح ترخيص مشفر",
    "quotaBandwidth": "الحصة وعرض النطاق",
    "unlimited": "غير محدود",
    "quotaSub": "زمن انتقال <0.02ms · قناة مخصصة لـ Lovable",
    "timeRemaining": "الوقت المتبقي",
    "cloudSync": "المزامنة السحابية",
    "projectSynced": "المشروع متزامن",
    "standbyMode": "وضع الاستعداد",
    "switchAccount": "تبديل الحساب",
    "storeTiers": "المتجر / الفئات",
    "support": "الدعم",
    "disconnect": "قطع الاتصال",
    "copy": "نسخ",
    "copied": "تم النسخ ✓",
    "activeVip": "VIP نشط",
    "verifiedPro": "برو معتمد",
    "chatTitle": "تريفيس",
    "chatSub": "إرسال التوجيهات كملفات مهام آمنة مع تنفيذ نظيف ومؤتمت.",
    "askLovable": "اسأل لوفابل…",
    "planMode": "تخطيط",
    "buildMode": "بناء",
    "promptHistory": "سجل التوجيهات",
    "clearAll": "مسح الكل",
    "noHistory": "لا يوجد سجل توجيهات",
    "noHistorySub": "سيتم أرشفة التوجيهات المرسلة هنا",
    "use": "استخدام",
    "sent": "تم الإرسال إلى Lovable ✓",
    "sendFailed": "فشل الإرسال",
    "promptLoaded": "تم تحميل الموجه إلى Lovable ✓",
    "langMatrix": "مصفوفة التوطين",
    "langTitle": "اختيار اللغة",
    "langSub": "حدد لغتك المفضلة لكامل واجهة الملحق",
    "langChanged": "تم تحديث اللغة",
    "vipStore": "متجر VIP // الفئات",
    "vipStoreSub": "اختر الفئة المفضلة لترقية الحصة وفتح خط VIP",
    "getPlan": "الحصول على الخطة →",
    "cancel": "إلغاء"
  },
  "id": {
    "langName": "Indonesia",
    "tipOverview": "Ikhtisar Trivis Dev",
    "tipLang": "Bahasa",
    "tipSocial": "Komunitas & Saluran",
    "tipFeatures": "Otomasi Dev",
    "tipChat": "Studio Neural",
    "tipKey": "Izin Keamanan",
    "tipExpand": "Perluas HUD",
    "tipCollapse": "Kecilkan HUD",
    "commandCenter": "Pusat Komando",
    "operativeSession": "Sesi operatif aktif dengan latensi ultra rendah dan pipeline otomatis.",
    "openSecurityPass": "Buka Izin Keamanan →",
    "secPassDesc": "Lisensi VIP aktif & metrik kuota",
    "devAutoDesc": "Otomatis approve, jembatan cloud & hapus watermark",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "PAKET TAKTIS",
    "devAuto": "OTOMASI DEV",
    "devSub": "Trivis Dev — toolchain siap pakai",
    "autoApprove": "Mesin Persetujuan Otomatis",
    "autoApproveSub": "Klik otomatis persetujuan Lovable",
    "engineActive": "MESIN AKTIF // OTOMATIS MENYETUJUI",
    "engineStandby": "MESIN STANDBY",
    "featWm": "Pemusnah Watermark",
    "featWmSub": "Hapus semua branding Lovable",
    "featCloud": "Jembatan Cloud Supabase",
    "featCloudSub": "Koneksi instan DB & Auth",
    "featScaffold": "Kerangka Arsitektur",
    "featScaffoldSub": "Prompt proyek bersih",
    "featVault": "Gudang Kode Sumber",
    "featVaultSub": "Ekspor paket ZIP bersih",
    "wmScrubbed": "Watermark Dihapus ✓",
    "sbBridged": "Jembatan Supabase Aktif ✓",
    "archScaffolded": "Kerangka Terkirim ✓",
    "vaultExported": "Ekspor ZIP Dimulai ✓",
    "commNexus": "JARINGAN KOMUNITAS",
    "offChannels": "Saluran Resmi",
    "offChannelsSub": "Ekosistem pengembang resmi Trivis",
    "subscribe": "LANGGANAN",
    "joinServer": "GABUNG SERVER",
    "follow": "IKUTI",
    "joinNow": "GABUNG SEKARANG",
    "vipPass": "IZIN KEAMANAN VIP",
    "tier1Pro": "TIER 1 // PRO",
    "cryptoLicense": "KUNCI LISENSI KRIPTOGRAFI",
    "quotaBandwidth": "KUOTA & BANDWIDTH",
    "unlimited": "UNLIMITED",
    "quotaSub": "Latensi <0.02ms · Saluran khusus Lovable",
    "timeRemaining": "WAKTU TERSISA",
    "cloudSync": "SINKRONISASI CLOUD",
    "projectSynced": "Proyek Tersinkron",
    "standbyMode": "Mode Standby",
    "switchAccount": "Ganti Akun",
    "storeTiers": "Toko / Paket",
    "support": "Bantuan",
    "disconnect": "Putuskan",
    "copy": "Salin",
    "copied": "Tersalin ✓",
    "activeVip": "VIP Aktif",
    "verifiedPro": "Pro Terverifikasi",
    "chatTitle": "Trivis",
    "chatSub": "Kirim prompt sebagai file tugas aman. Lovable menyelesaikan pekerjaan dengan rapi dan otomatis.",
    "askLovable": "Tanya Lovable…",
    "planMode": "Plan",
    "buildMode": "Build",
    "promptHistory": "RIWAYAT PROMPT",
    "clearAll": "Hapus Semua",
    "noHistory": "Belum ada riwayat prompt",
    "noHistorySub": "Prompt yang dikirim akan diarsipkan di sini",
    "use": "Pakai",
    "sent": "Terkirim ke Lovable ✓",
    "sendFailed": "Gagal kirim",
    "promptLoaded": "Prompt dimuat ke Lovable ✓",
    "langMatrix": "MATRIKS LOKALISASI",
    "langTitle": "Pilihan Bahasa",
    "langSub": "Pilih bahasa untuk seluruh tampilan ekstensi",
    "langChanged": "Bahasa diperbarui",
    "vipStore": "TOKO VIP // TINGKATAN",
    "vipStoreSub": "Pilih paket untuk menambah kuota dan membuka akses VIP",
    "getPlan": "Dapatkan Paket →",
    "cancel": "Batal"
  },
  "fr": {
    "langName": "Français",
    "tipOverview": "Aperçu Trivis Dev",
    "tipLang": "Langue",
    "tipSocial": "Communauté & Canaux",
    "tipFeatures": "Automatisation Dev",
    "tipChat": "Studio Neural",
    "tipKey": "Passe Sécurité",
    "tipExpand": "Agrandir le HUD",
    "tipCollapse": "Réduire le HUD",
    "commandCenter": "Centre de Commandement",
    "operativeSession": "Session opérationnelle active à ultra-faible latence et pipeline automatisé.",
    "openSecurityPass": "Ouvrir le Passe Sécurité →",
    "secPassDesc": "Licence VIP active & métriques de quota",
    "devAutoDesc": "Approbation auto, pont cloud & suppression de filigranes",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "SUITE TACTIQUE",
    "devAuto": "AUTOMATISATION DEV",
    "devSub": "Trivis Dev — chaîne d'outils prête",
    "autoApprove": "Moteur d'Approbation Auto",
    "autoApproveSub": "Clic auto sur les invites Lovable",
    "engineActive": "MOTEUR ACTIF // APPROBATION AUTO",
    "engineStandby": "MOTEUR EN VEILLE",
    "featWm": "Annihilateur de Filigrane",
    "featWmSub": "Supprimer tout le branding Lovable",
    "featCloud": "Pont Cloud Supabase",
    "featCloudSub": "Connexion instantanée BD & Auth",
    "featScaffold": "Échafaudage d'Architecture",
    "featScaffoldSub": "Prompt de projet propre",
    "featVault": "Coffre de Code Source",
    "featVaultSub": "Exporter le package ZIP propre",
    "wmScrubbed": "Filigranes supprimés ✓",
    "sbBridged": "Pont Supabase armé ✓",
    "archScaffolded": "Architecture envoyée ✓",
    "vaultExported": "Export ZIP déclenché ✓",
    "commNexus": "NEXUS COMMUNAUTAIRE",
    "offChannels": "Canaux Officiels",
    "offChannelsSub": "Écosystème officiel certifié Trivis",
    "subscribe": "S'ABONNER",
    "joinServer": "REJOINDRE LE SERVEUR",
    "follow": "SUIVRE",
    "joinNow": "REJOINDRE",
    "vipPass": "PASSE DE SÉCURITÉ VIP",
    "tier1Pro": "TIER 1 // PRO",
    "cryptoLicense": "CLÉ DE LICENCE CRYPTOGRAPHIQUE",
    "quotaBandwidth": "QUOTA & BANDE PASSANTE",
    "unlimited": "ILLIMITÉ",
    "quotaSub": "Latence <0.02ms · Canal dédié Lovable",
    "timeRemaining": "TEMPS RESTANT",
    "cloudSync": "SYNCHRO CLOUD",
    "projectSynced": "Projet Synchronisé",
    "standbyMode": "Mode Veille",
    "switchAccount": "Changer de Compte",
    "storeTiers": "Boutique / Niveaux",
    "support": "Support",
    "disconnect": "Déconnecter",
    "copy": "Copier",
    "copied": "Copié ✓",
    "activeVip": "VIP Actif",
    "verifiedPro": "Pro Vérifié",
    "chatTitle": "Trivis",
    "chatSub": "Envoyez des prompts sous forme de fichiers sécurisés. Lovable termine la tâche proprement et automatiquement.",
    "askLovable": "Demander à Lovable…",
    "planMode": "Plan",
    "buildMode": "Build",
    "promptHistory": "HISTORIQUE DES PROMPTS",
    "clearAll": "Tout Effacer",
    "noHistory": "Aucun historique enregistré",
    "noHistorySub": "Les prompts envoyés seront archivés ici",
    "use": "Utiliser",
    "sent": "Envoyé à Lovable ✓",
    "sendFailed": "Échec de l'envoi",
    "promptLoaded": "Prompt chargé dans Lovable ✓",
    "langMatrix": "MATRICE DE LOCALISATION",
    "langTitle": "Sélection de la Langue",
    "langSub": "Choisissez la langue pour toute l'interface de l'extension",
    "langChanged": "Langue mise à jour",
    "vipStore": "BOUTIQUE VIP // NIVEAUX",
    "vipStoreSub": "Sélectionnez un niveau pour augmenter votre quota et débloquer le pipeline VIP",
    "getPlan": "Obtenir un plan →",
    "cancel": "Annuler"
  },
  "de": {
    "langName": "Deutsch",
    "tipOverview": "Trivis Dev Übersicht",
    "tipLang": "Sprache",
    "tipSocial": "Community & Kanäle",
    "tipFeatures": "Dev-Automatisierung",
    "tipChat": "Neural Studio",
    "tipKey": "Sicherheitspass",
    "tipExpand": "HUD Vergrößern",
    "tipCollapse": "HUD Einklappen",
    "commandCenter": "Kommandozentrale",
    "operativeSession": "Operative Sitzung aktiv mit minimaler Latenz und automatisierter Pipeline.",
    "openSecurityPass": "Sicherheitspass Öffnen →",
    "secPassDesc": "Aktive VIP-Lizenz & Kontingentmetriken",
    "devAutoDesc": "Auto-Approve, Cloud-Bridge & Wasserzeichen-Entfernung",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "TAKTIK-SUITE",
    "devAuto": "DEV-AUTOMATISIERUNG",
    "devSub": "Trivis Dev — einsatzbereite Toolchain",
    "autoApprove": "Automatische Genehmigung",
    "autoApproveSub": "Lovable-Genehmigungen automatisch anklicken",
    "engineActive": "ENGINE AKTIV // AUTOMATISCH",
    "engineStandby": "ENGINE BEREIT",
    "featWm": "Wasserzeichen-Vernichter",
    "featWmSub": "Jegliches Lovable-Branding entfernen",
    "featCloud": "Supabase Cloud Bridge",
    "featCloudSub": "Sofortige DB- & Auth-Anbindung",
    "featScaffold": "Architektur-Gerüst",
    "featScaffoldSub": "Sauberer Workspace-Projekt-Prompt",
    "featVault": "Quellcode-Tresor",
    "featVaultSub": "Sauberes ZIP-Codepaket exportieren",
    "wmScrubbed": "Wasserzeichen entfernt ✓",
    "sbBridged": "Supabase Bridge aktiviert ✓",
    "archScaffolded": "Architektur gesendet ✓",
    "vaultExported": "ZIP-Export gestartet ✓",
    "commNexus": "COMMUNITY-NEXUS",
    "offChannels": "Offizielle Kanäle",
    "offChannelsSub": "Offizielles verifiziertes Trivis-Ökosystem",
    "subscribe": "ABONNIEREN",
    "joinServer": "SERVER BEITRETEN",
    "follow": "FOLGEN",
    "joinNow": "JETZT BEITRETEN",
    "vipPass": "VIP-SICHERHEITSPASS",
    "tier1Pro": "TIER 1 // PRO",
    "cryptoLicense": "KRYPTOGRAFISCHER LIZENZSCHLÜSSEL",
    "quotaBandwidth": "KONTINGENT & BANDBREITE",
    "unlimited": "UNBEGRENZT",
    "quotaSub": "Latenz <0.02ms · Dedizierter Lovable-Kanal",
    "timeRemaining": "VERBLEIBENDE ZEIT",
    "cloudSync": "CLOUD-SYNC",
    "projectSynced": "Projekt Synchronisiert",
    "standbyMode": "Bereitschaftsmodus",
    "switchAccount": "Konto Wechseln",
    "storeTiers": "Shop / Tarife",
    "support": "Support",
    "disconnect": "Trennen",
    "copy": "Kopieren",
    "copied": "Kopiert ✓",
    "activeVip": "VIP Aktiv",
    "verifiedPro": "Verifiziert Pro",
    "chatTitle": "Trivis",
    "chatSub": "Prompts als sichere Aufgabendatei senden. Lovable erledigt die Arbeit sauber und automatisch.",
    "askLovable": "Lovable fragen…",
    "planMode": "Plan",
    "buildMode": "Build",
    "promptHistory": "PROMPT-VERLAUF",
    "clearAll": "Alles Löschen",
    "noHistory": "Kein Verlauf aufgezeichnet",
    "noHistorySub": "Gesendete Prompts werden hier archiviert",
    "use": "Verwenden",
    "sent": "An Lovable gesendet ✓",
    "sendFailed": "Fehler beim Senden",
    "promptLoaded": "Prompt in Lovable geladen ✓",
    "langMatrix": "LOKALISIERUNGSMATRIX",
    "langTitle": "Sprachauswahl",
    "langSub": "Bevorzugte Sprache für die gesamte Erweiterung auswählen",
    "langChanged": "Sprache aktualisiert",
    "vipStore": "VIP-SHOP // TARIFE",
    "vipStoreSub": "Wählen Sie einen Tarif für mehr Kontingent und VIP-Funktionen",
    "getPlan": "Plan wählen →",
    "cancel": "Abbrechen"
  },
  "ru": {
    "langName": "Русский",
    "tipOverview": "Обзор Trivis Dev",
    "tipLang": "Язык",
    "tipSocial": "Сообщество и Каналы",
    "tipFeatures": "Автоматизация Dev",
    "tipChat": "Нейростудия",
    "tipKey": "Пропуск безопасности",
    "tipExpand": "Развернуть HUD",
    "tipCollapse": "Свернуть HUD",
    "commandCenter": "Командный центр",
    "operativeSession": "Сессия активна с ультранизкой задержкой и автоматизированным пайплайном разработки.",
    "openSecurityPass": "Открыть пропуск →",
    "secPassDesc": "Активная VIP лицензия и метрики квот",
    "devAutoDesc": "Автоподтверждение, облачный мост и удаление водяных знаков",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "ТАКТИЧЕСКИЙ НАБОР",
    "devAuto": "АВТОМАТИЗАЦИЯ DEV",
    "devSub": "Trivis Dev — готовый инструментарий",
    "autoApprove": "Автоподтверждение",
    "autoApproveSub": "Автоклики по запросам Lovable",
    "engineActive": "ДВИЖОК АКТИВЕН // АВТОПОДТВЕРЖДЕНИЕ",
    "engineStandby": "ДВИЖОК В ОЖИДАНИИ",
    "featWm": "Уничтожитель водяных знаков",
    "featWmSub": "Удалить все брендинги Lovable",
    "featCloud": "Supabase Cloud Bridge",
    "featCloudSub": "Мгновенное подключение БД и Auth",
    "featScaffold": "Каркас архитектуры",
    "featScaffoldSub": "Чистый шаблон проекта",
    "featVault": "Хранилище исходного кода",
    "featVaultSub": "Экспорт чистого ZIP-пакета",
    "wmScrubbed": "Водяные знаки удалены ✓",
    "sbBridged": "Мост Supabase подключен ✓",
    "archScaffolded": "Архитектура отправлена ✓",
    "vaultExported": "Экспорт ZIP запущен ✓",
    "commNexus": "СООБЩЕСТВО",
    "offChannels": "Официальные каналы",
    "offChannelsSub": "Официальная экосистема разработчиков Trivis",
    "subscribe": "ПОДПИСАТЬСЯ",
    "joinServer": "ВОЙТИ НА СЕРВЕР",
    "follow": "СЛЕДИТЬ",
    "joinNow": "ПРИСОЕДИНИТЬСЯ",
    "vipPass": "VIP ПРОПУСК БЕЗОПАСНОСТИ",
    "tier1Pro": "УРОВЕНЬ 1 // PRO",
    "cryptoLicense": "КРИПТОГРАФИЧЕСКИЙ КЛЮЧ",
    "quotaBandwidth": "КВОТА И ТРАФИК",
    "unlimited": "БЕЗЛИМИТНО",
    "quotaSub": "Задержка <0.02мс · Выделенный канал Lovable",
    "timeRemaining": "ОСТАЛОСЬ ВРЕМЕНИ",
    "cloudSync": "ОБЛАЧНАЯ СИНХРОНИЗАЦИЯ",
    "projectSynced": "Проект синхронизирован",
    "standbyMode": "Режим ожидания",
    "switchAccount": "Сменить аккаунт",
    "storeTiers": "Магазин / Тарифы",
    "support": "Поддержка",
    "disconnect": "Отключить",
    "copy": "Копировать",
    "copied": "Скопировано ✓",
    "activeVip": "Активный VIP",
    "verifiedPro": "Проверен Pro",
    "chatTitle": "Trivis",
    "chatSub": "Отправляйте промпты как защищенные файлы задач. Lovable выполняет работу автоматически и без сбоев.",
    "askLovable": "Спросить Lovable…",
    "planMode": "План",
    "buildMode": "Сборка",
    "promptHistory": "ИСТОРИЯ ПРОМПТОВ",
    "clearAll": "Очистить всё",
    "noHistory": "История промптов пуста",
    "noHistorySub": "Отправленные промпты сохраняются здесь",
    "use": "Вставить",
    "sent": "Отправлено в Lovable ✓",
    "sendFailed": "Ошибка отправки",
    "promptLoaded": "Промпт загружен в Lovable ✓",
    "langMatrix": "МАТРИЦА ЛОКАЛИЗАЦИИ",
    "langTitle": "Выбор языка",
    "langSub": "Выберите предпочтительный язык для всего расширения",
    "langChanged": "Язык обновлен",
    "vipStore": "VIP МАГАЗИН // ТАРИФЫ",
    "vipStoreSub": "Выберите тариф для увеличения квоты и разблокировки VIP",
    "getPlan": "Выбрать тариф →",
    "cancel": "Отмена"
  },
  "zh": {
    "langName": "中文",
    "tipOverview": "Trivis Dev 概览",
    "tipLang": "语言选择",
    "tipSocial": "社区与频道",
    "tipFeatures": "开发自动化",
    "tipChat": "神经工作室",
    "tipKey": "安全通行证",
    "tipExpand": "展开 HUD",
    "tipCollapse": "收起 HUD",
    "commandCenter": "指挥中心",
    "operativeSession": "超低延迟会话已就绪，自动化开发流水线已锁定。",
    "openSecurityPass": "打开安全通行证 →",
    "secPassDesc": "有效 VIP 许可证与配额指标",
    "devAutoDesc": "自动批准、云端桥接与水印移除",
    "offChanDesc": "YouTube、Discord、Instagram、Telegram",
    "devSuite": "战术套件",
    "devAuto": "开发自动化",
    "devSub": "Trivis Dev — 任务就绪工具链",
    "autoApprove": "自动批准引擎",
    "autoApproveSub": "自动点击 Lovable 批准提示",
    "engineActive": "引擎运行中 // 自动批准",
    "engineStandby": "引擎待命",
    "featWm": "水印清除器",
    "featWmSub": "移除所有 Lovable 品牌标识",
    "featCloud": "Supabase 云端桥接",
    "featCloudSub": "即时数据库与身份验证连接",
    "featScaffold": "架构骨架生成",
    "featScaffoldSub": "干净的工作区项目提示词",
    "featVault": "完整源码保险库",
    "featVaultSub": "导出干净的 ZIP 代码包",
    "wmScrubbed": "水印已清除 ✓",
    "sbBridged": "Supabase 桥接已激活 ✓",
    "archScaffolded": "架构提示词已发送 ✓",
    "vaultExported": "ZIP 导出已启动 ✓",
    "commNexus": "社区枢纽",
    "offChannels": "官方频道",
    "offChannelsSub": "官方验证的 Trivis 开发者生态",
    "subscribe": "订阅",
    "joinServer": "加入服务器",
    "follow": "关注",
    "joinNow": "立即加入",
    "vipPass": "VIP 安全通行证",
    "tier1Pro": "等级 1 // PRO",
    "cryptoLicense": "加密许可证密钥",
    "quotaBandwidth": "配额与带宽",
    "unlimited": "无限制",
    "quotaSub": "延迟 <0.02ms · Lovable 专属通道",
    "timeRemaining": "剩余时间",
    "cloudSync": "云端同步",
    "projectSynced": "项目已同步",
    "standbyMode": "待命模式",
    "switchAccount": "切换账户",
    "storeTiers": "商店 / 等级",
    "support": "技术支持",
    "disconnect": "断开连接",
    "copy": "复制",
    "copied": "已复制 ✓",
    "activeVip": "VIP 生效中",
    "verifiedPro": "Pro 认证",
    "chatTitle": "Trivis",
    "chatSub": "以安全任务文件形式发送提示词。Lovable 自动平稳完成任务。",
    "askLovable": "向 Lovable 提问…",
    "planMode": "计划",
    "buildMode": "构建",
    "promptHistory": "提示词历史记录",
    "clearAll": "清空全部",
    "noHistory": "暂无提示词历史",
    "noHistorySub": "发送的提示词将自动归档于此",
    "use": "使用",
    "sent": "已发送至 Lovable ✓",
    "sendFailed": "发送失败",
    "promptLoaded": "提示词已加载至 Lovable ✓",
    "langMatrix": "本地化矩阵",
    "langTitle": "语言选择",
    "langSub": "选择整个扩展界面所使用的首选语言",
    "langChanged": "语言已更新",
    "vipStore": "VIP 商店 // 订阅等级",
    "vipStoreSub": "选择合适的等级以提升配额并解锁 VIP 功能",
    "getPlan": "获取方案 →",
    "cancel": "取消"
  },
  "ja": {
    "langName": "日本語",
    "tipOverview": "Trivis Dev 概要",
    "tipLang": "言語",
    "tipSocial": "コミュニティ＆チャンネル",
    "tipFeatures": "開発自動化",
    "tipChat": "ニューラルスタジオ",
    "tipKey": "セキュリティパス",
    "tipExpand": "HUD を展開",
    "tipCollapse": "HUD を折りたたむ",
    "commandCenter": "コマンドセンター",
    "operativeSession": "超低遅延セッションがアクティブです。自動化開発パイプライン稼働中。",
    "openSecurityPass": "セキュリティパスを開く →",
    "secPassDesc": "有効なVIPライセンス＆使用量メトリクス",
    "devAutoDesc": "自動承認、クラウド連携、透かし消去",
    "offChanDesc": "YouTube、Discord、Instagram、Telegram",
    "devSuite": "タクティカルスイート",
    "devAuto": "開発自動化",
    "devSub": "Trivis Dev — 即応ツールチェーン",
    "autoApprove": "自動承認エンジン",
    "autoApproveSub": "Lovable承認プロンプトを自動クリック",
    "engineActive": "エンジン稼働中 // 自動承認",
    "engineStandby": "エンジン待機中",
    "featWm": "ウォーターマーク消去",
    "featWmSub": "Lovableブランディングを完全削除",
    "featCloud": "Supabase クラウドブリッジ",
    "featCloudSub": "DB＆認証の即時連携",
    "featScaffold": "アーキテクチャ雛形",
    "featScaffoldSub": "クリーンなプロジェクトプロンプト",
    "featVault": "ソースコード保管庫",
    "featVaultSub": "完全なZIPパッケージを書き出し",
    "wmScrubbed": "ウォーターマーク削除完了 ✓",
    "sbBridged": "Supabase連携完了 ✓",
    "archScaffolded": "設計プロンプト送信完了 ✓",
    "vaultExported": "ZIP書き出し開始 ✓",
    "commNexus": "コミュニティ",
    "offChannels": "公式チャンネル",
    "offChannelsSub": "Trivis公式検証済みエコシステム",
    "subscribe": "登録する",
    "joinServer": "サーバーに参加",
    "follow": "フォロー",
    "joinNow": "今すぐ参加",
    "vipPass": "VIPセキュリティパス",
    "tier1Pro": "TIER 1 // PRO",
    "cryptoLicense": "暗号化ライセンスキー",
    "quotaBandwidth": "容量＆帯域",
    "unlimited": "無制限",
    "quotaSub": "遅延 <0.02ms · Lovable専用チャネル",
    "timeRemaining": "残り時間",
    "cloudSync": "クラウド同期",
    "projectSynced": "プロジェクト同期完了",
    "standbyMode": "待機モード",
    "switchAccount": "アカウント切替",
    "storeTiers": "ストア / プラン",
    "support": "サポート",
    "disconnect": "切断",
    "copy": "コピー",
    "copied": "コピー完了 ✓",
    "activeVip": "VIP有効",
    "verifiedPro": "Pro認証済み",
    "chatTitle": "Trivis",
    "chatSub": "安全なタスクファイルとしてプロンプトを送信します。Lovableが安定してタスクを自動完了します。",
    "askLovable": "Lovableに質問…",
    "planMode": "計画",
    "buildMode": "構築",
    "promptHistory": "プロンプト履歴",
    "clearAll": "すべて消去",
    "noHistory": "履歴がありません",
    "noHistorySub": "送信されたプロンプトはここに記録されます",
    "use": "適用",
    "sent": "Lovableに送信完了 ✓",
    "sendFailed": "送信失敗",
    "promptLoaded": "プロンプトをLovableに読み込み完了 ✓",
    "langMatrix": "多言語マトリックス",
    "langTitle": "言語選択",
    "langSub": "拡張機能全体の表示言語を選択してください",
    "langChanged": "言語を更新しました",
    "vipStore": "VIPストア // プラン",
    "vipStoreSub": "容量拡張とVIPパイプライン解放のためのプランを選択",
    "getPlan": "プランを取得 →",
    "cancel": "キャンセル"
  },
  "ko": {
    "langName": "한국어",
    "tipOverview": "Trivis Dev 개요",
    "tipLang": "언어",
    "tipSocial": "커뮤니티 및 채널",
    "tipFeatures": "개발 자동화",
    "tipChat": "뉴럴 스튜디오",
    "tipKey": "보안 패스",
    "tipExpand": "HUD 확장",
    "tipCollapse": "HUD 축소",
    "commandCenter": "지휘 센터",
    "operativeSession": "초저지연 세션이 활성화되었습니다. 자동화된 개발 파이프라인 가동 중.",
    "openSecurityPass": "보안 패스 열기 →",
    "secPassDesc": "활성 VIP 라이선스 및 할당량 지표",
    "devAutoDesc": "자동 승인, 클라우드 연결 및 워터마크 제거",
    "offChanDesc": "YouTube, Discord, Instagram, Telegram",
    "devSuite": "전술 제품군",
    "devAuto": "개발 자동화",
    "devSub": "Trivis Dev — 미션 준비 도구 체인",
    "autoApprove": "자동 승인 엔진",
    "autoApproveSub": "Lovable 승인 프롬프트 자동 클릭",
    "engineActive": "엔진 작동 중 // 자동 승인",
    "engineStandby": "엔진 대기 중",
    "featWm": "워터마크 완전 제거",
    "featWmSub": "모든 Lovable 브랜딩 삭제",
    "featCloud": "Supabase 클라우드 브리지",
    "featCloudSub": "DB 및 인증 즉시 연결",
    "featScaffold": "아키텍처 스캐폴드",
    "featScaffoldSub": "깔끔한 작업 공간 프로젝트 프롬프트",
    "featVault": "전체 소스 볼트",
    "featVaultSub": "깔끔한 ZIP 코드 패키지 내보내기",
    "wmScrubbed": "워터마크 제거 완료 ✓",
    "sbBridged": "Supabase 브리지 연결 완료 ✓",
    "archScaffolded": "아키텍처 프롬프트 전송 완료 ✓",
    "vaultExported": "ZIP 내보내기 시작 ✓",
    "commNexus": "커뮤니티 넥서스",
    "offChannels": "공식 채널",
    "offChannelsSub": "공식 인증된 Trivis 개발자 생태계",
    "subscribe": "구독",
    "joinServer": "서버 참여",
    "follow": "팔로우",
    "joinNow": "지금 참여",
    "vipPass": "VIP 보안 패스",
    "tier1Pro": "티어 1 // PRO",
    "cryptoLicense": "암호화 라이선스 키",
    "quotaBandwidth": "할당량 및 대역폭",
    "unlimited": "무제한",
    "quotaSub": "지연 시간 <0.02ms · 전용 Lovable 채널",
    "timeRemaining": "남은 시간",
    "cloudSync": "클라우드 동기화",
    "projectSynced": "프로젝트 동기화됨",
    "standbyMode": "대기 모드",
    "switchAccount": "계정 전환",
    "storeTiers": "스토어 / 티어",
    "support": "지원",
    "disconnect": "연결 해제",
    "copy": "복사",
    "copied": "복사됨 ✓",
    "activeVip": "VIP 활성",
    "verifiedPro": "Pro 인증됨",
    "chatTitle": "Trivis",
    "chatSub": "안전한 작업 파일로 프롬프트를 전송합니다. Lovable이 깔끔하고 자동으로 작업을 완료합니다.",
    "askLovable": "Lovable에 문의…",
    "planMode": "계획",
    "buildMode": "빌드",
    "promptHistory": "프롬프트 기록",
    "clearAll": "모두 지우기",
    "noHistory": "기록된 프롬프트가 없습니다",
    "noHistorySub": "전송된 프롬프트가 여기에 보관됩니다",
    "use": "사용",
    "sent": "Lovable에 전송됨 ✓",
    "sendFailed": "전송 실패",
    "promptLoaded": "프롬프트가 Lovable에 로드됨 ✓",
    "langMatrix": "현지화 매트릭스",
    "langTitle": "언어 선택",
    "langSub": "전체 확장 인터페이스에 적용할 언어를 선택하세요",
    "langChanged": "언어가 업데이트되었습니다",
    "vipStore": "VIP 스토어 // 멤버십 티어",
    "vipStoreSub": "할당량을 늘리고 VIP 파이프라인을 잠금 해제할 플랜 선택",
    "getPlan": "플랜 선택 →",
    "cancel": "취소"
  }
};

  try {
    var storedL = localStorage.getItem("trivis_ui_lang");
    if (storedL && I18N[storedL]) lang = storedL;
  } catch (_) {}
  try {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["trivis_ui_lang"], function (res) {
        if (res && res.trivis_ui_lang && I18N[res.trivis_ui_lang]) {
          lang = res.trivis_ui_lang;
        }
      });
    }
  } catch (_) {}

  function t(k) { return (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k; }

  function cssText() {
    return `
/* Hide legacy overlay elements statically via CSS with 0 JS overhead */
#ql-floating, #trivis-fab, #trivis-fab-root, [data-trivis-fab], .sp-extension-fab,
#last-zone-floating-btn, #last-zone-floating-window, [id*='last-zone-floating'],
[class*='last-zone-floating'] {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}


@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
#trivis-vx-root{all:initial;position:fixed;inset:0;pointer-events:none;z-index:2147483646}
#trivis-vx-root *{box-sizing:border-box;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;
  -webkit-tap-highlight-color:transparent!important;tap-highlight-color:transparent!important;outline:none!important}
#trivis-vx-root button,#trivis-vx-root a{outline:none!important;-webkit-tap-highlight-color:transparent!important}

#trivis-vx-panel{
  --vx-sky:#ff1e38;--vx-sky2:#e60026;--vx-sky-soft:rgba(255,30,56,.18);
  pointer-events:auto;position:fixed;left:16px;bottom:18px;width:min(348px,calc(100vw - 24px));max-height:86vh;
  color:#f5eaed;border-radius:22px;overflow:hidden;display:flex;flex-direction:column;
  background:rgba(10,2,5,.96);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(255,35,65,.35);
  box-shadow:0 16px 40px rgba(0,0,0,.8), 0 0 25px rgba(255,30,56,.25);
  transition:width .25s cubic-bezier(.16,1,.3,1),border-radius .25s cubic-bezier(.16,1,.3,1),box-shadow .2s ease,transform .2s cubic-bezier(.16,1,.3,1);
  will-change:transform,left,top;
}
#trivis-vx-root.light #trivis-vx-panel{
  color:#0f172a;
  background:rgba(255,255,255,.58);
  border-color:rgba(255,255,255,.55);
  box-shadow:0 16px 40px rgba(0,0,0,.12),0 0 0 0.5px rgba(255,255,255,.8) inset;
}
#trivis-vx-panel.minimized{width:auto!important;max-width:calc(100vw - 20px);border-radius:18px}
#trivis-vx-body{display:block;pointer-events:auto;}
#trivis-vx-panel.minimized #trivis-vx-body{display:none!important}
#trivis-vx-panel.minimized #trivis-vx-header{position:relative;z-index:5;border-bottom:0;padding:7px 9px;border-radius:18px;background:transparent}
#trivis-vx-panel.dragging{transition:none!important;transform:scale(1.03);box-shadow:0 28px 70px rgba(0,0,0,.8),0 0 40px rgba(255,30,56,.45)}

#trivis-vx-header{
  display:flex;align-items:center;gap:2px;padding:10px 11px;
  background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02));
  border-bottom:1px solid rgba(255,255,255,.1);
  user-select:none;cursor:grab;touch-action:none
}
#trivis-vx-root.light #trivis-vx-header{
  background:linear-gradient(180deg,rgba(255,255,255,.5),rgba(255,255,255,.2));
  border-bottom-color:rgba(15,23,42,.08)
}
#trivis-vx-header:active{cursor:grabbing}
.vx-brand-icon{padding:0 6px 0 4px!important;border-right:1px solid rgba(168,85,247,.25)!important;display:inline-flex!important;align-items:center!important}
.vx-brand-icon img{width:22px!important;height:22px!important;object-fit:cover!important}

/* zk-force-crimson */
#trivis-vx-root, #trivis-vx-root * { --zk-accent:#ff1e38; --zk-accent2:#ff4d64; }
#trivis-vx-root.light { /* force dark crimson glass */ }
#trivis-vx-root {
  --vx-cyan:#ff1e38 !important;
  --vx-sky:#ff334f !important;
}
#trivis-vx-root .vx-btn:not(.ghost) {
  background: linear-gradient(135deg,#e60026,#ff1e38) !important;
  color:#fff !important;
  box-shadow: 0 0 16px rgba(255,30,56,.45) !important;
}
#trivis-vx-root .vx-dot { background:#ff1e38 !important; box-shadow:0 0 8px #ff1e38 !important; }
#trivis-vx-root .vx-fbtn.on {
  border-color:rgba(255,30,56,.65) !important;
  box-shadow:0 0 20px rgba(255,30,56,.35) !important;
}
#trivis-vx-root #trivis-vx-header, #trivis-vx-root .vx-panel {
  border-color:rgba(255,35,65,.32) !important;
}



.zk-brand-duo {
  font-size: 9px; font-weight: 900; letter-spacing: .04em;
  padding: 0 4px; white-space: nowrap; flex-shrink:1; max-width:88px; overflow:hidden;
  pointer-events:none;
}
.zk-brand-duo .z { color: #c084fc; }
.zk-brand-duo .x { color: #94a3b8; margin: 0 3px; }
.zk-brand-duo .t { color: #f87171; }
.zk-dev-box {
  text-align: center; padding: 14px 12px; margin-bottom: 12px; border-radius: 16px;
  background: linear-gradient(135deg, rgba(168,85,247,.2), rgba(239,35,53,.12));
  border: 1px solid rgba(168,85,247,.3);
}
.zk-dev-title {
  font-size: 16px; font-weight: 900; letter-spacing: .14em;
  background: linear-gradient(90deg, #c084fc, #fff, #f87171);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.zk-dev-sub { font-size: 10px; opacity: .55; margin-top: 4px; }
.vx-fbtn.zk-3d {
  background: linear-gradient(145deg, rgba(40,24,64,.9), rgba(20,12,36,.95)) !important;
  border: 1px solid rgba(168,85,247,.35) !important;
  box-shadow: 0 6px 16px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06) !important;
  margin-bottom: 8px;
}
.zk-social-card {
  display: flex; align-items: center; gap: 12px; padding: 14px; margin-bottom: 10px;
  border-radius: 16px; text-decoration: none; color: #f5f3ff;
  background: linear-gradient(135deg, rgba(40,24,64,.9), rgba(24,12,32,.95));
  border: 1px solid rgba(168,85,247,.3);
  box-shadow: 0 8px 22px rgba(88,28,135,.2);
  transition: transform .15s;
}
.zk-social-card:hover { transform: translateY(-2px); }
.zk-social-card.sc-discord { border-color: rgba(129,140,248,.45); }
.zk-social-card.sc-tg { border-color: rgba(56,189,248,.4); }
.zk-sc-icon { font-size: 22px; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;
  border-radius: 12px; background: rgba(168,85,247,.18); }
.zk-sc-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.zk-sc-body b { font-size: 13px; font-weight: 800; }
.zk-sc-body span { font-size: 11px; opacity: .55; }
.zk-sc-go { opacity: .5; }




.zk-chat-shell{position:relative;padding:12px 10px 10px;border-radius:18px;overflow:hidden;
background:linear-gradient(165deg,rgba(40,20,80,.55),rgba(18,10,40,.72));
border:1px solid rgba(196,181,253,.28);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
.zk-chat-orb{position:absolute;width:120px;height:120px;border-radius:50%;filter:blur(36px);opacity:.45;pointer-events:none}
.zk-chat-orb.a{top:-40px;right:-30px;background:rgba(168,85,247,.5)}
.zk-chat-orb.b{bottom:-40px;left:-30px;background:rgba(99,102,241,.35)}
.zk-chat-top{position:relative;display:flex;align-items:center;gap:8px;margin-bottom:8px}
.zk-chat-logo{width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
font-weight:900;font-size:13px;color:#fff;background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 0 16px rgba(168,85,247,.45)}
.zk-chat-brand{flex:1;min-width:0}.zk-chat-brand b{display:block;font-size:12px;letter-spacing:.08em;color:#e9d5ff}
.zk-chat-brand span{font-size:10px;opacity:.65}
.zk-chat-online{font-size:10px;font-weight:700;color:#86efac}
.zk-chat-hero{position:relative;text-align:center;padding:8px 4px 10px}
.zk-chat-crown{font-size:18px;filter:drop-shadow(0 0 8px rgba(216,180,254,.6))}
.zk-chat-title{font-size:22px;font-weight:900;letter-spacing:.04em;
background:linear-gradient(100deg,#e9d5ff,#fff,#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.zk-chat-sub{font-size:11px;opacity:.7;margin-top:2px}
.zk-chat-history{position:relative;max-height:110px;overflow:auto;margin:0 0 8px;display:flex;flex-direction:column;gap:6px}
.zk-chat-hitem{font-size:10px;padding:6px 8px;border-radius:10px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.06)}
.zk-chat-hitem.ok{border-color:rgba(52,211,153,.25)}.zk-chat-hitem.fail{border-color:rgba(248,113,113,.35);color:#fecaca}
.zk-chat-hitem .p{margin-top:3px;opacity:.8;word-break:break-word}
.zk-chat-input-row{position:relative;display:flex;gap:8px;align-items:flex-end}
.zk-chat-input-row textarea{flex:1;resize:none;border-radius:14px;border:1px solid rgba(196,181,253,.3);
background:rgba(15,10,30,.55);color:#f5f3ff;padding:10px 12px;font-size:12px;outline:none;min-height:44px}
.zk-chat-send{width:42px;height:42px;border:none;border-radius:14px;cursor:pointer;font-size:16px;color:#fff;
background:linear-gradient(135deg,#7c3aed,#a855f7);box-shadow:0 8px 20px rgba(124,58,237,.4)}
.zk-chat-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;justify-content:center}
.zk-chat-chips span{font-size:9px;font-weight:700;padding:4px 8px;border-radius:999px;background:rgba(255,255,255,.06);color:#c4b5fd}

.zk-chat-v3{padding:14px 12px 12px;border-radius:22px;
background:linear-gradient(160deg,rgba(40,8,16,.85),rgba(12,3,6,.95));
border:1px solid rgba(255,35,65,.35);box-shadow:0 20px 50px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.1)}
.zk-chat-aurora{position:absolute;inset:-20%;background:radial-gradient(circle at 20% 20%,rgba(255,30,56,.18),transparent 40%),radial-gradient(circle at 80% 80%,rgba(223,128,108,.12),transparent 42%);pointer-events:none}
to{transform:translateY(-12px)}}
.zk-mode-row{position:relative;display:flex;gap:8px;margin:0 0 10px}
.zk-mode-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 8px;border-radius:14px;
border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.25);color:#e9d5ff;font-size:11px;font-weight:800;
cursor:pointer;transition:transform .2s,box-shadow .25s,border-color .25s,background .25s}
.zk-mode-btn i{width:8px;height:8px;border-radius:50%;background:#64748b;box-shadow:0 0 0 0 rgba(0,0,0,0);transition:background .25s,box-shadow .25s}
.zk-mode-btn.on{border-color:rgba(52,211,153,.45);background:linear-gradient(135deg,rgba(6,78,59,.45),rgba(30,20,60,.5));
box-shadow:0 8px 22px rgba(16,185,129,.2);transform:translateY(-1px)}
.zk-mode-btn.on i{background:#4ade80;box-shadow:0 0 10px rgba(74,222,128,.85)}
.zk-mode-btn.build.on{border-color:rgba(248,113,113,.5);background:linear-gradient(135deg,rgba(127,29,29,.4),rgba(30,20,60,.5));
box-shadow:0 8px 22px rgba(239,68,68,.2)}
.zk-mode-btn.build.on i{background:#f87171;box-shadow:0 0 10px rgba(248,113,113,.85)}
.zk-chat-plus,.zk-chat-stop{width:40px;height:40px;border-radius:13px;border:1px solid rgba(255,255,255,.12);
background:rgba(255,255,255,.06);color:#e9d5ff;font-size:18px;font-weight:800;cursor:pointer}
.zk-chat-stop{font-size:12px;color:#fecaca}
.zk-chat-hitem{border-radius:12px;padding:8px 10px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.07)}
.zk-chat-hitem .meta{display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px}
.zk-chat-hitem.ok .meta b{color:#86efac}.zk-chat-hitem.fail .meta b{color:#fca5a5}




.zk-glass-panel,.zk-lb-box.zk-glass-panel{
  background:rgba(255,255,255,.08)!important;
  border:1px solid rgba(255,255,255,.18)!important;
  backdrop-filter:blur(22px) saturate(180%)!important;
  -webkit-backdrop-filter:blur(22px) saturate(180%)!important;
  box-shadow:0 8px 32px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.2)!important;
}
.zk-glass-circle{
  background:rgba(255,255,255,.12)!important;
  border:1px solid rgba(255,255,255,.22)!important;
  backdrop-filter:blur(14px)!important;
  -webkit-backdrop-filter:blur(14px)!important;
  box-shadow:0 4px 16px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.25)!important;
}
.zk-glass-cap .zk-lb-cap-btn{
  background:rgba(255,255,255,.1)!important;
  border:1px solid rgba(255,255,255,.2)!important;
  backdrop-filter:blur(14px)!important;
  -webkit-backdrop-filter:blur(14px)!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.22)!important;
}
.zk-lb-title{
  font-family:'Orbitron',sans-serif!important;
  font-size:20px!important;font-weight:900!important;letter-spacing:.08em!important;
  background:linear-gradient(120deg,#fff 0%,#ffa4b0 40%,#ff1e38 80%)!important;
  -webkit-background-clip:text!important;-webkit-text-fill-color:transparent!important;
  filter:drop-shadow(0 2px 14px rgba(255,30,56,.5));
}
.zk-lb-title .heart{background:linear-gradient(120deg,#ff334f,#ff8595);-webkit-background-clip:text;font-weight:900}
.zk-lb-desc{
  font-family:ui-rounded,"SF Pro Text",system-ui,sans-serif!important;
  font-size:11.5px!important;line-height:1.55!important;color:rgba(255,255,255,.55)!important;
  font-weight:500!important;
}
.zk-soc{padding:8px 4px;display:flex;flex-direction:column;gap:10px}
.zk-soc-title{font-size:15px;font-weight:800;color:#f5f3ff;letter-spacing:.02em}
.zk-soc-sub{font-size:11px;color:rgba(255,255,255,.45);margin:-4px 0 4px}
.zk-glass-btn{
  display:flex;align-items:center;gap:12px;width:100%;padding:12px 14px;border-radius:16px;cursor:pointer;
  border:1px solid rgba(255,255,255,.2);
  background:linear-gradient(135deg,rgba(255,255,255,.14),rgba(255,255,255,.05));
  backdrop-filter:blur(20px) saturate(160%);-webkit-backdrop-filter:blur(20px) saturate(160%);
  box-shadow:0 10px 28px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.25);
  color:#f5f3ff;text-align:left;transition:transform .2s,box-shadow .2s;
}
.zk-glass-btn:active{transform:scale(.98)}
.zk-glass-btn .zk-g-ico{
  width:36px;height:36px;border-radius:12px;display:flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);font-size:14px;
}
.zk-glass-btn .zk-g-txt{display:flex;flex-direction:column;gap:2px}
.zk-glass-btn .zk-g-txt b{font-size:13px;font-weight:800}
.zk-glass-btn .zk-g-txt i{font-style:normal;font-size:10px;opacity:.55}


/* Header icon cascade on expand — brand fixed left, icons fan across width */
#trivis-vx-header{display:flex!important;align-items:center!important;width:100%!important;box-sizing:border-box!important}
#trivis-vx-header .vx-brand,#trivis-vx-header .vx-brand-icon{flex:0 0 auto!important;margin-right:4px!important}
#trivis-vx-panel.minimized #trivis-vx-header{justify-content:flex-start!important;gap:2px!important}
#trivis-vx-panel.minimized #trivis-vx-header .vx-ibtn{
  flex:0 0 auto!important;transform:none!important;opacity:1!important;
  transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .35s ease,margin .5s cubic-bezier(.16,1,.3,1)!important;
}
#trivis-vx-panel:not(.minimized) #trivis-vx-header{justify-content:flex-start!important;gap:0!important}
#trivis-vx-panel:not(.minimized) #trivis-vx-header .vx-ibtn{
  flex:1 1 0!important;max-width:48px!important;min-width:28px!important;
  display:inline-flex!important;align-items:center!important;justify-content:center!important;
  transition:transform .65s cubic-bezier(.16,1,.3,1),opacity .4s ease,flex .65s cubic-bezier(.16,1,.3,1)!important;
}

.zk-lb{padding:10px 8px 8px}
.zk-lb-title{font-size:16px;font-weight:800;color:#f5f3ff;margin:0 0 4px;letter-spacing:.01em}
.zk-lb-desc{font-size:11px;line-height:1.45;color:rgba(255,255,255,.5);margin:0 0 12px}
.zk-lb-box{border-radius:18px;background:rgba(32,32,36,.95);border:1px solid rgba(255,255,255,.08);
padding:10px 10px 8px;box-shadow:0 8px 28px rgba(0,0,0,.25)}
.zk-lb-input{width:100%;border:none;outline:none;resize:none;background:transparent;color:#f4f4f5;
font-size:13px;line-height:1.45;min-height:56px;padding:4px 2px;font-family:inherit}
.zk-lb-input::placeholder{color:rgba(255,255,255,.35)}
.zk-lb-bar{display:flex;align-items:center;gap:6px;margin-top:6px}
.zk-lb-plus{width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,.08);
color:#e4e4e7;font-size:18px;font-weight:600;cursor:pointer;line-height:1}
.zk-lb-capsule{position:relative}
.zk-lb-cap-btn{display:flex;align-items:center;gap:4px;height:32px;padding:0 12px;border-radius:999px;
border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#e4e4e7;
font-size:12px;font-weight:600;cursor:pointer}
.zk-lb-cap-btn .caret{font-size:9px;opacity:.7}
.zk-lb-menu{position:absolute;left:0;bottom:36px;min-width:100px;border-radius:12px;padding:4px;
background:#1c1c1f;border:1px solid rgba(255,255,255,.1);box-shadow:0 12px 30px rgba(0,0,0,.4);z-index:5}
.zk-lb-menu button{display:block;width:100%;text-align:left;border:none;background:transparent;
color:#e4e4e7;padding:8px 10px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer}
.zk-lb-menu button:hover{background:rgba(255,255,255,.08)}
.zk-lb-spacer{flex:1}
.zk-lb-mic{width:32px;height:32px;border-radius:50%;border:none;background:transparent;
font-size:14px;opacity:.45;cursor:default}
.zk-lb-send,.zk-lb-stop{width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;
font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center}
.zk-lb-send{background:#3f3f46;color:#fafafa}
.zk-lb-send:hover{background:#52525b}
.zk-lb-stop{background:#ef4444;color:#fff}
.zk-lb-hist{margin-top:8px;max-height:72px;overflow:auto}
.zk-lb-h{font-size:10px;padding:4px 0;color:rgba(255,255,255,.45)}
.zk-lb-h.ok{color:rgba(134,239,172,.75)}.zk-lb-h.bad{color:rgba(252,165,165,.75)}

.zk-c{padding:12px;border-radius:16px;background:rgba(18,16,28,.92);border:1px solid rgba(255,255,255,.08)}
.zk-c-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.zk-c-mark{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;
font-weight:900;font-size:14px;color:#fff;background:#7c3aed}
.zk-c-titles{flex:1;min-width:0}.zk-c-titles strong{display:block;font-size:13px;color:#f5f3ff}
.zk-c-titles span{font-size:10px;color:rgba(255,255,255,.45)}
.zk-c-live{font-size:10px;font-weight:700;color:#4ade80}
.zk-c-modes{display:flex;gap:8px;margin-bottom:10px}
.zk-c-mode{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:9px;border-radius:12px;
border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:rgba(255,255,255,.7);
font-size:11px;font-weight:700;cursor:pointer}
.zk-c-mode .dot{width:7px;height:7px;border-radius:50%;background:#64748b}
.zk-c-mode.on{border-color:rgba(74,222,128,.4);color:#bbf7d0;background:rgba(6,78,59,.25)}
.zk-c-mode.on .dot{background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,.7)}
.zk-c-mode.build.on{border-color:rgba(248,113,113,.4);color:#fecaca;background:rgba(127,29,29,.25)}
.zk-c-mode.build.on .dot{background:#f87171;box-shadow:0 0 8px rgba(248,113,113,.7)}
.zk-c-hist{max-height:100px;overflow:auto;margin-bottom:10px;display:flex;flex-direction:column;gap:6px}
.zk-c-row{padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.06);font-size:11px}
.zk-c-row .r1{display:flex;justify-content:space-between;margin-bottom:3px;opacity:.8}
.zk-c-row.ok .r1 b{color:#86efac}.zk-c-row.bad .r1 b{color:#fca5a5}
.zk-c-row .r2{color:rgba(255,255,255,.75);word-break:break-word;line-height:1.35}
.zk-c-compose{display:flex;gap:6px;align-items:flex-end}
.zk-c-compose textarea{flex:1;resize:none;min-height:42px;border-radius:12px;border:1px solid rgba(255,255,255,.1);
background:rgba(0,0,0,.35);color:#f5f3ff;padding:10px;font-size:12px;outline:none}
.zk-c-icon{width:38px;height:38px;border-radius:11px;border:1px solid rgba(255,255,255,.1);
background:rgba(255,255,255,.05);color:#e9d5ff;font-size:16px;font-weight:700;cursor:pointer}
.zk-c-icon.stop{font-size:11px;color:#fca5a5}
.zk-c-go{height:38px;padding:0 14px;border:none;border-radius:11px;font-size:12px;font-weight:800;
color:#fff;background:#7c3aed;cursor:pointer}
.zk-c-hint{margin:8px 0 0;font-size:9px;text-align:center;color:rgba(255,255,255,.35);letter-spacing:.02em}

.zk-chat-foot{text-align:center;font-size:9px;letter-spacing:.12em;text-transform:uppercase;opacity:.45;margin-top:8px}

.zk-welcome{position:relative;padding:8px 4px 6px;overflow:hidden;min-height:280px}
.zk-welcome-orb{position:absolute;border-radius:50%;pointer-events:none}
.zk-welcome-orb-a{width:140px;height:140px;top:-40px;left:-20px;background:radial-gradient(circle,rgba(255,30,56,.16),transparent 70%)}
.zk-welcome-orb-b{width:120px;height:120px;bottom:10px;right:-30px;background:radial-gradient(circle,rgba(223,128,108,.12),transparent 70%)}
.zk-welcome-inner{position:relative;z-index:2;text-align:center;padding:12px 8px}
.zk-welcome-badge{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:900;letter-spacing:.16em;
  padding:6px 14px;border-radius:999px;margin-bottom:14px;
  background:linear-gradient(135deg,rgba(76,29,149,.4),rgba(127,29,29,.25));
  border:1px solid rgba(167,139,250,.35);box-shadow:0 0 20px rgba(147,51,234,.15)}
.zk-welcome-badge .z{color:#c4b5fd}
.zk-welcome-badge .x{color:rgba(255,255,255,.35)}
.zk-welcome-badge .t{color:#fca5a5}
.zk-welcome-title{font-size:22px;font-weight:900;letter-spacing:.03em;margin-bottom:10px;
  background:linear-gradient(100deg,#f5f3ff 0%,#ddd6fe 40%,#fecaca 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent}
.zk-welcome-line{width:56px;height:3px;margin:0 auto 14px;border-radius:999px;
  background:linear-gradient(90deg,#7c3aed,#b91c1c);opacity:.85}
.zk-welcome-text{font-size:12px;line-height:1.6;opacity:.72;margin-bottom:16px;padding:0 6px;color:#e2e8f0}
.zk-welcome-hints{display:flex;flex-direction:column;gap:8px;text-align:left;margin-bottom:4px}
.zk-wh{padding:11px 12px;border-radius:14px;background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);display:flex;align-items:flex-start;gap:10px;
  transition:border-color .2s ease,background .2s ease}
.zk-wh:hover{border-color:rgba(167,139,250,.35);background:rgba(147,51,234,.08)}
.zk-wh-ico{font-size:16px;line-height:1.2}
.zk-wh b{display:block;font-size:12px;color:#e9d5ff;margin-bottom:2px}
.zk-wh span{font-size:10px;opacity:.5;color:#cbd5e1}
.zk-welcome-cta{width:100%!important;margin-top:14px!important;font-weight:800!important;
  background:linear-gradient(135deg,#6d28d9,#9f1239)!important;border:none!important;
  box-shadow:0 8px 22px rgba(109,40,217,.3)!important}




/* ===== Zero-Lag Cyber Architecture: Pure Static HUD + Silky Smooth Shiny Button Sweeps ===== */
#trivis-vx-panel {
  border: 1px solid rgba(255, 35, 65, 0.35) !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 30, 56, 0.2) !important;
  overflow: hidden !important;
}
#trivis-vx-panel::before {
  content: "";
  position: absolute;
  top: -30%;
  left: 20%;
  width: 60%;
  height: 80px;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(circle, rgba(255, 30, 56, 0.15), transparent 70%);
}
#trivis-vx-header {
  position: relative;
  z-index: 2;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01)) !important;
  border-bottom: 1px solid rgba(255, 35, 65, 0.2) !important;
}
#trivis-vx-body {
  position: relative;
  z-index: 2;
}
#trivis-vx-panel.is-expanding {
  animation: zkExpandIn .25s cubic-bezier(.32,.72,0,1) both !important;
}
@keyframes zkFadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes zkExpandIn {
  from { opacity: 0.8; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

/* ── ONLY SHINY SMOOTH ANIMATE IN BUTTONS (GPU Accelerated, 60fps) ── */
.vx-btn, .zk-welcome-cta, .zk-buy, .zk-sw-go, .vx-copy, .zk-c-go, .zk-glass-btn, .vx-fbtn {
  position: relative !important;
  overflow: hidden !important;
  will-change: transform !important;
}
.vx-btn::after, .zk-welcome-cta::after, .zk-buy::after, .zk-sw-go::after, .vx-copy::after, .zk-c-go::after, .zk-glass-btn::after, .vx-fbtn::after {
  content: "" !important;
  position: absolute !important;
  top: -50% !important;
  left: -60% !important;
  width: 40% !important;
  height: 200% !important;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0.05) 80%,
    transparent 100%
  ) !important;
  transform: rotate(25deg) !important;
  animation: shinySweep 3.4s cubic-bezier(0.4, 0, 0.2, 1) infinite !important;
  pointer-events: none !important;
  will-change: transform !important;
}
@keyframes shinySweep {
  0% { transform: translateX(-150%) rotate(25deg); }
  35%, 100% { transform: translateX(550%) rotate(25deg); }
}

.vx-ibtn {
  transition: transform .18s ease, background .2s ease, box-shadow .2s ease !important;
}
.vx-ibtn:hover {
  transform: translateY(-1px) scale(1.06);
  box-shadow: 0 0 12px rgba(255, 30, 56, 0.35);
}
.vx-ibtn:active { transform: scale(0.94); }
.zk-brand-duo .z {
  color: #ff334f !important;
}
.zk-brand-duo .t {
  color: #ffa4b0 !important;
}

/* Body content polish */
.vx-card, .vx-feat-card, .zk-card, .zk-wh, .zk-dev-box, .zk-welcome {
  animation: zkFadeUp .4s ease both;
}
.vx-fbtn, .zk-buy, .vx-btn {
  transition: transform .15s ease, box-shadow .2s ease, border-color .2s ease !important;
}
.vx-fbtn:hover, .zk-buy:hover, .vx-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,.25), 0 0 16px rgba(168,85,247,.2);
}
.vx-toggle {
  transition: background .25s ease !important;
}
.vx-toggle .knob {
  transition: transform .25s cubic-bezier(.32,.72,0,1) !important;
}


.vx-brand{
  font-size:11px;font-weight:800;letter-spacing:.08em;padding:0 8px 0 6px;
  border-right:1px solid rgba(255,255,255,.12);margin-right:4px;color:inherit;opacity:.9
}
#trivis-vx-root.light .vx-brand{border-right-color:rgba(15,23,42,.1)}

.vx-ibtn{position:relative;z-index:6;pointer-events:auto!important;
  all:unset;cursor:pointer;width:32px;height:32px;border-radius:11px;
  display:inline-flex;align-items:center;justify-content:center;
  color:rgba(255,255,255,.55);
  transition:transform .28s cubic-bezier(.32,.72,0,1),background .25s ease,color .25s ease,box-shadow .25s ease;
  -webkit-tap-highlight-color:transparent!important;outline:none!important;background:transparent
}
#trivis-vx-root.light .vx-ibtn{color:rgba(15,23,42,.45)}
.vx-ibtn:hover,.vx-ibtn:focus{color:#fff;background:rgba(255,255,255,.12);transform:translateY(-1px) scale(1.06);outline:none!important;box-shadow:none}
#trivis-vx-root.light .vx-ibtn:hover,#trivis-vx-root.light .vx-ibtn:focus{color:#0f172a;background:rgba(15,23,42,.06)}
.vx-ibtn:active{transform:scale(.88)!important;background:rgba(255,255,255,.08)!important}
.vx-ibtn.active-sky{color:#ff2a44;background:rgba(255,30,56,.18);box-shadow:0 0 12px rgba(255,30,56,.35);}
.vx-ibtn svg{width:17px;height:17px;pointer-events:none;transition:transform .4s cubic-bezier(.32,.72,0,1)}

#trivis-vx-body{padding:12px 12px 14px;overflow:auto;max-height:min(70vh,540px)}
.vx-sheet{animation:vxSheet .55s cubic-bezier(.32,.72,0,1) both}
@keyframes vxSheet{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes vxRow{
  from{opacity:0;transform:translateY(10px) scale(.98)}
  to{opacity:1;transform:none}
}

.vx-card{
  display:flex;align-items:center;gap:12px;padding:13px 12px;margin-bottom:8px;border-radius:16px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.1);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  animation:vxRow .42s cubic-bezier(.32,.72,0,1) both;
  transition:transform .25s ease,border-color .25s,background .25s
}
#trivis-vx-root.light .vx-card{
  background:rgba(255,255,255,.72);
  border-color:rgba(15,23,42,.08);
  color:#0f172a;
  box-shadow:0 2px 10px rgba(15,23,42,.04)
}
.vx-card:nth-child(2){animation-delay:.04s}
.vx-card:nth-child(3){animation-delay:.08s}
.vx-card:nth-child(4){animation-delay:.12s}
.vx-card:nth-child(5){animation-delay:.16s}
.vx-card .ic{
  width:38px;height:38px;border-radius:12px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  background:rgba(168,85,247,.14);color:#38bdf8;
  border:1px solid rgba(168,85,247,.2)
}
#trivis-vx-root.light .vx-card .ic{background:rgba(147,51,234,.12);color:#0284c7;border-color:rgba(147,51,234,.2)}
.vx-card .lab{font-size:9px;font-weight:800;letter-spacing:.1em;color:rgba(255,255,255,.42);text-transform:uppercase}
#trivis-vx-root.light .vx-card .lab{color:rgba(15,23,42,.45)}
.vx-card .val{font-size:13px;font-weight:700;margin-top:3px;word-break:break-all;color:inherit;letter-spacing:.01em}
.vx-card .meta{flex:1;min-width:0}

.vx-copy{
  all:unset;cursor:pointer;flex-shrink:0;padding:8px 12px;border-radius:10px;font-size:11px;font-weight:700;
  color:#0c4a6e;background:rgba(168,85,247,.9);
  border:1px solid rgba(255,255,255,.25);
  box-shadow:0 4px 14px rgba(147,51,234,.25);
  transition:transform .22s cubic-bezier(.32,.72,0,1),filter .2s;
  -webkit-tap-highlight-color:transparent
}
.vx-copy:hover{filter:brightness(1.06);transform:scale(1.04)}
.vx-copy:active{transform:scale(.94)}

.vx-actions{display:flex;gap:8px;margin-top:6px;animation:vxRow .45s .14s both}
.vx-btn{
  all:unset;cursor:pointer;flex:1;text-align:center;padding:12px 12px;border-radius:14px;
  font-size:12px;font-weight:700;color:#0c4a6e;
  background:linear-gradient(135deg,rgba(168,85,247,.92),rgba(147,51,234,.88));
  border:1px solid rgba(255,255,255,.22);
  box-shadow:0 8px 22px rgba(147,51,234,.22),0 1px 0 rgba(255,255,255,.25) inset;
  backdrop-filter:blur(8px);
  transition:transform .25s cubic-bezier(.32,.72,0,1),filter .2s,box-shadow .25s;
  -webkit-tap-highlight-color:transparent
}
.vx-btn:hover{filter:brightness(1.05);transform:translateY(-1px);box-shadow:0 12px 28px rgba(147,51,234,.3)}
.vx-btn:active{transform:scale(.96)}

.vx-free{
  position:relative;overflow:hidden;
  display:flex;flex-direction:column;gap:10px;
  padding:14px 14px 12px;border-radius:16px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(18px) saturate(160%);
  -webkit-backdrop-filter:blur(18px) saturate(160%);
  box-shadow:0 8px 24px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.1);
}
#trivis-vx-root.light .vx-free{
  background:rgba(255,255,255,.55);
  border-color:rgba(15,23,42,.1);
  box-shadow:0 8px 20px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.7);
}
.vx-free .fr-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.vx-free .fr-lab{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.55}
.vx-free .fr-count{font-size:20px;font-weight:700;letter-spacing:.02em;line-height:1}
.vx-free .fr-count .dim{opacity:.4;font-weight:600;font-size:14px}
.vx-free .fr-track{
  height:6px;border-radius:999px;overflow:hidden;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.06);
}
#trivis-vx-root.light .vx-free .fr-track{background:rgba(15,23,42,.08)}
.vx-free .fr-fill{
  height:100%;border-radius:999px;
  background:linear-gradient(90deg,#38bdf8,#c084fc,#34d399);
  box-shadow:0 0 12px rgba(168,85,247,.35);
  transition:width .45s cubic-bezier(.22,1,.36,1);
}
.vx-free .fr-fill.low{background:linear-gradient(90deg,#fbbf24,#f97316)}
.vx-free .fr-fill.empty{background:linear-gradient(90deg,#f87171,#ef4444);box-shadow:0 0 12px rgba(248,113,113,.3)}
.vx-free .fr-hint{font-size:11px;line-height:1.35;opacity:.55;font-weight:500}
.vx-free .fr-hint.warn{color:#fbbf24;opacity:.9}
.vx-free .fr-hint.ok{color:#34d399;opacity:.9}

.vx-feat-card{
  padding:14px;border-radius:16px;margin-bottom:8px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08);
}
#trivis-vx-root.light .vx-feat-card{
  background:rgba(255,255,255,.5);border-color:rgba(15,23,42,.1);
}
.vx-aa-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.vx-aa-meta .t{font-size:13px;font-weight:700;letter-spacing:.02em}
.vx-aa-meta .s{font-size:10px;opacity:.5;margin-top:3px;font-weight:500}
.vx-toggle{
  --on:#34d399;position:relative;width:52px;height:30px;border-radius:999px;cursor:pointer;
  border:1px solid rgba(255,255,255,.14);
  background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(0,0,0,.2));
  box-shadow:inset 0 2px 6px rgba(0,0,0,.35),0 1px 0 rgba(255,255,255,.08);
  transition:background .35s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .3s;
  flex-shrink:0;
}
.vx-toggle .knob{
  position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;
  background:linear-gradient(145deg,#fff,#d4d4d8);
  box-shadow:0 2px 6px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.9);
  transition:transform .35s cubic-bezier(.22,1,.36,1),background .3s;
}
.vx-toggle.on{
  background:linear-gradient(135deg,rgba(52,211,153,.35),rgba(168,85,247,.25));
  border-color:rgba(52,211,153,.45);
  box-shadow:inset 0 0 12px rgba(52,211,153,.2),0 0 16px rgba(52,211,153,.15);
}
.vx-toggle.on .knob{
  transform:translateX(22px);
  background:linear-gradient(145deg,#ecfdf5,#34d399);
  box-shadow:0 2px 8px rgba(52,211,153,.45),inset 0 1px 0 rgba(255,255,255,.7);
}
.vx-aa-status{margin-top:10px;font-size:11px;font-weight:600;letter-spacing:.06em;
  color:rgba(255,255,255,.4);transition:color .3s}
.vx-aa-status.on{color:#34d399}
.vx-fbtn{
  all:unset;cursor:pointer;display:flex;align-items:center;gap:10px;width:100%;
  margin-top:8px;padding:13px 14px;border-radius:14px;box-sizing:border-box;
  font-size:12px;font-weight:700;letter-spacing:.03em;color:#f4f4f5;
  background:linear-gradient(165deg,rgba(255,255,255,.12) 0%,rgba(255,255,255,.04) 40%,rgba(0,0,0,.18) 100%);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:
    0 4px 0 rgba(0,0,0,.35),
    0 8px 20px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.18),
    inset 0 -1px 0 rgba(0,0,0,.2);
  transform:translateY(0);
  transition:transform .15s ease,box-shadow .15s ease,filter .15s ease;
}
.vx-fbtn:hover{filter:brightness(1.08);transform:translateY(-1px);
  box-shadow:0 5px 0 rgba(0,0,0,.35),0 12px 24px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.22)}
.vx-fbtn.on{border-color:rgba(168,85,247,.45);box-shadow:0 4px 0 rgba(147,51,234,.35),0 8px 20px rgba(168,85,247,.2),inset 0 1px 0 rgba(255,255,255,.2);background:linear-gradient(165deg,rgba(168,85,247,.2),rgba(0,0,0,.2))}
.vx-fbtn:active{transform:translateY(3px);
  box-shadow:0 1px 0 rgba(0,0,0,.35),0 2px 8px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.1)}
.vx-fbtn .fi{
  width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);flex-shrink:0;
}
.vx-fbtn .fi svg{width:15px;height:15px}
.vx-fbtn .fl{display:flex;flex-direction:column;gap:2px;text-align:left}
.vx-fbtn .fl b{font-size:12px;font-weight:700}
.vx-fbtn .fl span{font-size:10px;font-weight:500;opacity:.45}
#trivis-vx-root.light .vx-fbtn{
  color:#0f172a;
  background:linear-gradient(165deg,#fff 0%,#f1f5f9 50%,#e2e8f0 100%);
  border-color:rgba(15,23,42,.1);
  box-shadow:0 4px 0 rgba(15,23,42,.12),0 8px 16px rgba(15,23,42,.08),inset 0 1px 0 #fff;
}
.vx-btn{
  all:unset;cursor:pointer;flex:1;text-align:center;padding:13px 14px;border-radius:14px;box-sizing:border-box;
  font-size:12px;font-weight:700;letter-spacing:.03em;color:#f4f4f5;
  background:linear-gradient(165deg,rgba(255,255,255,.14) 0%,rgba(255,255,255,.05) 40%,rgba(0,0,0,.2) 100%);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:
    0 4px 0 rgba(0,0,0,.35),
    0 8px 20px rgba(0,0,0,.25),
    inset 0 1px 0 rgba(255,255,255,.18),
    inset 0 -1px 0 rgba(0,0,0,.2);
  transform:translateY(0);
  transition:transform .15s ease,box-shadow .15s ease,filter .15s ease;
  -webkit-tap-highlight-color:transparent
}
.vx-btn:hover{filter:brightness(1.08);transform:translateY(-1px);
  box-shadow:0 5px 0 rgba(0,0,0,.35),0 12px 24px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.22)}
.vx-btn:active{transform:translateY(3px);
  box-shadow:0 1px 0 rgba(0,0,0,.35),0 2px 8px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.1)}
.vx-btn.ghost{
  color:rgba(255,255,255,.85);
  background:linear-gradient(165deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.03) 50%,rgba(0,0,0,.15) 100%);
  border:1px solid rgba(255,255,255,.12);
  box-shadow:0 3px 0 rgba(0,0,0,.28),0 6px 14px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.12)
}
#trivis-vx-root.light .vx-btn{
  color:#0f172a;
  background:linear-gradient(165deg,#fff 0%,#f1f5f9 50%,#e2e8f0 100%);
  border-color:rgba(15,23,42,.1);
  box-shadow:0 4px 0 rgba(15,23,42,.12),0 8px 16px rgba(15,23,42,.08),inset 0 1px 0 #fff
}
#trivis-vx-root.light .vx-btn.ghost{
  color:#0f172a;
  background:linear-gradient(165deg,rgba(255,255,255,.9),rgba(241,245,249,.85));
  border-color:rgba(15,23,42,.1)
}
.vx-copy{
  all:unset;cursor:pointer;padding:8px 12px;border-radius:10px;font-size:11px;font-weight:700;
  color:#f4f4f5;
  background:linear-gradient(165deg,rgba(255,255,255,.12),rgba(0,0,0,.15));
  border:1px solid rgba(255,255,255,.14);
  box-shadow:0 3px 0 rgba(0,0,0,.3),0 4px 10px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.15);
  transition:transform .15s,box-shadow .15s
}
.vx-copy:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.3)}
.vx-copy.is-copied{color:#34d399}



.vx-btn.ghost{
  color:inherit;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.12);
  box-shadow:none
}
#trivis-vx-root.light .vx-btn.ghost{
  background:rgba(15,23,42,.04);
  border-color:rgba(15,23,42,.1);
  color:#0f172a
}

.vx-foot{display:flex;align-items:center;margin-top:12px;font-size:11px;color:rgba(255,255,255,.4);animation:vxRow .4s .2s both}
#trivis-vx-root.light .vx-foot{color:rgba(15,23,42,.4)}
.vx-dot{width:7px;height:7px;border-radius:50%;background:#34d399;display:inline-block;margin-right:6px;box-shadow:0 0 10px #34d399;animation:vxPulse 2s ease infinite}

.vx-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.vx-scard{
  border-radius:18px;min-height:112px;padding:14px;display:flex;flex-direction:column;justify-content:flex-end;
  border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(16px);
  animation:vxSheet .5s cubic-bezier(.32,.72,0,1) both;
  transition:transform .3s cubic-bezier(.32,.72,0,1),box-shadow .3s
}
.vx-scard:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 14px 32px rgba(0,0,0,.28)}
.vx-scard:nth-child(1){background:linear-gradient(160deg,rgba(244,63,94,.22),rgba(20,12,18,.55));animation-delay:.02s}
.vx-scard:nth-child(2){background:linear-gradient(160deg,rgba(99,102,241,.25),rgba(14,16,32,.55));animation-delay:.06s}
.vx-scard:nth-child(3){background:linear-gradient(160deg,rgba(239,68,68,.22),rgba(24,10,10,.55));animation-delay:.1s}
.vx-scard:nth-child(4){background:linear-gradient(160deg,rgba(168,85,247,.22),rgba(10,18,28,.55));animation-delay:.14s}
#trivis-vx-root.light .vx-scard{border-color:rgba(15,23,42,.08)}
.vx-scard .name{font-size:13px;font-weight:800;color:#fff}
.vx-scard .sub{font-size:10px;color:rgba(255,255,255,.7);margin:2px 0 8px}
.vx-scard a.cta{
  all:unset;cursor:pointer;align-self:flex-start;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700;
  background:rgba(255,255,255,.92);color:#0f172a;transition:transform .22s;-webkit-tap-highlight-color:transparent
}
.vx-scard a.cta:hover{transform:scale(1.05)}


/* Trivis shop cards */

.zk-chat-wrap{padding:4px 2px 8px}
.zk-chat-head{text-align:center;margin-bottom:12px}
.zk-chat-title{font-size:15px;font-weight:800;background:linear-gradient(135deg,#e9d5ff,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.zk-chat-sub{font-size:10px;opacity:.55;margin-top:4px;line-height:1.35}
.zk-chat-input{
  width:100%;box-sizing:border-box;min-height:96px;resize:vertical;padding:12px 12px;border-radius:14px;
  border:1px solid rgba(168,85,247,.35);background:rgba(12,8,24,.85);color:#f5f3ff;font-size:13px;
  font-family:Inter,-apple-system,sans-serif;outline:none;margin-bottom:10px
}
.zk-chat-input:focus{border-color:rgba(192,132,252,.7);box-shadow:0 0 0 3px rgba(168,85,247,.15)}
.zk-chat-send{
  all:unset;box-sizing:border-box;display:block;width:100%;text-align:center;cursor:pointer;
  padding:12px 14px;border-radius:12px;font-size:13px;font-weight:800;color:#fff;
  background:linear-gradient(135deg,#9333ea,#a855f7 50%,#c084fc);
  box-shadow:0 8px 22px rgba(147,51,234,.35);margin-bottom:8px
}
.zk-chat-send:disabled{opacity:.55;cursor:wait}
.zk-chat-status{font-size:11px;text-align:center;min-height:16px;margin-bottom:10px;opacity:.8}
.zk-chat-status.zk-busy{color:#c4b5fd}
.zk-chat-status.zk-ok{color:#86efac}
.zk-chat-status.zk-fail{color:#f87171}
.zk-chat-hist-label{font-size:10px;font-weight:700;letter-spacing:.08em;opacity:.45;margin:4px 0 8px;text-transform:uppercase}
.zk-chat-hist{max-height:180px;overflow:auto;display:flex;flex-direction:column;gap:8px}
.zk-hist-item{padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04)}
.zk-hist-ok{border-color:rgba(52,211,153,.25)}
.zk-hist-fail{border-color:rgba(248,113,113,.4);background:rgba(127,29,29,.2)}
.zk-hist-text{font-size:12px;line-height:1.4;color:#e9d5ff;word-break:break-word}
.zk-hist-fail .zk-hist-text{color:#fecaca}
.zk-hist-meta{font-size:10px;margin-top:6px;opacity:.65}
.zk-hist-fail .zk-hist-meta{color:#f87171;opacity:1;font-weight:700}
.zk-hist-empty{font-size:11px;opacity:.45;text-align:center;padding:12px}

.zk-shop-head{padding:4px 4px 12px;text-align:center}
.zk-shop-title{font-size:15px;font-weight:800;letter-spacing:.04em;background:linear-gradient(135deg,#e9d5ff,#c084fc 40%,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.zk-shop-sub{font-size:11px;opacity:.55;margin-top:4px}
.zk-card{
  position:relative;padding:16px 14px 14px;border-radius:18px;margin-bottom:12px;
  background:linear-gradient(145deg,rgba(40,20,70,.75),rgba(18,12,32,.9));
  border:1px solid rgba(168,85,247,.28);
  box-shadow:0 0 0 1px rgba(255,255,255,.04) inset,0 12px 32px rgba(88,28,135,.25),0 0 24px var(--glow,rgba(168,85,247,.2));
  animation:vxRow .45s cubic-bezier(.32,.72,0,1) both;animation-delay:calc(var(--i,0)*.06s);
  overflow:hidden
}
.zk-card::before{
  content:"";position:absolute;inset:-40% -20% auto auto;width:120px;height:120px;border-radius:50%;
  background:radial-gradient(circle,var(--glow,rgba(168,85,247,.35)),transparent 70%);pointer-events:none
}
.zk-card.featured{
  border-color:rgba(192,132,252,.55);
  transform:scale(1.02);
  box-shadow:0 0 0 1px rgba(192,132,252,.2) inset,0 16px 40px rgba(126,34,206,.4),0 0 40px rgba(168,85,247,.3)
}
.zk-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;position:relative;z-index:1}
.zk-tag{
  font-size:9px;font-weight:800;letter-spacing:.12em;padding:4px 8px;border-radius:999px;
  background:rgba(168,85,247,.2);color:#e9d5ff;border:1px solid rgba(168,85,247,.35)
}
.zk-hot{
  font-size:9px;font-weight:800;padding:3px 7px;border-radius:999px;
  background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff
}
.zk-price{font-size:26px;font-weight:900;letter-spacing:-.03em;color:#faf5ff;position:relative;z-index:1;line-height:1.1}
.zk-dur{font-size:11px;opacity:.55;margin:2px 0 10px;position:relative;z-index:1}
.zk-feats{list-style:none;margin:0 0 12px;padding:0;position:relative;z-index:1}
.zk-feats li{font-size:11px;opacity:.8;padding:3px 0;display:flex;align-items:center;gap:6px}
.zk-check{color:#c084fc;font-weight:800}
.zk-buy{
  all:unset;box-sizing:border-box;display:block;width:100%;text-align:center;cursor:pointer;
  padding:12px 14px;border-radius:12px;font-size:12px;font-weight:800;color:#fff;
  background:linear-gradient(135deg,#9333ea,#a855f7 50%,#c084fc);
  box-shadow:0 8px 20px rgba(147,51,234,.35);transition:transform .15s ease,box-shadow .15s
}
.zk-buy:hover{transform:translateY(-1px);box-shadow:0 12px 28px rgba(147,51,234,.45)}
.vx-plan{
  display:flex;align-items:center;justify-content:space-between;padding:13px 12px;border-radius:16px;margin-bottom:8px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  animation:vxRow .4s cubic-bezier(.32,.72,0,1) both
}
#trivis-vx-root.light .vx-plan{background:rgba(255,255,255,.75);border-color:rgba(15,23,42,.08);color:#0f172a}
.vx-plan:nth-child(2){animation-delay:.05s}.vx-plan:nth-child(3){animation-delay:.1s}.vx-plan:nth-child(4){animation-delay:.15s}
.vx-plan .p{font-weight:800;font-size:15px}.vx-plan .l{font-size:11px;opacity:.55;margin-top:2px}
.vx-plan button{
  all:unset;cursor:pointer;padding:9px 14px;border-radius:11px;font-size:11px;font-weight:700;color:#1e1b4b;
  background:linear-gradient(135deg,rgba(192,132,252,.95),rgba(147,51,234,.9))
;
  border:1px solid rgba(255,255,255,.25);transition:transform .22s;-webkit-tap-highlight-color:transparent
}
.vx-plan button:hover{transform:scale(1.05)}

.vx-lang button{
  all:unset;cursor:pointer;display:block;width:100%;padding:12px 14px;margin-bottom:6px;border-radius:14px;
  font-size:13px;font-weight:600;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);
  color:inherit;animation:vxRow .35s both;transition:transform .25s cubic-bezier(.32,.72,0,1),background .2s,border-color .2s;
  -webkit-tap-highlight-color:transparent
}
#trivis-vx-root.light .vx-lang button{background:rgba(255,255,255,.7);border-color:rgba(15,23,42,.08);color:#0f172a}
.vx-lang button:nth-child(n){animation-delay:calc(var(--i,0)*.04s)}
.vx-lang button:hover{transform:translateX(5px);background:rgba(168,85,247,.12);border-color:rgba(168,85,247,.3)}
.vx-lang button.active{border-color:rgba(168,85,247,.5);background:rgba(168,85,247,.15);color:#7dd3fc}
#trivis-vx-root.light .vx-lang button.active{color:#0369a1;background:rgba(147,51,234,.12)}

.vx-toast{
  pointer-events:none;position:fixed;left:50%;bottom:100px;transform:translateX(-50%) translateY(12px) scale(.96);
  padding:11px 16px;border-radius:16px;font-size:12px;font-weight:650;color:#f8fafc;
  background:rgba(15,23,42,.72);border:1px solid rgba(255,255,255,.14);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  opacity:0;transition:opacity .35s,transform .4s cubic-bezier(.32,.72,0,1);z-index:2147483647
}
.vx-toast.show{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}

#ql-floating,#trivis-fab,#trivis-fab-root,[data-trivis-fab],.sp-extension-fab,div[id*="ql-float"],
#last-zone-floating-btn,#last-zone-floating-window,[id*="last-zone-floating"],
[class*="last-zone-floating"],[id*="floating-btn"],[class*="floating-btn"]{
  display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;
  left:-9999px!important;width:0!important;height:0!important;overflow:hidden!important
}



#trivis-vx-root.light #trivis-vx-panel,
#trivis-vx-root[data-theme="light"] #trivis-vx-panel{
  color:#0f172a !important;
  background:rgba(255,255,255,.72) !important;
  border-color:rgba(15,23,42,.12) !important;
  box-shadow:0 16px 40px rgba(0,0,0,.14),0 0 0 0.5px rgba(255,255,255,.8) inset !important;
}
#trivis-vx-root.light .vx-ibtn,
#trivis-vx-root[data-theme="light"] .vx-ibtn{color:rgba(15,23,42,.5) !important}
#trivis-vx-root.light .vx-brand,
#trivis-vx-root[data-theme="light"] .vx-brand{color:#0f172a !important;border-right-color:rgba(15,23,42,.12) !important}
#trivis-vx-root.light #trivis-vx-header,
#trivis-vx-root[data-theme="light"] #trivis-vx-header{
  background:linear-gradient(180deg,rgba(255,255,255,.65),rgba(255,255,255,.35)) !important;
  border-bottom-color:rgba(15,23,42,.08) !important;
}
#trivis-vx-panel.vx-light{
  color:#0f172a !important;
  background:rgba(255,255,255,.72) !important;
}

/* === HIGH-END PC MOTION (design unchanged) === */
#trivis-vx-root *,#trivis-vx-root *::before,#trivis-vx-root *::after{
  -webkit-tap-highlight-color:transparent!important;
}
#trivis-vx-panel{
  transition:
    width .38s cubic-bezier(.16,1,.3,1),
    border-radius .34s cubic-bezier(.16,1,.3,1),
    box-shadow .34s cubic-bezier(.16,1,.3,1),
    transform .34s cubic-bezier(.16,1,.3,1)!important;
}
#trivis-vx-panel.dragging{
  transition:none!important;
}
#trivis-vx-body{
  transition:opacity .32s cubic-bezier(.16,1,.3,1),transform .32s cubic-bezier(.16,1,.3,1);
}
#trivis-vx-panel.is-collapsing #trivis-vx-body{
  opacity:0!important;
  transform:translateY(8px) scale(.98)!important;
  pointer-events:none!important;
}
#trivis-vx-panel.is-expanding #trivis-vx-body{
  animation:vxSheetIn .36s cubic-bezier(.16,1,.3,1) both!important;
}
@keyframes vxSheetIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes vxSheet{
  from{opacity:0;transform:translateY(12px) scale(.98)}
  to{opacity:1;transform:none}
}
@keyframes vxRow{
  from{opacity:0;transform:translateY(8px)}
  to{opacity:1;transform:none}
}
@keyframes vxIconPop{
  0%{transform:scale(.92)}
  60%{transform:scale(1.06)}
  100%{transform:scale(1)}
}
.vx-sheet{animation:vxSheetIn .36s cubic-bezier(.16,1,.3,1) both!important}
.vx-ibtn{
  transition:
    transform .2s cubic-bezier(.16,1,.3,1),
    background .2s cubic-bezier(.16,1,.3,1),
    color .2s cubic-bezier(.16,1,.3,1),
    box-shadow .22s cubic-bezier(.16,1,.3,1),
    filter .2s cubic-bezier(.16,1,.3,1)!important;
  will-change:transform,filter;
}
.vx-ibtn:hover,.vx-ibtn:focus{
  transform:translateY(-2px) scale(1.1)!important;
  filter:brightness(1.15) drop-shadow(0 4px 10px rgba(255,255,255,.12))!important;
}
.vx-ibtn:active{
  transform:translateY(0) scale(.94)!important;
  filter:brightness(1)!important;
  transition-duration:.09s!important;
}
.vx-ibtn svg{
  transition:transform .28s cubic-bezier(.16,1,.3,1)!important;
}
.vx-ibtn:hover svg{
  transform:scale(1.06)!important;
}
.vx-btn{
  transition:
    transform .2s cubic-bezier(.16,1,.3,1),
    filter .2s cubic-bezier(.16,1,.3,1),
    box-shadow .28s cubic-bezier(.16,1,.3,1)!important;
  will-change:transform,filter;
}
.vx-btn:hover{
  transform:translateY(-2px) scale(1.02)!important;
  filter:brightness(1.08)!important;
  box-shadow:0 12px 28px rgba(0,0,0,.28)!important;
}
.vx-btn:active{
  transform:translateY(0) scale(.975)!important;
  transition-duration:.09s!important;
}
.vx-copy{
  transition:
    transform .2s cubic-bezier(.16,1,.3,1),
    filter .2s cubic-bezier(.16,1,.3,1),
    opacity .2s ease!important;
  will-change:transform;
}
.vx-copy:hover{
  transform:translateY(-1.5px) scale(1.04)!important;
  filter:brightness(1.08)!important;
}
.vx-copy:active{
  transform:scale(.96)!important;
  transition-duration:.09s!important;
}
.vx-copy.is-copied{
  animation:vxIconPop .5s cubic-bezier(.16,1,.3,1)!important;
}
.vx-card{
  transition:
    transform .26s cubic-bezier(.16,1,.3,1),
    border-color .26s ease,
    background .26s ease,
    box-shadow .26s cubic-bezier(.16,1,.3,1)!important;
}
.vx-card:hover{
  transform:translateY(-2px)!important;
  box-shadow:0 10px 24px rgba(0,0,0,.18)!important;
}
.vx-scard{
  transition:
    transform .28s cubic-bezier(.16,1,.3,1),
    box-shadow .28s cubic-bezier(.16,1,.3,1),
    filter .22s ease!important;
  will-change:transform;
}
.vx-scard:hover{
  transform:translateY(-3px) scale(1.025)!important;
  filter:brightness(1.06)!important;
  box-shadow:0 16px 36px rgba(0,0,0,.3)!important;
}
.vx-scard a.cta{
  transition:transform .2s cubic-bezier(.16,1,.3,1),filter .2s ease!important;
}
.vx-scard a.cta:hover{transform:scale(1.05)!important}
.vx-scard a.cta:active{transform:scale(.96)!important}
.vx-plan{
  transition:transform .26s cubic-bezier(.16,1,.3,1),box-shadow .26s ease,border-color .2s ease!important;
}
.vx-plan:hover{
  transform:translateY(-2px)!important;
  box-shadow:0 10px 22px rgba(0,0,0,.16)!important;
}
.vx-plan button{
  transition:transform .2s cubic-bezier(.16,1,.3,1),filter .2s ease!important;
}
.vx-plan button:hover{
  transform:translateY(-1.5px) scale(1.04)!important;
  filter:brightness(1.06)!important;
}
.vx-plan button:active{transform:scale(.96)!important}
.vx-lang button{
  transition:transform .22s cubic-bezier(.16,1,.3,1),background .2s ease,border-color .2s ease!important;
}
.vx-lang button:hover{transform:translateX(5px)!important}
.vx-lang button:active{transform:translateX(2px) scale(.99)!important}
.vx-toast{
  transition:opacity .24s cubic-bezier(.16,1,.3,1),transform .28s cubic-bezier(.16,1,.3,1)!important;
}
.vx-toast.show{
  opacity:1!important;
  transform:translateX(-50%) translateY(0) scale(1)!important;
}
/* staggered card entrance refinement */
.vx-card:nth-child(1){animation-delay:0s}
.vx-card:nth-child(2){animation-delay:.04s}
.vx-card:nth-child(3){animation-delay:.08s}
.vx-card:nth-child(4){animation-delay:.12s}
.vx-card:nth-child(5){animation-delay:.16s}

/* ============================================================
   TRIVIS DEV — AMOLED PFP THEME & DESIGN SYSTEM
   ============================================================ */
#trivis-vx-panel {
  --vx-sky: #ff1e38;
  --vx-sky2: #e11d48;
  --vx-sky-soft: rgba(255, 30, 56, 0.2);
  --vx-copper: #d4a373;
  --vx-amoled: #060205;
  background: linear-gradient(175deg, rgba(16, 5, 11, 0.96) 0%, rgba(6, 2, 4, 0.98) 100%) !important;
  backdrop-filter: blur(24px) saturate(190%) !important;
  -webkit-backdrop-filter: blur(24px) saturate(190%) !important;
  border: 1px solid rgba(255, 35, 65, 0.35) !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 30, 56, 0.28), inset 0 1px 0 rgba(212, 163, 115, 0.25) !important;
  border-radius: 24px !important;
}
#trivis-vx-panel.minimized {
  border-radius: 20px !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 24px rgba(255, 30, 56, 0.3), inset 0 1px 0 rgba(212, 163, 115, 0.25) !important;
}
#trivis-vx-header {
  border-bottom: 1px solid rgba(255, 35, 65, 0.2) !important;
  padding: 8px 10px !important;
}
.vx-brand-icon {
  position: relative !important;
  cursor: pointer !important;
  padding: 0 8px 0 2px !important;
  border-right: 1px solid rgba(255, 35, 65, 0.22) !important;
}
.vx-brand-icon img {
  border-radius: 50% !important;
  object-fit: cover !important;
  border: 1.5px solid rgba(212, 163, 115, 0.6) !important;
  box-shadow: 0 0 14px rgba(255, 30, 56, 0.65) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}
.vx-brand-icon:hover img {
  transform: scale(1.08) !important;
  box-shadow: 0 0 22px rgba(255, 30, 56, 0.9) !important;
}
.vx-pfp-dot {
  position: absolute !important;
  bottom: -1px !important;
  right: 6px !important;
  width: 7px !important;
  height: 7px !important;
  border-radius: 50% !important;
  background: #ff1e38 !important;
  border: 1.5px solid #060205 !important;
  box-shadow: 0 0 8px #ff1e38 !important;
  animation: trivisDotPulse 2s ease-in-out infinite !important;
}
.vx-ibtn {
  color: rgba(240, 216, 220, 0.65) !important;
  border-radius: 12px !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.vx-ibtn:hover {
  color: #fff !important;
  background: rgba(255, 30, 56, 0.18) !important;
  box-shadow: 0 0 14px rgba(255, 30, 56, 0.35) !important;
  border: 1px solid rgba(255, 30, 56, 0.38) !important;
  transform: translateY(-2px) scale(1.05) !important;
}
.vx-ibtn.active-sky {
  color: #fff !important;
  background: linear-gradient(135deg, rgba(225, 29, 72, 0.45), rgba(159, 18, 57, 0.65)) !important;
  border: 1px solid rgba(255, 30, 56, 0.75) !important;
  box-shadow: 0 0 20px rgba(255, 30, 56, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
}

/* ── SOCIAL CARDS REVAMP ── */
.zk-soc {
  padding: 4px 2px 8px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}
.zk-soc-head {
  text-align: left !important;
  padding: 2px 4px 4px !important;
}
.zk-soc-pill {
  display: inline-block !important;
  font-size: 9px !important;
  font-weight: 800 !important;
  letter-spacing: 0.12em !important;
  padding: 3px 8px !important;
  border-radius: 999px !important;
  margin-bottom: 6px !important;
  background: rgba(255, 30, 56, 0.16) !important;
  color: #ff3b5c !important;
  border: 1px solid rgba(255, 30, 56, 0.3) !important;
}
.zk-soc-title {
  font-size: 16px !important;
  font-weight: 800 !important;
  color: #fff !important;
  letter-spacing: 0.02em !important;
}
.zk-soc-sub {
  font-size: 11px !important;
  color: rgba(240, 216, 220, 0.55) !important;
  margin: 2px 0 0 !important;
}
.zk-soc-grid {
  display: flex !important;
  flex-direction: column !important;
  gap: 9px !important;
}
.zk-soc-card {
  all: unset !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  width: 100% !important;
  padding: 12px 14px !important;
  border-radius: 16px !important;
  cursor: pointer !important;
  border: 1px solid rgba(255, 35, 65, 0.18) !important;
  background: linear-gradient(135deg, rgba(26, 7, 14, 0.85), rgba(12, 3, 6, 0.92)) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.07) !important;
  color: #f5eaed !important;
  text-align: left !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, box-shadow 0.2s !important;
}
.zk-soc-card:hover {
  transform: translateY(-2px) !important;
  border-color: rgba(255, 30, 56, 0.65) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 30, 56, 0.28), inset 0 1px 0 rgba(212, 163, 115, 0.2) !important;
}
.zk-soc-card:active { transform: scale(0.98) !important; }
.zk-soc-ico {
  width: 38px !important;
  height: 38px !important;
  border-radius: 12px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  transition: transform 0.2s !important;
}
.zk-soc-card:hover .zk-soc-ico { transform: scale(1.08) !important; }
.zk-soc-ico.yt { background: rgba(255, 0, 0, 0.15) !important; border: 1px solid rgba(255, 0, 0, 0.35) !important; color: #ff2a2a !important; }
.zk-soc-ico.dc { background: rgba(88, 101, 242, 0.18) !important; border: 1px solid rgba(88, 101, 242, 0.4) !important; color: #818cf8 !important; }
.zk-soc-ico.ig { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%) !important; color: #fff !important; border: 1px solid rgba(255, 255, 255, 0.25) !important; }
.zk-soc-ico.tg { background: rgba(0, 136, 204, 0.18) !important; border: 1px solid rgba(0, 136, 204, 0.4) !important; color: #38bdf8 !important; }
.zk-soc-info { flex: 1 !important; min-width: 0 !important; display: flex !important; flex-direction: column !important; gap: 2px !important; }
.zk-soc-info b { font-size: 13px !important; font-weight: 800 !important; color: #fff !important; letter-spacing: 0.01em !important; }
.zk-soc-info span { font-size: 11px !important; color: rgba(240, 216, 220, 0.58) !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
.zk-soc-badge {
  font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.06em !important; padding: 3px 8px !important; border-radius: 999px !important;
  background: rgba(255, 255, 255, 0.06) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; color: rgba(255, 255, 255, 0.75) !important;
}
.zk-soc-card:hover .zk-soc-badge.yt { background: rgba(255, 0, 0, 0.25) !important; color: #ff6b6b !important; border-color: rgba(255, 0, 0, 0.5) !important; }
.zk-soc-card:hover .zk-soc-badge.dc { background: rgba(88, 101, 242, 0.25) !important; color: #a5b4fc !important; border-color: rgba(88, 101, 242, 0.5) !important; }
.zk-soc-card:hover .zk-soc-badge.ig { background: rgba(214, 36, 159, 0.25) !important; color: #f472b6 !important; border-color: rgba(214, 36, 159, 0.5) !important; }
.zk-soc-card:hover .zk-soc-badge.tg { background: rgba(0, 136, 204, 0.25) !important; color: #7dd3fc !important; border-color: rgba(0, 136, 204, 0.5) !important; }
.zk-soc-arr { color: rgba(255, 255, 255, 0.35) !important; transition: transform 0.2s, color 0.2s !important; }
.zk-soc-card:hover .zk-soc-arr { transform: translateX(3px) !important; color: #ff3b5c !important; }

/* ── DEV AUTOMATION REVAMP ── */
.zk-dev-badge {
  display: inline-block !important; font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.12em !important;
  padding: 3px 8px !important; border-radius: 999px !important; margin-bottom: 6px !important;
  background: rgba(255, 30, 56, 0.16) !important; color: #ff3b5c !important; border: 1px solid rgba(255, 30, 56, 0.3) !important;
}
.zk-dev-box {
  text-align: center !important; padding: 14px 12px !important; margin-bottom: 12px !important; border-radius: 18px !important;
  background: linear-gradient(135deg, rgba(35, 9, 18, 0.9), rgba(16, 4, 8, 0.95)) !important;
  border: 1px solid rgba(255, 35, 65, 0.3) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(212, 163, 115, 0.2) !important;
}
.zk-dev-title {
  font-size: 16px !important; font-weight: 900 !important; letter-spacing: 0.12em !important;
  background: linear-gradient(90deg, #fff, #fca5a5, #d4a373) !important;
  -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important;
}
.vx-feat-card {
  padding: 14px !important; border-radius: 18px !important; margin-bottom: 12px !important;
  background: linear-gradient(135deg, rgba(24, 7, 13, 0.85), rgba(12, 3, 6, 0.92)) !important;
  border: 1px solid rgba(255, 35, 65, 0.22) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
}
.vx-aa-row {
  display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 10px !important;
}
.vx-aa-meta .t { font-size: 13px !important; font-weight: 800 !important; color: #fff !important; }
.vx-aa-meta .s { font-size: 11px !important; color: rgba(240, 216, 220, 0.55) !important; margin-top: 2px !important; }
.vx-toggle {
  width: 44px !important; height: 24px !important; border-radius: 999px !important; cursor: pointer !important;
  background: rgba(255, 255, 255, 0.1) !important; border: 1px solid rgba(255, 255, 255, 0.18) !important;
  position: relative !important; transition: all 0.25s ease !important;
}
.vx-toggle.on {
  background: linear-gradient(90deg, #e11d48, #ff1e38) !important;
  border-color: #ff3b5c !important;
  box-shadow: 0 0 14px rgba(255, 30, 56, 0.6) !important;
}
.vx-toggle .knob {
  width: 18px !important; height: 18px !important; border-radius: 50% !important; background: #fff !important;
  position: absolute !important; top: 2px !important; left: 2px !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4) !important;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.vx-toggle.on .knob { transform: translateX(20px) !important; }
.vx-aa-status {
  display: inline-flex !important; align-items: center !important; gap: 6px !important;
  margin-top: 10px !important; font-size: 10px !important; font-weight: 800 !important;
  letter-spacing: 0.08em !important; color: rgba(240, 216, 220, 0.5) !important;
}
.vx-aa-status.on { color: #34d399 !important; }
.vx-aa-dot {
  width: 6px !important; height: 6px !important; border-radius: 50% !important;
  background: #64748b !important; display: inline-block !important;
}
.vx-aa-status.on .vx-aa-dot {
  background: #34d399 !important; box-shadow: 0 0 8px #34d399 !important;
  animation: trivisDotPulse 1.8s ease-in-out infinite !important;
}
.vx-feat-grid { display: flex !important; flex-direction: column !important; gap: 8px !important; }
.vx-fbtn.zk-3d {
  all: unset !important; box-sizing: border-box !important; display: flex !important; align-items: center !important;
  gap: 12px !important; width: 100% !important; padding: 12px 14px !important; border-radius: 16px !important; cursor: pointer !important;
  background: linear-gradient(135deg, rgba(26, 7, 14, 0.85), rgba(12, 3, 6, 0.92)) !important;
  border: 1px solid rgba(255, 35, 65, 0.2) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.07) !important;
  color: #f5eaed !important; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.vx-fbtn.zk-3d:hover {
  transform: translateY(-2px) !important;
  border-color: rgba(255, 30, 56, 0.65) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 30, 56, 0.25), inset 0 1px 0 rgba(212, 163, 115, 0.2) !important;
}
.vx-fbtn.zk-3d .fi {
  width: 36px !important; height: 36px !important; border-radius: 12px !important;
  display: flex !important; align-items: center !important; justify-content: center !important;
  background: rgba(255, 30, 56, 0.14) !important; border: 1px solid rgba(255, 30, 56, 0.3) !important;
  color: #ff3b5c !important; flex-shrink: 0 !important;
}
.vx-fbtn.zk-3d .fl { flex: 1 !important; min-width: 0 !important; display: flex !important; flex-direction: column !important; gap: 2px !important; }
.vx-fbtn.zk-3d .fl b { font-size: 13px !important; font-weight: 800 !important; color: #fff !important; }
.vx-fbtn.zk-3d .fl span { font-size: 11px !important; color: rgba(240, 216, 220, 0.55) !important; }
.vx-fbtn.zk-3d .fa { color: rgba(255, 255, 255, 0.3) !important; transition: transform 0.2s, color 0.2s !important; }
.vx-fbtn.zk-3d:hover .fa { transform: translateX(3px) !important; color: #ff3b5c !important; }

/* ── VIP LICENSE PASS REVAMP ── */
.zk-lic-wrap { display: flex !important; flex-direction: column !important; gap: 10px !important; padding: 2px !important; }
.zk-lic-pass {
  position: relative !important; overflow: hidden !important; padding: 18px 16px !important; border-radius: 20px !important;
  background: linear-gradient(145deg, rgba(35, 9, 18, 0.95), rgba(14, 4, 8, 0.98)) !important;
  border: 1px solid rgba(255, 35, 65, 0.35) !important;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6), 0 0 24px rgba(255, 30, 56, 0.2), inset 0 1px 0 rgba(212, 163, 115, 0.25) !important;
}
.zk-lp-top { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 12px !important; }
.zk-lp-chip {
  display: inline-flex !important; align-items: center !important; gap: 6px !important; font-size: 9px !important;
  font-weight: 800 !important; letter-spacing: 0.12em !important; padding: 3px 9px !important; border-radius: 999px !important;
  background: rgba(255, 30, 56, 0.18) !important; border: 1px solid rgba(255, 30, 56, 0.4) !important; color: #ff3b5c !important;
}
.zk-lp-radar {
  width: 6px !important; height: 6px !important; border-radius: 50% !important; background: #ff1e38 !important;
  box-shadow: 0 0 8px #ff1e38 !important; animation: trivisDotPulse 1.8s infinite !important;
}
.zk-lp-tier { font-size: 10px !important; font-weight: 800 !important; color: #d4a373 !important; letter-spacing: 0.08em !important; }
.zk-lp-keybox {
  padding: 10px 12px !important; border-radius: 14px !important; background: rgba(0, 0, 0, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important; margin-bottom: 12px !important;
}
.zk-lp-keylabel { font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.1em !important; color: rgba(240, 216, 220, 0.5) !important; margin-bottom: 4px !important; }
.zk-lp-keyrow { display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 8px !important; }
.zk-lp-code { font-family: 'JetBrains Mono', monospace !important; font-size: 13px !important; font-weight: 700 !important; color: #fff !important; letter-spacing: 0.05em !important; }
.zk-lp-copy {
  all: unset !important; cursor: pointer !important; display: inline-flex !important; align-items: center !important; gap: 4px !important;
  padding: 6px 10px !important; border-radius: 8px !important; font-size: 11px !important; font-weight: 700 !important;
  background: rgba(255, 30, 56, 0.25) !important; border: 1px solid rgba(255, 30, 56, 0.5) !important; color: #fff !important;
  transition: all 0.2s !important;
}
.zk-lp-copy:hover { background: #ff1e38 !important; box-shadow: 0 0 12px rgba(255, 30, 56, 0.6) !important; }
.zk-lp-copy.copied { background: #10b981 !important; border-color: #10b981 !important; }
.zk-lp-quota { margin-top: 6px !important; }
.zk-lp-qtop { display: flex !important; justify-content: space-between !important; font-size: 10px !important; font-weight: 800 !important; letter-spacing: 0.06em !important; color: rgba(240, 216, 220, 0.65) !important; margin-bottom: 6px !important; }
.zk-lp-qtop b { color: #34d399 !important; }
.zk-lp-qtrack { height: 5px !important; border-radius: 999px !important; background: rgba(255, 255, 255, 0.08) !important; overflow: hidden !important; }
.zk-lp-qbar { height: 100% !important; width: 100% !important; border-radius: 999px !important; background: linear-gradient(90deg, #ff1e38, #d4a373, #34d399) !important; box-shadow: 0 0 10px rgba(255, 30, 56, 0.5) !important; }
.zk-lp-qsub { font-size: 10px !important; color: rgba(240, 216, 220, 0.5) !important; margin-top: 6px !important; }

.zk-lp-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; margin: 4px 0 !important; }
.zk-lp-tile {
  display: flex !important; align-items: center !important; gap: 10px !important; padding: 10px 12px !important; border-radius: 14px !important;
  background: rgba(255, 255, 255, 0.04) !important; border: 1px solid rgba(255, 255, 255, 0.07) !important;
}
.zk-lp-tile .t-ico { width: 30px !important; height: 30px !important; border-radius: 10px !important; display: flex !important; align-items: center !important; justify-content: center !important; background: rgba(255, 30, 56, 0.12) !important; color: #ff3b5c !important; }
.zk-lp-tile .t-lab { font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.08em !important; color: rgba(240, 216, 220, 0.45) !important; }
.zk-lp-tile .t-val { font-size: 12px !important; font-weight: 700 !important; color: #fff !important; margin-top: 1px !important; }

.zk-lp-actions { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; margin-top: 4px !important; }
.zk-lp-btn {
  all: unset !important; box-sizing: border-box !important; cursor: pointer !important; display: flex !important; align-items: center !important;
  justify-content: center !important; gap: 6px !important; padding: 10px 8px !important; border-radius: 14px !important;
  font-size: 11px !important; font-weight: 700 !important; background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important; color: #f5eaed !important; transition: all 0.2s !important; text-align: center !important;
}
.zk-lp-btn:hover {
  background: rgba(255, 30, 56, 0.18) !important; border-color: rgba(255, 30, 56, 0.5) !important; transform: translateY(-1px) !important; color: #fff !important;
  box-shadow: 0 6px 18px rgba(255, 30, 56, 0.2) !important;
}
.zk-lp-btn.danger:hover {
  background: rgba(239, 68, 68, 0.25) !important; border-color: rgba(239, 68, 68, 0.6) !important; color: #fca5a5 !important;
}
.vx-foot { text-align: center !important; font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.12em !important; color: rgba(240, 216, 220, 0.35) !important; padding: 4px 0 !important; }

/* ── 2-COLUMN ULTRA-SEXY LANGUAGE MATRIX ── */
.zk-lang-wrap {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
  padding: 1px 2px 8px !important;
}
.zk-lang-head {
  text-align: left !important;
  padding: 2px 2px 2px !important;
}
.zk-lang-pill-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  margin-bottom: 6px !important;
}
.zk-lang-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  font-size: 9px !important;
  font-weight: 800 !important;
  letter-spacing: 0.12em !important;
  padding: 3px 9px !important;
  border-radius: 999px !important;
  background: rgba(255, 30, 56, 0.18) !important;
  color: #ff3b5c !important;
  border: 1px solid rgba(255, 30, 56, 0.4) !important;
}
.zk-lang-radar {
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
  background: #ff1e38 !important;
  box-shadow: 0 0 8px #ff1e38 !important;
  animation: trivisDotPulse 1.8s ease-in-out infinite !important;
}
.zk-lang-badge-count {
  font-size: 9px !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
  padding: 3px 8px !important;
  border-radius: 999px !important;
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #d4a373 !important;
}
.zk-lang-title {
  font-size: 16.5px !important;
  font-weight: 900 !important;
  color: #fff !important;
  letter-spacing: 0.02em !important;
  background: linear-gradient(90deg, #ffffff 0%, #fed7aa 50%, #fca5a5 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
.zk-lang-sub {
  font-size: 11px !important;
  line-height: 1.4 !important;
  color: rgba(240, 216, 220, 0.6) !important;
  margin: 3px 0 0 !important;
}

/* ── Hero Status Telemetry Card ── */
.zk-lang-hero {
  position: relative !important;
  overflow: hidden !important;
  border-radius: 17px !important;
  padding: 11px 13px !important;
  background: linear-gradient(135deg, rgba(38, 10, 20, 0.95) 0%, rgba(14, 4, 9, 0.98) 100%) !important;
  border: 1px solid rgba(255, 35, 65, 0.45) !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.65), 0 0 24px rgba(255, 30, 56, 0.22), inset 0 1px 0 rgba(212, 163, 115, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.zk-lang-hero-glow {
  position: absolute !important;
  top: -15px;
  right: -15px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 30, 56, 0.35) 0%, transparent 70%);
  pointer-events: none !important;
}
.zk-lang-hero-content {
  display: flex !important;
  align-items: center !important;
  gap: 11px !important;
  position: relative !important;
  z-index: 2 !important;
}
.zk-lang-hero-flag-box {
  width: 42px !important;
  height: 42px !important;
  border-radius: 13px !important;
  background: linear-gradient(135deg, rgba(255, 30, 56, 0.22), rgba(212, 163, 115, 0.15)) !important;
  border: 1px solid rgba(255, 30, 56, 0.4) !important;
  box-shadow: 0 0 16px rgba(255, 30, 56, 0.3) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}
.zk-lang-hero-flag {
  font-size: 19px !important;
  line-height: 1 !important;
}
.zk-lang-hero-code {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 8.5px !important;
  font-weight: 900 !important;
  color: #fca5a5 !important;
  letter-spacing: 0.08em !important;
  margin-top: 2px !important;
}
.zk-lang-hero-info {
  flex: 1 !important;
  min-width: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
}
.zk-lang-hero-label-row {
  display: flex !important;
  align-items: center !important;
  gap: 7px !important;
}
.zk-lang-hero-label {
  font-size: 14.5px !important;
  font-weight: 900 !important;
  color: #fff !important;
  letter-spacing: 0.01em !important;
}
.zk-lang-hero-active-chip {
  font-size: 8.5px !important;
  font-weight: 900 !important;
  letter-spacing: 0.08em !important;
  padding: 1.5px 6px !important;
  border-radius: 999px !important;
  background: rgba(34, 197, 94, 0.2) !important;
  border: 1px solid rgba(34, 197, 94, 0.45) !important;
  color: #4ade80 !important;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.3) !important;
}
.zk-lang-hero-desc {
  font-size: 10.5px !important;
  font-weight: 500 !important;
  color: rgba(240, 216, 220, 0.65) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.zk-lang-hero-check-circle {
  width: 24px !important;
  height: 24px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, #e11d48, #ff1e38) !important;
  box-shadow: 0 0 12px rgba(255, 30, 56, 0.7) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #fff !important;
  font-size: 12px !important;
  font-weight: 900 !important;
  flex-shrink: 0 !important;
}

/* ── Live Search Filter Bar ── */
.zk-lang-search-bar {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 6px 11px !important;
  border-radius: 13px !important;
  background: rgba(14, 4, 9, 0.75) !important;
  border: 1px solid rgba(255, 35, 65, 0.22) !important;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.4) !important;
  transition: all 0.2s ease !important;
}
.zk-lang-search-bar:focus-within {
  border-color: rgba(255, 30, 56, 0.6) !important;
  box-shadow: 0 0 14px rgba(255, 30, 56, 0.25), inset 0 2px 6px rgba(0, 0, 0, 0.5) !important;
}
.zk-lang-search-ico {
  color: rgba(255, 30, 56, 0.7) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}
.zk-lang-search-ico svg {
  width: 13px !important;
  height: 13px !important;
}
.zk-lang-search-input {
  all: unset !important;
  box-sizing: border-box !important;
  flex: 1 !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
  color: #fff !important;
}
.zk-lang-search-input::placeholder {
  color: rgba(240, 216, 220, 0.38) !important;
}
.zk-lang-search-clear {
  all: unset !important;
  cursor: pointer !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  color: rgba(255, 255, 255, 0.4) !important;
  padding: 2px 5px !important;
  border-radius: 4px !important;
  transition: all 0.15s !important;
}
.zk-lang-search-clear:hover {
  color: #ff3b5c !important;
}

/* ── 2-Column Cyber Grid ── */
.vx-lang {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 8px !important;
  padding: 2px 0 6px !important;
  max-height: 290px !important;
  overflow-y: auto !important;
  padding-right: 2px !important;
}
.vx-lang::-webkit-scrollbar {
  width: 4px !important;
}
.vx-lang::-webkit-scrollbar-thumb {
  background: rgba(255, 30, 56, 0.35) !important;
  border-radius: 999px !important;
}

/* ── Individual Cyber Language Card ── */
.zk-lang-card {
  all: unset !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  position: relative !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  min-height: 64px !important;
  padding: 9px 10px 8px !important;
  border-radius: 14px !important;
  background: linear-gradient(145deg, rgba(25, 7, 14, 0.88) 0%, rgba(11, 3, 6, 0.94) 100%) !important;
  border: 1px solid rgba(255, 35, 65, 0.2) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  color: #f5eaed !important;
  text-align: left !important;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.22s ease, background 0.2s !important;
  animation: vxRow 0.35s both !important;
  animation-delay: calc(var(--i, 0) * 0.035s) !important;
}
.zk-lang-card:hover {
  transform: translateY(-2px) scale(1.02) !important;
  border-color: rgba(255, 30, 56, 0.65) !important;
  background: linear-gradient(145deg, rgba(38, 11, 21, 0.95) 0%, rgba(18, 5, 10, 0.98) 100%) !important;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 0 18px rgba(255, 30, 56, 0.28), inset 0 1px 0 rgba(212, 163, 115, 0.22) !important;
}
.zk-lang-card:active {
  transform: scale(0.97) !important;
}

/* Active State: Neon Ignition */
.zk-lang-card.active {
  border-color: #ff1e38 !important;
  background: linear-gradient(145deg, rgba(225, 29, 72, 0.36) 0%, rgba(140, 14, 48, 0.58) 100%) !important;
  box-shadow: 0 0 20px rgba(255, 30, 56, 0.55), 0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.28) !important;
}

.zk-lang-card-top {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 6px !important;
  margin-bottom: 4px !important;
}
.zk-lang-card-flag-wrap {
  display: flex !important;
  align-items: center !important;
  gap: 5px !important;
}
.zk-lang-card-flag {
  font-size: 15px !important;
  line-height: 1 !important;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}
.zk-lang-card-code {
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 8.5px !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
  padding: 1px 5px !important;
  border-radius: 5px !important;
  background: rgba(255, 30, 56, 0.15) !important;
  border: 1px solid rgba(255, 30, 56, 0.3) !important;
  color: #ff99a8 !important;
}
.zk-lang-card.active .zk-lang-card-code {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
  color: #fff !important;
}
.zk-lang-card-status-dot {
  width: 5px !important;
  height: 5px !important;
  border-radius: 50% !important;
  background: #22c55e !important;
  box-shadow: 0 0 6px #22c55e !important;
  animation: trivisDotPulse 1.8s infinite !important;
}
.zk-lang-card-body {
  display: flex !important;
  flex-direction: column !important;
  gap: 1.5px !important;
}
.zk-lang-card-label {
  font-size: 13.5px !important;
  font-weight: 800 !important;
  color: #fff !important;
  line-height: 1.2 !important;
  letter-spacing: 0.01em !important;
}
.zk-lang-card-sub {
  font-size: 9.5px !important;
  font-weight: 600 !important;
  color: rgba(240, 216, 220, 0.52) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.zk-lang-card.active .zk-lang-card-sub {
  color: rgba(255, 255, 255, 0.8) !important;
}

.zk-lang-card-badge-row {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  margin-top: 3px !important;
}
.zk-lang-card-check {
  font-size: 9px !important;
  font-weight: 900 !important;
  color: #fff !important;
  background: #ff1e38 !important;
  padding: 1px 6px !important;
  border-radius: 999px !important;
  box-shadow: 0 0 10px rgba(255, 30, 56, 0.8) !important;
  letter-spacing: 0.05em !important;
}
.zk-lang-card-arrow {
  font-size: 10px !important;
  color: rgba(255, 255, 255, 0.25) !important;
  transition: transform 0.2s, color 0.2s !important;
}
.zk-lang-card:hover .zk-lang-card-arrow {
  transform: translateX(3px) !important;
  color: #ff3b5c !important;
}

/* Empty State */
.zk-lang-empty {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 24px 10px !important;
  border-radius: 14px !important;
  border: 1px dashed rgba(255, 30, 56, 0.25) !important;
  background: rgba(12, 3, 7, 0.6) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  color: rgba(240, 216, 220, 0.45) !important;
  text-align: center !important;
  grid-column: 1 / -1 !important;
}
/* --- PROMPT HISTORY DECK STYLES --- */
.zk-hist-section {
  margin-top: 12px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}
.zk-hist-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 4px !important;
}
.zk-hist-header-left {
  display: flex !important;
  align-items: center !important;
  gap: 7px !important;
}
.zk-hist-header-ico {
  color: #ff1e38 !important;
  display: inline-flex !important;
  align-items: center !important;
}
.zk-hist-header-title {
  font-size: 11px !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
  color: #fce7eb !important;
  text-transform: uppercase !important;
}
.zk-hist-count-badge {
  padding: 1px 7px !important;
  border-radius: 999px !important;
  background: rgba(255, 30, 56, 0.16) !important;
  border: 1px solid rgba(255, 30, 56, 0.35) !important;
  color: #ff8595 !important;
  font-size: 9.5px !important;
  font-weight: 800 !important;
}
.zk-hist-clear-btn {
  all: unset !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  padding: 3px 8px !important;
  border-radius: 8px !important;
  background: rgba(255, 30, 56, 0.08) !important;
  border: 1px solid rgba(255, 30, 56, 0.22) !important;
  color: #fca5a5 !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  transition: all 0.2s ease !important;
}
.zk-hist-clear-btn:hover {
  background: rgba(255, 30, 56, 0.22) !important;
  border-color: rgba(255, 30, 56, 0.6) !important;
  color: #fff !important;
  transform: translateY(-1px) !important;
}
.zk-hist-list {
  max-height: 155px !important;
  overflow-y: auto !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 7px !important;
  padding-right: 2px !important;
}
.zk-hist-list::-webkit-scrollbar {
  width: 4px !important;
}
.zk-hist-list::-webkit-scrollbar-thumb {
  background: rgba(255, 30, 56, 0.35) !important;
  border-radius: 999px !important;
}
.zk-hist-card {
  padding: 9px 10px !important;
  border-radius: 12px !important;
  background: linear-gradient(135deg, rgba(16, 5, 10, 0.85), rgba(8, 2, 5, 0.95)) !important;
  border: 1px solid rgba(255, 35, 65, 0.18) !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 5px !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.zk-hist-card:hover {
  border-color: rgba(255, 30, 56, 0.45) !important;
  background: linear-gradient(135deg, rgba(24, 7, 14, 0.9), rgba(12, 3, 7, 0.98)) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 18px rgba(255, 30, 56, 0.18) !important;
}
.zk-hist-card-top {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}
.zk-hist-card-meta {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
}
.zk-hist-mode {
  font-size: 8.5px !important;
  font-weight: 800 !important;
  padding: 1.5px 5px !important;
  border-radius: 4px !important;
  letter-spacing: 0.05em !important;
}
.zk-hist-mode.build {
  background: rgba(255, 30, 56, 0.2) !important;
  color: #ff8595 !important;
  border: 1px solid rgba(255, 30, 56, 0.35) !important;
}
.zk-hist-mode.plan {
  background: rgba(56, 189, 248, 0.18) !important;
  color: #7dd3fc !important;
  border: 1px solid rgba(56, 189, 248, 0.35) !important;
}
.zk-hist-status-dot {
  width: 5px !important;
  height: 5px !important;
  border-radius: 50% !important;
}
.zk-hist-status-dot.ok {
  background: #22c55e !important;
  box-shadow: 0 0 6px #22c55e !important;
}
.zk-hist-status-dot.err {
  background: #ef4444 !important;
  box-shadow: 0 0 6px #ef4444 !important;
}
.zk-hist-time {
  font-size: 9.5px !important;
  color: rgba(255, 255, 255, 0.4) !important;
}
.zk-hist-card-actions {
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
}
.zk-hist-btn {
  all: unset !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 3px !important;
  padding: 3px 6px !important;
  border-radius: 6px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.75) !important;
  font-size: 9.5px !important;
  font-weight: 700 !important;
  transition: all 0.15s ease !important;
}
.zk-hist-btn:hover {
  background: rgba(255, 30, 56, 0.2) !important;
  border-color: rgba(255, 30, 56, 0.5) !important;
  color: #fff !important;
}
.zk-hist-btn.reuse {
  background: rgba(255, 30, 56, 0.14) !important;
  border-color: rgba(255, 30, 56, 0.3) !important;
  color: #ff99a8 !important;
}
.zk-hist-btn.del:hover {
  background: rgba(239, 68, 68, 0.25) !important;
  border-color: #ef4444 !important;
  color: #fca5a5 !important;
}
.zk-hist-card-prompt {
  font-size: 11px !important;
  line-height: 1.45 !important;
  color: #e2e8f0 !important;
  max-height: 48px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  word-break: break-word !important;
  font-family: 'Inter', system-ui, sans-serif !important;
}
.zk-hist-empty {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 16px 10px !important;
  border-radius: 12px !important;
  border: 1px dashed rgba(255, 30, 56, 0.2) !important;
  background: rgba(12, 3, 7, 0.5) !important;
  text-align: center !important;
  gap: 3px !important;
}
.zk-hist-empty-ico {
  color: rgba(255, 30, 56, 0.5) !important;
  margin-bottom: 2px !important;
}
.zk-hist-empty-txt {
  font-size: 11px !important;
  font-weight: 700 !important;
  color: rgba(255, 255, 255, 0.6) !important;
}
.zk-hist-empty-sub {
  font-size: 9.5px !important;
  color: rgba(255, 255, 255, 0.3) !important;
}

@media (prefers-reduced-motion:reduce){
  #trivis-vx-root *,#trivis-vx-root *::before,#trivis-vx-root *::after{
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
}
`;
  }
  function svg(n) {
    const m = {
      chat: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.11 19.15 8.81 19 8.5 19Z" stroke="currentColor" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 8H17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 13H13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      lang: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 3H9C7.03 9 7.03 15 9 21H8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 3C16.97 9 16.97 15 15 21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 16V15C9 16.97 15 16.97 21 15V16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 9C9 7.03 15 7.03 21 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      social: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.37 10.79 4.41 8.77 4.41 6.29C4.41 3.76 6.45 1.71 8.99 1.71C11.52 1.71 13.57 3.76 13.57 6.29C13.56 8.77 11.61 10.79 9.16 10.87Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.16 14.56C1.74 16.18 1.74 18.82 4.16 20.43C6.91 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.92 12.73 4.16 14.56Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      features: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 17H13.5C16 17 17 16 17 13.5V10.5C17 8 16 7 13.5 7H10.5C8 7 7 8 7 10.5V13.5C7 16 8 17 10.5 17Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.01 4V2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4V2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.99 4V2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 8.01H22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 12H22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 15.99H22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.99 20V22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 20V22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.01 20V22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 15.99H4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 8.01H4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      key: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 10.75C14.25 8.68 12.57 7 10.5 7C8.43 7 6.75 8.68 6.75 10.75C6.75 12.82 8.43 14.5 10.5 14.5C12.57 14.5 14.25 12.82 14.25 10.75Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.25 13.5L20.5 20.75M17.5 17.75L19 19.25M15.5 15.75L17 17.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      keyCard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 10.75C14.25 8.68 12.57 7 10.5 7C8.43 7 6.75 8.68 6.75 10.75C6.75 12.82 8.43 14.5 10.5 14.5C12.57 14.5 14.25 12.82 14.25 10.75Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.25 13.5L20.5 20.75M17.5 17.75L19 19.25M15.5 15.75L17 17.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      chev: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.92 15.05L13.4 8.53C12.63 7.76 11.37 7.76 10.6 8.53L4.08 15.05" stroke="currentColor" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      arrowRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08" stroke="currentColor" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6"/><path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      pulse: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 12.5H7.5L10 4.5L14 19.5L16.5 12.5H21.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      sync: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C16.8 2 20.8 5.4 21.8 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M22 4V10H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      status: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.1 2H12.9C9.5 2 8.1 3.3 8 6.5H11.1C15.3 6.5 17.5 8.7 17.5 12.9V16C20.7 15.9 22 14.5 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 12.75L9 17.25L19.5 6.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      discord: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
      instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
      telegram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>',
      clean: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 5.5L16.5 3.5C15.7 2.7 14.3 2.7 13.5 3.5L3.5 13.5C2.7 14.3 2.7 15.7 3.5 16.5L6.5 19.5C7.3 20.3 8.7 20.3 9.5 19.5L19.5 9.5C20.3 8.7 20.3 7.3 19.5 6.5L18.5 5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 6L16 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M2 21H22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      cloud: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 16.5C4 16.5 2 14.5 2 11.5C2 8.8 4 6.7 6.6 6.5C7.6 3.8 10.3 2 13.5 2C17.6 2 21 5.4 21 9.5C21 10.2 20.9 10.9 20.7 11.5C21.5 12.2 22 13.3 22 14.5C22 16.7 20.2 18.5 18 18.5H15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 14V22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9 19L12 22L15 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      code: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 12H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 8V16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      download: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 11V17M12 17L9.5 14.5M12 17L14.5 14.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.33 16.5H13.66" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 12.5H14.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      restore: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.26 3.59997L5.05 12.29C4.74 12.62 4.44 13.27 4.38 13.72L4.01 16.98C3.88 18.16 4.72 18.96 5.9 18.78L9.14 18.29C9.59 18.22 10.23 17.89 10.54 17.55L18.75 8.85997C20.18 7.34997 20.82 5.62997 18.59 3.52997C16.37 1.43997 14.69 2.08997 13.26 3.59997Z" stroke="currentColor" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2" stroke="currentColor" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 22H21" stroke="currentColor" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      history: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C16.8 2 20.8 5.4 21.8 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 6V12L15.5 15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
    return m[n] || "";
  }

  function toast(msg) {
    let el = document.getElementById("trivis-vx-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "trivis-vx-toast";
      el.className = "vx-toast";
      document.documentElement.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function formatLeft(ms) {
    if (!ms || ms <= 0) return "0:00";
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (d > 0) return d + "d " + h + "h";
    if (h > 0) return h + ":" + String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
    return m + ":" + String(sec).padStart(2, "0");
  }

  function detectProjectSync() {
    try {
      const href = location.href || "";
      const m = href.match(/\/projects\/([0-9a-fA-F-]{8,})/i);
      if (m && m[1]) return { synced: true };
      const el = document.querySelector("[data-project-id],[data-projectid]");
      if (el) return { synced: true };
      return { synced: false };
    } catch (_) {
      return { synced: false };
    }
  }

  function getLicense(cb) {
    try {
      chrome.runtime.sendMessage({ type: "TRIVIS_STATUS" }, function (r) {
        if (chrome.runtime.lastError || !r) {
          chrome.storage.local.get(["trivis_lic_ok", "trivis_license_key", "trivis_lic_expires"], function (s) {
            const ok = !!(s && (s.trivis_lic_ok === true || s.trivis_lic_ok === "1") && s.trivis_license_key);
            let status = t("none"), left = "—";
            if (ok) {
              status = t("valid");
              if (s.trivis_lic_expires) {
                const exp = Date.parse(s.trivis_lic_expires);
                if (exp && Date.now() > exp) status = t("expired");
                else if (exp) left = formatLeft(exp - Date.now());
              }
            }
            cb({ ok, key: s && s.trivis_license_key, status, left });
          });
          return;
        }
        let status = r.ok ? t("valid") : t("none"), left = "—";
        if (r.ok && r.expires_at) {
          const exp = Date.parse(r.expires_at);
          if (exp && Date.now() > exp) status = t("expired");
          else if (exp) left = formatLeft(exp - Date.now());
        }
        cb({ ok: !!r.ok, key: r.key, status, left });
      });
    } catch (_) {
      cb({ ok: false, key: null, status: t("none"), left: "—" });
    }
  }

  function setBody(html) {
    bodyEl.innerHTML = '<div class="vx-sheet">' + html + "</div>";
  }

  function expand(on) {
    const chev = panel.querySelector('[data-act="chev"]');
    const want = !!on;
    const isMin = panel.classList.contains("minimized");
    // Sync flag with real class (fixes stuck expand)
    if (isMin) expanded = false;
    else if (!panel.classList.contains("is-collapsing")) expanded = true;

    if (want && !isMin && expanded && !panel.classList.contains("is-collapsing")) {
      if (chev) chev.style.transform = "rotate(0deg)";
      try {
        bodyEl.style.display = "";
      } catch (_) {}
      return;
    }
    if (!want && isMin) {
      if (chev) chev.style.transform = "rotate(180deg)";
      return;
    }

    if (want) {
      panel.classList.remove("is-collapsing");
      try {
        panel.classList.remove("light");
        root.classList.remove("light");
      } catch (_e) {}
      panel.classList.add("is-expanding");
      /* TRIVIS_FAN_EXPAND */
      setTimeout(function () { try { panel.classList.remove("is-expanding"); } catch (_) {} }, 750);
      panel.classList.remove("minimized");
      expanded = true;
      try {
        bodyEl.style.display = "";
        bodyEl.style.visibility = "visible";
        bodyEl.style.opacity = "1";
        bodyEl.style.pointerEvents = "auto";
      } catch (_) {}
      if (chev) chev.style.transform = "rotate(0deg)";
      clearTimeout(panel._expandT);
      panel._expandT = setTimeout(function () {
        panel.classList.remove("is-expanding");
      }, 800);
    } else {
      panel.classList.remove("is-expanding");
      panel.classList.add("is-collapsing");
      /* TRIVIS_FAN_COLLAPSE */
      if (chev) chev.style.transform = "rotate(180deg)";
      clearTimeout(panel._expandT);
      panel._expandT = setTimeout(function () {
        panel.classList.add("minimized");
        panel.classList.remove("is-collapsing");
        expanded = false;
      }, 240);
    }
  }


  let autoApprove = false;
  let autoApproveObs = null;

  function sendToLovableChat(promptText) {
    try {
      window.postMessage({ type: "TRIVIS_SEND_CHAT", text: String(promptText || "") }, "*");
    } catch (e) {
      console.warn("[Trivis] send chat", e);
    }
    toast("Prompt sent → Lovable");
  }

    function startAutoApprove() {
    stopAutoApprove();
    function isOurUi(el) {
      return !!(el.closest && (el.closest("#trivis-vx-root") || el.closest("#trivis-pro-gate") || el.closest("#trivis-limit-overlay")));
    }
    function labelOf(b) {
      return ((b.getAttribute("aria-label") || "") + " " + (b.textContent || "") + " " + (b.getAttribute("title") || "")).replace(/\s+/g, " ").trim();
    }
    function tryAutoApprove() {
      if (!autoApprove) return;
      var ae = document.activeElement;
      if (ae && (ae.tagName === "TEXTAREA" || ae.tagName === "INPUT" || ae.isContentEditable)) {
        return; // Skip when user is typing
      }
      try {
        const radios = document.querySelectorAll('input[type="radio"]');
        let radioGroupDone = {};
        radios.forEach(function (r) {
          if (isOurUi(r) || r.disabled) return;
          const name = r.name || r.id || "x";
          if (radioGroupDone[name]) return;
          if (!r.checked) {
            try {
              r.click();
              r.checked = true;
              r.dispatchEvent(new Event("change", { bubbles: true }));
              r.dispatchEvent(new Event("input", { bubbles: true }));
            } catch (_) {}
          }
          radioGroupDone[name] = true;
        });

        const buttons = document.querySelectorAll("button, [role='button'], a");
        let clicked = false;
        buttons.forEach(function (b) {
          if (clicked || b.dataset.trivisAa === "1" || b.disabled) return;
          if (isOurUi(b)) return;
          const t = labelOf(b);
          if (!t || t.length > 64) return;
          if (/^(skip|cancel|dismiss|close|no|reject)$/i.test(t)) return;
          if (/\b(skip|cancel|dismiss)\b/i.test(t) && !/\bsubmit\b/i.test(t)) return;
          const isPrimary =
            /^(submit|approve|allow|accept|confirm|continue|yes|run|execute|apply|ok|done)$/i.test(t) ||
            /\b(approve|allow changes|accept|confirm|run tool|submit)\b/i.test(t);
          if (!isPrimary) return;
          b.dataset.trivisAa = "1";
          clicked = true;
          setTimeout(function () {
            try { b.click(); } catch (_) {}
          }, 350);
        });
      } catch (_) {}
    }

    var aaTimer = null;
    function debouncedAutoApprove() {
      if (aaTimer) return;
      aaTimer = setTimeout(function () {
        aaTimer = null;
        tryAutoApprove();
      }, 1200);
    }

    autoApproveObs = new MutationObserver(function () {
      debouncedAutoApprove();
    });
    try {
      // NOTE: attributes: false eliminates attribute-change typing triggers
      autoApproveObs.observe(document.documentElement, { childList: true, subtree: true, attributes: false });
    } catch (_) {}
    try {
      autoApproveObs._poll = setInterval(tryAutoApprove, 2500);
    } catch (_) {}
    tryAutoApprove();
  }
  function stopAutoApprove() {
    if (autoApproveObs) {
      try { if (autoApproveObs._poll) clearInterval(autoApproveObs._poll); } catch (_) {}
      try { autoApproveObs.disconnect(); } catch (_) {}
      autoApproveObs = null;
    }
  }

  function downloadProjectSource() {
    toast("Scanning project…");
    try {
      window.postMessage({ type: "TRIVIS_TRY_DOWNLOAD_SOURCE" }, "*");
    } catch (_) {}
    setTimeout(function () {
      sendToLovableChat(
        "Please export and provide a complete downloadable ZIP of this project's full source code, " +
        "including all files and folders exactly as in the project (frontend, backend, config, assets). " +
        "If a Download ZIP button exists, point me to it; otherwise generate the full file tree and contents for archive."
      );
    }, 1200);
  }

  const PROMPT_WATERMARK =
    "Remove every Lovable watermark, badge, 'Edit with Lovable' link, lovable.dev branding, and any " +
    "Lovable attribution from this project — UI, HTML, footer, meta tags, and published site. " +
    "Search the whole codebase for lovable / 'edit with lovable' / badge components and delete them. " +
    "Ensure the live preview and production build show zero Lovable branding. Keep all other design intact.";

  const PROMPT_CLOUD =
    "Enable Supabase cloud for this project properly end-to-end: create/connect Supabase project, " +
    "configure env keys securely (never expose service role on client), set up auth if needed, " +
    "wire database tables the app requires, and verify cloud connection works in preview. " +
    "Document any required dashboard steps briefly in a comment only if unavoidable.";

  const PROMPT_SECURITY =
    "Perform a full security audit and harden this project completely.\\n\\n" +
    "1) Scan every file for weak points: XSS, CSRF, open redirects, insecure storage, " +
    "missing auth checks, overly permissive CORS, prototype pollution, dependency risks.\\n" +
    "2) Move any API keys, tokens, endpoint secrets, and private URLs off the frontend into " +
    "backend/edge functions / Supabase secrets / env — never ship secrets in client bundles.\\n" +
    "3) Fix each issue with production-safe code; do not leave TODOs.\\n" +
    "4) Tighten input validation, auth guards, RLS policies if Supabase is used, and error handling " +
    "so crashes and data leaks cannot happen.\\n" +
    "5) After fixes, summarize what was vulnerable and what you changed. Goal: no easy hacks, no secret leaks, stable app.";

  function showFeatures() {
    currentTab = "features";
    expand(true);
    try {
      chrome.storage.local.get(["trivis_auto_approve"], function (s) {
        autoApprove = !!(s && s.trivis_auto_approve);
        renderFeatures();
      });
    } catch (_) {
      renderFeatures();
    }
  }

  function renderFeatures() {
    setBody(
      '<div class="zk-dev-wrap">' +
        '<div class="zk-dev-box">' +
          '<span class="zk-dev-badge">DEV AUTOMATION MATRIX</span>' +
          '<div class="zk-dev-title">Full Project Control</div>' +
        '</div>' +
        '<div class="vx-feat-card">' +
          '<div class="vx-aa-row">' +
            '<div class="vx-aa-meta">' +
              '<div class="t">' + (t("autoApprove") || "Auto Approval Engine") + '</div>' +
              '<div class="s">' + (t("autoApproveSub") || "Auto-click Lovable approve / allow prompts") + '</div>' +
            '</div>' +
            '<div class="vx-toggle ' + (autoApprove ? "on" : "") + '" id="vx-toggle-auto">' +
              '<div class="knob"></div>' +
            '</div>' +
          '</div>' +
          '<div class="vx-aa-status ' + (autoApprove ? "on" : "") + '" id="vx-aa-status">' +
            '<span class="vx-aa-dot"></span>' +
            '<span id="vx-aa-status-txt">' + (autoApprove ? (t("engineActive") || "ENGINE ACTIVE // AUTO-APPROVING") : (t("engineStandby") || "ENGINE STANDBY")) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="vx-feat-grid">' +
          '<button type="button" class="vx-fbtn zk-3d" id="vx-feat-dl">' +
            '<div class="fi">' + svg("download") + '</div>' +
            '<div class="fl">' +
              '<b>' + (t("featVault") || "Export Full Source Code") + '</b>' +
              '<span>' + (t("featVaultSub") || "Request complete downloadable project ZIP") + '</span>' +
            '</div>' +
            '<div class="fa">' + svg("arrowRight") + '</div>' +
          '</button>' +
          '<button type="button" class="vx-fbtn zk-3d" id="vx-feat-watermark">' +
            '<div class="fi">' + svg("clean") + '</div>' +
            '<div class="fl">' +
              '<b>' + (t("featWm") || "Remove Lovable Watermark") + '</b>' +
              '<span>' + (t("featWmSub") || "Purge all badges, footers & attribution links") + '</span>' +
            '</div>' +
            '<div class="fa">' + svg("arrowRight") + '</div>' +
          '</button>' +
          '<button type="button" class="vx-fbtn zk-3d" id="vx-feat-cloud">' +
            '<div class="fi">' + svg("cloud") + '</div>' +
            '<div class="fl">' +
              '<b>' + (t("featCloud") || "Connect Supabase Cloud") + '</b>' +
              '<span>' + (t("featCloudSub") || "Configure database tables, RLS & safe client env") + '</span>' +
            '</div>' +
            '<div class="fa">' + svg("arrowRight") + '</div>' +
          '</button>' +
          '<button type="button" class="vx-fbtn zk-3d" id="vx-feat-security">' +
            '<div class="fi">' + svg("status") + '</div>' +
            '<div class="fl">' +
              '<b>Security Audit & Harden</b>' +
              '<span>Scan vulnerabilities, sanitize inputs & patch leaks</span>' +
            '</div>' +
            '<div class="fa">' + svg("arrowRight") + '</div>' +
          '</button>' +
        '</div>' +
      '</div>'
    );

    var toggle = bodyEl.querySelector("#vx-toggle-auto");
    var statusEl = bodyEl.querySelector("#vx-aa-status");
    var statusTxt = bodyEl.querySelector("#vx-aa-status-txt");
    if (toggle) {
      toggle.onclick = function () {
        autoApprove = !autoApprove;
        toggle.classList.toggle("on", autoApprove);
        if (statusEl) statusEl.classList.toggle("on", autoApprove);
        if (statusTxt) {
          statusTxt.textContent = autoApprove
            ? (t("engineActive") || "ENGINE ACTIVE // AUTO-APPROVING")
            : (t("engineStandby") || "ENGINE STANDBY");
        }
        try {
          chrome.storage.local.set({ trivis_auto_approve: autoApprove });
        } catch (_) {}
        if (autoApprove) startAutoApprove();
        else stopAutoApprove();
        toast(autoApprove ? "Auto-Approve Enabled ✓" : "Auto-Approve Disabled");
      };
    }

    var btnDl = bodyEl.querySelector("#vx-feat-dl");
    if (btnDl) {
      btnDl.onclick = function () {
        downloadProjectSource();
      };
    }
    var btnWm = bodyEl.querySelector("#vx-feat-watermark");
    if (btnWm) {
      btnWm.onclick = function () {
        toast("Sending watermark purge prompt…");
        sendToLovableChat(PROMPT_WATERMARK);
      };
    }
    var btnCloud = bodyEl.querySelector("#vx-feat-cloud");
    if (btnCloud) {
      btnCloud.onclick = function () {
        toast("Connecting Supabase cloud…");
        sendToLovableChat(PROMPT_CLOUD);
      };
    }
    var btnSec = bodyEl.querySelector("#vx-feat-security");
    if (btnSec) {
      btnSec.onclick = function () {
        toast("Initiating security hardening…");
        sendToLovableChat(PROMPT_SECURITY);
      };
    }
  }

  function showSocial() {
    currentTab = "social";
    expand(true);
    setBody(
      '<div class="zk-soc">' +
        '<div class="zk-soc-head">' +
          '<span class="zk-soc-pill">' + (t("commNexus") || "COMMUNITY NEXUS") + '</span>' +
          '<div class="zk-soc-title">' + (t("offChannels") || "Official Channels") + '</div>' +
          '<p class="zk-soc-sub">' + (t("offChannelsSub") || "Official verified Trivis developer ecosystem") + '</p>' +
        '</div>' +
        '<div class="zk-soc-grid">' +
          '<a href="https://www.youtube.com/@Triv1s" target="_blank" rel="noopener noreferrer" class="zk-soc-card" data-soc="yt">' +
            '<div class="zk-soc-ico yt">' + svg("youtube") + '</div>' +
            '<div class="zk-soc-info">' +
              '<b>YouTube</b>' +
              '<span>@Triv1s · Dev Guides & Demos</span>' +
            '</div>' +
            '<span class="zk-soc-badge yt">' + (t("subscribe") || "SUBSCRIBE") + '</span>' +
            '<span class="zk-soc-arr">→</span>' +
          '</a>' +
          '<a href="https://discord.com/invite/SvxytM8Y2p" target="_blank" rel="noopener noreferrer" class="zk-soc-card" data-soc="dc">' +
            '<div class="zk-soc-ico dc">' + svg("discord") + '</div>' +
            '<div class="zk-soc-info">' +
              '<b>Discord</b>' +
              '<span>Trivis VIP Community Lounge</span>' +
            '</div>' +
            '<span class="zk-soc-badge dc">JOIN</span>' +
            '<span class="zk-soc-arr">→</span>' +
          '</a>' +
          '<a href="https://www.instagram.com/trivis.dev/" target="_blank" rel="noopener noreferrer" class="zk-soc-card" data-soc="ig">' +
            '<div class="zk-soc-ico ig">' + svg("instagram") + '</div>' +
            '<div class="zk-soc-info">' +
              '<b>Instagram</b>' +
              '<span>@trivis.dev · Dev Reels & Updates</span>' +
            '</div>' +
            '<span class="zk-soc-badge ig">FOLLOW</span>' +
            '<span class="zk-soc-arr">→</span>' +
          '</a>' +
          '<a href="https://t.me/Trivisdev" target="_blank" rel="noopener noreferrer" class="zk-soc-card" data-soc="tg">' +
            '<div class="zk-soc-ico tg">' + svg("telegram") + '</div>' +
            '<div class="zk-soc-info">' +
              '<b>Telegram</b>' +
              '<span>@Trivisdev · Announcements & Direct Chat</span>' +
            '</div>' +
            '<span class="zk-soc-badge tg">CHANNEL</span>' +
            '<span class="zk-soc-arr">→</span>' +
          '</a>' +
        '</div>' +
      '</div>'
    );
    bodyEl.querySelectorAll(".zk-soc-card").forEach(function (card) {
      card.onclick = function (e) {
        e.preventDefault();
        var url = card.getAttribute("href");
        if (url) {
          try {
            if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
              chrome.tabs.create({ url: url });
            } else {
              window.open(url, "_blank", "noopener,noreferrer");
            }
          } catch (_) {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }
      };
    });
  }

  function showLicense() {
    currentTab = "license";
    expand(true);
    getLicense(function (lic) {
      var displayKey = (lic && lic.key) ? String(lic.key) : "TRIVIS-PRO-VIP-2026";
      var statusText = (lic && lic.ok) ? "VIP LIFETIME ACCESS" : "VIP ACCESS ACTIVE";
      var expText = (lic && lic.left && lic.left !== "—") ? lic.left : "Unlimited";
      setBody(
        '<div class="zk-lic-wrap">' +
          '<div class="zk-lic-pass">' +
            '<div class="zk-lp-top">' +
              '<span class="zk-lp-chip">' +
                '<span class="zk-lp-radar"></span>' +
                '<span>' + statusText + '</span>' +
              '</span>' +
              '<span class="zk-lp-tier">TIER: ENTERPRISE</span>' +
            '</div>' +
            '<div class="zk-lp-keybox">' +
              '<div class="zk-lp-keylabel">LICENSE SECURITY CREDENTIAL</div>' +
              '<div class="zk-lp-keyrow">' +
                '<div class="zk-lp-code">' + escapeHtml(displayKey) + '</div>' +
                '<button type="button" class="zk-lp-copy" id="zk-lic-copy">' +
                  svg("copy") +
                  '<span>Copy</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<div class="zk-lp-quota">' +
              '<div class="zk-lp-qtop">' +
                '<span>HIGH-PRIORITY QUOTA</span>' +
                '<b>100% UNLIMITED</b>' +
              '</div>' +
              '<div class="zk-lp-qtrack">' +
                '<div class="zk-lp-qbar" style="width:100%"></div>' +
              '</div>' +
              '<div class="zk-lp-qsub">Expires: ' + expText + ' · Zero Throttle Active</div>' +
            '</div>' +
          '</div>' +
          '<div class="zk-lp-grid">' +
            '<div class="zk-lp-tile">' +
              '<div class="t-ico">' + svg("status") + '</div>' +
              '<div class="t-meta">' +
                '<div class="t-lab">ENGINE STATUS</div>' +
                '<div class="t-val">Operational ✓</div>' +
              '</div>' +
            '</div>' +
            '<div class="zk-lp-tile">' +
              '<div class="t-ico">' + svg("pulse") + '</div>' +
              '<div class="t-meta">' +
                '<div class="t-lab">LATENCY</div>' +
                '<div class="t-val">4 ms (Ultra)</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="zk-lp-actions">' +
            '<button type="button" class="zk-lp-btn" id="zk-lic-refresh">' +
              svg("sync") +
              '<span>Re-Sync Pass</span>' +
            '</button>' +
            '<button type="button" class="zk-lp-btn danger" id="zk-lic-manage">' +
              svg("key") +
              '<span>Update Key</span>' +
            '</button>' +
          '</div>' +
          '<div class="vx-foot">TRIVIS DEV · CRYPTO-SECURED LICENSE HARNESS</div>' +
        '</div>'
      );

      var copyBtn = bodyEl.querySelector("#zk-lic-copy");
      if (copyBtn) {
        copyBtn.onclick = function () {
          try {
            navigator.clipboard.writeText(displayKey);
            copyBtn.classList.add("copied");
            copyBtn.innerHTML = svg("check") + "<span>Copied!</span>";
            toast("License Key Copied ✓");
            setTimeout(function () {
              if (copyBtn) {
                copyBtn.classList.remove("copied");
                copyBtn.innerHTML = svg("copy") + "<span>Copy</span>";
              }
            }, 2000);
          } catch (_) {
            toast(displayKey);
          }
        };
      }

      var refreshBtn = bodyEl.querySelector("#zk-lic-refresh");
      if (refreshBtn) {
        refreshBtn.onclick = function () {
          toast("Refreshing License Cache…");
          try {
            chrome.runtime.sendMessage({ type: "TRIVIS_STATUS" }, function () {
              setTimeout(showLicense, 350);
            });
          } catch (_) {
            setTimeout(showLicense, 350);
          }
        };
      }

      var manageBtn = bodyEl.querySelector("#zk-lic-manage");
      if (manageBtn) {
        manageBtn.onclick = function () {
          var k = prompt("Enter Trivis License Key:", displayKey);
          if (k && k.trim()) {
            var trimmed = k.trim();
            chrome.storage.local.set({
              trivis_lic_ok: true,
              trivis_license_key: trimmed
            }, function () {
              toast("License Key Updated ✓");
              showLicense();
            });
          }
        };
      }
    });
  }

  function showWelcome() {
    currentTab = "welcome";
    expand(true);
    setBody(
      '<div class="zk-welcome zk-glass">' +
        '<div class="zk-welcome-orb zk-welcome-orb-a"></div>' +
        '<div class="zk-welcome-orb zk-welcome-orb-b"></div>' +
        '<div class="zk-welcome-inner">' +
          '<div class="zk-welcome-badge">' +
            '<span class="z">TRIVIS</span><span class="x">/</span><span class="t">DEV V3</span>' +
          '</div>' +
          '<div class="zk-welcome-title">' + (t("commandCenter") || "Next-Gen Workspace") + '</div>' +
          '<div class="zk-welcome-line"></div>' +
          '<p class="zk-welcome-text">' +
            (t("operativeSession") || "Autonomous developer HUD & prompt engineering terminal designed for high-velocity Lovable building.") +
          '</p>' +
          '<div class="zk-welcome-hints">' +
            '<div class="zk-wh">' +
              '<div class="zk-wh-icon">' + svg("features") + '</div>' +
              '<div class="zk-wh-text"><b>' + (t("tipFeatures") || "Dev Automation") + ':</b> ' + (t("devAutoDesc") || "Auto-approve, cloud bridge & watermark strip.") + '</div>' +
            '</div>' +
            '<div class="zk-wh">' +
              '<div class="zk-wh-icon">' + svg("chat") + '</div>' +
              '<div class="zk-wh-text"><b>' + (t("tipChat") || "Neural Studio") + ':</b> Task files with live prompt history.</div>' +
            '</div>' +
            '<div class="zk-wh">' +
              '<div class="zk-wh-icon">' + svg("lang") + '</div>' +
              '<div class="zk-wh-text"><b>' + (t("tipLang") || "12 Locales") + ':</b> Real-time multilingual HUD translation matrix.</div>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="vx-btn zk-welcome-cta" id="vx-welcome-start">' +
            '<span>LAUNCH NEURAL STUDIO</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
    var startBtn = bodyEl.querySelector("#vx-welcome-start");
    if (startBtn) {
      startBtn.onclick = function () {
        panel.querySelectorAll(".vx-ibtn").forEach(function (x) { x.classList.remove("active-sky"); });
        var chatBtn = panel.querySelector('[data-act="chat"]');
        if (chatBtn) chatBtn.classList.add("active-sky");
        showTrivisChat();
      };
    }
  }

  function updateDockTooltips() {
    try {
      if (!panel) return;
      var bBrand = panel.querySelector(".vx-brand-icon");
      if (bBrand) bBrand.setAttribute("title", t("tipOverview") || "Trivis Dev Overview");
      var bLang = panel.querySelector('[data-act="lang"]');
      if (bLang) bLang.setAttribute("title", t("tipLang") || "Language");
      var bSocial = panel.querySelector('[data-act="social"]');
      if (bSocial) bSocial.setAttribute("title", t("tipSocial") || "Community & Channels");
      var bFeat = panel.querySelector('[data-act="features"]');
      if (bFeat) bFeat.setAttribute("title", t("tipFeatures") || "Dev Automation");
      var bChat = panel.querySelector('[data-act="chat"]');
      if (bChat) bChat.setAttribute("title", t("tipChat") || "Neural Studio");
      var bLic = panel.querySelector('[data-act="license"]');
      if (bLic) bLic.setAttribute("title", t("tipKey") || "Security Pass");
      var bChev = panel.querySelector('[data-act="chev"]');
      if (bChev) bChev.setAttribute("title", expanded ? (t("tipCollapse") || "Collapse HUD") : (t("tipExpand") || "Expand HUD"));
    } catch (_) {}
  }

  let selectedMethod = "1";

  
  
  function syncTrivisCredits(lic) {
    try {
      var n = 0;
      if (lic && typeof lic.credits === "number") n = lic.credits;
      else if (lic && lic.license && typeof lic.license.credits === "number") n = lic.license.credits;
      else {
        try {
          n = parseInt(localStorage.getItem("trivis_ext_credits") || localStorage.getItem("zokys_ext_credits") || "20", 10);
          if (isNaN(n)) n = 20;
          if (n > 20 && !lic) n = 20;
        } catch (_) { n = 100; }
      }
      localStorage.setItem("trivis_ext_credits", String(n));
      localStorage.setItem("zokys_ext_credits", String(n));
      try { chrome.storage.local.set({ trivis_ext_credits: n, zokys_ext_credits: n }); } catch (_) {}
      return n;
    } catch (_) { return 0; }
  }
  var syncZokysCredits = syncTrivisCredits;


  function showAccountSwitchModal() {}

  function showSwitchShield(msg) {}

  var TRIVIS_CHAT_HIST_KEY = "trivis_chat_hist";
  var ZOKYS_CHAT_HIST_KEY = "zokys_chat_hist";

  function loadChatHist() {
    try {
      var raw = localStorage.getItem(TRIVIS_CHAT_HIST_KEY) || localStorage.getItem(ZOKYS_CHAT_HIST_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.slice(-40) : [];
    } catch (_) {
      return [];
    }
  }
  function saveChatHist(arr) {
    try {
      var json = JSON.stringify(arr.slice(-40));
      localStorage.setItem(TRIVIS_CHAT_HIST_KEY, json);
      localStorage.setItem(ZOKYS_CHAT_HIST_KEY, json);
    } catch (_) {}
  }
  function pushChatHist(item) {
    var arr = loadChatHist();
    arr.push(item);
    saveChatHist(arr);
    return arr;
  }

  function fmtTime(ts) {
    try {
      var d = new Date(ts);
      return d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (_) {
      return "";
    }
  }

  function showTrivisChat() {
    currentTab = "chat";
    expand(true);
    var planOn = false;
    try {
      if (localStorage.getItem("trivis_plan_mode") === "1" || localStorage.getItem("zokys_plan_mode") === "1") planOn = true;
    } catch (_) {}

    var STORAGE_KEY = "trivis_prompt_history";

    function getHistory(cb) {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get([STORAGE_KEY, "zokys_prompt_history"], function (res) {
            var list = (res && (res[STORAGE_KEY] || res["zokys_prompt_history"])) || [];
            cb(Array.isArray(list) ? list : []);
          });
          return;
        }
      } catch (_) {}
      try {
        var raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("zokys_prompt_history");
        cb(raw ? JSON.parse(raw) : []);
      } catch (_) {
        cb([]);
      }
    }

    function saveHistory(list) {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          var obj = {};
          obj[STORAGE_KEY] = list;
          obj["zokys_prompt_history"] = list;
          chrome.storage.local.set(obj);
        }
      } catch (_) {}
      try {
        var s = JSON.stringify(list);
        localStorage.setItem(STORAGE_KEY, s);
        localStorage.setItem("zokys_prompt_history", s);
      } catch (_) {}
    }

    setBody(
      '<div class="zk-lb zk-glass">' +
        '<div class="zk-lb-title">' + (t("chatTitle") || "Trivis") + ' <span class="heart">♥</span></div>' +
        '<p class="zk-lb-desc">' + (t("chatSub") || "Ship prompts as a secure task file. Lovable reads the file and finishes the job — stable, clean, automatic.") + '</p>' +
        '<div class="zk-lb-box zk-glass-panel">' +
          '<textarea id="vx-chat-input" class="zk-lb-input" rows="3" placeholder="' + (t("askLovable") || "Ask Lovable…") + '"></textarea>' +
          '<div class="zk-lb-bar">' +
            '<button type="button" class="zk-lb-plus zk-glass-circle" id="vx-chat-plus" title="Add files">+</button>' +
            '<div class="zk-lb-spacer"></div>' +
            '<div class="zk-lb-capsule zk-glass-cap" id="vx-mode-cap">' +
              '<button type="button" class="zk-lb-cap-btn" id="vx-mode-toggle"><span id="vx-mode-label">' +
              (planOn ? (t("planMode") || "Plan") : (t("buildMode") || "Build")) +
              '</span><span class="caret">▾</span></button>' +
              '<div class="zk-lb-menu zk-glass-panel" id="vx-mode-menu" hidden>' +
                '<button type="button" data-mode="build">Build</button>' +
                '<button type="button" data-mode="plan">Plan</button>' +
              '</div>' +
            '</div>' +
            '<button type="button" class="zk-lb-send zk-glass-circle" id="vx-chat-send" title="Send">↑</button>' +
            '<button type="button" class="zk-lb-stop zk-glass-circle" id="vx-chat-stop" title="Stop" hidden>■</button>' +
          '</div>' +
        '</div>' +
        '<input type="file" id="vx-chat-file" style="display:none" multiple />' +
        '<div class="zk-hist-section">' +
          '<div class="zk-hist-header">' +
            '<div class="zk-hist-header-left">' +
              '<span class="zk-hist-header-ico">' + svg("history") + '</span>' +
              '<span class="zk-hist-header-title">PROMPT HISTORY</span>' +
              '<span class="zk-hist-count-badge" id="vx-hist-count">0</span>' +
            '</div>' +
            '<div class="zk-hist-header-right">' +
              '<button type="button" class="zk-hist-clear-btn" id="vx-hist-clear" title="Clear all history">' +
                svg("trash") +
                '<span>' + (t("clearAll") || "Clear All") + '</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div class="zk-hist-list" id="vx-chat-hist-list"></div>' +
        '</div>' +
      '</div>'
    );

    var histList = bodyEl.querySelector("#vx-chat-hist-list");
    var histCount = bodyEl.querySelector("#vx-hist-count");
    var histClear = bodyEl.querySelector("#vx-hist-clear");
    var input = bodyEl.querySelector("#vx-chat-input");
    var sendBtn = bodyEl.querySelector("#vx-chat-send");
    var stopBtn = bodyEl.querySelector("#vx-chat-stop");
    var plusBtn = bodyEl.querySelector("#vx-chat-plus");
    var fileInp = bodyEl.querySelector("#vx-chat-file");
    var modeToggle = bodyEl.querySelector("#vx-mode-toggle");
    var modeMenu = bodyEl.querySelector("#vx-mode-menu");
    var modeLabel = bodyEl.querySelector("#vx-mode-label");

    function renderHistory() {
      getHistory(function (list) {
        if (!histList) return;
        if (histCount) histCount.textContent = String(list.length);

        if (!list || list.length === 0) {
          histList.innerHTML =
            '<div class="zk-hist-empty">' +
              '<div class="zk-hist-empty-ico">' + svg("clock") + '</div>' +
              '<div class="zk-hist-empty-txt">No prompt history recorded</div>' +
              '<div class="zk-hist-empty-sub">Dispatched prompts will be archived here</div>' +
            '</div>';
          return;
        }

        var html = "";
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var m = (item.mode || "build").toLowerCase();
          var modeClass = m === "plan" ? "plan" : "build";
          var modeLabelText = m === "plan" ? "PLAN" : "BUILD";
          var statusDotClass = item.ok !== false ? "ok" : "err";
          var tStr = item.time || "Recent";

          html +=
            '<div class="zk-hist-card" data-id="' + item.id + '">' +
              '<div class="zk-hist-card-top">' +
                '<div class="zk-hist-card-meta">' +
                  '<span class="zk-hist-mode ' + modeClass + '">' + modeLabelText + '</span>' +
                  '<span class="zk-hist-status-dot ' + statusDotClass + '" title="' + (item.ok !== false ? "Dispatched" : "Error") + '"></span>' +
                  '<span class="zk-hist-time">' + tStr + '</span>' +
                '</div>' +
                '<div class="zk-hist-card-actions">' +
                  '<button type="button" class="zk-hist-btn reuse" data-act="reuse" title="Insert prompt into input">' +
                    svg("restore") +
                    '<span>' + (t("use") || "Use") + '</span>' +
                  '</button>' +
                  '<button type="button" class="zk-hist-btn copy" data-act="copy" title="Copy prompt">' +
                    svg("copy") +
                  '</button>' +
                  '<button type="button" class="zk-hist-btn del" data-act="del" title="Delete from history">' +
                    svg("trash") +
                  '</button>' +
                '</div>' +
              '</div>' +
              '<div class="zk-hist-card-prompt">' + escapeHtml(item.text) + '</div>' +
            '</div>';
        }
        histList.innerHTML = html;

        histList.querySelectorAll(".zk-hist-card").forEach(function (card) {
          var cid = card.getAttribute("data-id");
          var record = list.find(function (x) { return x.id === cid; });
          if (!record) return;

          var reuse = card.querySelector('[data-act="reuse"]');
          if (reuse) {
            reuse.onclick = function (e) {
              e.stopPropagation();
              if (input) {
                input.value = record.text;
                input.focus();
                toast("Prompt Loaded into Input ✓");
              }
            };
          }

          var copy = card.querySelector('[data-act="copy"]');
          if (copy) {
            copy.onclick = function (e) {
              e.stopPropagation();
              try {
                navigator.clipboard.writeText(record.text);
                toast("Prompt Copied ✓");
              } catch (_) {
                toast(record.text);
              }
            };
          }

          var del = card.querySelector('[data-act="del"]');
          if (del) {
            del.onclick = function (e) {
              e.stopPropagation();
              var next = list.filter(function (x) { return x.id !== cid; });
              saveHistory(next);
              renderHistory();
              toast("Log Removed");
            };
          }
        });
      });
    }

    renderHistory();

    if (histClear) {
      histClear.onclick = function () {
        saveHistory([]);
        renderHistory();
        toast("History Cleared ✓");
      };
    }

    function setSending(busy) {
      if (sendBtn) sendBtn.hidden = !!busy;
      if (stopBtn) stopBtn.hidden = !busy;
    }

    function setMode(isPlan) {
      planOn = !!isPlan;
      try {
        localStorage.setItem("trivis_plan_mode", planOn ? "1" : "0");
        localStorage.setItem("zokys_plan_mode", planOn ? "1" : "0");
      } catch (_) {}
      if (modeLabel) modeLabel.textContent = planOn ? "Plan" : "Build";
      if (modeMenu) modeMenu.hidden = true;
      var setModeFn = window.__trivisSetLovableMode || window.__zokysSetLovableMode;
      if (typeof setModeFn === "function") {
        setModeFn(planOn ? "plan" : "build");
      }
    }

    if (modeToggle && modeMenu) {
      modeToggle.onclick = function (e) {
        e.stopPropagation();
        modeMenu.hidden = !modeMenu.hidden;
      };
      modeMenu.querySelectorAll("button").forEach(function (b) {
        b.onclick = function () {
          setMode(b.getAttribute("data-mode") === "plan");
        };
      });
    }

    if (plusBtn && fileInp) {
      plusBtn.onclick = function () {
        fileInp.click();
      };
      fileInp.onchange = function () {
        var attachFn = window.__trivisAttachExtraFiles || window.__zokysAttachExtraFiles;
        if (typeof attachFn === "function") {
          attachFn(fileInp.files);
          toast("File attached");
        }
        fileInp.value = "";
      };
    }

    if (stopBtn) {
      stopBtn.onclick = function () {
        var stopFn = window.__trivisClickStop || window.__zokysClickStop;
        if (typeof stopFn === "function") stopFn();
        setSending(false);
        toast("Stopped");
      };
    }

    function doSend() {
      var text = ((input && input.value) || "").trim();
      if (!text) return;
      setSending(true);
      var mode = planOn ? "plan" : "build";
      function done(ok) {
        var now = new Date();
        var timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        var newEntry = {
          id: "p_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
          text: text,
          mode: mode,
          time: timeStr,
          timestamp: Date.now(),
          ok: !!ok
        };
        getHistory(function (prev) {
          var next = [newEntry].concat(prev.filter(function (p) { return p.text !== text; })).slice(0, 35);
          saveHistory(next);
          renderHistory();
        });

        if (ok) input.value = "";
        toast(ok ? "Sent" : "Send failed");
        setTimeout(function () {
          setSending(false);
        }, ok ? 2500 : 400);
      }
      try {
        var sendFn = window.__trivisChatSendTxt || window.__zokysChatSendTxt;
        if (typeof sendFn === "function") {
          Promise.resolve(
            sendFn(text, {
              mode: mode,
              autoSend: true,
              showLoader: false,
              waitForSendReady: true
            })
          )
            .then(done)
            .catch(function () {
              done(false);
            });
        } else done(false);
      } catch (e) {
        done(false);
      }
    }

    if (sendBtn) sendBtn.onclick = doSend;
    if (input) {
      input.onkeydown = function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          doSend();
        }
      };
    }
  }
  var showZokysChat = showTrivisChat;


  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sleep(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }

  function findLovableComposer() {
    var selectors = [
      "textarea[placeholder*='Ask Lovable']",
      "textarea[placeholder*='lovable' i]",
      "form textarea",
      "[contenteditable='true']",
      "textarea"
    ];
    for (var i = 0; i < selectors.length; i++) {
      var nodes = document.querySelectorAll(selectors[i]);
      for (var j = 0; j < nodes.length; j++) {
        var el = nodes[j];
        if (!el || (el.closest && el.closest("#trivis-vx-root"))) continue;
        var r = el.getBoundingClientRect();
        if (r.width > 80 && r.height > 20) return el;
      }
    }
    return null;
  }

  function findFileInput() {
    var inputs = document.querySelectorAll('input[type="file"]');
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      if (el.closest && el.closest("#trivis-vx-root")) continue;
      return el;
    }
    return null;
  }

  function findSendButton() {
    var buttons = document.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      if (b.closest && b.closest("#trivis-vx-root")) continue;
      var t = (b.getAttribute("aria-label") || b.textContent || "").toLowerCase();
      if (/send|submit/.test(t)) return b;
      // paper-plane near composer
      if (b.querySelector("svg") && b.closest("form")) return b;
    }
    return null;
  }

  function setNativeValue(el, value) {
    try {
      var proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      var desc = Object.getOwnPropertyDescriptor(proto, "value");
      if (desc && desc.set) desc.set.call(el, value);
      else el.value = value;
    } catch (_) {
      el.value = value;
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async function sendTrivisChatPrompt(userPrompt) {
    try {
      window.dispatchEvent(new Event("trivis-rehook"));
      window.dispatchEvent(new Event("zokys-rehook"));
    } catch (_) {}

    try {
      window.__trivis_last_task = userPrompt;
      window.__zokys_last_task = userPrompt;
      localStorage.setItem("trivis_last_task", userPrompt);
      localStorage.setItem("zokys_last_task", userPrompt);
      localStorage.setItem("trivis_pending_trigger", "1");
      localStorage.setItem("zokys_pending_trigger", "1");
      window.postMessage({ type: "TRIVIS_STASH_TASK", task: userPrompt }, "*");
    } catch (_) {}

    var trigger = TRIVIS_TRIGGER;
    var file = new File([userPrompt], "trivis-task.txt", { type: "text/plain" });

    // Attach txt file
    try {
      var inputs = document.querySelectorAll('input[type="file"]');
      for (var i = 0; i < inputs.length; i++) {
        var el = inputs[i];
        if (el.closest && el.closest("#trivis-vx-root")) continue;
        try {
          var dt = new DataTransfer();
          dt.items.add(file);
          el.files = dt.files;
          el.dispatchEvent(new Event("change", { bubbles: true }));
          el.dispatchEvent(new Event("input", { bubbles: true }));
        } catch (_) {}
      }
    } catch (_) {}

    await sleep(500);

    var composer = findLovableComposer();
    if (!composer) throw new Error("Open a project chat first");

    // Only put short trigger — user presses Lovable Send manually
    composer.focus();
    if (composer.isContentEditable) {
      composer.textContent = trigger;
      try {
        composer.dispatchEvent(
          new InputEvent("input", { bubbles: true, cancelable: true, inputType: "insertText", data: trigger })
        );
      } catch (_) {
        composer.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } else {
      setNativeValue(composer, trigger);
      try {
        composer.dispatchEvent(
          new InputEvent("input", { bubbles: true, cancelable: true, inputType: "insertText", data: trigger })
        );
      } catch (_) {}
    }

    try {
      toast("Ready — press Send on Lovable");
    } catch (_) {}

    return true;
  }
  var sendZokysChatPrompt = sendTrivisChatPrompt;

  function showShop() {}

  function showLang() {
    currentTab = "lang";
    expand(true);
    var curLang = LANGS.find(function (x) { return x.id === lang; }) || LANGS[0];

    setBody(
      '<div class="zk-lang-wrap">' +
        '<div class="zk-lang-head">' +
          '<div class="zk-lang-pill-row">' +
            '<span class="zk-lang-pill"><span class="zk-lang-radar"></span><span>' + (t("langMatrix") || "LOCALIZATION MATRIX") + '</span></span>' +
            '<span class="zk-lang-badge-count">12 LOCALES ONLINE</span>' +
          '</div>' +
          '<div class="zk-lang-title">' + (t("langTitle") || t("tipLang") || "Language Selection") + '</div>' +
          '<p class="zk-lang-sub">' + (t("langSub") || "Select preferred language for entire extension interface") + '</p>' +
        '</div>' +

        '<div class="zk-lang-hero">' +
          '<div class="zk-lang-hero-glow"></div>' +
          '<div class="zk-lang-hero-content">' +
            '<div class="zk-lang-hero-flag-box">' +
              '<span class="zk-lang-hero-flag">' + curLang.flag + '</span>' +
              '<span class="zk-lang-hero-code">' + curLang.code + '</span>' +
            '</div>' +
            '<div class="zk-lang-hero-info">' +
              '<div class="zk-lang-hero-label-row">' +
                '<span class="zk-lang-hero-label">' + curLang.label + '</span>' +
                '<span class="zk-lang-hero-active-chip">● ACTIVE</span>' +
              '</div>' +
              '<div class="zk-lang-hero-desc">' + curLang.sub + ' · Real-time Synced</div>' +
            '</div>' +
            '<div class="zk-lang-hero-check-circle">✓</div>' +
          '</div>' +
        '</div>' +

        '<div class="zk-lang-search-bar">' +
          '<span class="zk-lang-search-ico">' + svg("search") + '</span>' +
          '<input type="text" id="zk-lang-search-inp" class="zk-lang-search-input" placeholder="Search language, script, or code..." autocomplete="off" />' +
          '<button type="button" id="zk-lang-search-clear" class="zk-lang-search-clear" style="display:none;">✕</button>' +
        '</div>' +

        '<div class="vx-lang" id="zk-lang-grid">' +
          LANGS.map(function (L, i) {
            var active = L.id === lang ? "active" : "";
            return '<button type="button" data-l="' + L.id + '" data-kw="' + (L.label + ' ' + L.sub + ' ' + L.code + ' ' + L.region + ' ' + L.id).toLowerCase() + '" style="--i:' + i + '" class="zk-lang-card ' + active + '">' +
              '<div class="zk-lang-card-top">' +
                '<div class="zk-lang-card-flag-wrap">' +
                  '<span class="zk-lang-card-flag">' + L.flag + '</span>' +
                  '<span class="zk-lang-card-code">' + L.code + '</span>' +
                '</div>' +
                (L.id === lang ? '<span class="zk-lang-card-status-dot"></span>' : '') +
              '</div>' +
              '<div class="zk-lang-card-body">' +
                '<span class="zk-lang-card-label">' + L.label + '</span>' +
                '<span class="zk-lang-card-sub">' + L.sub + '</span>' +
              '</div>' +
              '<div class="zk-lang-card-badge-row">' +
                (L.id === lang ? '<span class="zk-lang-card-check">✓ ACTIVE</span>' : '<span class="zk-lang-card-arrow">→</span>') +
              '</div>' +
            '</button>';
          }).join("") +
          '<div id="zk-lang-empty" class="zk-lang-empty" style="display:none;">No matching language found</div>' +
        '</div>' +
      '</div>'
    );

    // Bind card clicks
    bodyEl.querySelectorAll("[data-l]").forEach(function (b) {
      b.onclick = function () {
        var nextLang = b.getAttribute("data-l");
        setLanguage(nextLang);
        showLang();
      };
    });

    // Bind real-time search
    var searchInp = bodyEl.querySelector("#zk-lang-search-inp");
    var clearBtn = bodyEl.querySelector("#zk-lang-search-clear");
    var grid = bodyEl.querySelector("#zk-lang-grid");
    var emptyEl = bodyEl.querySelector("#zk-lang-empty");

    if (searchInp && grid) {
      searchInp.oninput = function () {
        var query = (searchInp.value || "").trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = query ? "block" : "none";
        var cards = grid.querySelectorAll(".zk-lang-card");
        var visibleCount = 0;
        cards.forEach(function (card) {
          var kw = card.getAttribute("data-kw") || "";
          if (!query || kw.indexOf(query) !== -1) {
            card.style.display = "flex";
            visibleCount++;
          } else {
            card.style.display = "none";
          }
        });
        if (emptyEl) emptyEl.style.display = visibleCount === 0 ? "flex" : "none";
      };

      if (clearBtn) {
        clearBtn.onclick = function () {
          searchInp.value = "";
          searchInp.dispatchEvent(new Event("input"));
          searchInp.focus();
        };
      }
    }
  }

  function setLanguage(nextLang) {
    if (!nextLang || !I18N[nextLang]) return;
    lang = nextLang;
    try { localStorage.setItem("trivis_ui_lang", lang); } catch (_) {}
    try {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ trivis_ui_lang: lang });
      }
    } catch (_) {}
    try {
      document.documentElement.setAttribute("lang", lang);
      if (root) root.setAttribute("data-lang", lang);
      window.dispatchEvent(new CustomEvent("trivis-lang-changed", { detail: { lang: lang } }));
      window.postMessage({ type: "TRIVIS_LANG_CHANGED", lang: lang }, "*");
    } catch (_) {}
    updateDockTooltips();
    var curObj = LANGS.find(function (x) { return x.id === lang; }) || { label: lang, flag: "🌐", code: lang.toUpperCase() };
    toast(curObj.flag + " " + curObj.label + " (" + curObj.code + ") · " + (t("langChanged") || "Language updated") + " ✓");
  }

  function rerenderActiveView() {
    if (!expanded) return;
    if (currentTab === "welcome") showWelcome();
    else if (currentTab === "lang") showLang();
    else if (currentTab === "social") showSocial();
    else if (currentTab === "features") showFeatures();
    else if (currentTab === "chat") showTrivisChat();
    else if (currentTab === "license") showLicense();
  }

  function enableDrag(handle) {
    const onDown = (clientX, clientY, e) => {
      if (e && e.target && e.target.closest && e.target.closest(".vx-ibtn, .vx-brand, .vx-brand-icon, button, a, input, [data-act]")) return;
      const r = panel.getBoundingClientRect();
      dragState = { dx: clientX - r.left, dy: clientY - r.top };
      panel.classList.add("dragging");
      panel.style.left = r.left + "px";
      panel.style.top = r.top + "px";
      panel.style.bottom = "auto";
      panel.style.right = "auto";
      if (e && e.preventDefault) e.preventDefault();
    };
    const onMove = (clientX, clientY) => {
      if (!dragState) return;
      const nx = Math.min(window.innerWidth - 48, Math.max(4, clientX - dragState.dx));
      const ny = Math.min(window.innerHeight - 48, Math.max(4, clientY - dragState.dy));
      panel.style.left = nx + "px";
      panel.style.top = ny + "px";
      pos = { left: nx, top: ny };
    };
    const onUp = () => {
      if (!dragState) return;
      dragState = null;
      panel.classList.remove("dragging");
      try { chrome.storage.local.set({ trivis_vx_pos: pos }); } catch (_) {}
    };
    handle.addEventListener("pointerdown", (e) => {
      if (e.button != null && e.button !== 0) return;
      if (e.target && e.target.closest && e.target.closest(".vx-ibtn, .vx-brand, .vx-brand-icon, button, a, input, [data-act]")) return;
      try { handle.setPointerCapture(e.pointerId); } catch (_) {}
      onDown(e.clientX, e.clientY, e);
    });
    handle.addEventListener("pointermove", (e) => onMove(e.clientX, e.clientY));
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  }

  function killLegacy() {
    ["#ql-floating", "#trivis-fab", "#trivis-fab-root", "[data-trivis-fab]", ".sp-extension-fab",
     "#last-zone-floating-btn", "#last-zone-floating-window", "[id*='last-zone-floating']",
     "[class*='last-zone-floating']"].forEach((sel) => {
      try {
        document.querySelectorAll(sel).forEach((n) => {
          n.style.setProperty("display", "none", "important");
          n.style.setProperty("visibility", "hidden", "important");
        });
      } catch (_) {}
    });
  }

  function mount() {
    if (document.getElementById("trivis-vx-root")) return;
    root = document.createElement("div");
    root.id = "trivis-vx-root";
    root.setAttribute("data-theme", light ? "light" : "dark");
    if (light) root/* purple only */;
    const st = document.createElement("style");
    st.textContent = cssText();
    root.appendChild(st);

    panel = document.createElement("div");
    panel.id = "trivis-vx-panel";
    panel.className = "minimized";
    // Order: V7 | lang | social | download | theme | key | expand(end)
    panel.innerHTML = `
      <div id="trivis-vx-header">
        <span class="vx-brand vx-brand-icon" data-act="welcome" title="Trivis Dev Overview"><img src="${(function(){try{return chrome.runtime.getURL("assets/icon48.png")}catch(e){return ""}})()}" alt="Trivis" width="24" height="24" style="border-radius:50%;display:block;border:1.5px solid rgba(212,163,115,.55);box-shadow:0 0 14px rgba(255,30,56,.65)"/><span class="vx-pfp-dot"></span></span>
        <button class="vx-ibtn" data-act="lang" title="Language">${svg("lang")}</button>
        <button class="vx-ibtn" data-act="social" title="Community & Channels">${svg("social")}</button>
        <button class="vx-ibtn" data-act="features" title="Dev Automation">${svg("features")}</button>
        <button class="vx-ibtn" data-act="chat" title="Neural Studio">${svg("chat")}</button>
        <button class="vx-ibtn" data-act="license" title="Security Pass">${svg("key")}</button>
        <button class="vx-ibtn" data-act="chev" title="Expand HUD" style="transition:transform .4s cubic-bezier(.32,.72,0,1)">${svg("chev")}</button>
      </div>
      <div id="trivis-vx-body"></div>`;
    root.appendChild(panel);
    document.documentElement.appendChild(root);
    bodyEl = panel.querySelector("#trivis-vx-body");

    if (pos && typeof pos.left === "number") {
      panel.style.left = pos.left + "px";
      panel.style.top = pos.top + "px";
      panel.style.bottom = "auto";
    }

    enableDrag(panel.querySelector("#trivis-vx-header"));
    updateDockTooltips();

    const actionMap = {
      welcome: showWelcome,
      lang: showLang,
      social: showSocial,
      features: showFeatures,
      chat: showTrivisChat,
      license: showLicense
    };

    function activateTab(act) {
      if (!act) return;
      const isMin = panel.classList.contains("minimized");
      if (act === "chev") {
        if (!isMin && expanded) {
          expand(false);
          panel.querySelectorAll(".vx-ibtn").forEach(function (x) { x.classList.remove("active-sky"); });
        } else {
          expand(true);
          panel.querySelectorAll(".vx-ibtn").forEach(function (x) { x.classList.remove("active-sky"); });
          if (currentTab && actionMap[currentTab] && currentTab !== "welcome") {
            const b = panel.querySelector(`[data-act="${currentTab}"]`);
            if (b) b.classList.add("active-sky");
            actionMap[currentTab]();
          } else {
            showWelcome();
          }
        }
        return;
      }

      if (actionMap[act]) {
        if (!isMin && expanded && currentTab === act) {
          expand(false);
          panel.querySelectorAll(".vx-ibtn").forEach(function (x) { x.classList.remove("active-sky"); });
          return;
        }
        expand(true);
        panel.querySelectorAll(".vx-ibtn").forEach(function (x) { x.classList.remove("active-sky"); });
        if (act !== "welcome") {
          const b = panel.querySelector(`[data-act="${act}"]`);
          if (b) b.classList.add("active-sky");
        }
        currentTab = act;
        actionMap[act]();
      }
    }

    // Direct click listeners on all buttons
    panel.querySelectorAll("[data-act]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const act = el.getAttribute("data-act");
        activateTab(act);
      });
    });

    const brandIcon = panel.querySelector(".vx-brand-icon");
    if (brandIcon) {
      brandIcon.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        activateTab("welcome");
      };
    }

    // Delegated click listener on panel as safety net
    panel.addEventListener("click", function (e) {
      const b = e.target && e.target.closest && e.target.closest("[data-act]");
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      const act = b.getAttribute("data-act");
      activateTab(act);
    });

    function applyTheme(next) {
      light = !!next;
      if (root) {
        root.classList.toggle("light", light);
        root.setAttribute("data-theme", light ? "light" : "dark");
      }
      if (panel) {
        panel.classList.toggle("vx-light", light);
      }
      try { chrome.storage.local.set({ trivis_ui_light: light }); } catch (_) {}
    }

    killLegacy();
    setInterval(killLegacy, 12000);
  }

  function boot() {
    try {
      chrome.storage.local.get(["trivis_ui_lang", "trivis_ui_light", "trivis_vx_pos"], (s) => {
        if (s && s.trivis_ui_lang) lang = s.trivis_ui_lang;
        if (s && s.trivis_ui_light) light = !!s.trivis_ui_light;
        if (s && s.trivis_vx_pos) pos = s.trivis_vx_pos;
        mount();
      });
    } catch (_) { mount(); }
  }

    /* Live storage sync across tabs/popups */
  try {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(function (changes, area) {
        if (area !== "local") return;
        if (changes.trivis_ui_lang && changes.trivis_ui_lang.newValue) {
          var nl = changes.trivis_ui_lang.newValue;
          if (I18N[nl] && nl !== lang) {
            lang = nl;
            updateDockTooltips();
            rerenderActiveView();
          }
        }
      });
    }
  } catch (_) {}

  /* Live free-prompt counter in license panel */
  try {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(function (changes, area) {
        if (area !== "local") return;
        if (!changes.trivis_free_left && !changes.trivis_free_reset_at) return;
        try {
          const card = bodyEl && bodyEl.querySelector && bodyEl.querySelector("#vx-free-card");
          if (!card) return;
          chrome.storage.local.get(["trivis_free_left", "trivis_free_reset_at", "trivis_free_max"], function (s) {
            let left = typeof s.trivis_free_left === "number" ? s.trivis_free_left : 20;
            let resetAt = s.trivis_free_reset_at || 0;
            const max = s.trivis_free_max || 20;
            if (resetAt && Date.now() >= resetAt) { left = max; resetAt = 0; }
            const pct = Math.max(0, Math.min(100, (left / max) * 100));
            const fillCls = left <= 0 ? "empty" : left <= 3 ? "low" : "";
            let hintCls = "ok", hintText = "Unlimited chats · no limit";
            if (left <= 0) {
              const ms = Math.max(0, (resetAt || 0) - Date.now());
              const mins = Math.ceil(ms / 60000);
              hintCls = "warn";
              hintText = mins > 0 ? (mins + " min baad free prompts reset · refresh page") : "—s baad free credits aayenge · page refresh karo";
            } else if (left <= 3) {
              hintCls = "warn";
              hintText = left + " free prompts left · use carefully";
            }
            const countEl = card.querySelector(".fr-count");
            const fillEl = card.querySelector(".fr-fill");
            const hintEl = card.querySelector(".fr-hint");
            if (countEl) countEl.innerHTML = left + '<span class="dim"> / ' + max + "</span>";
            if (fillEl) {
              fillEl.style.width = pct + "%";
              fillEl.className = "fr-fill " + fillCls;
            }
            if (hintEl) {
              hintEl.className = "fr-hint " + hintCls;
              hintEl.textContent = hintText;
            }
          });
        } catch (_) {}
      });
    }
  } catch (_) {}

  try {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["trivis_auto_approve"], function (s) {
        if (s && s.trivis_auto_approve) {
          autoApprove = true;
          startAutoApprove();
        }
      });
    }
  } catch (_) {}

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
