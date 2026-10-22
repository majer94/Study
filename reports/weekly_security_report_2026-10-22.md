---
title: "주간 정보보호 동향 보고서"
subtitle: "2026-10-16 ~ 2026-10-22 · 침해사고대응팀"
---

> **보고 대상**: CEO, CIO, CISO, CPO, 정보보호부장 ｜ **작성**: 정보보호부 침해사고대응팀 ｜ **작성일(KST)**: 2026-10-22 ｜ **수집 기간**: 2026-10-16 ~ 2026-10-22 (KST 직전 7일)

# SECTION 1 — EXECUTIVE SUMMARY

## 금주 보안 기상도

| 등급 | 사유 |
|---|---|
| 🔴 위기 | 금융 16개사 침해·약 10만 건 개인정보 유출 수사 확대(경찰 '중대범죄' 판단), BeyondTrust Remote Support(CVSS 9.3)·Cisco Secure Email Gateway(CVSS 9.8) 실악용 및 CISA KEV(Known Exploited Vulnerabilities, 알려진 악용 취약점 목록) 등재 |
| 🟠 경계 | ConnectWise Cloud Backup 공급망 침해로 Microsoft 365 테넌트 최소 173곳 무단 로그인, Ivanti Connect Secure·PAN-OS 관리 인터페이스 악용, 금융당국 전수점검 및 2차 피해 특별대응기간(2026-10-06~약 1개월) 운영 중 |
| 🟡 주의 | AI 에이전트 활용 침입 보도(단일 계통 소스), CISA 10-20 KEV 6건(Plex·Siemens·SiteGuard), 신용정보업감독규정 과징금 개정안, 해외 은행 랜섬웨어 주장 |

## 핵심 위협 요약

글로벌 환경에서는 VPN(Virtual Private Network, 가상사설망)·원격지원·메일 게이트웨이 등 인터넷 노출 경계 장비의 인증 우회·원격코드 실행 취약점이 공개 직후 실제 악용되는 양상이 지속되었다. 특히 BeyondTrust Remote Support(CVE-2026-102764, CVSS 9.3)는 2026-10-16 CISA KEV에 등재되었고, Cisco Secure Email Gateway(CVE-2026-76519, CVSS 9.8)는 연방기관 조치 기한이 3일(2026-10-17)로 설정되었다. 서드파티 신뢰 관계를 악용한 공급망 공격으로 ConnectWise Cloud Backup의 앱 자격증명이 탈취되어 Microsoft 365 테넌트에 무단 로그인이 발생했으며, 서비스는 일시 중단되었다. 국내에서는 금융당국이 은행·저축은행·캐피탈 등 16개 금융회사의 침해사고와 약 10만 건의 개인정보(성명·연락처·주민등록번호·이메일) 유출을 확인했고, 경찰은 2026-10-20경 이 사건을 '중대범죄'로 판단해 중대범죄수사청 통보 방침을 밝혔다. 금융당국은 계좌번호·카드번호 등 직접 부정결제 정보는 확인되지 않았다고 설명했으나, 유출 정보를 이용한 대출빙자 사기 등 2차 피해를 우려해 2026-10-06부터 약 1개월간 특별대응기간을 운영 중이다. 이번 주 확인된 주요 규제·정책 변화는 신용정보업감독규정 과징금 산정기준 개정안 예고와 금융권 보안관리 전수점검 추진이다. 당사 관점의 가장 긴급한 조치 사항은 외부 노출 원격지원·메일 게이트웨이·VPN 자산의 패치 적용 현황과 침해 흔적을 즉시 점검하고, 금융당국이 공유한 공격 IP 차단과 외부접속 시스템 다중인증 적용을 재확인하는 것이다.

## ⚡ 긴급조치 Top 3

1. BeyondTrust Remote Support·Cisco Secure Email Gateway·Ivanti Connect Secure·PAN-OS 보유/사용 여부 전수 확인 및 패치·침해 흔적 점검 — 정보보호부 취약점관리·IT인프라팀
2. 금융당국 공유 공격 IP 차단 및 외부접속 시스템 다중인증(MFA, Multi-Factor Authentication) 적용 여부 재점검, 24시간 관제 체계 확인 — 정보보호부 보안관제·인증시스템
3. ConnectWise Cloud Backup 등 Microsoft 365 연동 서드파티 앱의 위임 권한(OAuth) 및 비정상 로그인 점검, 2차 피해(대출빙자·스미싱) 대응 FDS(Fraud Detection System, 이상거래탐지시스템) 룰 강화 — 클라우드보안·FDS 운영팀

---

# SECTION 2 — 사건 및 위협 현황 리스트

> **수집 현황**: 총 14건(Tier 1 정부·감독 / Tier 2 보안기업 / Tier 3 전문언론 / Tier 4 일반언론 교차 활용). 심각도 내림차순. 발생·공개일이 수집 기간(2026-10-16~2026-10-22) 이전인 항목은 후속 보도·조치 기한·패치 미적용 위험이 기간 내 지속되어 포함하였으며 각 항목에 사유를 표기하였다(자체검증 ⑤ 참조).

| # | 심각도 | 위협유형 | 사건명 | 피해 주체 | 발생·공개일 | 교차검증 | 금융권 관련성 |
|---|---|---|---|---|---|---|---|
| 1 | 🔴 CRITICAL | 개인정보침해 | 금융 16개사 연쇄 침해·약 10만 건 개인정보 유출(경찰 '중대범죄' 판단 2026-10-20경) | 신한·KB국민·하나·BNK부산은행, 저축은행, 캐피탈 등 16개사 | 2026-10-01(최초 공지)~, 2026-10-14(금융위 집계), 2026-10-20(수사 동향) | ✅ | 높음 |
| 2 | 🔴 CRITICAL | 취약점 악용 | BeyondTrust Remote Support 인증 우회(CVE-2026-102764) | BeyondTrust 제품 사용 기관(글로벌) | 2026-10-16(KEV 등재) | ✅ | 높음 |
| 3 | 🔴 CRITICAL | 취약점 악용 | Cisco Secure Email Gateway 경로 조작 RCE(CVE-2026-76519) | Cisco SEG(AMP File Reputation 사용) 보유 기관 | 2026-10-14(KEV 등재, 조치기한 2026-10-17) | ✅ | 높음 |
| 4 | 🟠 HIGH | 공급망 | ConnectWise Cloud Backup 앱 자격증명 탈취→M365 테넌트 무단 로그인 | ConnectWise 고객·MSP의 M365 테넌트 최소 173곳 | 2026-10-16 | ✅ | 높음 |
| 5 | 🟠 HIGH | APT·해킹 | 중국어 사용 추정 행위자의 AI 에이전트 활용 한국 은행 침입(CrowdStrike 평가) | 한국 은행(보도별 7~9곳) | 2026-10-08 보도, 2026-10-22 후속 기사 | ⚠️ | 높음 |
| 6 | 🟠 HIGH | 취약점 악용 | Ivanti Connect Secure 인증 우회·RCE(CVE-2026-104935) | Ivanti ICS 사용 기관 | 2026-10-13(KEV 등재, 기한 2026-10-16) | ✅ | 높음 |
| 7 | 🟠 HIGH | 취약점 악용 | PAN-OS 관리 인터페이스 RCE(CVE-2026-0322) | PA/VM-Series·Panorama 사용 기관 | 2026-10-14(KEV 등재) | ✅ | 중간 |
| 8 | 🟠 HIGH | 취약점 악용 | AhsayCBS 인증 우회·RCE 연쇄(CVE-2026-105133/105134) | AhsayCBS 백업 서버 사용 기관 | 2026-10-14(KEV 등재) | ✅ | 중간 |
| 9 | 🟠 HIGH | 정책·제도 | 금융권 긴급점검(555개사 중 130개사 미흡)·전수점검·2차 피해 특별대응기간 | 전 금융업권 | 2026-10-06~(특별대응기간), 2026-10-14(점검결과) | ✅ | 높음 |
| 10 | 🟡 MEDIUM | APT·해킹 | AI 에이전트(ARTEX 추정) 활용 M365 테넌트 2,250곳 침해 주장 | M365 테넌트(글로벌) | 2026-10-22 | ⚠️ | 중간 |
| 11 | 🟡 MEDIUM | 취약점 악용 | CISA KEV 6건 추가(Plex·Siemens Software Center·SiteGuard) | 해당 제품 사용 기관 | 2026-10-20 | ✅ | 낮음 |
| 12 | 🟡 MEDIUM | 정책·제도 | 신용정보업감독규정 과징금 산정기준 개정안 예고 | 신용정보법 적용 금융회사 | 2026-10-01(예고, 2026-09-16 발표) | ✅ | 높음 |
| 13 | 🟡 MEDIUM | 정책·제도 | 금융권 해킹 수사 관할(중수청 통보·전자금융기반시설 유권해석) 쟁점 | 수사기관·금융회사 | 2026-10-21 | ✅ | 중간 |
| 14 | 🟡 MEDIUM | 랜섬웨어 | Capital Bank(아이티) LockBit 5.0 주장·온라인뱅킹 장애 보도 | 아이티 Capital Bank | 2026-10-21 | ⚠️ | 낮음 |

> 심각도 판정 주: KEV 등재 실악용 건 중 CVSS 7.0~8.9 구간은 HIGH 기준(CVSS 7.0~8.9 AND KEV)을 우선 적용하였고, CVSS 9.0 이상이면서 조치기한 72시간 이내인 건(Cisco SEG)과 CVSS 9.3 실악용(BeyondTrust)은 CRITICAL로 분류하였다.

---

# SECTION 3 — 위협 유형별 통계

| 위협유형 | 건수 | 심각도 분포 |
|---|---:|---|
| 취약점 악용 | 6 | 🔴 2 / 🟠 3 / 🟡 1 |
| 개인정보침해 | 1 | 🔴 1 |
| 공급망 | 1 | 🟠 1 |
| APT·해킹 | 2 | 🟠 1 / 🟡 1 |
| 정책·제도 | 3 | 🟠 1 / 🟡 2 |
| 랜섬웨어 | 1 | 🟡 1 |
| **총계** | **14** | 🔴 3 / 🟠 6 / 🟡 5 |

---

# SECTION 4 — 주요 사건 상세 보고

## 🔴 CRITICAL [개인정보침해] 금융 16개사 — 침해사고 연쇄 발생 및 약 10만 건 개인정보 유출

### 사건 개요
- 누가: 피해 주체는 신한은행, KB국민은행, 하나은행, BNK부산은행, 저축은행, 캐피탈사 등 16개 금융회사이며, 공격 주체는 조사 중이다(경찰이 공격 주체를 확인한 사건은 일부에 한정된다는 보도가 있다).
- 언제: 2026-10-01 신한은행이 유출을 공지한 이후 확산되었으며, 금융당국은 2026-10-14 16개사·약 10만 건으로 집계했다. 경찰은 2026-10-06 정식 수사로 전환했고 2026-10-20경 '중대범죄'로 판단해 중대범죄수사청 통보 방침을 밝혔다.
- 어디서: 국내 은행·저축은행·상호금융·캐피탈 등 금융 전 업권.
- 무엇을: 성명, 연락처, 주민등록번호, 이메일 주소가 유출되었다. 계좌번호·카드번호 등 직접 부정결제 정보는 확인되지 않았다.
- 어떻게: 일부 증권사 대상 공격 이전 스캐닝 정황이 보도되었으며, 공유된 공격 IP 기반의 침해 여부 확인이 진행 중이다. 구체적 침투 경로는 미공개이고 AI 활용 여부는 조사 중이다.
- 얼마나: 약 10만 건, 16개사. 당국은 피해 규모가 더 늘어날 수 있다고 밝혔다. 긴급 12개 항목 점검에서 555개사 중 130개사가 미흡 판정을 받았다(최신 패치 미적용, 기술지원 종료 시스템 관리 미흡, 24시간 관제 미구축, 외부접속 시스템 다중인증 누락 등).

### 메타데이터
**[필수]**
- 발생·공개일: 2026-10-01(최초 공지), 2026-10-14(집계), 2026-10-20(수사 동향)
- 공격 유형: T1595 Active Scanning(능동 스캐닝, 일부 보도 기준) / 그 외 조사 중
- 피해 규모: 16개사, 약 10만 건(증가 가능)

**[조건부]**
- 유출 항목: 성명, 연락처, 주민등록번호, 이메일
- 관련 규제: 개인정보 보호법(안전조치의무·유출 통지·신고 — 조문 확인 필요), 신용정보의 이용 및 보호에 관한 법률, 전자금융거래법(전자금융기반시설 해당 여부는 금융위 유권해석 의뢰 중)

### 출처 및 교차확인
- 출처 1: [T4] 비즈워치 / 16개 금융회사 10만건 정보 유출…금융위, 보안관리 전수점검 / 2026-10-14 / https://news.bizwatch.co.kr/article/finance/2026/10/14/0028
- 출처 2: [T4] 뉴데일리 경제 / 금융권 해킹 16개사·정보유출 10만건 … 555곳 점검했더니 130곳 보안 허술 / 2026-10-14 / https://biz.newdaily.co.kr/site/data/html/2026/10/14/2026101400320.html
- 출처 3: [T4] VOA 코리아 / 한국 경찰, 금융권 연쇄 해킹 '중대범죄' 판단…중대범죄수사청에 통보 / 2026-10-20(URL 기준) / https://www.voakorea.com/a/south-korea---financial-hacking-102026/8213222.html
- 교차확인: ✅ 확인 (3개 소스 / 최고 신뢰도: T4. 금융위 보도 내용을 다수 언론이 인용하며, 금융위 원문(Tier 1)은 접속 제한으로 직접 열람하지 못함)

### 💳 금융권 시사점
- **[리스크]** 주민등록번호를 포함한 개인정보 유출이 16개사에서 확인되었고 전 업권 보안 전수점검이 추진 중이다. 개인정보 보호법·신용정보법·전자금융거래법상 안전조치 의무 위반 여부 조사 및 제재, 금융당국 검사 확대 가능성이 있다(제재 수준·조문은 조문 확인 필요). 그룹사 KB국민은행이 피해 기관에 포함된 보도가 있어 그룹 차원의 평판·감독 부담이 존재한다.
- **[영향]** 유출된 성명·연락처·주민등록번호가 당사 고객과 일치하는 경우, 금융당국이 경고한 대출빙자·스미싱 수법이 당사 명의 사칭 및 카드론·현금서비스 사기로 확장될 수 있다. 외부접속 시스템 MFA 누락과 패치 미적용이 점검 미흡 사유로 확인된 만큼, 당사에 동일 유형의 미조치 자산이 있는 경우 동일 경로로 침해될 수 있다.
- **[조치]** ① 금융당국 공유 공격 IP 차단 및 로그 소급 점검, 외부접속 시스템 MFA·EOS(End of Support, 기술지원 종료) 자산 목록 확인 — 보안관제·IT인프라팀. ② 2차 피해 특별대응기간 동안 FDS 룰 강화 및 고객 안내 문구 점검 — FDS 운영팀·고객서비스팀.

---

## 🔴 CRITICAL [취약점 악용] BeyondTrust Remote Support — 인증 우회로 비인증 파일 조작 (CVE-2026-102764)

### 사건 개요
- 누가: BeyondTrust(벤더), 공격 주체는 조사 중이다. 일부 매체가 Mandiant의 추적 그룹명을 언급하나 본 보고서는 귀속을 확정하지 않는다.
- 언제: 벤더 권고 BT26-05 2026-10-15, CISA KEV 등재 2026-10-16. 일부 보도는 2026년 8월 말부터 악용이 있었다고 전한다.
- 어디서: 온프레미스 및 SaaS(Software as a Service) Remote Support 제품(글로벌).
- 무엇을: 내부 메시징 구성요소의 출처 검증 미흡(CWE-290)으로 비인증 원격 공격자가 어플라이언스에서 파일 작업을 수행할 수 있다.
- 어떻게: T1190 Exploit Public-Facing Application(공개 서비스 악용).
- 얼마나: 피해 규모 미공개. 벤더는 공개 전 악용을 확인했고 세부 내용은 패치 적용 기간 동안 비공개로 하였다.

### 메타데이터
**[필수]**
- 발생·공개일: 2026-10-15(권고), 2026-10-16(KEV)
- 공격 유형: T1190 Exploit Public-Facing Application
- 피해 규모: 조사 중

**[조건부]**
- CVE: CVE-2026-102764 (CVSS v4.0 9.3 / Critical)
- 영향 버전: Remote Support 26.2.3 이하(Rapid7 기준, 캐나다 사이버센터는 전 버전으로 안내하여 출처 간 상이). 24.3.1 미만은 선행 업그레이드 필요
- CISA KEV 등재 여부: 예 (2026-10-16)
- 패치 기한: 확인 중(CISA 연방기관 기한은 원문 미확인)
- 관련 규제: 전자금융감독규정상 취약점 점검·조치 의무(조문 확인 필요)

### 출처 및 교차확인
- 출처 1: [T1] CISA / CISA Urges Patching Critical Vulnerability in BeyondTrust Remote Support / 2026-10-16 / https://www.cisa.gov/news-events/alerts/2026/10/16/cisa-urges-patching-critical-vulnerability-beyondtrust-remote-support
- 출처 2: [T2] Rapid7 / CVE-2026-102764: Critical BeyondTrust Remote Support Authentication Bypass Exploited in the Wild / 2026-10 / https://www.rapid7.com/blog/post/etr-cve-2026-102764-critical-beyondtrust-remote-support-authentication-bypass-exploited-in-the-wild
- 출처 3: [T1] 캐나다 사이버보안센터 AL26-025 / 2026-10 / https://cyber.gc.ca/en/alerts-advisories/al26-025-critical-vulnerability-impacting-beyondtrust-remote-support-cve-2026-102764
- 교차확인: ✅ 확인 (3개 소스 / 최고 신뢰도: T1)

### 💳 금융권 시사점
- **[리스크]** CVSS 9.3의 인증 우회가 KEV에 등재되었으므로 전자금융거래법·전자금융감독규정상 취약점 조치 의무 이행 여부가 쟁점이 될 수 있다(조문 확인 필요). 원격지원 도구는 특권 접근 경로이므로 침해 시 내부망 확산 위험이 크다.
- **[영향]** 당사 또는 위탁사가 Remote Support를 인터넷에 노출해 운영하고 미패치 상태인 경우, 비인증 공격자가 어플라이언스 내 파일을 조작해 원격지원 세션·저장 자격증명에 접근할 수 있다. 확인된 사실은 공개 전 악용 확인과 KEV 등재이다.
- **[조치]** ① 자산 보유·버전 확인 및 BT26-05 패치 적용, 미패치 시 외부 노출 차단 — IT인프라팀. ② 침해 흔적(비정상 파일 생성·관리자 계정 변경) 점검 및 저장 자격증명 교체 — 보안관제팀.

---

## 🔴 CRITICAL [취약점 악용] Cisco Secure Email Gateway — 첨부파일 처리 경로 조작으로 root 명령 실행 (CVE-2026-76519)

### 사건 개요
- 누가: Cisco(벤더), 공격 주체는 미공개.
- 언제: 2026-10-14 CISA KEV 등재, 연방기관 조치기한 2026-10-17(3일).
- 어디서: AMP(Advanced Malware Protection) File Reputation이 수신/발신 메일 정책에 활성화된 Secure Email Gateway.
- 무엇을: 비인증 공격자가 조작된 첨부파일로 운영체제에 임의 파일을 쓰고 root 권한 명령을 실행할 수 있다.
- 어떻게: T1190 Exploit Public-Facing Application.
- 얼마나: 피해 규모 미공개.

### 메타데이터
**[필수]**
- 발생·공개일: 2026-10-14
- 공격 유형: T1190 Exploit Public-Facing Application
- 피해 규모: 미공개

**[조건부]**
- CVE: CVE-2026-76519 (CVSS 9.8 / Critical)
- 영향 버전: AMP File Reputation 활성화된 AsyncOS 기반 SEG. Content Scanner Tools 25.3.0.5525 이상 업데이트로 해소(지원·라이선스 릴리스 기준)
- CISA KEV 등재 여부: 예
- 패치 기한: 2026-10-17(연방기관 기준)
- 관련 규제: 전자금융감독규정상 취약점 조치 의무(조문 확인 필요)

### 출처 및 교차확인
- 출처 1: [T1] CISA / CISA Adds Four Known Exploited Vulnerabilities to Catalog / 2026-10-14 / https://www.cisa.gov/news-events/alerts/2026/10/14/cisa-adds-four-known-exploited-vulnerabilities-catalog
- 출처 2: [T3] Help Net Security / CISA flags exploited flaws in Palo Alto, Cisco and Ahsay products / 2026-10 / https://www.helpnetsecurity.com/?p=388051
- 교차확인: ✅ 확인 (2개 소스 / 최고 신뢰도: T1)

### 💳 금융권 시사점
- **[리스크]** CVSS 9.8, KEV 등재, 3일 조치기한이 모두 확인되어 지연 시 감독기관의 취약점 관리 미흡 지적 가능성이 있다(조문 확인 필요).
- **[영향]** 당사가 Cisco SEG를 운영하며 AMP File Reputation이 활성화된 경우, 외부에서 수신되는 메일 한 통으로 게이트웨이 root 장악 및 메일 흐름(고객 안내·인증 메일 포함) 변조가 가능하다.
- **[조치]** ① SEG 보유 및 AMP File Reputation 설정 확인, Content Scanner Tools 25.3.0.5525 이상 적용 — 메일시스템 운영팀. ② 게이트웨이 파일 시스템·프로세스 이상 여부 점검 — 보안관제팀.

---

## 🟠 HIGH [공급망] ConnectWise Cloud Backup — 앱 자격증명 탈취 후 M365 테넌트 무단 로그인

### 사건 개요
- 누가: ConnectWise(Cloud Backup, 구 SkyKick), 공격 주체는 조사 중이다.
- 언제: Huntress가 2026-10-16 최초 보고(162개 테넌트), 이후 173개로 상향. 2026-10-17 ConnectWise가 관련 애플리케이션 ID를 비활성화하고 서비스를 일시 중단했다.
- 어디서: 고객·MSP(Managed Service Provider, 관리형 서비스 제공사)의 Microsoft 365 환경.
- 무엇을: Cloud Backup의 앱 자격증명이 탈취되어 고객이 앱에 위임한 권한(Directory.ReadWrite.All 포함)이 악용되었다.
- 어떻게: T1199 Trusted Relationship, T1078.004 Valid Accounts: Cloud Accounts.
- 얼마나: 최소 173개 테넌트에서 무단 로그인. ConnectWise는 백업 데이터 침해 징후는 없다고 밝혔고, Huntress는 데이터 유출을 확인하지 못했다.

### 메타데이터
**[필수]**
- 발생·공개일: 2026-10-16
- 공격 유형: T1199, T1078.004
- 피해 규모: 최소 173개 테넌트(추가 확인 중)

**[조건부]**
- 유출 항목: 확인되지 않음(조사 중)
- 관련 규제: 전자금융감독규정상 외부 위탁·클라우드 이용 통제(조문 확인 필요)

### 출처 및 교차확인
- 출처 1: [T3] The Record / ConnectWise suspends Cloud Backup service after supply chain attack / 2026-10 / https://therecord.media/connectwise-suspends-cloud-backup-service-supply-chain-attack
- 출처 2: [T3] BleepingComputer / Hackers breach Microsoft 365 tenants via ConnectWise supply chain attack / 2026-10 / https://www.bleepingcomputer.com/news/security/hackers-breach-microsoft-365-tenants-via-connectwise-supply-chain-attack/
- 출처 3: [T3] Help Net Security / ConnectWise suspends Cloud Backup service after attackers abuse its Microsoft 365 access / 2026-10 / https://www.helpnetsecurity.com/?p=388341
- 교차확인: ✅ 확인 (3개 소스 / 최고 신뢰도: T3, Microsoft Threat Intelligence가 공급망 공격으로 추적 중이라는 내용이 보도됨)

### 💳 금융권 시사점
- **[리스크]** 앱 단위 자격증명은 사용자 MFA를 거치지 않아 위임 권한 관리가 핵심 통제 항목이 되며, 위탁·제휴 클라우드 서비스 관리 소홀은 감독 지적 사항이 될 수 있다(조문 확인 필요).
- **[영향]** 당사 또는 제휴사·위탁사가 ConnectWise Cloud Backup(SkyKick)을 M365에 연동한 경우, 해당 앱에 부여된 디렉터리 쓰기 권한이 악용되어 계정·메일·문서에 접근될 수 있다. 확인된 사실은 앱 자격증명 탈취와 173개 테넌트 무단 로그인이다.
- **[조치]** ① Entra ID(구 Azure AD) 엔터프라이즈 앱에서 ConnectWise/SkyKick 앱 존재 여부 및 위임 권한 확인, 불필요 시 동의 철회 — 클라우드보안팀. ② 위탁·제휴 MSP에 해당 서비스 이용 여부 서면 확인 — 정보보호부 위탁관리 담당.

---

## 🟠 HIGH [APT·해킹] 한국 은행 대상 AI 에이전트 활용 침입 — CrowdStrike 평가

### 사건 개요
- 누가: CrowdStrike는 중국 기반의 중국어 사용 개인 행위자가 금전 목적으로 수행했을 가능성이 높다고 평가했으며(중간 신뢰도), 특정 그룹으로 귀속하지 않았다.
- 언제: 2026-10-08 보도(Reuters), 후속 기사 2026-10-22.
- 어디서: 한국 은행(보도별 최소 7~9곳, 상이).
- 무엇을: 보도에 따르면 중국산 AI 에이전트와 Claude Code 등 AI 코딩 도구가 사용되었다. 일부 보도는 68,000명 개인정보 탈취를 전한다(WSJ 인용, 단일 계통).
- 어떻게: 조사 중(AI 활용 정찰·침투 자동화로 보도되나 세부 TTPs 미공개).
- 얼마나: 매체별 상이. 금융위 집계 16개사 사건과의 동일성은 확인되지 않았다.

### 메타데이터
**[필수]**
- 발생·공개일: 2026-10-08(보도)
- 공격 유형: 조사 중
- 피해 규모: 7~9개 은행 / 68,000명(보도별 상이, 미확인)

### 출처 및 교차확인
- 출처 1: [T4] Reuters(Internazionale 전재) / Suspect behind South Korea bank hacks may be 26-year-old in China, cybersecurity firm says / 2026-10-08 / https://www.internazionale.it/ultime-notizie-reuters/2026/10/08/suspect-behind-south-korea-bank-hacks-may-be-26-year-old-in-china-cybersecurity-firm-says
- 출처 2: [T4] Taipei Times / S Korean banks likely hacked by China-based actor: CrowdStrike / 2026-10-09 / https://www.taipeitimes.com/News/front/archives/2026/10/09/2003865655
- 교차확인: ⚠️ 미확인 (CrowdStrike 원문 미열람, 출처 2는 Reuters 전재로 독립 소스 불인정 — 단일 계통 T4 Reuters. 수집 기간 이전 공개 건으로 포함 사유는 SECTION 2 주 참조)

### 💳 금융권 시사점
- **[리스크]** 공격 주체·수법 귀속이 확정되지 않았으므로 사실관계 확정 전 대외 언급은 오보 리스크가 있다. 금융당국 조사에서 AI 활용 해킹 가능성이 함께 조사 중이다.
- **[영향]** AI 도구로 정찰·침투가 자동화되는 경우, 패치 지연 시간이 짧아져 노출 자산 스캐닝 이후 침해까지의 간격이 단축될 수 있다. 확인된 사실은 당국이 AI 활용 가능성을 조사 중이라는 점이다.
- **[조치]** ① 외부 노출 자산 변경 탐지 및 비정상 스캐닝·자동화 접근 패턴 탐지 룰 점검 — 보안관제팀. ② 사건 정보 사용 시 ⚠️ 미확인 표기 유지, 금융보안원 공유 정보로 갱신 — 침해사고대응팀.

---

## 🟠 HIGH [취약점 악용] Ivanti Connect Secure — 헤더 조작 인증 우회 및 RCE (CVE-2026-104935)

### 사건 개요
- 누가: Volexity는 UTA0576으로 명명한 미확인 행위자를 보고했다(귀속 미확정).
- 언제: 2026-10-01~03 악용 시작 보고, 2026-10-13 CISA KEV 등재(기한 2026-10-16).
- 어디서: Ivanti Connect Secure(VPN) 어플라이언스.
- 무엇을: 특정 헤더(X-DSCGI-PATH)를 포함한 단일 요청으로 인증을 우회하고 임의 명령을 실행할 수 있다. 완전 패치된 장비에서 3개 취약점 연쇄로 루트 코드 실행이 보고되었다.
- 어떻게: T1190 Exploit Public-Facing Application.
- 얼마나: 벤더는 공개 시점에 제한된 고객이 영향받았다고 밝혔다.

### 메타데이터
**[필수]**
- 발생·공개일: 2026-10-13 (수집 기간 이전, 기한이 기간 내 도래)
- 공격 유형: T1190 Exploit Public-Facing Application
- 피해 규모: 제한적(벤더 표현), 수치 미공개

**[조건부]**
- CVE: CVE-2026-104935 (CVSS 8.6 / High)
- 영향 버전: 22.7 이하는 영향 없음으로 안내. 수정 버전 22.8R2.5, 25.1.3.0, 25.1.3.1, 25.1.1.2(출처 간 적용 범위 상이, 벤더 권고 확인 필요)
- CISA KEV 등재 여부: 예
- 패치 기한: 2026-10-16(연방기관)
- 관련 규제: 전자금융감독규정상 취약점 조치 의무(조문 확인 필요)

### 출처 및 교차확인
- 출처 1: [T1] CISA / CISA Urges Patching Newly Exploited Vulnerability in Ivanti Connect Secure / 2026-10-13 / https://www.cisa.gov/news-events/alerts/2026/10/13/cisa-urges-patching-newly-exploited-vulnerability-ivanti-connect-secure
- 출처 2: [T2] Rapid7 / Ivanti Connect Secure zero-day exploited in the wild (CVE-2026-104935) / 2026-10 / https://www.rapid7.com/blog/post/etr-ivanti-connect-secure-zero-day-exploited-in-the-wild-cve-2026-104935/
- 출처 3: [T3] BleepingComputer / Ivanti warns of Connect Secure zero-day exploited in attacks / 2026-10 / https://bleepingcomputer.com/news/security/ivanti-warns-of-connect-secure-zero-day-exploited-in-attacks
- 교차확인: ✅ 확인 (3개 소스 / 최고 신뢰도: T1)

### 💳 금융권 시사점
- **[리스크]** 원격접속 VPN은 재택·위탁 인력 접속 경로로 침해 시 내부망 진입점이 되며, 벤더 무결성 검사 도구가 침해를 탐지하지 못할 수 있다는 보도가 있다.
- **[영향]** 당사 또는 위탁사가 Ivanti Connect Secure를 운영하며 해당 버전을 사용하는 경우, 비인증 공격자가 장비 루트 권한을 얻어 접속자 세션·자격증명을 수집할 수 있다.
- **[조치]** ① 보유 여부·버전 확인, 수정 버전 적용 및 메모리·네트워크 포렌식 기반 침해 점검 — 네트워크보안팀. ② VPN 접속 계정 비밀번호 재설정 및 MFA 강제 — 인증시스템 운영팀.

---

## 🟠 HIGH [정책·제도] 금융권 긴급점검·전수점검 및 2차 피해 특별대응기간

### 사건 개요
- 누가: 금융위원회, 금융감독원, 금융보안원.
- 언제: 2026-10-02 1차 긴급 상황대응 회의, 2026-10-06 소비자경보(주의) 발령 및 특별대응기간 시작(약 1개월), 2026-10-14 2차 회의에서 전수점검 방침 발표.
- 어디서: 전 금융업권 555개사 긴급 12개 항목 점검(2026-10-08 기준).
- 무엇을: 130개사가 미흡 판정을 받았고, 보안관리 전반(공격표면 관리·인증체계·내부통제)에 대한 전수점검이 추진된다. 세부 범위·일정은 미확정이다.
- 어떻게: 제도 추진(감독 강화). 금융감독원 업무설명회 자료에는 CISO 권한 강화, 정보보호 공시 도입, 사고 시 매출액 기준 과징금(최대 3%) 등 제도 개선 계획이 포함되었다(추진 단계, 최종 시행 여부 확인 필요).
- 얼마나: 555개사 중 130개사 미흡. 특별대응기간은 2026-10-06부터 약 1개월.

### 메타데이터
**[필수]**
- 발생·공개일: 2026-10-06 / 2026-10-14
- 공격 유형: 해당 없음(정책·제도)
- 피해 규모: 해당 없음

**[조건부]**
- 관련 규제: 전자금융거래법 개정 추진(CISO 권한 강화 — 조문 확인 필요), 개인정보 보호법, 신용정보법

### 출처 및 교차확인
- 출처 1: [T1] 금융위원회 / 보도자료 목록 및 금융정책 게시물(소비자경보·특별대응기간) / 2026-10-06 / https://www.fsc.go.kr/no010101
- 출처 2: [T4] 비즈워치 / 16개 금융회사 10만건 정보 유출…금융위, 보안관리 전수점검 / 2026-10-14 / https://news.bizwatch.co.kr/article/finance/2026/10/14/0028
- 교차확인: ✅ 확인 (2개 소스 / 최고 신뢰도: T1)

### 💳 금융권 시사점
- **[리스크]** 전수점검 결과에 따라 당사 검사·제재 및 개선요구가 발생할 수 있다. 점검 미흡 사유로 확인된 항목(패치, EOS, 24시간 관제, 외부접속 MFA)은 당사 자체 점검 항목과 직결된다.
- **[영향]** 전수점검 대상에 당사가 포함되는 경우, 12개 항목 중 미흡 항목이 있으면 개선계획 제출 및 현장점검이 수반될 수 있다.
- **[조치]** ① 12개 항목 자체점검 결과 재검증 및 증적 정비 — 정보보호부 관리체계팀. ② 특별대응기간 종료 전 FDS 탐지 사례·고객 문의 현황 집계 보고 — FDS 운영팀·민원관리팀.

---

# SECTION 5 — 즉시 조치 권고

| 우선순위 | 조치 항목 | 담당 부서/시스템 | 완료 기한 | 근거 사건 |
|---|---|---|---|---|
| 🔴 1순위 | BeyondTrust Remote Support 보유·버전 확인, BT26-05 패치 적용 및 침해 흔적 점검 | IT인프라팀, 보안관제팀 | **즉시** | BeyondTrust CVE-2026-102764 |
| 🔴 1순위 | Cisco SEG(AMP File Reputation) 확인 및 Content Scanner Tools 25.3.0.5525 이상 적용 | 메일시스템 운영팀 | **즉시** | Cisco SEG CVE-2026-76519 |
| 🔴 1순위 | 금융당국 공유 공격 IP 차단 확인 및 로그 소급 점검 | 보안관제팀 | **즉시** | 금융 16개사 침해 |
| 🟠 2순위 | Ivanti Connect Secure·PAN-OS 관리 인터페이스 노출 차단 및 패치, VPN 계정 MFA 강제 | 네트워크보안팀, 인증시스템 | **금주 내** | Ivanti, PAN-OS |
| 🟠 2순위 | M365 엔터프라이즈 앱 위임 권한 점검(ConnectWise/SkyKick 포함) 및 위탁·제휴사 이용 여부 확인 | 클라우드보안팀, 위탁관리 담당 | **금주 내** | ConnectWise 공급망 |
| 🟠 2순위 | 전수점검 대비 12개 항목 증적 정비, EOS 자산 목록 확정 | 관리체계팀 | **금주 내** | 금융권 전수점검 |
| 🟡 3순위 | 신용정보업감독규정 과징금 개정안 영향 검토 및 AhsayCBS 등 백업 서버 노출 점검 | 준법지원·정보보호부 | **이달 내** | 감독규정 예고, AhsayCBS |

---

# SECTION 6 — 사고 개별 분석 리포트

# [보고] 금융권 연쇄 침해 및 개인정보 유출 사고 분석 및 대응 리포트

### 1. 사고 개요 및 규모
- 발견 시점: 2026-10-01 (신한은행 자체 공지), 이후 타 금융사 확산 확인
- 유출·피해 규모: 약 10만 건, 16개 금융회사 (당국은 추가 증가 가능성 언급)
- 피해 항목: 성명, 연락처, 주민등록번호, 이메일. 계좌번호·카드번호는 미확인

### 2. 사고 원인 및 경위
- 공격 유형: 조사 중 (일부 보도: 사전 스캐닝 정황 T1595)
- 발견 배경: 신한은행 공지 후 금융당국이 공격 IP·수법을 약 500곳에 공유하고 12개 항목 긴급 점검 실시
- 발생 추정 시점: 조사 중 (경찰 정식 수사 전환 2026-10-06)
- 관리적 원인(점검 결과): 최신 패치 미적용, EOS 시스템 관리 미흡, 24시간 관제 미구축, 외부접속 시스템 MFA 누락(555개사 중 130개사 미흡)

### 3. 현재 대응 상황
- 즉시 대응: 금융위 긴급 상황대응 회의(2026-10-02, 2026-10-14), 과기정통부·KISA 24시간 비상대응체계 및 약 2만 8천 개 기업 점검 권고
- 보안 강화: 공격 IP 공유·차단, 전수점검 추진, 2차 피해 특별대응기간(2026-10-06~약 1개월) 운영
- 유관기관 신고: 경찰 정식 수사(전담팀 43명), '중대범죄' 판단 및 중수청 통보 방침(2026-10-20경). 전자금융기반시설 해당 여부는 금융위 유권해석 의뢰 중

### 4. 경영진 제언

**비즈니스 리스크**
- 법적·규제: 개인정보 보호법·신용정보법·전자금융거래법상 안전조치 의무 점검 및 제재 강화 흐름(조문·제재 수준은 조문 확인 필요).
- 평판·고객: 그룹사 포함 피해로 고객 불안·민원 증가, 당사 명의 사칭 사기 확산 시 브랜드 훼손 가능.
- 재무·운영: 긴급 점검·증적 정비 소요, 2차 피해 보상·민원 대응 비용, 감독 개선요구 이행 비용.

**대응 전략**
- 즉시 (24시간 이내): 공유 IP 차단·소급 로그 점검(보안관제), 외부접속 시스템 MFA 누락 자산 식별(IT인프라팀).
- 단기 (1~2주 이내): 12개 항목 자체점검 증적 정비 및 EOS 자산 개선계획 수립(정보보호부 관리체계팀), FDS 룰 강화(FDS 운영팀).
- 중장기 (1분기 이내): 24시간 관제 체계 상시화, 외부 노출 자산 지속 점검(공격표면 관리) 체계 구축, 필요 예산·인력 산정 및 CISO 권한 강화 제도 변화 대응(예산·인력 필요).

### 5. 관련 출처 (최대 5개)
- [T4] 비즈워치 / 16개 금융회사 10만건 정보 유출…금융위, 보안관리 전수점검 / 2026-10-14 / https://news.bizwatch.co.kr/article/finance/2026/10/14/0028
- [T4] 뉴데일리 경제 / 금융권 해킹 16개사·정보유출 10만건 … 555곳 점검했더니 130곳 보안 허술 / 2026-10-14 / https://biz.newdaily.co.kr/site/data/html/2026/10/14/2026101400320.html
- [T4] VOA 코리아 / 한국 경찰, 금융권 연쇄 해킹 '중대범죄' 판단…중수청 통보 / 2026-10-20 / https://www.voakorea.com/a/south-korea---financial-hacking-102026/8213222.html
- [T4] YTN / 금융위원장, 긴급회의에서 공조체계 중요성 강조 / 2026-10-04 / https://www.ytn.co.kr/_ln/0103_202610041958349108
- [T1] 금융위원회 / 보도자료 목록 / 2026-10 / https://www.fsc.go.kr/no010101

---

# [보고] BeyondTrust Remote Support 인증 우회 취약점 분석 및 대응 리포트

### 1. 사고 개요 및 규모
- 발견 시점: 벤더 권고 2026-10-15, CISA KEV 2026-10-16 (벤더 확인)
- 유출·피해 규모: 조사 중 (피해 수치 미공개)
- 피해 항목: 미공개

### 2. 사고 원인 및 경위
- 공격 유형: T1190 Exploit Public-Facing Application. 내부 메시징 구성요소 출처 검증 미흡(CWE-290)
- 발견 배경: 벤더가 공개 전 악용을 확인. 일부 보도는 2026년 8월 말부터 악용이 있었다고 전함
- 발생 추정 시점: 2026년 8월 말(BleepingComputer 보도, 벤더 공식 확인 아님)

### 3. 현재 대응 상황
- 즉시 대응: SaaS 고객 대상 벤더 패치 적용(2026-10-08 또는 10-09, 출처 간 상이), 자체 호스팅은 수동 패치 필요
- 보안 강화: Rapid7은 긴급 패치와 침해 여부 조사를 권고
- 유관기관 신고: CISA KEV 등재, 캐나다 사이버센터 경보 발령

### 4. 경영진 제언

**비즈니스 리스크**
- 법적·규제: 취약점 조치 의무 위반 시 감독 지적(조문 확인 필요).
- 평판·고객: 원격지원 경로 침해 시 고객 정보 접근으로 이어질 경우 사고 공지 의무 발생 가능.
- 재무·운영: 긴급 패치에 따른 작업 중단, 자격증명 교체 비용, 위탁 유지보수사 서비스 영향.

**대응 전략**
- 즉시 (24시간 이내): 보유 여부·버전 확인, 패치 적용 또는 외부 노출 차단(IT인프라팀).
- 단기 (1~2주 이내): 원격지원 세션 로그·저장 자격증명 점검 및 교체, 위탁사 사용 여부 확인(보안관제팀, 위탁관리 담당).
- 중장기 (1분기 이내): 원격지원·특권 접근 도구의 인터넷 직접 노출 제거 및 Zero Trust(제로트러스트) 접근 통제 도입(예산·인력 필요).

### 5. 관련 출처 (최대 5개)
- [T1] CISA / CISA Urges Patching Critical Vulnerability in BeyondTrust Remote Support / 2026-10-16 / https://www.cisa.gov/news-events/alerts/2026/10/16/cisa-urges-patching-critical-vulnerability-beyondtrust-remote-support
- [T2] Rapid7 / CVE-2026-102764 ... Exploited in the Wild / 2026-10 / https://www.rapid7.com/blog/post/etr-cve-2026-102764-critical-beyondtrust-remote-support-authentication-bypass-exploited-in-the-wild
- [T1] 캐나다 사이버보안센터 / AL26-025 / 2026-10 / https://cyber.gc.ca/en/alerts-advisories/al26-025-critical-vulnerability-impacting-beyondtrust-remote-support-cve-2026-102764
- [T3] BleepingComputer / BeyondTrust patches zero-day exploited in attacks since August / 2026-10 / https://bleepingcomputer.com/news/security/beyondtrust-patches-zero-day-exploited-in-attacks-since-august
- [T2] BeyondTrust / Security Advisory BT26-05 / 2026-10-15 / https://www.beyondtrust.com/trust-center/security-advisories/bt26-05

---

# [보고] ConnectWise Cloud Backup 공급망 침해 분석 및 대응 리포트

### 1. 사고 개요 및 규모
- 발견 시점: 2026-10-16 (Huntress 사고대응팀)
- 유출·피해 규모: 최소 173개 테넌트 무단 로그인 (초기 162개, 이후 상향)
- 피해 항목: 데이터 유출 미확인 (ConnectWise·Huntress 모두 확인 못함)

### 2. 사고 원인 및 경위
- 공격 유형: 앱 자격증명 탈취 및 위임 권한 악용 (T1199, T1078.004)
- 발견 배경: Huntress가 비정상 로그인을 탐지해 공개. Microsoft Threat Intelligence가 공급망 공격으로 추적 중이라고 보도됨
- 발생 추정 시점: 조사 중 (2026-10-16 이전, 일부 보도는 동일 IP가 10-13~14 다른 대상에 비밀번호 추측 시도)

### 3. 현재 대응 상황
- 즉시 대응: 자격증명 폐기, 관련 앱 ID 비활성화, Cloud Backup 및 6개 연계 서비스 일시 중단. 복구 시점 미정
- 보안 강화: 고객에게 위임 권한 검토 권고
- 유관기관 신고: 조사 중 (공개 확인 내용 없음)

### 4. 경영진 제언

**비즈니스 리스크**
- 법적·규제: 외부 위탁·클라우드 서비스 관리 책임(전자금융감독규정, 조문 확인 필요).
- 평판·고객: 제휴·위탁사 경유 정보 노출 시 당사 책임 논란 가능.
- 재무·운영: 백업 서비스 중단으로 복구 불가 기간 발생, 대체 백업 확보 비용.

**대응 전략**
- 즉시 (24시간 이내): 엔터프라이즈 앱 목록에서 ConnectWise/SkyKick 앱 점검 및 권한 철회(클라우드보안팀).
- 단기 (1~2주 이내): 위탁·제휴사 서드파티 연동 현황 조사 및 비정상 로그인 소급 분석(위탁관리 담당, 보안관제팀).
- 중장기 (1분기 이내): 서드파티 앱 동의(consent) 거버넌스와 최소권한 정책 수립, 앱 자격증명 이상행위 탐지 도입(예산·인력 필요).

### 5. 관련 출처 (최대 5개)
- [T3] The Record / ConnectWise suspends Cloud Backup service after supply chain attack / 2026-10 / https://therecord.media/connectwise-suspends-cloud-backup-service-supply-chain-attack
- [T3] BleepingComputer / Hackers breach Microsoft 365 tenants via ConnectWise supply chain attack / 2026-10 / https://www.bleepingcomputer.com/news/security/hackers-breach-microsoft-365-tenants-via-connectwise-supply-chain-attack/
- [T3] Help Net Security / ConnectWise suspends Cloud Backup service ... / 2026-10 / https://www.helpnetsecurity.com/?p=388341
- [T3] Infosecurity Magazine / ConnectWise Shuts Off Cloud Services After 'Unauthorized Access' to Microsoft 365 Tenants / 2026-10 / https://www.infosecurity-magazine.com/news/connectwise-shuts-off-cloud/

---

# 자체검증 결과

① 논리적 비약 여부: 있음 → KEV 등재 건의 CRITICAL/HIGH 구분은 심각도 기준 간 충돌이 있어 'CVSS 7.0~8.9 AND KEV는 HIGH 우선, CVSS 9.0 이상은 CRITICAL'로 해석했다(SECTION 2 주 참조).
② 추측성 표현 여부: 없음(사건 개요·메타데이터·출처). 단, '금융위 16개사 사건과 CrowdStrike 평가 건의 동일성'은 확인되지 않음으로 명시했다. 시나리오 표현은 금융권 시사점에 한정하고 '~한 경우' 조건절을 사용했다.
③ 실무 적용 가능성: 적합. 다만 CISA·금융위 원문(Tier 1)을 접속 제한으로 직접 열람하지 못해 검색 결과 요약과 보도 기반으로 작성했으므로, 조치 기한·영향 버전은 벤더 권고문으로 재확인이 필요하다. 법령 조문은 모두 '조문 확인 필요'로 표기했다.
④ 출처 검증 상태: ✅ 확인 11건 / ⚠️ 미확인 3건 (#5 AI 에이전트 은행 침입, #10 ARTEX M365 2,250곳 주장, #14 Capital Bank)
⑤ 날짜·기간 기준 검증: 예외 있음. KST 수집 기간 2026-10-16~10-22 내 확인 항목은 #1(수사 동향 10-20), #2, #4, #10, #11, #13, #14이다. 나머지 #3, #5, #6, #7, #8, #9, #12는 최초 공개일이 기간 이전(2026-10-01~10-14)이나 CISA 조치기한이 기간 내 도래하거나 패치·점검·특별대응기간이 기간 내 진행 중이어서 포함했다. Tier 1 중 KISA·금융보안원·NIST·ENISA, Tier 2 AhnLab ASEC·S2W 등의 기간 내 자료는 "해당 기간 특이사항 확인되지 않음"(검색 한계 포함). 금융감독원 2026-10-21 신용정보법 과징금 보도자료는 검색에서 확인되지 않아 반영하지 않았다.

---

침해사고대응팀 · 생성형 AI 자동 수집·분석 · 2026-10-22
출처: Tier 1 — CISA, 금융위원회, 캐나다 사이버보안센터 / Tier 2 — Rapid7, BeyondTrust, Volexity(보도 인용) / Tier 3 — BleepingComputer, The Record, Help Net Security, Infosecurity Magazine, The Hacker News / Tier 4 — 비즈워치, 뉴데일리, VOA 코리아, YTN, SBS Biz, Reuters(전재), Taipei Times
