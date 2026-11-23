const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, HeadingLevel, BorderStyle, LevelFormat, Footer, Header, PageNumber, PageBreak,
  ExternalHyperlink,
} = require('docx');

const FONT = 'Malgun Gothic';
const W = 9026; // A4 content width (1in margins)
const SEV = {
  C: { label: '🔴 CRITICAL', fill: 'FDE2E1', color: 'B00020' },
  H: { label: '🟠 HIGH', fill: 'FFE9D6', color: 'C25E00' },
  M: { label: '🟡 MEDIUM', fill: 'FFF6CC', color: '8A6D00' },
};
const NAVY = '1F3864';

// inline **bold** parser
function runs(text, base = {}) {
  const out = [];
  String(text).split(/(\*\*[^*]+\*\*)/).forEach(seg => {
    if (!seg) return;
    if (seg.startsWith('**') && seg.endsWith('**')) out.push(new TextRun({ text: seg.slice(2, -2), bold: true, font: FONT, ...base }));
    else out.push(new TextRun({ text: seg, font: FONT, ...base }));
  });
  return out;
}
const P = (t, o = {}) => new Paragraph({ children: runs(t, o.run || {}), spacing: { after: 100, line: 300 }, alignment: o.align, ...(o.p || {}) });
const B = (t, lvl = 0) => new Paragraph({ children: runs(t), numbering: { reference: 'bul', level: lvl }, spacing: { after: 60, line: 290 } });
const N = (t) => new Paragraph({ children: runs(t), numbering: { reference: 'num', level: 0 }, spacing: { after: 60, line: 290 } });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT })] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, font: FONT })] });
const H4 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_4, children: [new TextRun({ text: t, font: FONT })] });
const RULE = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'BFBFBF', space: 1 } }, spacing: { after: 160 } });
const BR = () => new Paragraph({ children: [new PageBreak()] });
const SRC = (label, url) => new Paragraph({
  numbering: { reference: 'bul', level: 0 }, spacing: { after: 60, line: 280 },
  children: [...runs(label + ' / ', { size: 18 }), new ExternalHyperlink({ link: url, children: [new TextRun({ text: url, style: 'Hyperlink', font: FONT, size: 18 })] })],
});

const border = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(content, width, opt = {}) {
  const paras = (Array.isArray(content) ? content : [content]).map(c =>
    c instanceof Paragraph ? c : new Paragraph({ children: runs(c, { size: opt.size || 18, bold: opt.bold, color: opt.color }), alignment: opt.align, spacing: { after: 40, line: 260 } }));
  return new TableCell({
    children: paras, width: { size: width, type: WidthType.DXA }, borders,
    shading: opt.fill ? { fill: opt.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 70, bottom: 70, left: 100, right: 100 },
  });
}
function table(headers, rows, widths, rowOpt = () => ({})) {
  const hdr = new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], { bold: true, fill: NAVY, color: 'FFFFFF', align: AlignmentType.CENTER })) });
  const body = rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => {
    const o = rowOpt(r, i, ri);
    return cell(c, widths[i], o);
  }) }));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: widths, rows: [hdr, ...body] });
}
function box(title, lines, fill = 'EAF1FB', edge = NAVY) {
  const e = { style: BorderStyle.SINGLE, size: 4, color: fill };
  const children = [];
  if (title) children.push(new Paragraph({ children: runs(title, { bold: true, color: edge, size: 22 }), spacing: { after: 80 } }));
  lines.forEach(l => children.push(l instanceof Paragraph ? l : new Paragraph({ children: runs(l), spacing: { after: 70, line: 300 } })));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ children: [new TableCell({
    children, width: { size: W, type: WidthType.DXA }, shading: { fill, type: ShadingType.CLEAR, color: 'auto' },
    borders: { top: e, bottom: e, right: e, left: { style: BorderStyle.SINGLE, size: 24, color: edge } },
    margins: { top: 140, bottom: 140, left: 220, right: 180 },
  })] })] });
}
const sp = () => new Paragraph({ spacing: { after: 120 } });
const sevFill = (s) => (s.includes('CRITICAL') || s.includes('위기') ? SEV.C : s.includes('HIGH') || s.includes('경계') ? SEV.H : SEV.M);

// ================= DATA =================
const PERIOD = '2026-11-17 ~ 2026-11-23';
const TODAY = '2026-11-23';

const events = [
  ['🔴 CRITICAL', '취약점 악용', 'VMware vCenter 인증우회 제로데이(CVE-2026-123890) 실제 악용·CISA KEV 등재', 'vCenter Server 운영 기관 전반', '2026-11-20', '✅', '높음'],
  ['🔴 CRITICAL', '취약점 악용', 'Cisco Expressway 클러스터 비인증 root 명령실행(CVE-2026-76466) 실제 악용·KEV 등재', 'Expressway 클러스터 운영 기관 (러시아 소재 기관 피해 보고)', '2026-11-20', '✅', '중간'],
  ['🔴 CRITICAL', '취약점 악용', 'CISA KEV 4건 추가 — LiteLLM AI 게이트웨이 RCE(CVE-2026-40217) 외 3건', 'LiteLLM·Synology DSM·Apache Axis·REDCap 사용 기관', '2026-11-18', '✅', '중간'],
  ['🔴 CRITICAL', '취약점 악용', 'SAP NetWeaver(CVE-2025-42884)·Apache Roller(CVE-2026-129448) KEV 등재', 'SAP NetWeaver·Apache Roller 사용 기관', '2026-11-20', '✅', '중간'],
  ['🔴 CRITICAL', '개인정보침해', '한국전력 한전ON·전자조달시스템(SRM) 이용자 152만여 명 개인정보 유출', '한국전력공사 / 고객·조달 이용자', '2026-11-22', '✅', '중간'],
  ['🟠 HIGH', '개인정보침해', '삼성증권 홈페이지 고객의 소리(VOC) 시스템 해킹, 고객 8,241명 정보 유출', '삼성증권 / 고객', '2026-11-23', '✅', '높음'],
  ['🟠 HIGH', '공급망', 'Visa·Mastercard·JPMorgan Chase 제3자 업체 경유 고객정보 유출(n0n 주장)', 'Visa·Mastercard·JPMorgan Chase / 카드회원·고객', '2026-11-19', '✅', '높음'],
  ['🟠 HIGH', '공급망', '예별손해보험 보험금 청구 수탁사(엘케이보험중개) 해킹, 과거 피보험자 66명 유출', '예별손해보험 / 과거 피보험자', '2026-11-22', '✅', '높음'],
  ['🟠 HIGH', '개인정보침해', '에이엠씨손해보험중개 보험금 청구 앱 해킹(주민등록번호·병명·치료정보 포함)', '에이엠씨손해보험중개 / 앱 이용자', '2026-11-18 (발견)', '⚠️', '높음'],
  ['🟠 HIGH', '피싱·사회공학', '\'The Com\' 연계 보이스피싱(vishing) 기반 클라우드 데이터 탈취·갈취 분석(Unit 42)', '금융·의료 업권', '2026-11-20', '⚠️', '높음'],
  ['🟡 MEDIUM', '정책·제도', '금감원, 전자금융업·온투업 침해사고 대응 간담회 — 외부접점 집중점검 이행·책임 추궁 방침', '전자금융업자·온라인투자연계금융업자', '2026-11-17', '✅', '높음'],
  ['🟡 MEDIUM', 'APT·해킹', '美 FBI 국가범죄정보센터(NCIC) 데이터베이스 외부 침입 정황 수사(CNN 보도 인용)', '美 FBI', '2026-11-20 (현지)', '⚠️', '낮음'],
];

// ================= CONTENT =================
const C = [];

// Header block
C.push(new Paragraph({ children: [new TextRun({ text: '대외비 · 경영진 보고', font: FONT, size: 18, color: 'B00020', bold: true })], alignment: AlignmentType.RIGHT }));
C.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: '주간 정보보호 동향 보고서', font: FONT })] }));
C.push(P(`${PERIOD} (KST) · 침해사고대응팀`, { run: { size: 22, color: '595959' } }));
C.push(P('보고 대상: CEO · CIO · CISO · CPO · 정보보호부장', { run: { size: 20, color: '595959' } }));
C.push(RULE());

// SECTION 1
C.push(H1('SECTION 1 — EXECUTIVE SUMMARY'));
C.push(H2('금주 보안 기상도'));
C.push(table(['등급', '사유'], [
  ['🔴 위기', 'VMware vCenter·Cisco Expressway(각 CVSS(Common Vulnerability Scoring System, 공통 취약점 점수 체계) 9.8) 취약점이 실제 악용 확인 후 CISA(美 사이버보안·기반시설보안청) KEV(Known Exploited Vulnerabilities, 알려진 악용 취약점 목록)에 등재(2026-11-20). 국내에서는 한전 152만여 명 개인정보 유출 발표'],
  ['🟠 경계', '삼성증권 VOC(Voice of Customer, 고객의 소리) 시스템 해킹(8,241명, 계좌번호 포함), Visa·Mastercard·JPMorgan 제3자 업체 경유 유출, 예별손보 수탁사 해킹 등 금융권 고객채널·수탁사 경유 침해 연속'],
  ['🟡 주의', '금융감독원, 전자금융업·온투업 대상 간담회에서 외부접점 전수점검 이행 요구 및 점검 후 사고 시 책임 추궁 방침 표명(2026-11-17)'],
], [1400, 7626], (r, i) => i === 0 ? { fill: sevFill(r[0]).fill, bold: true, color: sevFill(r[0]).color, align: AlignmentType.CENTER } : {}));
C.push(sp());

C.push(H2('핵심 위협 요약'));
C.push(box(null, [
  '이번 주 CISA는 KEV 목록에 총 8건(2026-11-18 4건, 2026-11-20 4건)을 추가했으며, 이 중 VMware vCenter(CVE-2026-123890)는 Google 위협 인텔리전스 그룹(GTIG)·Mandiant가 2026년 9월 초부터 제로데이로 악용됐다고 보고한 인증우회 취약점이다. Cisco Expressway(CVE-2026-76466)는 PoC(Proof of Concept, 개념증명) 공개 직후 실제 침해에 사용된 사례가 보안기업 F6를 통해 보고됐다.',
  '해외 금융권에서는 Visa·Mastercard·JPMorgan Chase가 랜섬웨어 그룹 n0n이 공개한 고객 데이터가 제3자 업체 침해에서 비롯됐다고 2026-11-19 확인했으며, 3사 모두 자사 결제망·카드번호는 영향이 없다고 밝혔다.',
  '국내에서는 삼성증권이 홈페이지 VOC 시스템 침입으로 고객 8,241명의 계좌번호·운전면허번호 등 정보 유출을, 예별손해보험이 보험금 청구 수탁사 해킹으로 66명 정보 유출을 공개했고, 한국전력은 한전ON·전자조달시스템 이용자 152만여 명의 개인정보 유출을 발표했다.',
  '규제 측면에서 금융감독원은 2026-11-17 간담회에서 금융위원회 「全금융권 보안체계 혁신방안」(2026-11-05)에 따른 외부접점 전수점검(등재 외부접점 기한 2026-11-30)의 충실한 이행을 요구하고, 점검 이후 사고 발생 시 점검 적정성을 따져 책임을 묻겠다고 밝혔다.',
  '**당사 관점의 가장 긴급한 조치 사항은 VMware vCenter·Cisco Expressway 운영 여부 확인 및 즉시 패치와, 고객 첨부파일 업로드 채널(민원·VOC)과 수탁사 외부접점을 2026-11-30 외부접점 전수점검 범위에 포함해 완료하는 것이다.**',
]));
C.push(sp());

C.push(H2('⚡ 긴급조치 Top 3'));
C.push(N('**VMware vCenter 패치(8.0 U3m / 9.0.2.0200 / 9.1.1.0200 이상) 및 2026-09-01 이후 SSO(Single Sign-On, 통합인증) 관리자 세션·계정 생성 이력 침해흔적 점검** — 인프라운영팀(가상화) · 보안관제센터'));
C.push(N('**Cisco Expressway 클러스터 X15.5.20 업그레이드(X14 이하는 수정판 없음 → 버전 이전) 및 관리 인터페이스 외부 노출 차단** — 네트워크운영팀 · UC(Unified Communications, 통합커뮤니케이션) 담당'));
C.push(N('**고객 민원(VOC)·첨부파일 업로드 채널 및 수탁사(콜센터·제휴 마케팅·보험·브랜드사 혜택 프로그램) 외부접점·보유 개인정보 긴급 점검** — 정보보호부 · 금융소비자보호부 · 제휴사업부'));

// SECTION 2
C.push(BR());
C.push(H1('SECTION 2 — 사건 및 위협 현황 리스트'));
C.push(P('수집 기간 내 보도·공개·공지된 12건 전체를 심각도 내림차순으로 정리했다. ✅ 확인 = 공식 발표 또는 독립 출처 2개 이상 / ⚠️ 미확인 = 단일 출처.', { run: { size: 19, color: '595959' } }));
C.push(table(['심각도', '위협유형', '사건명', '피해 주체', '발생·공개일', '교차검증', '금융권 관련성'],
  events, [1150, 1000, 2600, 1550, 1200, 650, 876],
  (r, i) => i === 0 ? { fill: sevFill(r[0]).fill, bold: true, color: sevFill(r[0]).color, size: 16 } : (i >= 5 ? { align: AlignmentType.CENTER, size: 17 } : { size: 17 })));
C.push(sp());
C.push(H3('수집 소스 Tier별 탐색 결과'));
C.push(table(['Tier', '반영 소스', '해당 기간 특이사항 없음'], [
  ['Tier 1 공공·감독', 'CISA(KEV 2026-11-18·11-20), 금융감독원(2026-11-17 간담회, 언론 보도 경유)', 'KISA·금융보안원·개인정보보호위원회·과기정통부·국가사이버안보센터·경찰청·NIST·ENISA: 기간 내 신규 공지 미확인'],
  ['Tier 2 보안기업', 'Google Threat Intelligence·Mandiant(vCenter 악용 보고), F6(Expressway 악용 보고), Palo Alto Unit 42(⚠️)', 'AhnLab ASEC·S2W·CrowdStrike·IBM X-Force·NETSCOUT·Akamai·Cloudflare·SK쉴더스·Check Point·Cisco Talos·Verizon DBIR'],
  ['Tier 3 전문언론', 'BleepingComputer, SecurityWeek, Security Affairs, SecurityOnline, 데일리시큐, IT비즈뉴스', '—'],
  ['Tier 4 일반언론', '파이낸셜뉴스, 디지털투데이, 아주경제, 서울파이낸스, 글로벌이코노믹, 서울신문, Washington Post', '—'],
], [1500, 3900, 3626], (r, i) => i === 0 ? { bold: true, fill: 'F2F2F2' } : {}));
C.push(P('※ DDoS(Distributed Denial of Service, 분산 서비스 거부): 해당 기간 금융권 관련 특이사항 없음.', { run: { size: 18, color: '595959' } }));

// SECTION 3
C.push(H1('SECTION 3 — 위협 유형별 통계'));
C.push(table(['위협유형', '건수', '심각도 분포'], [
  ['취약점 악용', '4', '🔴 4'],
  ['개인정보침해', '3', '🔴 1 / 🟠 2'],
  ['공급망', '2', '🟠 2'],
  ['피싱·사회공학', '1', '🟠 1'],
  ['APT·해킹', '1', '🟡 1'],
  ['정책·제도', '1', '🟡 1'],
  ['**총계**', '**12**', '**🔴 5 / 🟠 5 / 🟡 2**'],
], [3500, 1500, 4026], (r, i, ri) => ({ align: i === 1 ? AlignmentType.RIGHT : undefined, fill: ri === 6 ? 'EAF1FB' : undefined, size: 19 })));
C.push(sp());
C.push(box('분석 포인트', [
  '① 취약점 악용 4건이 모두 CRITICAL — KEV 등재 8건 중 vCenter·Expressway는 CVSS 9.8, 미연방기관 조치 기한이 등재 3일 후(2026-11-23)로 설정됨.',
  '② 국내 금융권 유출 경로가 "고객 업로드 채널(삼성증권 VOC)"과 "수탁사(예별손보·에이엠씨 보험금 청구 서비스)"로 이동 — 본사 핵심계보다 주변 외부접점·위탁 시스템이 공격면.',
  '③ 해외 카드 브랜드사 사고도 제3자 업체 경유 — 공급망 유형 2건 모두 금융권 직결.',
], 'F7F7F7', '595959'));

// SECTION 4
C.push(BR());
C.push(H1('SECTION 4 — 주요 사건 상세 보고'));
C.push(P('SECTION 2의 12건 중 금융권 영향도·심각도가 높은 7건을 상세 분석한다.', { run: { size: 19, color: '595959' } }));

function detail(d) {
  C.push(RULE());
  C.push(H2(d.title));
  C.push(H4('사건 개요'));
  C.push(P(d.summary));
  d.w.forEach(x => C.push(B(x)));
  C.push(H4('메타데이터'));
  C.push(table(['구분', '항목', '내용'], d.meta.map(m => [m[0] ? '필수' : '조건부', m[1], m[2]]), [900, 1800, 6326],
    (r, i) => i === 0 ? { fill: r[0] === '필수' ? 'EAF1FB' : 'F7F7F7', align: AlignmentType.CENTER } : (i === 1 ? { bold: true } : {})));
  C.push(H4('출처 및 교차확인'));
  d.src.forEach(s => C.push(SRC(s[0], s[1])));
  C.push(P(d.xc, { run: { bold: true, size: 19 } }));
  C.push(H4('💳 금융권 시사점'));
  C.push(box(null, [
    P('**[리스크]** ' + d.risk), P('**[영향]** ' + d.impact), P('**[조치]** ' + d.action),
  ], 'FFF8E7', 'C25E00'));
  C.push(sp());
}

detail({
  title: '🔴 CRITICAL [취약점 악용] VMware vCenter Server(CVE-2026-123890) — SSO 디렉터리 인증우회로 비인증 원격 관리자 세션 획득, 2026-09부터 제로데이 악용',
  summary: 'Broadcom VMware vCenter Server의 VMware Directory Service(vmdir, vCenter SSO 디렉터리)에서 원격 비인증 공격자가 관리자 세션을 획득할 수 있는 인증우회 취약점이 실제 악용 확인 후 2026-11-20 CISA KEV에 등재됐다. GTIG·Mandiant는 자사가 \'Armory Castle\'(구 UNC5221)로 추적하는 그룹이 2026년 9월 초부터 제로데이로 악용했다고 보고했다(귀속은 해당 보안기업 평가이며 당사 독자 확인 사항 아님). Broadcom은 보안권고 VMSA-2026-0009로 수정 버전을 배포했다. 피해 기관 수는 공개되지 않았다.',
  w: ['누가: 공격 주체 — GTIG·Mandiant 추적 그룹(Armory Castle) / 피해 주체 — vCenter 운영 기관(기관명 미공개)', '언제: 2026-09 초 악용 개시, 2026-11-20 KEV 등재', '어디서: vCenter Server vmdir(SSO) 구성요소, 국가 미공개', '무엇을: vCenter 관리자 세션 및 관리 대상 가상화 인프라', '어떻게: 비인증 원격 인증우회(T1190)', '얼마나: 미공개'],
  meta: [
    [1, '발생·공개일', '2026-11-20 (KEV 등재) / 악용 개시 2026-09'],
    [1, '공격 유형', 'T1190 Exploit Public-Facing Application, T1078 Valid Accounts(획득 관리자 세션 사용)'],
    [1, '피해 규모', '미공개'],
    [0, 'CVE', 'CVE-2026-123890 (CVSS 9.8 / Critical)'],
    [0, '영향 버전', 'vCenter Server 8.0 U3m · 9.0.2.0200 · 9.1.1.0200 미만 (VMSA-2026-0009)'],
    [0, 'CISA KEV 등재 여부', '예 (2026-11-20)'],
    [0, '패치 기한', '2026-11-23 (美 연방 민간기관 기준)'],
    [0, '관련 규제', '전자금융거래법 제21조(안전성의 확보의무), 전자금융감독규정(조문 확인 필요)'],
  ],
  src: [
    ['[T1] CISA / Known Exploited Vulnerabilities Catalog (CVE-2026-123890) / 2026-11-20', 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'],
    ['[T3] Security Affairs / U.S. CISA adds Cisco Expressway, SAP NetWeaver, Broadcom VMware vCenter, and Apache Roller flaws to its KEV catalog / 2026-11-22', 'https://securityaffairs.com/203639/security/u-s-cisa-adds-cisco-expressway-sap-netweaver-broadcom-vmware-vcenter-and-apache-roller-flaws-to-its-known-exploited-vulnerabilities-catalog.html'],
    ['[T3] SecurityOnline / CISA Adds 4 Exploited Flaws to KEV: VMware vCenter, SAP NetWeaver, Cisco Expressway, Apache Roller / 2026-11-20', 'https://securityonline.info/cisa-kev-catalog-vcenter-cisco-expressway/'],
  ],
  xc: '교차확인: ✅ 확인 (3개 소스 / 최고 신뢰도: T1)',
  risk: 'vCenter는 다수 가상서버를 일괄 통제하는 관리 평면으로, 침해 시 카드 승인·정산·신용정보 처리 서버의 가용성과 기밀성이 동시에 훼손된다. 공식 패치가 공개된 KEV 취약점을 방치한 상태에서 사고가 발생하면 전자금융거래법 제21조 안전성 확보의무 및 개인정보 보호법 제29조(안전조치의무) 위반 소지가 커진다.',
  impact: '악용이 2026년 9월부터 확인된 사실을 근거로, 당사 vCenter 관리 인터페이스가 업무망·관리망에서 넓게 접근 가능하고 패치가 미적용된 경우, 공격자는 관리자 권한으로 가상머신 스냅샷 복제·디스크 반출 또는 일괄 전원 차단·암호화를 수행할 수 있어 카드 승인계를 포함한 다수 서비스가 동시에 중단될 수 있다.',
  action: '① 인프라운영팀: 전 vCenter 긴급 패치(긴급 변경 절차 적용) 및 관리 접근을 전용 관리망·접근통제 시스템 경유로 제한. ② 보안관제센터: 2026-09-01 이후 vCenter SSO 로그인·계정/권한 생성·스냅샷 내보내기 이력 소급 점검.',
});

detail({
  title: '🔴 CRITICAL [취약점 악용] Cisco Expressway(CVE-2026-76466) — 하드코딩 자격증명으로 클러스터 장비 비인증 root 명령실행, PoC 공개 직후 실제 침해',
  summary: 'Cisco Expressway 클러스터 구성에서 네트워크 접근이 가능한 비인증 원격 공격자가 root 권한 명령을 실행할 수 있는 취약점(CWE-798 하드코딩 자격증명 분류)이 실제 악용 확인 후 2026-11-20 CISA KEV에 등재됐다. 보안기업 F6는 PoC 공개 직후 러시아 소재 기관의 클러스터형 Expressway가 침해된 첫 사례를 보고했고, SecurityWeek가 이를 보도했다. Cisco 최초 권고(2026-10-21)는 \'악용 미확인\' 상태였으며, 단독(standalone) 구성은 해당 CVE 영향이 없다. 공격 주체는 확인되지 않았다.',
  w: ['누가: 공격 주체 미상 / 피해 주체 — 러시아 소재 기관(기관명 미공개)', '언제: Cisco 권고 2026-10-21, F6 악용 보고 2026-11-18, KEV 등재 2026-11-20', '어디서: Cisco Expressway(클러스터 구성), 러시아', '무엇을: Expressway 장비 root 권한 및 내부망 접근', '어떻게: 하드코딩 자격증명 이용 비인증 원격 명령실행(T1190, T1078)', '얼마나: 조사 중'],
  meta: [
    [1, '발생·공개일', '2026-11-18 (F6 악용 보고) / 2026-11-20 (KEV 등재)'],
    [1, '공격 유형', 'T1190 Exploit Public-Facing Application, T1078 Valid Accounts'],
    [1, '피해 규모', '조사 중'],
    [0, 'CVE', 'CVE-2026-76466 (CVSS 9.8 / Critical)'],
    [0, '영향 버전', 'Expressway 클러스터 구성 X15.5.20 미만, X14 이하 수정판 없음(지원 버전으로 이전 필요)'],
    [0, 'CISA KEV 등재 여부', '예 (2026-11-20)'],
    [0, '패치 기한', '2026-11-23 (美 연방 민간기관 기준)'],
    [0, '관련 규제', '전자금융거래법 제21조(안전성의 확보의무)'],
  ],
  src: [
    ['[T3] SecurityWeek / Hackers Exploit Cisco Expressway Vulnerability Soon After PoC Release / 2026-11-19', 'https://securityweek.com/hackers-exploit-cisco-expressway-vulnerability-soon-after-poc-release'],
    ['[T1] CISA / Known Exploited Vulnerabilities Catalog (CVE-2026-76466) / 2026-11-20', 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'],
    ['[T2] Cisco / Security Advisory cisco-sa-vcs-static-cred / 2026-10-21', 'https://www.cisco.com/c/ja_jp/support/docs/csa/2026/cisco-sa-vcs-static-cred-hr7EWZ8t.pdf'],
  ],
  xc: '교차확인: ✅ 확인 (3개 소스 / 최고 신뢰도: T1)',
  risk: 'Expressway는 외부 화상회의·협업 트래픽을 내부망으로 중계하는 경계 장비로, 침해 시 경계 우회 거점이 된다. KEV 등재 후 조치 지연은 금융위 「全금융권 보안체계 혁신방안」에 따른 외부접점 전수점검 결과의 적정성 논란으로 이어질 수 있다.',
  impact: 'F6가 PoC 공개 직후 실제 침해를 보고한 사실을 근거로, 당사가 콜센터·화상상담·임원 화상회의용으로 Expressway 클러스터를 인터넷에 노출 운영하는 경우, 공격자가 root 권한으로 내부 UC 서버 및 업무망으로 이동할 수 있다.',
  action: '① 네트워크운영팀: Expressway 보유·구성(클러스터 여부) 확인 후 X15.5.20 업그레이드, X14 이하 장비는 이전 일정 확정 전 외부 관리 포트 차단. ② 보안관제센터: Expressway 발 내부 비정상 접속 탐지 규칙 추가.',
});

detail({
  title: '🔴 CRITICAL [취약점 악용] LiteLLM AI 게이트웨이(CVE-2026-40217) 외 3건 — AI 게이트웨이 가드레일 샌드박스 탈출 RCE 실제 악용',
  summary: 'CISA는 2026-11-18 BerriAI LiteLLM(CVE-2026-40217), Synology DiskStation Manager(CVE-2024-10441), Apache Axis(CVE-2026-90436), Vanderbilt REDCap(CVE-2026-90817) 4건을 KEV에 추가했다. LiteLLM 취약점은 관리자가 입력한 Python 코드를 exec()로 실행하는 사용자 정의 가드레일 기능(/guardrails/testcustomcode)에서 샌드박스를 탈출해 임의 코드를 실행하는 RCE(Remote Code Execution, 원격코드 실행) 취약점이다. Google 위협 인텔리전스는 공격자가 LiteLLM 가상 키를 프록시 관리자 자격증명으로 전환한 사례를 보고했으며, 권한상승 취약점(CVE-2026-47101·47102)과 연계된 공격 체인이 공개돼 있다. 공격 주체와 피해 규모는 미공개다.',
  w: ['누가: 공격 주체 미상 / 피해 주체 미공개', '언제: 2026-11-18 KEV 등재', '어디서: LiteLLM 프록시(AI 게이트웨이) 및 3개 제품', '무엇을: AI 게이트웨이 관리자 권한, 저장된 LLM API 키, 서버 실행권한', '어떻게: 권한상승 후 가드레일 코드 실행 기능을 통한 RCE(T1190, T1059.006)', '얼마나: 미공개'],
  meta: [
    [1, '발생·공개일', '2026-11-18'],
    [1, '공격 유형', 'T1190 Exploit Public-Facing Application, T1059.006 Command and Scripting Interpreter: Python'],
    [1, '피해 규모', '미공개'],
    [0, 'CVE', 'CVE-2026-40217 (CVSS 8.8 / High — 공급처 기준, 체인 전체 9.9 평가 존재), CVE-2024-10441, CVE-2026-90436, CVE-2026-90817'],
    [0, '영향 버전', 'LiteLLM 가드레일 사용자 정의 코드 기능 포함 버전(벤더 권고 확인 필요)'],
    [0, 'CISA KEV 등재 여부', '예 (2026-11-18)'],
    [0, '패치 기한', '2026-12-02 (美 연방 민간기관 기준)'],
    [0, '관련 규제', '전자금융거래법 제21조, 금융분야 AI 보안 가이드라인(2026-07 배포, 조문 확인 필요)'],
  ],
  src: [
    ['[T1] CISA / CISA Adds Four Known Exploited Vulnerabilities to Catalog / 2026-11-18', 'https://www.cisa.gov/news-events/alerts/2026/11/18/cisa-adds-four-known-exploited-vulnerabilities-catalog'],
    ['[T3] Rescana / LiteLLM CVE-2026-40217 Guardrail Sandbox Escape — Patch Now / 2026-11', 'https://www.rescana.com/post/litellm-cve-2026-40217-guardrail-sandbox-escape-patch-now'],
  ],
  xc: '교차확인: ✅ 확인 (2개 소스 / 최고 신뢰도: T1)',
  risk: '금융위원회가 보안 목적 AI 활용 망분리 완화(2026-06)와 망분리 규제 전면해제 TF를 추진 중인 상황에서, AI 게이트웨이는 다수 LLM API 키와 프롬프트(고객 상담 내용 포함 가능)를 집중 보관하는 신규 고가치 자산이다. 관리 대장에 미등재된 AI 도구는 「全금융권 보안체계 혁신방안」의 미등재 시스템 점검(기한 2026-12-31) 대상이다.',
  impact: '실제 악용이 확인된 사실을 근거로, 당사 개발·데이터 조직이 LiteLLM 등 오픈소스 AI 게이트웨이를 PoC 또는 내부 서비스로 운영하는 경우, 공격자가 API 키 탈취로 외부 LLM 과금 남용 및 상담·업무 데이터 유출을 일으킬 수 있다.',
  action: '① AI플랫폼팀: 사내 LiteLLM·AI 게이트웨이 운영 현황 전수 확인 및 최신 버전 적용, 가드레일 사용자 정의 코드 기능 비활성화. ② 정보보호부: KEV 11-18 등재 4개 제품(Synology NAS 포함) 자산 대조.',
});

detail({
  title: '🔴 CRITICAL [개인정보침해] 한국전력공사 — 한전ON·전자조달시스템 외부 침입으로 152만여 명 개인정보 유출',
  summary: '한국전력공사는 2026-11-20 전산시스템 외부 침입을 인지했고, 조사 결과 전기요금 조회·납부 통합고객서비스플랫폼 \'한전ON\'과 전자조달시스템(SRM, Supplier Relationship Management) 이용자 152만여 명의 개인정보가 유출됐다고 2026-11-22 발표했다. 유출 항목의 세부 내역과 공격 기법은 공개되지 않았다. 한전은 2026년 10월에도 직원 등 3만 5,528명의 정보 유출을 확인한 바 있다.',
  w: ['누가: 공격 주체 미상 / 피해 주체 — 한국전력공사, 한전ON·SRM 이용자', '언제: 2026-11-20 인지, 2026-11-22 발표', '어디서: 한전ON, 전자조달시스템(SRM), 대한민국', '무엇을: 이용자 개인정보(세부 항목 미공개)', '어떻게: 조사 중', '얼마나: 약 152만 명'],
  meta: [
    [1, '발생·공개일', '2026-11-22'],
    [1, '공격 유형', '조사 중'],
    [1, '피해 규모', '약 152만 명'],
    [0, '유출 항목', '미공개'],
    [0, '관련 규제', '개인정보 보호법 제29조(안전조치의무)·제34조(유출 통지·신고)'],
  ],
  src: [
    ['[T3] IT비즈뉴스 / 공기업∙금융사 해킹 당했다…한전 152만명∙삼성증권 8천명 개인정보 유출 / 2026-11-23', 'https://www.it-b.co.kr/news/articleView.html?idxno=90814'],
    ['[T4] 글로벌이코노믹 / 한전·삼성증권 줄줄이 해킹…공공·금융권 보안망 \'구멍\' / 2026-11-23', 'https://www.g-enews.com/article/Real-Estate/2026/11/202611231555448178ea13369bfa_1'],
    ['[T4] 디지털타임스 / [사설] 한전·삼성증권도 해킹… 개인정보 유출 왜 아무도 책임 안지나 / 2026-11-23', 'https://www.dt.co.kr/article/12096782'],
  ],
  xc: '교차확인: ✅ 확인 (3개 소스 / 최고 신뢰도: T3)',
  risk: '당사 직접 피해는 확인되지 않았으나, 국민 다수가 이용하는 공공요금 서비스의 대규모 유출은 \'요금 미납·환급\' 사칭 스미싱 및 계정 대입 공격(Credential Stuffing) 증가로 이어지는 전형적 2차 피해 경로다. 당사 고객 대상 2차 피해 발생 시 전자금융거래법상 이용자 손해배상 책임(제9조) 논의로 확대될 수 있다.',
  impact: '152만여 명 규모 유출이 확인된 사실을 근거로, 유출 항목에 연락처·로그인 정보가 포함된 것으로 확인될 경우, 당사 고객 대상 한전 요금 카드납부·환급 사칭 스미싱과 당사 앱 계정 대입 시도가 증가할 수 있다.',
  action: '① FDS(Fraud Detection System, 이상거래탐지시스템)운영팀: 공공요금 납부 연계 부정결제·신규 기기 등록 이상 패턴 모니터링 강화. ② 금융소비자보호부: 사칭 문자 주의 안내(앱 푸시·홈페이지) 게시.',
});

detail({
  title: '🟠 HIGH [개인정보침해] 삼성증권 — 홈페이지 VOC 시스템 외부 침입으로 고객 8,241명 계좌번호·운전면허번호 등 13개 항목 유출',
  summary: '삼성증권은 홈페이지 고객의 소리(VOC) 시스템에서 외부 침입 흔적을 발견하고 조사한 결과 고객 8,241명의 개인정보 유출을 확인해 2026-11-23 공개했다. 유출 항목은 이름·계좌번호·주소·연락처·운전면허번호 등 13개이며 고객별로 상이하고, 민원 첨부파일을 등록한 고객 정보에서만 침입 흔적이 확인됐다. 회사는 방화벽·IP 차단 및 서비스 중단 조치 후 금융감독원과 KISA(한국인터넷진흥원)에 신고했고, 피해 고객에 개별 통지할 예정이다. 공격 주체와 침입 기법은 공개되지 않았다.',
  w: ['누가: 공격 주체 미상 / 피해 주체 — 삼성증권 VOC 이용 고객', '언제: 2026-11-23 공개(침입 시점 조사 중)', '어디서: 삼성증권 홈페이지 VOC 시스템, 대한민국', '무엇을: VOC 첨부파일 내 고객 정보 13개 항목', '어떻게: 외부 침입(세부 기법 조사 중)', '얼마나: 고객 8,241명'],
  meta: [
    [1, '발생·공개일', '2026-11-23'],
    [1, '공격 유형', '조사 중 (외부 침입 흔적 확인 — 회사 발표)'],
    [1, '피해 규모', '고객 8,241명'],
    [0, '유출 항목', '이름, 계좌번호, 주소, 연락처, 운전면허번호 등 13개 항목(고객별 상이). 일부 매체의 카드번호 포함 보도는 회사 확인 미확인'],
    [0, '관련 규제', '신용정보법 제19조(신용정보전산시스템의 안전보호)·제39조의4(개인신용정보 누설통지), 개인정보 보호법 제34조, 전자금융거래법 제21조의5(침해사고의 통지)'],
  ],
  src: [
    ['[T4] 파이낸셜뉴스 / 삼성증권도 해킹 피해…8천여명 개인정보 유출 / 2026-11-23', 'https://www.fnnews.com/news/202611231029394878'],
    ['[T4] 디지털투데이 / 삼성증권도 뚫렸다...해킹에 8241명 정보 유출 / 2026-11-23', 'https://www.digitaltoday.co.kr/news/articleView.html?idxno=717351'],
  ],
  xc: '교차확인: ✅ 확인 (회사 공식 발표 + 2개 소스 / 최고 신뢰도: T4)',
  risk: '계좌번호·운전면허번호는 신용정보법상 개인신용정보 및 고유식별정보에 해당하며, 민원 첨부파일에 포함된 신분증 사본 등은 명의도용 위험이 높다. 금감원이 전수점검 이후 사고에 대해 점검 적정성 책임을 묻겠다고 밝힌(2026-11-17) 상황에서 유사 사고 발생 시 제재 강도가 높아질 수 있다.',
  impact: '민원 첨부파일 저장소가 침해 경로로 확인된 사실을 근거로, 당사 홈페이지·앱의 민원·이의제기·서류제출 기능이 첨부파일을 웹서버와 동일 영역에 평문 저장하거나 접근통제가 미흡한 경우, 신분증·카드 명세·소득 증빙이 대량 유출될 수 있다.',
  action: '① 디지털채널개발팀: 민원·서류제출 업로드 기능 긴급 점검(확장자·경로조작·직접 URL 접근·권한검증). ② 정보보호부: 첨부파일 저장소 분리·암호화 및 처리 완료 민원 첨부파일 보존기간 경과분 파기.',
});

detail({
  title: '🟠 HIGH [공급망] Visa·Mastercard·JPMorgan Chase — 제3자 업체 침해로 카드 혜택·마케팅 고객정보 유출, 랜섬웨어 그룹 n0n 공개',
  summary: '랜섬웨어 그룹 n0n은 협박 기한(2026-11-16) 경과 후 Visa·Mastercard·JPMorgan Chase 연관 고객 데이터를 공개했고, 3사는 2026-11-19 자사 시스템이 아닌 제3자 업체 침해에서 비롯됐다고 확인했다. Visa는 아시아태평양 지역 제3자 서비스 업체가 관련됐으며 카드번호 등 결제정보는 영향이 없다고 밝혔고, Mastercard는 특정 혜택 프로그램 가입 카드회원 일부의 제한된 정보가 노출됐으며 결제망 영향은 없다고 밝혔다. JPMorgan은 고객 이름·이메일 등 마케팅 데이터가 노출됐을 수 있다고 밝혔다. 침해된 업체명은 공개되지 않았다.',
  w: ['누가: 유출 주장 — 랜섬웨어 그룹 n0n / 피해 주체 — Visa·Mastercard·JPMorgan Chase 고객', '언제: 협박 기한 2026-11-16, 3사 확인 2026-11-19', '어디서: 아시아태평양 소재 제3자 서비스 업체(업체명 미공개)', '무엇을: 프리미엄 카드 혜택·로열티 프로그램 정보, 마케팅 데이터(이름·이메일)', '어떻게: 제3자 업체 침해 후 데이터 탈취·공개 협박(T1199)', '얼마나: JPMorgan 고객 이메일 1만 6천여 건·직원 124건(Reuters 인용 보도), Visa 프리미엄 고객 6천여 명(Cybernews 조사) — 3사 공식 수치 미공개'],
  meta: [
    [1, '발생·공개일', '2026-11-19'],
    [1, '공격 유형', 'T1199 Trusted Relationship, T1657 Financial Theft(데이터 공개 협박)'],
    [1, '피해 규모', '공식 수치 미공개 (언론 집계: JPMorgan 1.6만여 건, Visa 6천여 명)'],
    [0, '유출 항목', '이름, 이메일, 혜택 프로그램 가입 정보. 카드번호 등 결제정보 비포함(Visa·Mastercard 발표)'],
    [0, '관련 규제', '(국내 적용 시) 신용정보법 제17조(처리의 위탁), 개인정보 보호법 제26조(업무위탁)·제28조의8(국외 이전)'],
  ],
  src: [
    ['[T3] BleepingComputer / Vendor data breach exposes Chase, Visa, Mastercard customer info / 2026-11-19', 'https://www.bleepingcomputer.com/news/security/vendor-data-breach-exposes-chase-visa-mastercard-customer-info/'],
    ['[T4] The Washington Post / Cyberattack may have exposed Chase Bank and Mastercard customer data / 2026-11-19', 'https://www.washingtonpost.com/nation/2026/11/19/cyberattack-may-have-exposed-chase-bank-mastercard-customer-data/'],
    ['[T3] Malwarebytes / Hackers leak data linked to Visa, Mastercard, and JPMorgan customers / 2026-11', 'https://www.malwarebytes.com/blog/data-breaches/2026/11/hackers-leak-data-linked-to-visa-mastercard-and-jpmorgan-customers'],
  ],
  xc: '교차확인: ✅ 확인 (기업 공식 확인 + 3개 소스 / 최고 신뢰도: T3)',
  risk: '당사도 국제 브랜드사와 프리미엄 카드 혜택(공항 라운지·컨시어지 등) 제휴를 운영하며 회원정보가 브랜드사 및 그 재위탁 업체로 전달된다. 재위탁 업체 사고는 당사 통제 밖에서 발생하지만, 고객 관점에서는 카드사 책임으로 인식되어 평판·민원 리스크가 당사에 귀속된다.',
  impact: 'Visa가 아시아태평양 제3자 업체를 원인으로 지목한 사실을 근거로, 당사 회원이 해당 브랜드 혜택 프로그램 대상에 포함된 경우, 회원 이름·이메일 기반 카드사·브랜드사 사칭 피싱 메일이 증가할 수 있다. 결제정보 비포함 발표를 고려할 때 직접 부정결제 위험은 제한적이다.',
  action: '① 제휴사업부·CPO(Chief Privacy Officer, 개인정보보호책임자): Visa·Mastercard에 당사 회원 영향 여부 공식 확인 요청 및 혜택 프로그램 제공 항목 최소화 검토. ② 정보보호부: 국외 제휴·재위탁 업체 보안 점검 조항(사고 통지 기한 포함) 계약 반영 여부 점검.',
});

detail({
  title: '🟠 HIGH [공급망] 예별손해보험 — 보험금 청구 수탁사(엘케이보험중개) 해킹으로 계약 만료 고객 66명 주민등록번호 등 유출',
  summary: '예별손해보험은 단체보험 보험금 청구 업무 수탁사인 엘케이보험중개의 청구 서비스가 2026-10-25~27 해킹돼 과거 단체상해보험 피보험자 66명의 개인정보가 유출됐다고 2026-11-22 공개했다. 유출 항목은 이름·주민등록번호·생년월일·성별·휴대전화번호·로그인 ID·소속 회사명이며, 해당 계약은 2022-07 만료된 상태였다. 예별손보는 KISA와 개인정보보호위원회에 신고하고 피해 고객에 개별 통지했다. 공격 주체와 기법은 공개되지 않았다.',
  w: ['누가: 공격 주체 미상 / 피해 주체 — 예별손해보험 과거 피보험자', '언제: 2026-10-25~27 침해, 2026-11-22 공개', '어디서: 엘케이보험중개 단체보험 보험금 청구 서비스, 대한민국', '무엇을: 주민등록번호 등 7개 항목', '어떻게: 수탁사 시스템 해킹(T1199, 세부 기법 조사 중)', '얼마나: 66명'],
  meta: [
    [1, '발생·공개일', '2026-11-22 (침해 2026-10-25~27)'],
    [1, '공격 유형', 'T1199 Trusted Relationship (세부 기법 조사 중)'],
    [1, '피해 규모', '66명'],
    [0, '유출 항목', '이름, 주민등록번호, 생년월일, 성별, 휴대전화번호, 로그인 ID, 소속 회사명'],
    [0, '관련 규제', '개인정보 보호법 제21조(파기)·제26조(업무위탁), 신용정보법 제20조의2(개인신용정보의 보유기간 등)'],
  ],
  src: [
    ['[T4] 아주경제 / 예별손해보험도 뚫렸다…고객 66명 개인정보 유출 / 2026-11-22', 'https://www.ajunews.com/view/20261122164931138'],
    ['[T4] 서울파이낸스 / 예별손보, 고객 66명 개인정보 유출···"수탁기관 해킹" / 2026-11-22', 'https://www.seoulfn.com/news/articleView.html?idxno=643593'],
  ],
  xc: '교차확인: ✅ 확인 (2개 소스 / 최고 신뢰도: T4)',
  risk: '계약 만료 4년이 지난 정보가 수탁사에 남아 있었다는 점은 위탁사의 파기·관리감독 의무 위반 쟁점으로, 피해 규모와 무관하게 제재 대상이 될 수 있다. 같은 주 에이엠씨손해보험중개 앱 해킹(⚠️)까지 보험 청구 수탁 채널 사고가 연속됐다.',
  impact: '수탁사에 보존기간 경과 정보가 남아 유출된 사실을 근거로, 당사 콜센터·채권추심·카드 배송·보험 대리 등 수탁사가 해지·탈회 회원 정보를 파기하지 않고 보유한 경우, 수탁사 침해 시 당사가 위탁자로서 유출 통지·제재 책임을 부담한다.',
  action: '① CPO·위탁관리 부서: 주요 수탁사 대상 탈회·해지 회원 정보 파기 이행 증적 요구. ② 정보보호부: 수탁사 외부 노출 웹 서비스를 2026-11-30 외부접점 전수점검 범위에 포함.',
});

// SECTION 5
C.push(BR());
C.push(H1('SECTION 5 — 즉시 조치 권고'));
C.push(table(['우선순위', '조치 항목', '담당 부서/시스템', '완료 기한', '근거 사건'], [
  ['🔴 1순위', 'vCenter 전 버전 패치 + 2026-09-01 이후 SSO·관리자 활동 소급 점검', '인프라운영팀(가상화) · 보안관제센터', '**즉시**', 'vCenter 제로데이'],
  ['🔴 1순위', 'Expressway 클러스터 X15.5.20 업그레이드, X14 이하 외부 관리포트 차단', '네트워크운영팀', '**즉시**', 'Expressway KEV'],
  ['🔴 1순위', 'KEV 11-18·11-20 등재 8개 CVE 자산 대조(LiteLLM·Synology DSM·Apache Axis·REDCap·SAP NetWeaver·Apache Roller 포함) 및 해당 시 패치', '취약점관리 담당 · IT자산관리', '**즉시**', 'CISA KEV'],
  ['🟠 2순위', '민원·VOC·서류제출 첨부파일 업로드 기능 웹 취약점 점검, 저장소 분리·암호화', '디지털채널개발팀 · 정보보호부', '**금주 내**', '삼성증권 VOC'],
  ['🟠 2순위', 'Visa·Mastercard에 당사 회원 영향 여부 공식 확인 요청, 사칭 피싱 대응 공지 준비', '제휴사업부 · CPO', '**금주 내**', 'Visa/MC/JPM'],
  ['🟠 2순위', '한전·삼성증권 유출 연계 사칭 스미싱·계정 대입 대응 FDS 룰 강화 및 고객 안내', 'FDS운영팀 · 금융소비자보호부', '**금주 내**', '한전 · 삼성증권'],
  ['🟠 2순위', '외부접점 전수점검(기한 2026-11-30) 이행 증적 정리, 수탁사 외부접점 포함 여부 확인', '정보보호부', '**금주 내**', '금감원 간담회'],
  ['🟡 3순위', '수탁사 보유 탈회·해지 회원 정보 파기 이행 점검', 'CPO · 위탁관리 부서', '**이달 내**', '예별손보 수탁사'],
  ['🟡 3순위', 'IT 헬프데스크 본인확인 강화(콜백 검증, MFA(Multi-Factor Authentication, 다중인증) 재등록 시 다중 확인)', 'IT헬프데스크 · 정보보호부', '**이달 내**', 'Unit 42 vishing'],
  ['🟡 3순위', 'AI 게이트웨이·LLM 도구 자산 목록화 및 관리자 기능 접근통제', 'AI플랫폼팀', '**이달 내**', 'LiteLLM KEV'],
], [1050, 3500, 1850, 950, 1676], (r, i) => i === 0 ? { fill: sevFill(r[0].includes('1') ? 'CRITICAL' : r[0].includes('2') ? 'HIGH' : 'M').fill, bold: true, align: AlignmentType.CENTER } : (i === 3 ? { align: AlignmentType.CENTER } : {})));

// SECTION 6
function report(r) {
  C.push(BR());
  C.push(H1(`[보고] ${r.topic} 사고 분석 및 대응 리포트`));
  C.push(P(r.why, { run: { size: 19, color: '595959', italics: true } }));
  C.push(H3('1. 사고 개요 및 규모')); r.s1.forEach(x => C.push(B(x)));
  C.push(H3('2. 사고 원인 및 경위')); r.s2.forEach(x => C.push(B(x)));
  C.push(H3('3. 현재 대응 상황')); r.s3.forEach(x => C.push(B(x)));
  C.push(H3('4. 경영진 제언'));
  C.push(P('**비즈니스 리스크**')); r.risk.forEach(x => C.push(B(x)));
  C.push(P('**대응 전략**')); r.plan.forEach(x => C.push(B(x)));
  C.push(box('🧭 의사결정 요청 사항', r.decide, 'EAF1FB', NAVY));
  C.push(H3('5. 관련 출처'));
  r.src.forEach(s => C.push(SRC(s[0], s[1])));
}
C.push(BR());
C.push(H1('SECTION 6 — 사고 개별 분석 리포트'));
C.push(P('CRITICAL 등급 또는 금융권 직결 사건 중 경영진 의사결정이 필요한 3건을 선정했다: ① 삼성증권 VOC 해킹(국내 금융권 직결·고객 채널), ② Visa·Mastercard 제3자 업체 유출(카드 브랜드 공급망), ③ VMware vCenter 제로데이(CRITICAL·핵심 인프라).'));

report({
  topic: '삼성증권 고객 민원(VOC) 채널 해킹',
  why: '선정 사유: 국내 금융회사 고객 채널을 통한 개인신용정보 유출로, 당사 민원·서류제출 채널과 구조가 동일하다.',
  s1: ['발견 시점: 조사 중 (삼성증권 자체 발견, 2026-11-23 공개)', '유출·피해 규모: 고객 8,241명 (VOC 첨부파일 등록 고객에 한정, 미이용 고객 무관 — 회사 발표)', '피해 항목: 이름, 계좌번호, 주소, 연락처, 운전면허번호 등 13개 항목(고객별 상이)'],
  s2: ['공격 유형: 조사 중 (외부 침입 흔적 확인 — 회사 발표, MITRE ATT&CK 기법 미공개)', '기술적 원인: 조사 중 — 침입 지점은 홈페이지 VOC 시스템 및 첨부파일 저장 영역', '관리적 원인: 조사 중 — 민원 첨부파일(신분증 사본 등) 보존·암호화 기준 적정성이 조사 쟁점', '발견 배경: 회사가 VOC 시스템 침입 흔적을 발견해 조사 후 공지 및 언론 보도', '발생 추정 시점: 조사 중 (파이낸셜뉴스·디지털투데이 2026-11-23)'],
  s3: ['즉시 대응: 방화벽 차단, 공격 IP 차단, VOC 서비스 운영 중단', '보안 강화: 미공개', '유관기관 신고: 금융감독원·KISA 신고 완료, 피해 고객 개별 통지 예정'],
  risk: ['법적·규제: 신용정보법 제19조·제39조의4, 개인정보 보호법 제29조·제34조 적용 대상. 금감원이 외부접점 전수점검 후 사고에 대해 책임을 묻겠다고 밝혀(2026-11-17) 동일 유형 사고 시 당사 제재 수준 상향 가능', '평판·고객: 신분증·계좌정보 유출은 명의도용 불안으로 직결되어 민원·탈회 증가 요인', '재무·운영: 민원 채널 중단 시 금융소비자보호법상 민원 처리 기한 준수 부담, 대체 채널(콜센터) 부하 증가'],
  plan: ['즉시 (24시간 이내): 당사 홈페이지·앱 민원·서류제출 업로드 기능에 대한 긴급 웹 취약점 점검 및 WAF(Web Application Firewall, 웹 방화벽) 업로드 경로 차단 룰 적용 — 디지털채널개발팀·보안관제센터', '단기 (1~2주 이내): 첨부파일 저장소를 웹서버와 분리·암호화, 처리 완료 첨부파일 보존기간 경과분 일괄 파기 — 정보보호부·금융소비자보호부', '중장기 (1분기 이내): 고객 업로드 채널 전체에 대한 외부 모의해킹 정례화(분기) 및 OWASP(Open Web Application Security Project) Top 10 기반 시큐어코딩 점검 자동화 — 예산: 외부 모의해킹 용역, 인력: 앱보안 전담 1명'],
  decide: ['① 점검 완료 전까지 민원 첨부파일 업로드 기능 일시 제한(대체: 콜센터·영업점 접수) 여부', '② 외부 모의해킹 분기 정례화 예산 승인 여부'],
  src: [['[T4] 파이낸셜뉴스 / 삼성증권도 해킹 피해…8천여명 개인정보 유출 / 2026-11-23', 'https://www.fnnews.com/news/202611231029394878'], ['[T4] 디지털투데이 / 삼성증권도 뚫렸다...해킹에 8241명 정보 유출 / 2026-11-23', 'https://www.digitaltoday.co.kr/news/articleView.html?idxno=717351'], ['[T3] IT비즈뉴스 / 공기업∙금융사 해킹 당했다…한전 152만명∙삼성증권 8천명 개인정보 유출 / 2026-11-23', 'https://www.it-b.co.kr/news/articleView.html?idxno=90814'], ['[T4] KDI 경제교육·정보센터 / 금감원 전자금융업·온투업 침해사고 대응 간담회 / 2026-11-17', 'https://eiec.kdi.re.kr/policy/materialView.do?num=289656']],
});

report({
  topic: 'Visa·Mastercard·JPMorgan 제3자 업체 경유 고객정보 유출',
  why: '선정 사유: 카드 브랜드사 제휴 프로그램을 통한 공급망 유출로, 당사 회원정보가 국외 재위탁 업체로 흐르는 구조와 직결된다.',
  s1: ['발견 시점: 2026-11-19 (n0n의 데이터 공개 후 3사 확인)', '유출·피해 규모: 3사 공식 수치 미공개 (언론 집계: JPMorgan 고객 이메일 1.6만여 건·직원 124건, Visa 프리미엄 고객 6천여 명)', '피해 항목: 이름, 이메일, 특정 혜택·로열티 프로그램 가입 정보. 카드번호 등 결제정보는 영향 없음(Visa·Mastercard 발표)'],
  s2: ['공격 유형: T1199 Trusted Relationship(제3자 업체 침해), T1657(데이터 공개 협박)', '기술적 원인: 조사 중 — 아시아태평양 소재 제3자 서비스 업체 침해(업체명·침투 기법 미공개)', '관리적 원인: 조사 중 — 브랜드사 혜택 프로그램 운영 업체에 회원정보가 위탁·보관된 구조', '발견 배경: n0n이 협박 기한(2026-11-16) 경과 후 데이터를 공개, 언론 문의에 3사가 확인', '발생 추정 시점: 조사 중 (BleepingComputer, Washington Post 2026-11-19)'],
  s3: ['즉시 대응: 3사 모두 자사 네트워크·결제망 비침해 확인 발표', '보안 강화: 미공개', '유관기관 신고: 미공개. JPMorgan은 영향 고객 통지 및 신용 모니터링 제공 예정'],
  risk: ['법적·규제: 국내 회원 포함 시 신용정보법 제17조(처리의 위탁)상 위탁자 관리감독 책임, 개인정보 보호법 제28조의8(국외 이전) 적정성 쟁점', '평판·고객: 고객은 브랜드사·재위탁 업체 사고도 발급 카드사 책임으로 인식 — 민원·사칭 피싱 증가 가능', '재무·운영: 사고 발표 당일 Visa·Mastercard 주가 하락 — 결제정보 비포함에도 시장 신뢰 영향이 즉각 발생함을 보여줌'],
  plan: ['즉시 (24시간 이내): Visa·Mastercard 한국 지사에 당사 회원 영향 여부 공식 확인 요청, 카드사·브랜드사 사칭 메일 탐지 룰 추가 — 제휴사업부·보안관제센터', '단기 (1~2주 이내): 브랜드사 혜택 프로그램별 제공 항목·재위탁 업체 현황 목록화, 불필요 항목 제공 중단 — CPO·제휴사업부', '중장기 (1분기 이내): 국외 제휴사·재위탁 업체 TPRM(Third-Party Risk Management, 제3자 위험관리) 체계 수립 — 계약 내 사고 통지 기한(예: 24시간)·감사권 조항 표준화, 인력: 제3자 보안평가 담당 1명'],
  decide: ['① 브랜드사 혜택 프로그램 회원정보 제공 범위 축소(이메일 등 필수 외 항목) 승인 여부', '② 국외 제휴사 TPRM 체계 도입 및 계약 조항 개정 추진 승인 여부'],
  src: [['[T3] BleepingComputer / Vendor data breach exposes Chase, Visa, Mastercard customer info / 2026-11-19', 'https://www.bleepingcomputer.com/news/security/vendor-data-breach-exposes-chase-visa-mastercard-customer-info/'], ['[T4] The Washington Post / Cyberattack may have exposed Chase Bank and Mastercard customer data / 2026-11-19', 'https://www.washingtonpost.com/nation/2026/11/19/cyberattack-may-have-exposed-chase-bank-mastercard-customer-data/'], ['[T3] Malwarebytes / Hackers leak data linked to Visa, Mastercard, and JPMorgan customers / 2026-11', 'https://www.malwarebytes.com/blog/data-breaches/2026/11/hackers-leak-data-linked-to-visa-mastercard-and-jpmorgan-customers'], ['[T4] PYMNTS / Visa, Mastercard and JPMorgan Customer Data Leaked in Breach / 2026-11', 'https://www.pymnts.com/cybersecurity/2026/visa-mastercard-and-jpmorgan-customer-data-leaked-in-breach/']],
});

report({
  topic: 'VMware vCenter 제로데이(CVE-2026-123890)',
  why: '선정 사유: CRITICAL(실제 악용 + KEV + CVSS 9.8). 패치에 가상화 인프라 긴급 변경(서비스 영향 가능)이 수반되어 경영진 승인이 필요하다.',
  s1: ['발견 시점: 2026-09 초 악용 개시 (GTIG·Mandiant 보고), 2026-11-20 CISA KEV 등재', '유출·피해 규모: 미공개 (피해 기관 수·국가 미공개)', '피해 항목: vCenter 관리자 세션 — 관리 대상 가상머신 전체에 대한 통제권'],
  s2: ['공격 유형: T1190 Exploit Public-Facing Application, T1078 Valid Accounts', '기술적 원인: VMware Directory Service(vmdir, vCenter SSO)의 인증우회 결함으로 비인증 원격 관리자 세션 획득', '관리적 원인: 해당 없음(벤더 결함). 단, 관리 인터페이스 접근 범위 통제 수준이 피해 범위를 좌우', '발견 배경: GTIG·Mandiant 사고대응 과정에서 제로데이 악용 확인, Broadcom VMSA-2026-0009 배포 후 CISA KEV 등재', '발생 추정 시점: 2026-09 초 (Security Affairs 2026-11-22, GTIG·Mandiant 인용)'],
  s3: ['즉시 대응: Broadcom 수정 버전 배포(8.0 U3m, 9.0.2.0200, 9.1.1.0200)', '보안 강화: CISA, 美 연방기관에 2026-11-23까지 조치 의무화', '유관기관 신고: 해당 없음(벤더 취약점). 당사 침해흔적 발견 시 전자금융거래법 제21조의5에 따라 금융당국 통지 대상'],
  risk: ['법적·규제: 패치 공개 후 미조치 상태에서 침해 시 전자금융거래법 제21조 안전성 확보의무 위반 소지, 금융위 혁신방안 전수점검 결과 적정성 논란', '평판·고객: 승인·결제 장애 시 즉각적 고객 불편 및 언론 노출', '재무·운영: vCenter 침해 시 다수 VM 동시 암호화로 장시간 서비스 중단 — 복구 비용·가맹점 보상 부담'],
  plan: ['즉시 (24시간 이내): 전 vCenter 버전 확인·긴급 패치, 관리 접근을 전용 관리망·접근통제 솔루션 경유로 제한, 2026-09-01 이후 SSO 로그 소급 점검 — 인프라운영팀·보안관제센터', '단기 (1~2주 이내): 가상화 관리평면 KEV 취약점 72시간 내 조치 SLA(Service Level Agreement, 서비스 수준 협약) 수립, 긴급 변경 승인 절차 간소화 — 정보보호부·IT기획팀', '중장기 (1분기 이내): Zero Trust 원칙의 관리평면 분리(관리자 MFA·PAM(Privileged Access Management, 특권계정 관리) 강제), 가상화 백업 불변(immutable) 저장소 구축 — 예산: PAM 확장·불변 백업 스토리지'],
  decide: ['① 카드 승인계 포함 vCenter 긴급 패치를 위한 야간 긴급 변경(잠재적 서비스 영향) 승인', '② KEV 등재 관리평면 취약점 72시간 조치 SLA 정책 채택 여부'],
  src: [['[T1] CISA / Known Exploited Vulnerabilities Catalog / 2026-11-20', 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'], ['[T3] Security Affairs / U.S. CISA adds Cisco Expressway, SAP NetWeaver, Broadcom VMware vCenter, and Apache Roller flaws to its KEV catalog / 2026-11-22', 'https://securityaffairs.com/203639/security/u-s-cisa-adds-cisco-expressway-sap-netweaver-broadcom-vmware-vcenter-and-apache-roller-flaws-to-its-known-exploited-vulnerabilities-catalog.html'], ['[T3] SecurityOnline / CISA Adds 4 Exploited Flaws to KEV / 2026-11-20', 'https://securityonline.info/cisa-kev-catalog-vcenter-cisco-expressway/']],
});

// Self verification
C.push(BR());
C.push(H1('자체검증 결과'));
C.push(box('[자체검증 결과]', [
  '① 논리적 비약 여부: 없음 — 금융권 시사점의 모든 시나리오는 확인 사실을 먼저 제시한 뒤 "~한 경우" 조건절로 전개함.',
  '② 추측성 표현 여부: 있음 → 수정 완료. (a) Visa 사고의 침해 업체를 특정 기업으로 지목한 단일·미확인 보도는 본문에서 삭제하고 "업체명 미공개"로 기재. (b) 삼성증권 "카드번호 유출" 단일 매체 보도는 사실로 기술하지 않고 "회사 확인 미확인"으로 표기. (c) vCenter 공격 주체는 "GTIG·Mandiant 평가"로 한정 표기(C15 준수).',
  '③ 실무 적용 가능성: 적합 — 모든 조치에 담당 부서·기한·근거 사건을 명시했으며, 금융위 외부접점 전수점검 기한(2026-11-30)과 연동함.',
  '④ 출처 검증 상태: ✅ 확인 9건 / ⚠️ 미확인 3건 (에이엠씨손해보험중개 앱 해킹 — 데일리시큐 단독, Unit 42 vishing 분석 — 2차 집계 단일 출처, FBI NCIC — CNN 보도 재인용).',
  '⑤ 날짜·기간 기준 검증: KST 기준 2026-11-17 ~ 2026-11-23 공개·보도 기준 충족. 예외(공개일 기준 포함): vCenter 악용 개시 2026-09, Cisco 최초 권고 2026-10-21, 예별손보 침해 2026-10-25~27. 수집 한계: 이번 실행 환경에서 원문 페이지 직접 열람이 네트워크 정책으로 차단되어 검색 색인 요약으로 교차검증함 — 패치 버전·CVE 번호는 벤더 권고 원문 재확인 후 적용 필요.',
], 'F2F2F2', '404040'));

C.push(sp());
C.push(RULE());
C.push(P(`침해사고대응팀 · 생성형 AI 자동 수집·분석 · ${TODAY}`, { run: { size: 18, color: '595959', bold: true } }));
C.push(P('출처 — T1: CISA(KEV 카탈로그·알림), 금융감독원(간담회, KDI 경제교육·정보센터 게재) / T2: Google Threat Intelligence·Mandiant, F6, Cisco 보안권고, Palo Alto Unit 42 / T3: BleepingComputer, SecurityWeek, Security Affairs, SecurityOnline, Malwarebytes, 데일리시큐, IT비즈뉴스 / T4: 파이낸셜뉴스, 디지털투데이, 아주경제, 서울파이낸스, 글로벌이코노믹, 디지털타임스, 서울신문, Washington Post, PYMNTS', { run: { size: 17, color: '595959' } }));
C.push(H3('부록 — SECTION 2 단독 수록 사건 출처'));
[
  ['[T1] CISA / KEV Catalog — SAP NetWeaver CVE-2025-42884, Apache Roller CVE-2026-129448 / 2026-11-20', 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'],
  ['[T3] 데일리시큐 / [단독] 에이엠씨손해보험중개 보험금 청구 앱 해킹…주민번호·병명·치료정보 등 개인정보 유출 / 2026-11-22', 'https://www.dailysecu.com/news/articleView.html?idxno=209643'],
  ['[T2] Palo Alto Networks Unit 42 / Com 연계 vishing·클라우드 데이터 탈취 분석 (2차 집계 기준) / 2026-11-20', 'https://unit42.paloaltonetworks.com/'],
  ['[T4] 코리안센터뉴스(연합뉴스 인용) / 금감원, 해당 업권 CISO 간담회…외부접점 집중점검·취약점 개선 등 당부 / 2026-11-17', 'https://www.koreancenter.or.kr/news/articleView.html?idxno=1440535'],
  ['[T4] 서울신문 / FBI 또 해킹 피해… 범죄정보망 침입 정황 / 2026-11-23', 'https://seoul.co.kr/news/international/2026/11/23/20261123014003'],
].forEach(s => C.push(SRC(s[0], s[1])));

// ================= DOC =================
const doc = new Document({
  creator: '침해사고대응팀', title: '주간 정보보호 동향 보고서 ' + PERIOD,
  styles: {
    default: { document: { run: { font: FONT, size: 20 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', run: { font: FONT, size: 40, bold: true, color: NAVY }, paragraph: { spacing: { before: 0, after: 80 }, keepNext: true } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true, color: NAVY }, paragraph: { spacing: { before: 280, after: 140 }, keepNext: true, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 2 } } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 23, bold: true, color: '1F1F1F' }, paragraph: { spacing: { before: 220, after: 110 }, keepNext: true, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 21, bold: true, color: NAVY }, paragraph: { spacing: { before: 180, after: 80 }, keepNext: true, outlineLevel: 2 } },
      { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 20, bold: true, color: '404040' }, paragraph: { spacing: { before: 140, after: 60 }, keepNext: true, outlineLevel: 3 } },
    ],
  },
  numbering: { config: [
    { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 240 } } } }, { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 800, hanging: 240 } } } }] },
    { reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1300, left: 1440, right: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `주간 정보보호 동향 보고서 · ${PERIOD}`, font: FONT, size: 16, color: '808080' })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `침해사고대응팀 · 생성형 AI 자동 수집·분석 · ${TODAY} · `, font: FONT, size: 16, color: '808080' }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: '808080' })] })] }) },
    children: C,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log('ok', b.length); });
