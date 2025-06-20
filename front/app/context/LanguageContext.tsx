"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Comprehensive website translations
export const websiteTranslations = {
  en: {
    // Navigation
    guides: "Guides",
    travelers: "Travelers",
    trips: "Trips",
    myProfile: "My Profile",
    adminPage: "Admin Page",
    language: "Language",
    logout: "Log out",
    logIn: "Log In",

    // Homepage
    welcome: "Welcome to GuideMe",
    discover: "Discover Amazing Destinations",
    explore: "Explore the world with local guides",
    getStarted: "Get Started",
    learnMore: "Learn More",

    // Common
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    submit: "Submit",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",

    // Profile
    profile: "Profile",
    settings: "Settings",
    personalInfo: "Personal Information",
    email: "Email",
    phone: "Phone",
    location: "Location",
    bio: "Biography",
    updateProfile: "Update Profile",
    changePassword: "Change Password",
    notifications: "Notifications",

    // Booking
    book: "Book",
    booking: "Booking",
    price: "Price",
    duration: "Duration",
    date: "Date",
    time: "Time",
    participants: "Participants",
    total: "Total",
    pay: "Pay",
    confirmBooking: "Confirm Booking",
    bookingDetails: "Booking Details",
    paymentMethod: "Payment Method",

    // Reviews
    reviews: "Reviews",
    rating: "Rating",
    writeReview: "Write Review",
    submitReview: "Submit Review",
    averageRating: "Average Rating",
    noReviews: "No reviews yet",

    // Footer
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support",
    help: "Help",
    faq: "FAQ",

    // Admin
    dashboard: "Dashboard",
    users: "Users",
    statistics: "Statistics",
    reports: "Reports",
    manage: "Manage",
    analytics: "Analytics",
    system: "System",

    // Trip/Guide specific
    tripDetails: "Trip Details",
    guideProfile: "Guide Profile",
    availableGuides: "Available Guides",
    popularDestinations: "Popular Destinations",
    featuredTrips: "Featured Trips",
    allTrips: "All Trips",
    tripType: "Trip Type",
    difficulty: "Difficulty",
    groupSize: "Group Size",
    included: "Included",
    notIncluded: "Not Included",

    // Forms and inputs
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    message: "Message",
    subject: "Subject",
    description: "Description",
    title: "Title",
    category: "Category",
    tags: "Tags",

    // Status and actions
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    approved: "Approved",
    rejected: "Rejected",
    published: "Published",
    draft: "Draft",

    // Time and dates
    today: "Today",
    tomorrow: "Tomorrow",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",

    // Numbers and quantities
    one: "One",
    two: "Two",
    three: "Three",
    four: "Four",
    five: "Five",
    people: "People",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",

    // Messages and notifications
    welcomeMessage: "Welcome! We're glad to see you.",
    noResults: "No results found",
    tryAgain: "Please try again",
    somethingWentWrong: "Something went wrong",
    operationSuccessful: "Operation completed successfully",
    areYouSure: "Are you sure?",
    thisActionCannotBeUndone: "This action cannot be undone",

    // Chat and messaging
    chat: "Chat",
    messages: "Messages",
    sendMessage: "Send Message",
    typeMessage: "Type your message...",
    online: "Online",
    offline: "Offline",
    lastSeen: "Last seen",

    // Wishlist and favorites
    wishlist: "Wishlist",
    favorites: "Favorites",
    addToWishlist: "Add to Wishlist",
    removeFromWishlist: "Remove from Wishlist",
    savedItems: "Saved Items",

    // Additional UI elements
    experience: "Experience",
    clearFilters: "Clear Filters",
    showMore: "Show More",
    showLess: "Show Less",
  },
  zh: {
    guides: "导游",
    travelers: "游客",
    trips: "旅行",
    myProfile: "我的资料",
    adminPage: "管理员页面",
    language: "语言",
    logout: "退出登录",
    logIn: "登录",
    welcome: "Welcome to GuideMe",
    discover: "发现精彩目的地",
    explore: "与当地导游一起探索世界",
    getStarted: "开始使用",
    learnMore: "了解更多",
    search: "搜索",
    filter: "筛选",
    sort: "排序",
    view: "查看",
    edit: "编辑",
    delete: "删除",
    save: "保存",
    cancel: "取消",
    confirm: "确认",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    submit: "提交",
    close: "关闭",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    profile: "个人资料",
    settings: "设置",
    personalInfo: "个人信息",
    email: "邮箱",
    phone: "电话",
    location: "位置",
    bio: "个人简介",
    updateProfile: "更新资料",
    changePassword: "修改密码",
    notifications: "通知",
    book: "预订",
    booking: "预订",
    price: "价格",
    duration: "时长",
    date: "日期",
    time: "时间",
    participants: "参与者",
    total: "总计",
    pay: "支付",
    confirmBooking: "确认预订",
    bookingDetails: "预订详情",
    paymentMethod: "支付方式",
    reviews: "评价",
    rating: "评分",
    writeReview: "写评价",
    submitReview: "提交评价",
    averageRating: "平均评分",
    noReviews: "暂无评价",
    about: "关于",
    contact: "联系",
    privacy: "隐私政策",
    terms: "服务条款",
    support: "支持",
    help: "帮助",
    faq: "常见问题",
    dashboard: "仪表板",
    users: "用户",
    statistics: "统计",
    reports: "报告",
    manage: "管理",
    analytics: "分析",
    system: "系统",
    tripDetails: "旅行详情",
    guideProfile: "导游资料",
    availableGuides: "可用导游",
    popularDestinations: "热门目的地",
    featuredTrips: "精选旅行",
    allTrips: "所有旅行",
    tripType: "旅行类型",
    difficulty: "难度",
    groupSize: "团队规模",
    included: "包含",
    notIncluded: "不包含",
    firstName: "名字",
    lastName: "姓氏",
    username: "用户名",
    password: "密码",
    confirmPassword: "确认密码",
    currentPassword: "当前密码",
    newPassword: "新密码",
    message: "消息",
    subject: "主题",
    description: "描述",
    title: "标题",
    category: "分类",
    tags: "标签",
    active: "活跃",
    inactive: "非活跃",
    pending: "待处理",
    completed: "已完成",
    cancelled: "已取消",
    approved: "已批准",
    rejected: "已拒绝",
    published: "已发布",
    draft: "草稿",
    today: "今天",
    tomorrow: "明天",
    yesterday: "昨天",
    thisWeek: "本周",
    thisMonth: "本月",
    thisYear: "今年",
    one: "一",
    two: "二",
    three: "三",
    four: "四",
    five: "五",
    people: "人",
    days: "天",
    hours: "小时",
    minutes: "分钟",
    welcomeMessage: "欢迎！很高兴见到您。",
    noResults: "未找到结果",
    tryAgain: "请重试",
    somethingWentWrong: "出现错误",
    operationSuccessful: "操作成功完成",
    areYouSure: "您确定吗？",
    thisActionCannotBeUndone: "此操作无法撤销",
    chat: "聊天",
    messages: "消息",
    sendMessage: "发送消息",
    typeMessage: "输入您的消息...",
    online: "在线",
    offline: "离线",
    lastSeen: "最后在线",
    wishlist: "愿望清单",
    favorites: "收藏",
    addToWishlist: "添加到愿望清单",
    removeFromWishlist: "从愿望清单移除",
    savedItems: "已保存项目",

    // Additional UI elements
    experience: "经验",
    clearFilters: "清除筛选",
    showMore: "显示更多",
    showLess: "显示更少",
  },
  ja: {
    guides: "ガイド",
    travelers: "旅行者",
    trips: "旅行",
    myProfile: "マイプロフィール",
    adminPage: "管理者ページ",
    language: "言語",
    logout: "ログアウト",
    logIn: "ログイン",
    welcome: "Welcome to GuideMe",
    discover: "素晴らしい目的地を発見",
    explore: "地元のガイドと一緒に世界を探索",
    getStarted: "始める",
    learnMore: "詳細を見る",
    search: "検索",
    filter: "フィルター",
    sort: "並び替え",
    view: "表示",
    edit: "編集",
    delete: "削除",
    save: "保存",
    cancel: "キャンセル",
    confirm: "確認",
    loading: "読み込み中...",
    error: "エラー",
    success: "成功",
    submit: "送信",
    close: "閉じる",
    back: "戻る",
    next: "次へ",
    previous: "前へ",
    profile: "プロフィール",
    settings: "設定",
    personalInfo: "個人情報",
    email: "メール",
    phone: "電話",
    location: "場所",
    bio: "自己紹介",
    updateProfile: "プロフィール更新",
    changePassword: "パスワード変更",
    notifications: "通知",
    book: "予約",
    booking: "予約",
    price: "価格",
    duration: "期間",
    date: "日付",
    time: "時間",
    participants: "参加者",
    total: "合計",
    pay: "支払い",
    confirmBooking: "予約確認",
    bookingDetails: "予約詳細",
    paymentMethod: "支払い方法",
    reviews: "レビュー",
    rating: "評価",
    writeReview: "レビューを書く",
    submitReview: "レビューを投稿",
    averageRating: "平均評価",
    noReviews: "レビューがありません",
    about: "について",
    contact: "お問い合わせ",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    support: "サポート",
    help: "ヘルプ",
    faq: "よくある質問",
    dashboard: "ダッシュボード",
    users: "ユーザー",
    statistics: "統計",
    reports: "レポート",
    manage: "管理",
    analytics: "分析",
    system: "システム",
    tripDetails: "旅行詳細",
    guideProfile: "ガイドプロフィール",
    availableGuides: "利用可能なガイド",
    popularDestinations: "人気の目的地",
    featuredTrips: "おすすめの旅行",
    allTrips: "すべての旅行",
    tripType: "旅行タイプ",
    difficulty: "難易度",
    groupSize: "グループサイズ",
    included: "含まれる",
    notIncluded: "含まれない",
    firstName: "名",
    lastName: "姓",
    username: "ユーザー名",
    password: "パスワード",
    confirmPassword: "パスワード確認",
    currentPassword: "現在のパスワード",
    newPassword: "新しいパスワード",
    message: "メッセージ",
    subject: "件名",
    description: "説明",
    title: "タイトル",
    category: "カテゴリ",
    tags: "タグ",
    active: "アクティブ",
    inactive: "非アクティブ",
    pending: "保留中",
    completed: "完了",
    cancelled: "キャンセル",
    approved: "承認済み",
    rejected: "拒否",
    published: "公開済み",
    draft: "下書き",
    today: "今日",
    tomorrow: "明日",
    yesterday: "昨日",
    thisWeek: "今週",
    thisMonth: "今月",
    thisYear: "今年",
    one: "一",
    two: "二",
    three: "三",
    four: "四",
    five: "五",
    people: "人",
    days: "日",
    hours: "時間",
    minutes: "分",
    welcomeMessage: "ようこそ！お会いできて嬉しいです。",
    noResults: "結果が見つかりません",
    tryAgain: "もう一度お試しください",
    somethingWentWrong: "エラーが発生しました",
    operationSuccessful: "操作が正常に完了しました",
    areYouSure: "本当によろしいですか？",
    thisActionCannotBeUndone: "この操作は元に戻せません",
    chat: "チャット",
    messages: "メッセージ",
    sendMessage: "メッセージを送信",
    typeMessage: "メッセージを入力...",
    online: "オンライン",
    offline: "オフライン",
    lastSeen: "最終ログイン",
    wishlist: "ウィッシュリスト",
    favorites: "お気に入り",
    addToWishlist: "ウィッシュリストに追加",
    removeFromWishlist: "ウィッシュリストから削除",
    savedItems: "保存済みアイテム",

    // Additional UI elements
    experience: "経験",
    clearFilters: "フィルターをクリア",
    showMore: "もっと見る",
    showLess: "閉じる",
  },
  es: {
    guides: "Guías",
    travelers: "Viajeros",
    trips: "Viajes",
    myProfile: "Mi Perfil",
    adminPage: "Página de Admin",
    language: "Idioma",
    logout: "Cerrar Sesión",
    logIn: "Iniciar Sesión",
    welcome: "Welcome to GuideMe",
    discover: "Descubre Destinos Increíbles",
    explore: "Explora el mundo con guías locales",
    getStarted: "Comenzar",
    learnMore: "Saber Más",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    view: "Ver",
    edit: "Editar",
    delete: "Eliminar",
    save: "Guardar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    submit: "Enviar",
    close: "Cerrar",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    profile: "Perfil",
    settings: "Configuración",
    personalInfo: "Información Personal",
    email: "Correo",
    phone: "Teléfono",
    location: "Ubicación",
    bio: "Biografía",
    updateProfile: "Actualizar Perfil",
    changePassword: "Cambiar Contraseña",
    notifications: "Notificaciones",
    book: "Reservar",
    booking: "Reserva",
    price: "Precio",
    duration: "Duración",
    date: "Fecha",
    time: "Hora",
    participants: "Participantes",
    total: "Total",
    pay: "Pagar",
    confirmBooking: "Confirmar Reserva",
    bookingDetails: "Detalles de Reserva",
    paymentMethod: "Método de Pago",
    reviews: "Reseñas",
    rating: "Calificación",
    writeReview: "Escribir Reseña",
    submitReview: "Enviar Reseña",
    averageRating: "Calificación Promedio",
    noReviews: "Sin reseñas aún",
    about: "Acerca de",
    contact: "Contacto",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    support: "Soporte",
    help: "Ayuda",
    faq: "Preguntas Frecuentes",
    dashboard: "Panel",
    users: "Usuarios",
    statistics: "Estadísticas",
    reports: "Reportes",
    manage: "Gestionar",
    analytics: "Análisis",
    system: "Sistema",
    tripDetails: "Detalles del Viaje",
    guideProfile: "Perfil del Guía",
    availableGuides: "Guías Disponibles",
    popularDestinations: "Destinos Populares",
    featuredTrips: "Viajes Destacados",
    allTrips: "Todos los Viajes",
    tripType: "Tipo de Viaje",
    difficulty: "Dificultad",
    groupSize: "Tamaño del Grupo",
    included: "Incluido",
    notIncluded: "No Incluido",
    firstName: "Nombre",
    lastName: "Apellido",
    username: "Nombre de Usuario",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    currentPassword: "Contraseña Actual",
    newPassword: "Nueva Contraseña",
    message: "Mensaje",
    subject: "Asunto",
    description: "Descripción",
    title: "Título",
    category: "Categoría",
    tags: "Etiquetas",
    active: "Activo",
    inactive: "Inactivo",
    pending: "Pendiente",
    completed: "Completado",
    cancelled: "Cancelado",
    approved: "Aprobado",
    rejected: "Rechazado",
    published: "Publicado",
    draft: "Borrador",
    today: "Hoy",
    tomorrow: "Mañana",
    yesterday: "Ayer",
    thisWeek: "Esta Semana",
    thisMonth: "Este Mes",
    thisYear: "Este Año",
    one: "Uno",
    two: "Dos",
    three: "Tres",
    four: "Cuatro",
    five: "Cinco",
    people: "Personas",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    welcomeMessage: "¡Bienvenido! Nos alegra verte.",
    noResults: "No se encontraron resultados",
    tryAgain: "Por favor, inténtalo de nuevo",
    somethingWentWrong: "Algo salió mal",
    operationSuccessful: "Operación completada exitosamente",
    areYouSure: "¿Estás seguro?",
    thisActionCannotBeUndone: "Esta acción no se puede deshacer",
    chat: "Chat",
    messages: "Mensajes",
    sendMessage: "Enviar Mensaje",
    typeMessage: "Escribe tu mensaje...",
    online: "En línea",
    offline: "Desconectado",
    lastSeen: "Última vez visto",
    wishlist: "Lista de Deseos",
    favorites: "Favoritos",
    addToWishlist: "Agregar a Lista de Deseos",
    removeFromWishlist: "Quitar de Lista de Deseos",
    savedItems: "Elementos Guardados",

    // Additional UI elements
    experience: "Experiencia",
    clearFilters: "Limpiar filtros",
    showMore: "Mostrar más",
    showLess: "Mostrar menos",
  },
  de: {
    guides: "Führer",
    travelers: "Reisende",
    trips: "Reisen",
    myProfile: "Mein Profil",
    adminPage: "Admin-Seite",
    language: "Sprache",
    logout: "Abmelden",
    logIn: "Anmelden",
    welcome: "Welcome to GuideMe",
    discover: "Entdecke erstaunliche Ziele",
    explore: "Erkunde die Welt mit lokalen Führern",
    getStarted: "Loslegen",
    learnMore: "Mehr erfahren",
    search: "Suchen",
    filter: "Filter",
    sort: "Sortieren",
    view: "Anzeigen",
    edit: "Bearbeiten",
    delete: "Löschen",
    save: "Speichern",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    loading: "Lädt...",
    error: "Fehler",
    success: "Erfolg",
    submit: "Absenden",
    close: "Schließen",
    back: "Zurück",
    next: "Weiter",
    previous: "Zurück",
    profile: "Profil",
    settings: "Einstellungen",
    personalInfo: "Persönliche Informationen",
    email: "E-Mail",
    phone: "Telefon",
    location: "Standort",
    bio: "Biografie",
    updateProfile: "Profil aktualisieren",
    changePassword: "Passwort ändern",
    notifications: "Benachrichtigungen",
    book: "Buchen",
    booking: "Buchung",
    price: "Preis",
    duration: "Dauer",
    date: "Datum",
    time: "Zeit",
    participants: "Teilnehmer",
    total: "Gesamt",
    pay: "Bezahlen",
    confirmBooking: "Buchung bestätigen",
    bookingDetails: "Buchungsdetails",
    paymentMethod: "Zahlungsmethode",
    reviews: "Bewertungen",
    rating: "Bewertung",
    writeReview: "Bewertung schreiben",
    submitReview: "Bewertung absenden",
    averageRating: "Durchschnittsbewertung",
    noReviews: "Noch keine Bewertungen",
    about: "Über",
    contact: "Kontakt",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    support: "Support",
    help: "Hilfe",
    faq: "FAQ",
    dashboard: "Dashboard",
    users: "Benutzer",
    statistics: "Statistiken",
    reports: "Berichte",
    manage: "Verwalten",
    analytics: "Analytik",
    system: "System",
    tripDetails: "Reisedetails",
    guideProfile: "Führer-Profil",
    availableGuides: "Verfügbare Führer",
    popularDestinations: "Beliebte Ziele",
    featuredTrips: "Empfohlene Reisen",
    allTrips: "Alle Reisen",
    tripType: "Reisetyp",
    difficulty: "Schwierigkeit",
    groupSize: "Gruppengröße",
    included: "Inklusive",
    notIncluded: "Nicht inklusive",
    firstName: "Vorname",
    lastName: "Nachname",
    username: "Benutzername",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    currentPassword: "Aktuelles Passwort",
    newPassword: "Neues Passwort",
    message: "Nachricht",
    subject: "Betreff",
    description: "Beschreibung",
    title: "Titel",
    category: "Kategorie",
    tags: "Tags",
    active: "Aktiv",
    inactive: "Inaktiv",
    pending: "Ausstehend",
    completed: "Abgeschlossen",
    cancelled: "Storniert",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    published: "Veröffentlicht",
    draft: "Entwurf",
    today: "Heute",
    tomorrow: "Morgen",
    yesterday: "Gestern",
    thisWeek: "Diese Woche",
    thisMonth: "Dieser Monat",
    thisYear: "Dieses Jahr",
    one: "Eins",
    two: "Zwei",
    three: "Drei",
    four: "Vier",
    five: "Fünf",
    people: "Personen",
    days: "Tage",
    hours: "Stunden",
    minutes: "Minuten",
    welcomeMessage: "Willkommen! Wir freuen uns, Sie zu sehen.",
    noResults: "Keine Ergebnisse gefunden",
    tryAgain: "Bitte versuchen Sie es erneut",
    somethingWentWrong: "Etwas ist schiefgelaufen",
    operationSuccessful: "Vorgang erfolgreich abgeschlossen",
    areYouSure: "Sind Sie sicher?",
    thisActionCannotBeUndone:
      "Diese Aktion kann nicht rückgängig gemacht werden",
    chat: "Chat",
    messages: "Nachrichten",
    sendMessage: "Nachricht senden",
    typeMessage: "Nachricht eingeben...",
    online: "Online",
    offline: "Offline",
    lastSeen: "Zuletzt gesehen",
    wishlist: "Wunschliste",
    favorites: "Favoriten",
    addToWishlist: "Zur Wunschliste hinzufügen",
    removeFromWishlist: "Von Wunschliste entfernen",
    savedItems: "Gespeicherte Artikel",

    // Additional UI elements
    experience: "Erlebnis",
    clearFilters: "Filter löschen",
    showMore: "Mehr anzeigen",
    showLess: "Weniger anzeigen",
  },
  ko: {
    guides: "가이드",
    travelers: "여행자",
    trips: "여행",
    myProfile: "내 프로필",
    adminPage: "관리자 페이지",
    language: "언어",
    logout: "로그아웃",
    logIn: "로그인",
    welcome: "Welcome to GuideMe",
    discover: "놀라운 목적지를 발견하세요",
    explore: "현지 가이드와 함께 세계를 탐험하세요",
    getStarted: "시작하기",
    learnMore: "더 알아보기",
    search: "검색",
    filter: "필터",
    sort: "정렬",
    view: "보기",
    edit: "편집",
    delete: "삭제",
    save: "저장",
    cancel: "취소",
    confirm: "확인",
    loading: "로딩 중...",
    error: "오류",
    success: "성공",
    submit: "제출",
    close: "닫기",
    back: "뒤로",
    next: "다음",
    previous: "이전",
    profile: "프로필",
    settings: "설정",
    personalInfo: "개인 정보",
    email: "이메일",
    phone: "전화",
    location: "위치",
    bio: "자기소개",
    updateProfile: "프로필 업데이트",
    changePassword: "비밀번호 변경",
    notifications: "알림",
    book: "예약",
    booking: "예약",
    price: "가격",
    duration: "기간",
    date: "날짜",
    time: "시간",
    participants: "참가자",
    total: "총계",
    pay: "결제",
    confirmBooking: "예약 확인",
    bookingDetails: "예약 세부사항",
    paymentMethod: "결제 방법",
    reviews: "리뷰",
    rating: "평점",
    writeReview: "리뷰 작성",
    submitReview: "리뷰 제출",
    averageRating: "평균 평점",
    noReviews: "아직 리뷰가 없습니다",
    about: "소개",
    contact: "연락처",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    support: "지원",
    help: "도움말",
    faq: "자주 묻는 질문",
    dashboard: "대시보드",
    users: "사용자",
    statistics: "통계",
    reports: "보고서",
    manage: "관리",
    analytics: "분석",
    system: "시스템",
    tripDetails: "여행 세부사항",
    guideProfile: "가이드 프로필",
    availableGuides: "이용 가능한 가이드",
    popularDestinations: "인기 목적지",
    featuredTrips: "추천 여행",
    allTrips: "모든 여행",
    tripType: "여행 유형",
    difficulty: "난이도",
    groupSize: "그룹 크기",
    included: "포함",
    notIncluded: "포함되지 않음",
    firstName: "이름",
    lastName: "성",
    username: "사용자명",
    password: "비밀번호",
    confirmPassword: "비밀번호 확인",
    currentPassword: "현재 비밀번호",
    newPassword: "새 비밀번호",
    message: "메시지",
    subject: "제목",
    description: "설명",
    title: "제목",
    category: "카테고리",
    tags: "태그",
    active: "활성",
    inactive: "비활성",
    pending: "대기 중",
    completed: "완료",
    cancelled: "취소됨",
    approved: "승인됨",
    rejected: "거부됨",
    published: "게시됨",
    draft: "초안",
    today: "오늘",
    tomorrow: "내일",
    yesterday: "어제",
    thisWeek: "이번 주",
    thisMonth: "이번 달",
    thisYear: "올해",
    one: "하나",
    two: "둘",
    three: "셋",
    four: "넷",
    five: "다섯",
    people: "명",
    days: "일",
    hours: "시간",
    minutes: "분",
    welcomeMessage: "환영합니다! 만나서 반갑습니다.",
    noResults: "결과를 찾을 수 없습니다",
    tryAgain: "다시 시도해 주세요",
    somethingWentWrong: "문제가 발생했습니다",
    operationSuccessful: "작업이 성공적으로 완료되었습니다",
    areYouSure: "정말입니까?",
    thisActionCannotBeUndone: "이 작업은 되돌릴 수 없습니다",
    chat: "채팅",
    messages: "메시지",
    sendMessage: "메시지 보내기",
    typeMessage: "메시지를 입력하세요...",
    online: "온라인",
    offline: "오프라인",
    lastSeen: "마지막 접속",
    wishlist: "위시리스트",
    favorites: "즐겨찾기",
    addToWishlist: "위시리스트에 추가",
    removeFromWishlist: "위시리스트에서 제거",
    savedItems: "저장된 항목",

    // Additional UI elements
    experience: "경험",
    clearFilters: "필터 지우기",
    showMore: "더 보기",
    showLess: "더 적게 보기",
  },
  mn: {
    guides: "Гайдууд",
    travelers: "Аялагчид",
    trips: "Аялалууд",
    myProfile: "Миний Профайл",
    adminPage: "Админ Хуудас",
    language: "Хэл",
    logout: "Гарах",
    logIn: "Нэвтрэх",
    welcome: "Welcome to GuideMe",
    discover: "Гайхалтай газруудыг нээ",
    explore: "Орон нутгийн гайдтай хамт дэлхийг судла",
    getStarted: "Эхлэх",
    learnMore: "Дэлгэрэнгүй",
    search: "Хайх",
    filter: "Шүүлт",
    sort: "Эрэмбэлэх",
    view: "Харах",
    edit: "Засах",
    delete: "Устгах",
    save: "Хадгалах",
    cancel: "Цуцлах",
    confirm: "Баталгаажуулах",
    loading: "Уншиж байна...",
    error: "Алдаа",
    success: "Амжилттай",
    submit: "Илгээх",
    close: "Хаах",
    back: "Буцах",
    next: "Дараах",
    previous: "Өмнөх",
    profile: "Профайл",
    settings: "Тохиргоо",
    personalInfo: "Хувийн мэдээлэл",
    email: "И-мэйл",
    phone: "Утас",
    location: "Байршил",
    bio: "Намтар",
    updateProfile: "Профайл шинэчлэх",
    changePassword: "Нууц үг солих",
    notifications: "Мэдэгдэл",
    book: "Захиалах",
    booking: "Захиалга",
    price: "Үнэ",
    duration: "Хугацаа",
    date: "Огноо",
    time: "Цаг",
    participants: "Оролцогчид",
    total: "Нийт",
    pay: "Төлбөр",
    confirmBooking: "Захиалга баталгаажуулах",
    bookingDetails: "Захиалгын дэлгэрэнгүй",
    paymentMethod: "Төлбөрийн арга",
    reviews: "Сэтгэгдэл",
    rating: "Үнэлгээ",
    writeReview: "Сэтгэгдэл бичих",
    submitReview: "Сэтгэгдэл илгээх",
    averageRating: "Дундаж үнэлгээ",
    noReviews: "Сэтгэгдэл байхгүй",
    about: "Тухай",
    contact: "Холбоо барих",
    privacy: "Нууцлалын бодлого",
    terms: "Үйлчилгээний нөхцөл",
    support: "Дэмжлэг",
    help: "Тусламж",
    faq: "Түгээмэл асуулт",
    dashboard: "Удирдлагын самбар",
    users: "Хэрэглэгчид",
    statistics: "Статистик",
    reports: "Тайлан",
    manage: "Удирдах",
    analytics: "Аналитик",
    system: "Систем",
    tripDetails: "Аяллын дэлгэрэнгүй",
    guideProfile: "Гайдын профайл",
    availableGuides: "Боломжит гайдууд",
    popularDestinations: "Түгээмэл газрууд",
    featuredTrips: "Онцлох аяллууд",
    allTrips: "Бүх аяллууд",
    tripType: "Аяллын төрөл",
    difficulty: "Хэцүү байдал",
    groupSize: "Группын хэмжээ",
    included: "Орсон",
    notIncluded: "Ороогүй",
    firstName: "Нэр",
    lastName: "Овог",
    username: "Хэрэглэгчийн нэр",
    password: "Нууц үг",
    confirmPassword: "Нууц үг баталгаажуулах",
    currentPassword: "Одоогийн нууц үг",
    newPassword: "Шинэ нууц үг",
    message: "Зурвас",
    subject: "Гарчиг",
    description: "Тайлбар",
    title: "Гарчиг",
    category: "Ангилал",
    tags: "Шошго",
    active: "Идэвхтэй",
    inactive: "Идэвхгүй",
    pending: "Хүлээгдэж буй",
    completed: "Дууссан",
    cancelled: "Цуцлагдсан",
    approved: "Зөвшөөрөгдсөн",
    rejected: "Татгалзсан",
    published: "Нийтлэгдсэн",
    draft: "Ноорог",
    today: "Өнөөдөр",
    tomorrow: "Маргааш",
    yesterday: "Өчигдөр",
    thisWeek: "Энэ долоо хоног",
    thisMonth: "Энэ сар",
    thisYear: "Энэ жил",
    one: "Нэг",
    two: "Хоёр",
    three: "Гурав",
    four: "Дөрөв",
    five: "Тав",
    people: "Хүн",
    days: "Хоног",
    hours: "Цаг",
    minutes: "Минут",
    welcomeMessage: "Тавтай морил! Таныг харж байгаадаа баяртай байна.",
    noResults: "Үр дүн олдсонгүй",
    tryAgain: "Дахин оролдоно уу",
    somethingWentWrong: "Алдаа гарлаа",
    operationSuccessful: "Үйл ажиллагаа амжилттай дууслаа",
    areYouSure: "Та итгэлтэй байна уу?",
    thisActionCannotBeUndone: "Энэ үйл ажиллагааг буцааж болохгүй",
    chat: "Чат",
    messages: "Зурвас",
    sendMessage: "Зурвас илгээх",
    typeMessage: "Зурвасаа бичнэ үү...",
    online: "Онлайн",
    offline: "Офлайн",
    lastSeen: "Сүүлд харсан",
    wishlist: "Хүсэлтийн жагсаалт",
    favorites: "Таалагдсан",
    addToWishlist: "Хүсэлтийн жагсаалтад нэмэх",
    removeFromWishlist: "Хүсэлтийн жагсаалтаас хасах",
    savedItems: "Хадгалсан зүйлс",

    // Additional UI elements
    experience: "Эмнэлэг",
    clearFilters: "Шүүлтээрэй",
    showMore: "Дэлгэрэнгүй",
    showLess: "Хувирах",
  },
};

type Language = keyof typeof websiteTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && websiteTranslations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return (
      websiteTranslations[language][
        key as keyof (typeof websiteTranslations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
