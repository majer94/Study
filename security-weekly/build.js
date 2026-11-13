const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, HeadingLevel, BorderStyle, LevelFormat, PageBreak, Footer, Header, PageNumber,
  ExternalHyperlink, TableLayoutType,
} = require('docx');

const FONT = 'Malgun Gothic';
const W = 9638; // A4 content width (DXA) with 1134 margins
const C = { navy: '1F3864', red: 'C00000', orange: 'E36C09', yellow: 'BF8F00', grey: 'F2F2F2', lred: 'FDE9E9', lorg: 'FDF0E1', lyel: 'FFF8DC', lblue: 'E8EEF7', border: 'BFBFBF' };

// ---------- helpers ----------
function runs(text, opts = {}) {
  // supports **bold** inline
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map(p => p.startsWith('**') ? new TextRun({ text: p.slice(2, -2), bold: true, font: FONT, size: opts.size || 20, color: opts.color })
    : new TextRun({ text: p, font: FONT, size: opts.size || 20, color: opts.color, bold: opts.bold, italics: opts.italics }));
}
const P = (text, opts = {}) => new Paragraph({ children: runs(text, opts), spacing: { after: opts.after ?? 80, line: 300 }, alignment: opts.align, indent: opts.indent });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT })], border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.navy, space: 4 } } });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, font: FONT })] });
const B = (text, lvl = 0) => new Paragraph({ numbering: { reference: 'bul', level: lvl }, children: runs(text), spacing: { after: 60, line: 290 } });
const N = (text) => new Paragraph({ numbering: { reference: 'num', level: 0 }, children: runs(text), spacing: { after: 60, line: 290 } });
function linkP(label, url) {
  return new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 60, line: 280 }, children: [
    ...runs(label + ' / ', { size: 18 }),
    new ExternalHyperlink({ link: url, children: [new TextRun({ text: url, style: 'Hyperlink', font: FONT, size: 16 })] }),
  ] });
}
const border = { style: BorderStyle.SINGLE, size: 4, color: C.border };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(content, width, opts = {}) {
  const paras = (Array.isArray(content) ? content : [content]).map(t => t instanceof Paragraph ? t :
    new Paragraph({ children: runs(t, { size: opts.size || 18, bold: opts.bold, color: opts.color }), alignment: opts.align, spacing: { after: 20, line: 260 } }));
  return new TableCell({ children: paras, width: { size: width, type: WidthType.DXA }, borders,
    shading: opts.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: opts.fill } : undefined,
    margins: { top: 60, bottom: 60, left: 90, right: 90 }, columnSpan: opts.span });
}
function table(headers, rows, widths, rowFill) {
  const total = widths.reduce((a, b) => a + b, 0);
  const hdr = new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], { bold: true, color: 'FFFFFF', fill: C.navy, align: AlignmentType.CENTER })) });
  const body = rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, widths[i], { fill: rowFill ? rowFill(r, ri, i) : (ri % 2 ? C.grey : undefined) })) }));
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: [hdr, ...body], layout: TableLayoutType.FIXED });
}
function box(title, lines, fill, accent) {
  const b = { style: BorderStyle.SINGLE, size: 4, color: accent };
  const paras = [new Paragraph({ children: runs(title, { bold: true, size: 21, color: accent }), spacing: { after: 80 } }),
    ...lines.map(l => l instanceof Paragraph ? l : new Paragraph({ children: runs(l, { size: 19 }), spacing: { after: 60, line: 290 } }))];
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ cantSplit: true, children: [new TableCell({ children: paras, width: { size: W, type: WidthType.DXA },
    borders: { top: b, bottom: b, right: b, left: { style: BorderStyle.SINGLE, size: 36, color: accent } },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill }, margins: { top: 120, bottom: 120, left: 200, right: 160 } })] })] });
}
const sp = (n = 120) => new Paragraph({ children: [], spacing: { after: n } });
const pb = () => new Paragraph({ children: [new PageBreak()] });
const sevFill = s => s.startsWith('🔴') ? C.lred : s.startsWith('🟠') ? C.lorg : C.lyel;

// ---------- data ----------
const D = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));
const out = [];

// Header block
out.push(new Paragraph({ children: [new TextRun({ text: 'KB국민카드 정보보호부 · 대외비(Internal)', font: FONT, size: 18, color: '7F7F7F' })], spacing: { after: 60 } }));
out.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: '주간 정보보호 동향 보고서', font: FONT })] }));
out.push(P(`**${D.period}** · 침해사고대응팀`, { size: 22, color: C.navy, after: 40 }));
out.push(P(`보고 대상: CEO, CIO, CISO, CPO, 정보보호부장 · 작성일: ${D.date} (KST)`, { size: 18, color: '595959', after: 200 }));

// SECTION 1
out.push(H1('SECTION 1 — EXECUTIVE SUMMARY'));
out.push(H2('금주 보안 기상도'));
out.push(table(['등급', '사유'], D.weather, [1600, W - 1600], (r) => sevFill(r[0])));
out.push(sp());
out.push(H2('핵심 위협 요약'));
out.push(box('■ 이번 주 핵심 위협', D.summary, C.lblue, C.navy));
out.push(sp());
out.push(H2('⚡ 긴급조치 Top 3'));
out.push(box('⚡ 당사 긴급조치 Top 3', D.top3.map((t, i) => `${i + 1}. ${t}`), C.lred, C.red));
out.push(sp());
out.push(H3('수집 소스 Tier별 탐색 결과'));
out.push(table(['Tier', '탐색 결과'], D.tiers, [2400, W - 2400]));
out.push(pb());

// SECTION 2
out.push(H1('SECTION 2 — 사건 및 위협 현황 리스트'));
out.push(P(`수집 대상 기간(${D.period}, KST) 내 확인된 ${D.list.length}건 전체를 심각도 내림차순으로 기재한다.`, { size: 19 }));
out.push(table(['#', '심각도', '위협유형', '사건명', '피해 주체', '발생·공개일', '교차검증', '금융권 관련성'],
  D.list.map((r, i) => [String(i + 1), ...r]), [380, 1100, 1000, 2600, 1500, 1250, 700, 1108], (r) => sevFill(r[1])));
out.push(sp(80));
out.push(H3('사건별 대표 출처 (교차검증 상세는 SECTION 4 참조)'));
D.listSrc.forEach(s => out.push(linkP(s[0], s[1])));
out.push(sp());

// SECTION 3
out.push(H1('SECTION 3 — 위협 유형별 통계'));
out.push(table(['위협유형', '건수', '심각도 분포'], D.stats, [3200, 1400, W - 4600]));
out.push(P(D.statsNote, { size: 17, color: '595959' }));
out.push(pb());

// SECTION 4
out.push(H1('SECTION 4 — 주요 사건 상세 보고'));
out.push(P('SECTION 2 전체 사건 중 금융권 영향도 또는 심각도가 높은 7건을 심각도 내림차순으로 상세 분석한다.', { size: 19 }));
D.detail.forEach((d, idx) => {
  if (idx > 0) out.push(new Paragraph({ children: [], border: { bottom: { style: BorderStyle.DASHED, size: 6, color: C.border, space: 2 } }, spacing: { after: 160 } }));
  out.push(H2(d.title));
  out.push(H3('사건 개요'));
  out.push(P(d.overview));
  d.who.forEach(w => out.push(B(w)));
  out.push(H3('메타데이터'));
  out.push(P('**[필수]**', { after: 40 }));
  d.meta.forEach(m => out.push(B(m)));
  out.push(P('**[조건부]**', { after: 40 }));
  d.cond.forEach(m => out.push(B(m)));
  out.push(H3('출처 및 교차확인'));
  d.src.forEach(s => out.push(linkP(s[0], s[1])));
  out.push(B(d.xcheck));
  out.push(sp(60));
  out.push(box('💳 금융권 시사점', [
    `**[리스크]** ${d.risk}`, `**[영향]** ${d.impact}`, `**[조치]** ${d.action}`,
  ], C.lorg, C.orange));
  out.push(sp());
});
out.push(pb());

// SECTION 5
out.push(H1('SECTION 5 — 즉시 조치 권고'));
out.push(table(['우선순위', '조치 항목', '담당 부서/시스템', '완료 기한', '근거 사건'], D.actions, [1100, 4000, 1900, 1000, 1638], (r) => sevFill(r[0])));
out.push(pb());

// SECTION 6
out.push(H1('SECTION 6 — 사고 개별 분석 리포트'));
out.push(P('작성 조건: CRITICAL 등급 또는 금융권 직결 사건 중 경영진 의사결정이 필요한 3건.', { size: 19 }));
D.reports.forEach((r, i) => {
  if (i > 0) out.push(pb());
  out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: r.title, font: FONT })], shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.lblue } }));
  r.sections.forEach(s => {
    out.push(H3(s.h));
    s.items.forEach(it => {
      if (it.startsWith('##')) out.push(P(`**${it.slice(2).trim()}**`, { after: 40 }));
      else out.push(B(it));
    });
  });
  out.push(H3('5. 관련 출처'));
  r.src.forEach(s => out.push(linkP(s[0], s[1])));
});
out.push(pb());

// Self check
out.push(H1('자체검증 결과'));
out.push(box('[자체검증 결과]', D.selfcheck, C.grey, '404040'));
out.push(sp(200));
out.push(new Paragraph({ children: [], border: { top: { style: BorderStyle.SINGLE, size: 6, color: C.navy, space: 4 } } }));
out.push(P(`침해사고대응팀 · 생성형 AI 자동 수집·분석 · ${D.date}`, { size: 17, color: '595959' }));
D.footerSrc.forEach(f => out.push(P(f, { size: 16, color: '595959', after: 30 })));

const doc = new Document({
  creator: '침해사고대응팀', title: '주간 정보보호 동향 보고서',
  styles: {
    default: { document: { run: { font: FONT, size: 20 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', run: { font: FONT, size: 40, bold: true, color: C.navy }, paragraph: { spacing: { before: 0, after: 80 }, keepNext: true } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true, color: C.navy }, paragraph: { spacing: { before: 280, after: 140 }, keepNext: true, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 23, bold: true, color: '17365D' }, paragraph: { spacing: { before: 220, after: 100 }, keepNext: true, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 20, bold: true, color: '404040' }, paragraph: { spacing: { before: 140, after: 60 }, keepNext: true, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [
    { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } },
      { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 800, hanging: 260 } } } }] },
    { reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `주간 정보보호 동향 보고서 · ${D.period}`, font: FONT, size: 16, color: '7F7F7F' })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '침해사고대응팀 · 대외비 · ', font: FONT, size: 16, color: '7F7F7F' }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: '7F7F7F' })] })] }) },
    children: out,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log('written', process.argv[2]); });
