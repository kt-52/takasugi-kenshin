class HealthCheckComponent {
  constructor(code, name, comment) {
    this.code = code;
    this.name = name;
    this.comment = comment;
  }
}

const healthCheckComponents = [
  new HealthCheckComponent(
    "9A752000000000001",
    "収縮期血圧（2回目）",
    "戒めよ。貴殿の収縮期血圧、基準値を超えんとしておる。高血圧、心臓血管の健康に脅威をもたらすかもしれぬ。生活の風を見直し医者の助言を仰ぐべし。"
  ),
  new HealthCheckComponent(
    "9A761000000000001",
    "拡張期血圧（1回目）",
    "聞け。拡張期血圧、基準に超えてあり。高血圧、心臓血管に危機をもたらすかもしれぬ。生活の鍛錬を欠かさず医者の知恵を仰げ。"
  ),
  new HealthCheckComponent(
    "9A762000000000001",
    "拡張期血圧（2回目）",
    "拡張期血圧、基準を越ゆること二度。高血圧、心臓血管に重大な危機を招くと聞こえん。心臓疾患や他の疾患の危険を減らさんと欲すれば、即医者の診察を受け適切な治療策を立てむべし。"
  ),
  new HealthCheckComponent(
    "3B090000002327101",
    "γ－ＧＴＰ",
    "γ-GTPの検査、基準値を超えてある。酒の飲み過ぎ、覚えは無いか？食と行動改めて健康の道を歩むべし。詳細なる策は医者と論ずべし。"
  ),
  new HealthCheckComponent(
    "3D046000001906202",
    "ＨｂＡ１ｃ",
    "聞け、HbA1cの値、基準を逸脱せり。血糖値の統制に長らくの道が険しと示す。生活の鍛錬を捧げ、医者の導きに従い、糖尿病の影を払わんがために奮い立たん。"
  ),
];

const codes = healthCheckComponents.map(component => component.code);

exports.entriesToComponent = entries =>
  entries.filter(entry => codes.includes(entry?.observation?.code?.__code))
  .map(entry => healthCheckComponents.find(component => component.code === entry.observation.code.__code));
