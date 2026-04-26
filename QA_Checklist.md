# Portfolio QA Checklist - Nikita Sonkin

מדריך בדיקה מלא לפני העלאה לאוויר. עבור עליו לפי הסדר.

---

## שלב 0 - אימות מבנה תיקייה (2 דקות)

לפני כל בדיקה, ודא שהכל במקום:

```powershell
cd C:\Users\Nikita\pythonProject\nikita-portfolio
Get-ChildItem -Recurse -File | Select-Object FullName | Format-Table -AutoSize
```

**רשימת קבצים מינימלית שחייבת להיות:**

- [ ] `index.html`
- [ ] `README.md`
- [ ] `assets\css\main.css`
- [ ] `assets\js\main.js`
- [ ] `assets\files\Nikita_Sonkin_Resume_EN.pdf`
- [ ] `assets\files\Nikita_Sonkin_Resume_HE.pdf`
- [ ] `images\user.png`

**ניקיון אופציונלי:**

```powershell
# מחיקת קבצי placeholder
Remove-Item assets\files\PLACE_CV_HERE.txt -ErrorAction SilentlyContinue
Remove-Item images\PLACE_PHOTO_HERE.txt -ErrorAction SilentlyContinue
```

---

## שלב 1 - הרצה לוקלית (3 דקות)

### שיטה מומלצת - שרת Python

```powershell
cd C:\Users\Nikita\pythonProject\nikita-portfolio
python -m http.server 8000
```

פתח: **http://localhost:8000**

### למה לא דאבל-קליק על index.html?

- כפתורי `[ copy ]` לא עובדים מ-`file:///` בחלק מהדפדפנים
- הסביבה לא דומה ל-production (GitHub Pages)
- בעיות CORS אם תוסיף בעתיד fetch/AJAX

### לעצור את השרת

`Ctrl+C` בטרמינל.

---

## שלב 2 - בדיקה פונקציונלית (10 דקות)

פתח Chrome, גלוש ל-http://localhost:8000, ועבור על כל הסעיפים.

### 2.1 Hero (החלק הראשון)

- [ ] השם **"Nikita Sonkin"** מוצג גדול בעמבר
- [ ] שלושת הבלוקים `whoami` / `cat ./about.md` / `ls ./` מופיעים
- [ ] הפרומפט `guest@nikita-sonkin:~$` בעמבר עמום (לא בולט)
- [ ] לחיצה על **`projects/`** → גוללת לסקציית פרויקטים
- [ ] לחיצה על **`experience/`** → גוללת לסקציית ניסיון
- [ ] לחיצה על **`skills/`** → גוללת לסקציית כישורים
- [ ] לחיצה על **`contact.txt`** → גוללת לסקציית קשר
- [ ] לחיצה על **`resume_en.pdf`** → מוריד את ה-CV האנגלי
- [ ] לחיצה על **`resume_he.pdf`** → מוריד את ה-CV העברי
- [ ] **`[ View projects ]`** → גולל לפרויקטים
- [ ] **`[ CV (EN) ]`** → מוריד CV אנגלי
- [ ] **`[ CV (HE) ]`** → מוריד CV עברי
- [ ] **`[ Contact ]`** → גולל לקשר
- [ ] ה-cursor (▮) מהבהב בקצב של פעם בשנייה

❌ **אם CV לא מוריד:** ודא שהשמות בדיוק כך - `Nikita_Sonkin_Resume_EN.pdf` (אותיות גדולות בדיוק).

### 2.2 ניווט עליון

- [ ] הניווט מקובע למעלה גם בגלילה
- [ ] רקע מטושטש (blur) מאחורי הניווט
- [ ] גלילה לכל סקציה → הקישור הפעיל בעמבר בהיר, השאר בעמבר עמום
- [ ] לחיצה על קישור בניווט → גלילה חלקה (לא קפיצה חדה)

### 2.3 About

- [ ] 4 פסקאות טקסט מופיעות
- [ ] **התמונה שלך** מופיעה במסגרת מימין (דסקטופ)
- [ ] הכיתוב `user.jpg` מתחת לתמונה
- [ ] הטקסט המודגש "Data Science · Data Engineering · BI Analytics · AI Solutions Development" בעמבר חזק

❌ **אם התמונה לא מופיעה:** F12 → Network → רענן → חפש 404 על `user.png`. בדוק שהשם בדיוק `user.png` (אותיות קטנות).

### 2.4 Projects (6 פרויקטים)

עבור על כל פרויקט:

| פרויקט | סטטוס צפוי | לינקים לבדוק |
|---|---|---|
| Nano Solar Shine | `[ LIVE · PRODUCTION ]` (טורקיז) | visit_site, admin_backend |
| Investor | `[ IN ACTIVE DEVELOPMENT ]` (כתום-אדום) | אין לינקים |
| Cybersecurity Pipeline @ DT | `[ PRODUCTION ]` (טורקיז) | 3 לינקים ל-GitHub |
| WWL Sales Analytics | `[ COMPLETE ]` (עמבר עמום) | github |
| AdventureWorks | `[ COMPLETE ]` (עמבר עמום) | github |
| Happiness & Health | `[ COMPLETE ]` (עמבר עמום) | github |

לכל פרויקט בדוק:
- [ ] כל הלינקים נפתחים בטאב חדש (לא מחליפים את הדף הנוכחי)
- [ ] hover על הכרטיס → גבול נהיה חזק יותר
- [ ] חצים `→` לפני כל highlight bullet
- [ ] קו מקווקו עדין מפריד בין highlights ל-tech stack

### 2.5 Experience

- [ ] 5 כניסות מ-2017 ועד 2025
- [ ] בכל שורה: **תאריך** (עמום) → **חברה** (עמבר חזק) → **·** → **תפקיד** (עמבר רגיל)
- [ ] תיאור 1-2 שורות מתחת לכל אחד (חוץ מצה"ל)
- [ ] Nano Solar בראש הרשימה (החדש ביותר)

### 2.6 Skills

- [ ] JSON עם syntax highlighting
- [ ] מפתחות (`"data_and_analytics"`) בעמבר בהיר (כתום-זהב)
- [ ] ערכים (`"PostgreSQL"`) בעמבר חזק
- [ ] 6 קטגוריות: data_and_analytics, programming, ai_and_llm, devops_and_tools, education, languages

### 2.7 Contact - הכי חשוב לבדוק טוב

- [ ] שורת **email** עם 2 כפתורים: `[ open mail ]` ו-`[ copy ]`
- [ ] לחיצה על **`[ open mail ]`** → פותח Outlook/Gmail עם נמען מוכן
- [ ] לחיצה על **`[ copy ]`** ליד email:
  - הטקסט הופך מיידית ל-`[ copied! ]`
  - אחרי 1.5 שניות חוזר ל-`[ copy ]`
  - **בדוק:** הדבק (Ctrl+V) ב-Notepad → צריך להופיע `nikita.sonkin@gmail.com`
- [ ] לחיצה על **`[ open ]`** ליד LinkedIn → פותח את הפרופיל בטאב חדש
- [ ] לחיצה על **`[ open ]`** ליד GitHub → פותח את הפרופיל בטאב חדש
- [ ] לחיצה על **`[ copy ]`** ליד phone → מעתיק `0536256978` (ללא מקפים)
- [ ] שני כפתורים גדולים בתחתית: **`[ ↓ resume_en.pdf ]`** ו-**`[ ↓ resume_he.pdf ]`**
- [ ] שניהם מורידים PDF תקין

### 2.8 Footer

- [ ] `$ uptime`
- [ ] שורה עם תאריך עדכון אחרון בפורמט `2026.04.27` (יתעדכן אוטומטית)

---

## שלב 3 - בדיקה ויזואלית (10 דקות)

### 3.1 טיפוגרפיה - בדיקת JetBrains Mono

```
1. F12 → Elements
2. בחר אלמנט טקסט כלשהו
3. בצד ימין → Computed → חפש "font-family"
4. צריך להופיע: "JetBrains Mono", "Fira Code", "IBM Plex Mono", "Courier New", monospace
```

- [ ] JetBrains Mono נטען (אם רואים פונט שדומה ל-Courier - הפונט נכשל לטעון, בדוק חיבור אינטרנט)
- [ ] השם בהירו גדול (~32-36px בדסקטופ)
- [ ] כל סקציה מתחילה ב-`$ heading_name` בעמבר חזק

### 3.2 פלטת צבעים

הסתכל ובדוק:
- [ ] **רקע: שחור-חמים** (#1a1410) - אם זה שחור צרוף, יש בעיה ב-CSS
- [ ] **טקסט ראשי: עמבר** #FFB000 - בולט אבל לא צורם
- [ ] **טקסט עמום: חום-עמבר** #8a5a00 - לפרטים משניים
- [ ] **רק 3 צבעים סטטוס:** טורקיז (LIVE), כתום-אדום (WIP), עמבר עמום (COMPLETE)
- [ ] **אין צבעים אחרים** - אם רואים כחול/ירוק/סגול, יש בעיה
- [ ] **קונטרסט:** קריא בלי מאמץ. אם מתעייף → בעיית קונטרסט

### 3.3 אפקטי CRT

הסתכל קרוב למסך:
- [ ] **קווי סריקה (scanlines)** - פסים אופקיים שחורים עדינים בכל הדף
- [ ] **vignette** - פינות המסך מעט כהות יותר מהמרכז
- [ ] **selection בעמבר** - סמן טקסט עם העכבר → רקע עמבר, טקסט שחור
- [ ] **cursor (▮) מהבהב** - בקצב יציב

### 3.4 ריווח (Spacing)

- [ ] 80px ריווח בין סקציות (פדינג עליון/תחתון של `.section`)
- [ ] קו מקווקו דק מפריד בין סקציות
- [ ] 18-20px ריווח בין כרטיסי פרויקטים
- [ ] שום אלמנט לא "נדבק" לאחר - יש נשימה אסתטית

### 3.5 כרטיסי פרויקטים

- [ ] רקע מעט בהיר יותר מהדף (#221a14)
- [ ] גבול דק (1px) סביב כל כרטיס
- [ ] **hover על כרטיס** → הגבול נהיה חזק יותר (#553400)
- [ ] שם הפרויקט מימין, סטטוס מימין-קצה
- [ ] כל highlight מתחיל ב-`→`
- [ ] קו מקווקו לפני שורת ה-Tech

### 3.6 מבחן עיניים

צא לחדר אחר, חזור והסתכל על האתר 5 שניות:
- [ ] **המבט הראשון** - האם זה נראה מקצועי?
- [ ] **התרשמות כללית** - retro? developer? לא generic?
- [ ] **שום דבר לא צורם** (צבע, פונט, ריווח)

---

## שלב 4 - בדיקה רספונסיבית (10 דקות)

### איך נכנסים למצב מובייל

```
F12 → Toggle device toolbar (אייקון מובייל ליד "Elements")
או: Ctrl+Shift+M
```

### גדלי מסך לבדוק

| מכשיר | גודל | סוג |
|---|---|---|
| iPhone 12 Pro | 390×844 | מובייל נפוץ |
| iPhone SE | 375×667 | מובייל קטן |
| iPad Mini | 768×1024 | tablet |
| Galaxy S20 Ultra | 412×915 | אנדרואיד |

### מה לבדוק במובייל (כל מכשיר)

- [ ] **הירו לא נחתך** - השם נכנס במלואו
- [ ] **כל 4 כפתורי CTA** נראים (ייפלו לשורות מרובות - תקין)
- [ ] **התמונה בסקציית About** עוברת מימין לעליון
- [ ] **כרטיסי פרויקטים** במלוא רוחב המסך
- [ ] **JSON ב-Skills** עושה scroll אופקי בתוך הקופסה (לא חותך)
- [ ] **שורות Contact** מתפצלות לעמודה (label למעלה, value למטה)
- [ ] **הטקסט קריא בלי zoom**
- [ ] **אין horizontal scroll** של הדף כולו
  - בדיקה: בשמאל למטה של DevTools רואים את גודל המסך - אמור להופיע "390×844", לא "410×844"

### מובייל אמיתי - חובה

מצא את ה-IP המקומי שלך:
```powershell
ipconfig | Select-String "IPv4"
# מקבלים משהו כמו: 192.168.1.42
```

בטלפון (באותה רשת WiFi):
```
http://192.168.1.42:8000
```

- [ ] טוען בדפדפן בטלפון
- [ ] ה-CV מוריד ונפתח באפליקציה הנכונה (Adobe/Google Drive/דפדפן)
- [ ] לחיצה על email פותחת אפליקציית מייל

---

## שלב 5 - בדיקת דפדפנים (5 דקות)

| דפדפן | חובה? | מה ייחודי |
|---|---|---|
| Chrome | ✅ חובה | רוב המגייסים |
| Edge | ✅ חובה | בארגונים גדולים |
| Firefox | ⚠️ מומלץ | חלק מ-backdrop-filter פחות תומך |
| Safari iOS | ⚠️ מומלץ אם יש iPhone | חלק מ-flex/grid מתנהג שונה |

עבור על שלב 2 (פונקציונלי) בכל דפדפן.

---

## שלב 6 - תוכן ומקצועיות (15 דקות) ← הכי קריטי

### 6.1 איות ודקדוק (אנגלית)

העתק את כל הטקסט האנגלי לכלי בדיקה:
- **Grammarly** (https://app.grammarly.com) - חינם
- **או:** הדבק ל-ChatGPT וכתוב "Check this for grammar and style issues"

טקסטים לבדוק:
- [ ] About section (4 פסקאות)
- [ ] תיאור Nano Solar Shine
- [ ] תיאור Investor
- [ ] תיאור Cybersecurity Pipeline
- [ ] תיאור WWL, AdventureWorks, Happiness
- [ ] Experience descriptions

### 6.2 דיוק עובדתי - הכי חשוב

עבור על המספרים אחד-אחד. **שאל את עצמך: "האם אוכל להגן על זה בראיון?"**

- [ ] **"23+ agents"** ב-Nano Solar - נכון? בדוק את ה-`.claude/` שלך
- [ ] **"60% query response improvement"** - יש לך benchmark שמראה את זה?
  - אם לא - שנה ל-"significant" או הסר
- [ ] **"500+ articles/day"** ב-DT - הנתון מדויק?
- [ ] **"5,000+ users"** ב-Teva - אם זה היה project specific, אולי צריך לסייג
- [ ] **"24 agents"** ב-Investor - מדויק לעכשיו?
- [ ] **"18-gate signal pipeline"** - מדויק?
- [ ] **"20+ tracked KPIs"** ב-Nano Solar
- [ ] **"15+ Make workflows"** ב-Rewire
- [ ] **"~40% reduction"** ב-Rewire

❗ **חוק יסוד:** אם מספר לא מדויק → או תקן או הסר. מגייס ששואל "מה זה ה-60%?" ואתה מגמגם = פסילה.

### 6.3 דיוק תאריכים

- [ ] **2025-Present** - Nano Solar
- [ ] **2025 jan-aug** - DT (אם ההתמחות הייתה בתקופה אחרת, תקן)
- [ ] **2023-2024** - Rewire
- [ ] **2022-2023** - Teva
- [ ] **2017-2020** - צה"ל

### 6.4 לינקים פנימיים וחיצוניים

לחץ על כל לינק ובדוק:
- [ ] **nanosolarenergy.com** - האתר עולה?
- [ ] **Strapi admin link** - שיקול: להשאיר או להסיר?
  - **השאר אם:** הוא רק login screen, נחמד שמראה שיש backend
  - **הסר אם:** יש שם content רגיש או הוא לא תמיד online
- [ ] **GitHub - CyberNewsBot** - 200 OK
- [ ] **GitHub - CyberBot-Analyst-Project** - 200 OK
- [ ] **GitHub - CyberBotPowerBI** - 200 OK
- [ ] **GitHub - WWL-Sales-Analytics** - 200 OK
- [ ] **GitHub - AdventureWorks-Sales-Schema-** - 200 OK (שים לב למקף בסוף!)
- [ ] **GitHub - -Happiness-and-Health-Analysis** - 200 OK (שים לב למקף בהתחלה!)
- [ ] **LinkedIn /in/nikita-sonkin/** - הפרופיל פעיל וציבורי
- [ ] **GitHub /nikitasonkin** - הפרופיל פעיל

### 6.5 פרטים אישיים

- [ ] Email: `nikita.sonkin@gmail.com` ✓
- [ ] Phone: `053-625-6978` ✓
- [ ] Location: `Rishon LeZion, IL` ✓

### 6.6 מסמכי CV

- [ ] **CV אנגלי** - פתח את ה-PDF, ודא:
  - שזה הגרסה העדכנית ביותר
  - שאין בו טעויות
  - שהפורמט נראה טוב
- [ ] **CV עברי** - אם יש לך, ודא:
  - תרגום נאמן
  - אותם מספרים והישגים
  - פורמט מימין לשמאל נכון
  - הגיוני בעברית (לא Google Translate ישיר)
- [ ] **שני ה-CV מתואמים** - אם תוקן משהו ב-EN, תוקן גם ב-HE

❗ **אם אין לך CV עברי** - אני יכול לכתוב לך אותו עכשיו (ראה הערה בסוף).

---

## שלב 7 - ביצועים (5 דקות)

### 7.1 Console errors

```
F12 → Console → Ctrl+R (רענן)
```

- [ ] אין שורות אדומות (errors)
- [ ] אין warnings מ-CSS
- [ ] אין 404 ב-Network

### 7.2 Lighthouse audit

```
F12 → Lighthouse tab
→ Mode: Navigation
→ Device: Mobile  ← חשוב! זה מה ש-Google מודד
→ Categories: סמן הכל
→ Generate Report
```

**ציונים יעדים:**

| קטגוריה | יעד | מינימום |
|---|---|---|
| Performance | 95+ | 85 |
| Accessibility | 100 | 95 |
| Best Practices | 100 | 95 |
| SEO | 100 | 95 |

❌ **אם Performance נמוך:**
- בדוק גודל `user.png` - אם > 500KB, דחוס ב-https://tinypng.com
- בדוק אם JetBrains Mono נטען מהר - לפעמים Google Fonts איטי

❌ **אם Accessibility נמוך:**
- לחץ על האודיט → ראה הצעות ספציפיות
- בדרך כלל זה contrast או alt text חסר

### 7.3 משקל הדף

```
F12 → Network → סמן Disable cache → רענן
```

- [ ] **בשורה התחתונה:** "X requests, Y KB transferred"
- [ ] Y צריך להיות פחות מ-**500KB סה"כ** (כולל הפונט)
- [ ] **Finish time:** פחות מ-2 שניות במקומי

---

## שלב 8 - SEO ו-Metadata (5 דקות)

### 8.1 בדיקת מטא תגיות

```
View → Developer → View Source (או Ctrl+U)
```

חפש בתוך `<head>`:
- [ ] `<title>` עם השם והתפקיד
- [ ] `<meta name="description">` (120-160 תווים)
- [ ] `<meta property="og:title">`
- [ ] `<meta property="og:description">`
- [ ] `<meta property="og:url">`
- [ ] `<meta property="og:type">`
- [ ] `<script type="application/ld+json">` עם Schema.org Person

### 8.2 הוספת OG Image (משדרג מאוד)

זה משפיע על איך הלינק נראה ב-LinkedIn ובוואטסאפ.

**צעדים:**

1. הרץ את האתר ב-`http://localhost:8000`
2. צילום מסך של ה-Hero (Win+Shift+S)
3. ערוך לגודל **1200×630px** ב:
   - Photoshop
   - או חינמי: https://www.canva.com (Custom dimensions)
   - או: GIMP, Paint.NET
4. שמור כ-`og-image.png` בשורש התיקייה
5. ערוך `index.html` והוסף ב-`<head>`:
   ```html
   <meta property="og:image" content="https://nikitasonkin.github.io/Portfolio.io/og-image.png">
   <meta property="og:image:width" content="1200">
   <meta property="og:image:height" content="630">
   ```

### 8.3 בדיקה אחרי העלאה

- https://www.opengraph.xyz/url/https%3A%2F%2Fnikitasonkin.github.io%2FPortfolio.io%2F
- https://cards-dev.twitter.com/validator
- אמורות להראות: תמונה, כותרת, תיאור

---

## שלב 9 - נגישות (5 דקות)

### 9.1 ניווט מקלדת

- [ ] **Tab החל מתחילת הדף**
- [ ] **כל לינק וכפתור מקבל focus** (יש מסגרת סביבו)
- [ ] **Enter/Space מפעילים כפתורים**
- [ ] **Shift+Tab עובד אחורה**

### 9.2 קונטרסט

- [ ] עבור Lighthouse Accessibility audit (שלב 7.2) → ציון 100
- [ ] **או** ידני: https://webaim.org/resources/contrastchecker/
  - Foreground: `#FFB000`
  - Background: `#1a1410`
  - יחס: צריך להיות > 4.5:1 (אצלך זה ~8:1 - מצוין)

### 9.3 prefers-reduced-motion

- [ ] **Windows Settings → Accessibility → Visual effects → Animation effects → Off**
- [ ] רענן את האתר
- [ ] **cursor לא מהבהב, scroll מיידי**
- [ ] **גלילה לא חלקה אלא קופצת ישר**

(החזר את ההגדרה אחרי הבדיקה)

---

## שלב 10 - מבחן עיני מגייס (10 דקות) ← הכי חשוב

זה הבדיקה האמיתית.

### 10.1 מבחן 5 שניות

תן לחבר/בן משפחה לראות את האתר 5 שניות ואז סגור.

שאל:
- [ ] **"מה שמו של האדם?"** → צריך לזכור
- [ ] **"מה הוא עושה?"** → צריך לזכור משהו על data/AI
- [ ] **"מה הרושם הראשוני?"** → צריך להיות חיובי

### 10.2 מבחן רקרוטר (60 שניות)

תן לחבר 60 שניות חופשיים על האתר.

שאל:
- [ ] **"כמה פרויקטים יש?"** → צריך לראות שיש 6
- [ ] **"איך תוריד את ה-CV?"** → צריך למצוא בלי טירחה
- [ ] **"איך תפנה אליו?"** → צריך לראות email מיידית
- [ ] **"מה הרושם המקצועי?"** → צריך להיות חיובי

### 10.3 מבחן מובייל אמיתי

רוב הרקרוטרים פותחים פורטפוליו מהטלפון. בדוק על הטלפון שלך:
- [ ] טוען מהר (פחות מ-3 שניות ב-4G)
- [ ] קל לקרוא בלי לעשות zoom
- [ ] CV מוריד ונפתח כמו שצריך
- [ ] לחיצה על email פותחת את אפליקציית המייל

### 10.4 צ'ק ליסט פסיכולוגי

תדמיין שאתה מגייס שראה 50 פורטפוליואים השבוע:

- [ ] האתר נראה **ייחודי** (לא Bootstrap סטנדרטי)
- [ ] האתר נראה **מקצועי** (לא פרויקט בית ספר)
- [ ] המסר מובן: "Data/AI Developer של ממש"
- [ ] תרצה לקרוא יותר עליו? לפתוח את ה-LinkedIn שלו?

אם התשובה לאחת השאלות "לא" - יש מה לתקן.

---

## שלב 11 - לפני העלאה (10 דקות)

### 11.1 גיבוי הגרסה הישנה

```powershell
cd C:\Users\Nikita\pythonProject\nikita-portfolio

# אתחל git אם זה לא ריפו עדיין
git init
git remote add origin https://github.com/nikitasonkin/Portfolio.io.git
git fetch origin

# צור branch גיבוי לגרסה הישנה
git checkout -b backup/old-portfolio origin/main
git push -u origin backup/old-portfolio
```

זה שומר את הגרסה הישנה ב-GitHub במקרה שתרצה לחזור.

### 11.2 צור .gitignore

```powershell
@"
# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# Local
.env
*.log

# Placeholders
PLACE_*_HERE.txt
"@ | Out-File -Encoding utf8 .gitignore
```

### 11.3 בדוק מה יעלה

```powershell
git checkout -b redesign/amber-crt
git add .
git status
```

ודא:
- [ ] רואים את `index.html`, `README.md`, `assets/*`, `images/user.png`
- [ ] רואים את 2 קבצי PDF
- [ ] **לא** רואים `.env` או קבצי IDE
- [ ] **לא** רואים `PLACE_*` אם מחקת אותם

### 11.4 Commit

```powershell
git commit -m "Redesign portfolio: amber CRT terminal aesthetic

- New visual language: monospace + amber on warm-black
- Job-search positioning, removed consulting framing
- Added Nano Solar Shine and Investor as flagship projects
- Combined Cyber pipeline into single coherent story
- Added Experience timeline and Skills sections
- Bilingual CV downloads (EN + HE)
- Mobile responsive, accessibility compliant
- SEO: title, meta, OG tags, Schema.org Person"
```

### 11.5 Push ופתיחת PR

```powershell
git push -u origin redesign/amber-crt
```

ב-GitHub:
1. https://github.com/nikitasonkin/Portfolio.io
2. הודעה צהובה למעלה: "Compare & pull request" → לחץ
3. צור PR מ-`redesign/amber-crt` ל-`main`
4. סקור את ה-diff
5. Merge

תוך 30-60 שניות האתר יעלה.

---

## שלב 12 - אחרי העלאה (10 דקות)

### 12.1 ודא שהאתר עלה

- [ ] לך ל-https://nikitasonkin.github.io/Portfolio.io/
- [ ] **חזור על שלב 2** (פונקציונלי) על ה-production
- [ ] **בדוק במובייל אמיתי** (לא רק DevTools)
- [ ] HTTPS עובד (מנעול בדפדפן)

### 12.2 Lighthouse על production

```
DevTools → Lighthouse → Mobile → Generate Report
```

זה יותר משמעותי מהציון הלוקלי כי זה כולל את ה-CDN של GitHub.
- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 100

### 12.3 בדיקת תצוגה ב-LinkedIn

צור פוסט טיוטה ב-LinkedIn:
1. תחיל לכתוב פוסט חדש
2. הדבק את הלינק `https://nikitasonkin.github.io/Portfolio.io/`
3. חכה ל-preview
4. **אם יש OG image** - היא תופיע
5. **אם אין** - יראו רק את הכותרת והתיאור (גם זה בסדר אבל פחות מושך)
6. מחק את הטיוטה (אל תפרסם עדיין)

### 12.4 עדכון פלטפורמות

- [ ] **LinkedIn:**
  - Edit profile → Contact info → Website → הדבק URL
  - Featured section → Add → Link → URL
- [ ] **GitHub Profile:**
  - אם אין `nikitasonkin/nikitasonkin` - צור
  - הוסף `README.md`:
    ```markdown
    # Hi, I'm Nikita
    
    Data Analyst (BI) · AI Solutions Developer
    
    Portfolio: https://nikitasonkin.github.io/Portfolio.io/
    ```
- [ ] **חתימת מייל:** הוסף את הלינק
- [ ] **WhatsApp business** (אם יש): הוסף ל-bio

---

## שלב 13 - אחרי שזה עלה: שיתוף ומדידה

### 13.1 שיתוף ראשוני

- [ ] שלח לעצמך בוואטסאפ - בדוק preview
- [ ] שלח ל-3 חברים ובקש פידבק כן
- [ ] שאל ספציפית: "מה הרושם הראשוני? משהו לא ברור?"

### 13.2 פרסום ב-LinkedIn (כשמוכן)

טיוטת פוסט:

> אחרי כמה חודשי עבודה אינטנסיבית על פורטפוליו AI/Data חדש, סוף-סוף מוכן לשתף. תוכלו למצוא שם:
> 
> · Nano Solar Shine - פלטפורמה Full-Stack שבניתי end-to-end (React + Strapi + PostgreSQL)
> · Investor - מערכת multi-agent עם 24 סוכני Claude AI לאנליזת השקעות
> · Cybersecurity Intelligence Pipeline - שבניתי ב-Deutsche Telekom (500+ מאמרים ביום)
> · ועוד 3 פרויקטים של SQL/Python/BI
> 
> 🔗 https://nikitasonkin.github.io/Portfolio.io/
> 
> פתוח להזדמנויות בתחומי Data Science · Data Engineering · BI · AI Solutions Development
> 
> #dataanalytics #ai #python #powerbi #opentowork

### 13.3 מעקב אנליטי (אופציונלי)

הוסף **GoatCounter** (חינם, פרטי):
1. https://www.goatcounter.com/ → הירשם
2. הוסף לפני `</body>`:
   ```html
   <script data-goatcounter="https://YOURSLUG.goatcounter.com/count" 
           async src="//gc.zgo.at/count.js"></script>
   ```
3. תראה כמה אנשים נכנסו, מאיפה, אילו דפים

---

## שלב 14 - תחזוקה שוטפת

### מתי לעדכן את האתר

| מצב | מה לעדכן |
|---|---|
| פרויקט חדש | הוסף כרטיס ב-Projects (הראשון) |
| תפקיד חדש | עדכן Experience timeline |
| כישור חדש | הוסף ל-Skills JSON |
| CV עודכן | החלף את ה-PDF |
| מספר השתנה (לדוגמא: 24 → 30 agents) | עדכן בכל מקום |

### Workflow מהיר

```powershell
cd C:\Users\Nikita\pythonProject\nikita-portfolio
# ערוך index.html ב-VSCode
git add .
git commit -m "Update: <תיאור קצר>"
git push
# 30 שניות → live
```

---

## טבלת זמני בדיקה

| שלב | זמן משוער |
|---|---|
| 0. אימות תיקייה | 2 דקות |
| 1. הרצה לוקלית | 3 דקות |
| 2. בדיקה פונקציונלית | 10 דקות |
| 3. בדיקה ויזואלית | 10 דקות |
| 4. רספונסיבי | 10 דקות |
| 5. דפדפנים | 5 דקות |
| 6. תוכן ומקצועיות | 15 דקות |
| 7. ביצועים | 5 דקות |
| 8. SEO | 5 דקות |
| 9. נגישות | 5 דקות |
| 10. מבחן מגייס | 10 דקות |
| 11. לפני העלאה | 10 דקות |
| 12. אחרי העלאה | 10 דקות |
| **סה"כ** | **~100 דקות** |

תכנן 2 שעות שקט ועבור על הכל ברצף. עדיף לעשות פעם אחת ביסודיות מאשר לחזור 5 פעמים.

---

## תקלות נפוצות וכיצד לפתור

### "התמונה לא מופיעה"
1. ודא שהקובץ ב-`images/user.png` (אותיות קטנות בדיוק)
2. F12 → Network → רענן → חפש 404 על `user.png`
3. ודא שאין רווחים בשם הקובץ

### "JetBrains Mono לא נטען"
1. בדוק חיבור אינטרנט (הפונט מ-Google Fonts)
2. F12 → Network → סנן ל-fonts → רענן
3. אם נחסם ע"י firewall - הורד את הפונט מקומית והוסף ל-`assets/fonts/`

### "הכפתור [ copy ] לא עובד"
1. רק עובד מ-`http://` ולא מ-`file:///`
2. רץ `python -m http.server 8000` במקום לפתוח ישירות
3. בדפדפנים ישנים מאוד - אין `navigator.clipboard`

### "Lighthouse Performance נמוך"
1. בדוק גודל `user.png` - אם > 500KB → דחוס ב-tinypng.com
2. בדוק שהפונט נטען עם `display=swap`
3. ודא שאין JS שטוען לפני ש-DOM מוכן

### "git push מבקש סיסמה"
1. הגדר GitHub CLI: `winget install GitHub.cli` ואז `gh auth login`
2. או: צור Personal Access Token ב-GitHub → Settings → Developer Settings → Personal Access Tokens
3. השתמש ב-Token כסיסמה ב-prompt

### "GitHub Pages לא מתעדכן"
1. בדוק Settings → Pages → ודא שהוא מוגדר ל-`main` branch
2. חכה 60 שניות (לא תמיד מיידי)
3. שירת hard refresh: `Ctrl+Shift+R`
4. נסה incognito mode (קאש)

---

## הצעת ערך נוספת ממני

אם תרצה, אני יכול לעזור עם:

1. **CV בעברית** - אכתוב לך גרסה עברית מותאמת לפי קורות החיים האנגליים שלך, בקובץ Word שתוכל לעצב כ-PDF
2. **CV אנגלי משופר** - יש מקום לחידוד מסוים בקורות החיים הנוכחיים
3. **OG image** - אעצב לך את התמונה לשיתוף ב-LinkedIn (1200×630px)
4. **בדיקת LinkedIn** - אם תשלח את הפרופיל, אעבור ואציע שיפורים שיעבדו עם הפורטפוליו
5. **טמפלייט פוסט LinkedIn** - לפרסום הפורטפוליו (יותר מותאם מהדוגמה כאן)
6. **Cover letter template** - מותאם לתפקידי Data Analyst / AI Solutions Developer

תגיד מה רלוונטי לך עכשיו.
