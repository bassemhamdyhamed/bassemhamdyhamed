# نموذج طلب مراقبة المحاصيل — Microsoft Forms (دليل الإعداد)

الملف: `agri-intake-form-quick-import.docx` — نسخة الأقمار الصناعية فقط، مطابقة لـ
`tools/google-forms/agri-intake-form.gs`. الملف بصيغة Quick Import (سؤال مرقّم `1.`
ثم خيارات `a.` `b.`) — الإلزامية والنصوص التوضيحية تُضبط يدوياً من الجدول أدناه.

> ⚠️ **قيد مؤكَّد من Microsoft:** سؤال **Upload file** يعطّل خيار *Anyone can respond*
> (يقتصر على موظفي المؤسسة). بما أن المجيبين مزارعون من خارج الشركة، **لا نستخدم
> Upload file**. البديل: رابط **Request files** من OneDrive يرفع عليه العميل دون حساب،
> وسؤال 11 نصّي يكتب فيه اسم الملف.
> المصدر: learn.microsoft.com — Microsoft Forms file upload / Customer Voice question types.

## 1) الاستيراد (دقيقتان)

1. ادخل forms.office.com بحساب الشركة (Microsoft 365 Business).
2. **New Form → Quick Import** (أو "استيراد سريع") → ارفع ملف الـ Word.
3. اختر **Form** وليس Quiz → راجع المعاينة → **Import**.

## 2) الضبط اليدوي بعد الاستيراد (10–15 دقيقة)

### أ) الأقسام
تأكد أن النموذج مقسّم إلى 4 أقسام (Add new → Section) بنفس عناوين الملف:
بيانات التواصل · المواصفات الجغرافية · المحاصيل والري · نطاق الخدمة.

### ب) نوع كل سؤال وإلزاميته

| # | السؤال | النوع في Forms | إلزامي | إعداد إضافي |
|---|---|---|---|---|
| 1 | الاسم الكامل | Text | ✅ | |
| 2 | اسم الشركة / المزرعة | Text | — | |
| 3 | رقم الهاتف | Text | ✅ | Subtitle: مع رمز الدولة، مثال: 966500000000+ أو 201000000000+ |
| 4 | البريد الإلكتروني | Text | ✅ | لا يوجد تحقق بريد في Forms |
| 5 | الدولة | Choice (Drop-down) | ✅ | |
| 6 | المنطقة / المدينة | Text | ✅ | |
| 7 | المساحة | Text | ✅ | ⋯ → **Restrictions → Number → Greater than 0** |
| 8 | وحدة المساحة | Choice | ✅ | |
| 9 | الإحداثيات / رابط الخريطة | Text | ✅ | Subtitle: مثال: 24.7136, 46.6753 أو رابط maps.app.goo.gl |
| 10 | هل يتوفر ملف حدود؟ | Choice | ✅ | **Branching** (انظر ج) |
| 11 | اسم ملف الحدود | Text | ✅ | Subtitle: «ارفع ملف KML / KMZ / Shapefile (ZIP) عبر هذا الرابط ثم اكتب اسم الملف هنا: ‹رابط Request files›» — انظر القسم 2-هـ |
| 12 | نوع المحصول | Text | ✅ | |
| 13 | مرحلة النمو | Choice | ✅ | |
| 14 | نظام الري | Choice | ✅ | فعّل **Add "Other" option** |
| 15 | التحديات | Choice + **Multiple answers** | ✅ | فعّل **Add "Other" option** |
| 16 | نوع الخدمة | Choice + **Multiple answers** | ✅ | |
| 17 | موعد البدء | Choice | ✅ | |
| 18 | الميزانية | Choice | — | |
| 19 | ملاحظات | Text + **Long answer** | — | |
| 20 | الموافقة على البيانات | Choice | ✅ | Subtitle: «تُستخدم بياناتكم وإحداثيات المزرعة فقط لإعداد العرض الفني وتقديم الخدمة، وفق نظام حماية البيانات الشخصية في المملكة وقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.» |

أي سؤال استُورد بنوع خاطئ: غيّر نوعه من قائمة السؤال (Text ↔ Choice).

### ج) التفرّع (Branching)
⋯ (أعلى النموذج) → **Branching** → سؤال 10:
- **نعم** → Go to: سؤال 11 (اسم ملف الحدود)
- **لا** → Go to: قسم "المحاصيل والري"

### د) إعدادات النموذج (⋯ → Settings)
- **Collect responses → Anyone can respond** (العملاء من خارج الشركة).
  إن كان الخيار رمادياً: Microsoft 365 admin center → Settings → Org settings →
  Microsoft Forms → External sharing → فعّل *Send a link to the form and collect responses*.
- **Customize thank you message:** "تم استلام بيانات طلبكم بنجاح. سيقوم فريق التحليل
  الجغرافي والزراعي بدراسة الموقع والتواصل معكم قريباً."
- **Get email notification of each response:** فعّله مؤقتاً حتى تجهز Power Automate.
- **Theme:** ارفع شعار Horizon Satellite وصورة قمر صناعي/حقل كخلفية.

### هـ) رابط رفع ملفات الحدود (OneDrive Request files)
1. OneDrive → مجلد **Agri Intake / Boundary Files** (تم إنشاؤه في OneDrive الخاص بـ bassem@horizonsatellite.net).
2. كليك يمين على المجلد → **Request files** → اكتب: «ملف حدود المزرعة» → انسخ الرابط.
3. الصقه في Subtitle السؤال 11.
- الرافع لا يحتاج حساباً، ولا يرى محتوى المجلد. إن لم يظهر الخيار: SharePoint admin
  center → Sharing → فعّل *Anyone* links لـ OneDrive.
- **Power Automate (اختياري):** عند وصول ملف جديد في المجلد → إشعار للفريق.

### و) ربط الردود بـ Excel
تبويب **Responses → Open in Excel** — يُنشئ ملف Excel في OneDrive/SharePoint يتحدث
تلقائياً. انقله إلى موقع SharePoint الخاص بالمبيعات ليصل إليه الفريق.

## 3) Power Automate — إشعار فوري بكل طلب (10 دقائق)

make.powerautomate.com → **Create → Automated cloud flow**

1. **Trigger:** Microsoft Forms → *When a new response is submitted* → اختر النموذج.
2. **Action:** Microsoft Forms → *Get response details* → Form Id = النموذج،
   Response Id = من الخطوة 1.
3. **Condition (اختياري — توجيه حسب السوق):** `الدولة` equals `المملكة العربية السعودية`
   - Yes → إرسال إلى فريق السعودية؛ No → إرسال إلى فريق مصر.
4. **Action:** Office 365 Outlook → *Send an email (V2)*
   - To: بريد فريق المبيعات
   - Subject: `طلب جديد — @{الدولة} — @{المساحة} @{وحدة المساحة}`
   - Body: الاسم، الهاتف، البريد، الإحداثيات، الخدمات المطلوبة، موعد البدء، الميزانية.
5. **(اختياري) Action:** Microsoft Teams → *Post message in a chat or channel* →
   قناة "Leads".
6. احفظ → أرسل ردّاً تجريبياً → تأكد من وصول البريد.

**ترقية لاحقة:** استبدال الخطوة 4 بـ *Dataverse / Dynamics 365 → Add a new row (Lead)*
عند تفعيل CRM.

## 4) قبل النشر

- [ ] رد تجريبي كامل من جوال (مسار "نعم" ومسار "لا").
- [ ] رفع ملف KML تجريبي عبر رابط Request files من متصفح غير مسجّل الدخول.
- [ ] مراجعة نص الموافقة مع مستشار قانوني.
- [ ] استبدال فئات الميزانية بأسعاركم الحقيقية.
- [ ] رابط مختصر + QR للنموذج لاستخدامه في واتساب والمعارض.
