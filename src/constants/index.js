// App-wide constants: user-facing labels and fixed UI values.

export const STRINGS = {
  close: 'ปิด',
  loadError: 'โหลดข้อมูลไม่สำเร็จ แตะเพื่อลองใหม่',
  empty: 'ยังไม่มีข้อมูล',
  topChartsTitle: 'เพลงฮิตติดชาร์ท',
  scheduleTitle: 'ตารางจัดรายการ',
  pickDate: 'เลือกวันที่ ..',
  pickDay: 'เลือกวัน ..',
  timeLabel: 'เวลา',
  chartLegend: '⬜ = สัปดาห์ที่แล้ว   \u{1F551} = ระยะเวลาบนชาร์ท',
  lastWeekMark: '⬜',
  weeksOnChartMark: '\u{1F551}',
  shareFacebook: 'แชร์ไปยัง Facebook',
  shareTwitter: 'Tweet ไปยัง Twitter',
  privacyPolicy: 'Privacy Policy',
  websitePrefix: 'Website : ',
};

/** Weekday labels, index 0 = Sunday (matches the radio-programs payload). */
export const WEEKDAYS = [
  'วันอาทิตย์',
  'วันจันทร์',
  'วันอังคาร',
  'วันพุธ',
  'วันพฤหัสบดี',
  'วันศุกร์',
  'วันเสาร์',
];

export const SOCIAL_NETWORKS = ['facebook', 'twitter', 'youtube', 'instagram'];

export const PLAYER = {
  defaultVolume: 0.5,
  controlWidthRatio: 1 / 5,
};

export const ICON_SIZES = {
  tab: 30,
  tabHome: 38,
  call: 35,
  sms: 36,
  contact: 24,
  contactMail: 22,
};

/** Station key inside the player payload's `radio` object. */
export const STATION_KEY = 'aradio';
