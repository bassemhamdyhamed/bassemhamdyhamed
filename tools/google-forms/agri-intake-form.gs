/**
 * Horizon Satellite — Agri Remote-Sensing Intake Form (Google Apps Script)
 *
 * Source: raw/2026-10-01-agri-remote-sensing-intake-form.gs (original v1)
 * Wiki:   wiki/project-agri-crop-monitoring.md
 *
 * Usage (script.google.com → new project → paste → Run):
 *   1. Set NOTIFY_EMAIL below.
 *   2. Run createAgriForm()   → builds the form + linked response Sheet.
 *   3. Run installSubmitTrigger() once → emails the team on every new lead.
 *
 * Changes vs v1:
 *   - Email validated; area split into number (validated) + unit dropdown,
 *     so quotes can be computed directly from the Sheet.
 *   - Country is a dropdown (KSA / Egypt / other) for market routing.
 *   - All choice questions marked required (v1 left them optional).
 *   - Boundary-file question asks for a shared link when "yes"
 *     (FormApp cannot create file-upload items).
 *   - Lead-qualification questions: start date + budget band.
 *   - Data-processing consent (KSA PDPL / Egypt Law 151/2020).
 *   - Responses written to a linked Google Sheet; submit notifications.
 */

var NOTIFY_EMAIL = ''; // e.g. 'sales@horizonsatellite.example' — leave empty to skip notifications

function createAgriForm() {
  var form = FormApp.create('طلب خدمات الاستشعار عن بُعد ومراقبة المحاصيل الزراعية');
  form.setDescription('جمع البيانات الجغرافية والزراعية لمزرعتكم لتقديم تحليلات دقيقة مبنية على الأقمار الصناعية والدرون.')
    .setProgressBar(true)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false);

  // القسم الأول: البيانات الشخصية
  form.addTextItem().setTitle('الاسم الكامل').setRequired(true);
  form.addTextItem().setTitle('اسم الشركة / الجهة / المزرعة').setRequired(false);
  form.addTextItem().setTitle('رقم الهاتف (مع واتساب)')
    .setHelpText('مع رمز الدولة، مثال: 966500000000+ أو 201000000000+')
    .setRequired(true);
  form.addTextItem().setTitle('البريد الإلكتروني')
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .setHelpText('يرجى إدخال بريد إلكتروني صحيح')
      .build())
    .setRequired(true);

  var country = form.addListItem();
  country.setTitle('الدولة')
    .setChoices([
      country.createChoice('المملكة العربية السعودية'),
      country.createChoice('جمهورية مصر العربية'),
      country.createChoice('دولة أخرى')
    ])
    .setRequired(true);
  form.addTextItem().setTitle('المنطقة / المحافظة / المدينة').setRequired(true);

  // القسم الثاني: المواصفات الجغرافية
  form.addPageBreakItem().setTitle('المواصفات الجغرافية للمزرعة');
  form.addTextItem().setTitle('المساحة الإجمالية للمزرعة (رقم فقط)')
    .setValidation(FormApp.createTextValidation()
      .requireNumberGreaterThan(0)
      .setHelpText('يرجى إدخال رقم أكبر من صفر')
      .build())
    .setRequired(true);

  var unit = form.addListItem();
  unit.setTitle('وحدة المساحة')
    .setChoices([
      unit.createChoice('فدان'),
      unit.createChoice('هكتار'),
      unit.createChoice('دونم'),
      unit.createChoice('متر مربع')
    ])
    .setRequired(true);

  form.addTextItem().setTitle('إحداثيات الموقع أو رابط خرائط جوجل (Google Maps Pin)')
    .setHelpText('مثال: 24.7136, 46.6753 أو رابط maps.app.goo.gl')
    .setRequired(true);

  var boundaryChoice = form.addMultipleChoiceItem();
  boundaryChoice.setTitle('هل يتوفر لديك ملف حدود المزرعة بصيغة رقمية (KML / KMZ / Shapefile)؟')
    .setChoices([
      boundaryChoice.createChoice('نعم'),
      boundaryChoice.createChoice('لا، سأعتمد على رابط الخريطة لتحديد الحدود')
    ])
    .setRequired(true);
  form.addTextItem().setTitle('رابط ملف الحدود (Google Drive / Dropbox) — إن وُجد')
    .setHelpText('يرجى مشاركة الملف بصلاحية "أي شخص لديه الرابط"')
    .setRequired(false);

  // القسم الثالث: المحاصيل والري
  form.addPageBreakItem().setTitle('تفاصيل المحاصيل والري');
  form.addTextItem().setTitle('نوع المحصول الحالي أو المزمع زراعته').setRequired(true);

  var stageChoice = form.addMultipleChoiceItem();
  stageChoice.setTitle('مرحلة النمو الحالية')
    .setChoices([
      stageChoice.createChoice('مرحلة ما قبل الزراعة / تجهيز التربة'),
      stageChoice.createChoice('شتلات / بداية النمو'),
      stageChoice.createChoice('مرحلة النمو الخضري'),
      stageChoice.createChoice('مرحلة الإثمار / النضج'),
      stageChoice.createChoice('أشجار معمرة ومثمرة')
    ])
    .setRequired(true);

  var irrigationChoice = form.addMultipleChoiceItem();
  irrigationChoice.setTitle('نظام الري المستخدم')
    .setChoices([
      irrigationChoice.createChoice('ري بالتنقيط (Drip)'),
      irrigationChoice.createChoice('ري محوري (Pivot)'),
      irrigationChoice.createChoice('ري بالغمر (Flood)'),
      irrigationChoice.createChoice('ري بالرش (Sprinkler)')
    ])
    .showOtherOption(true)
    .setRequired(true);

  // القسم الرابع: الاحتياجات الفنية
  form.addPageBreakItem().setTitle('نطاق الخدمة والاحتياجات الفنية');

  var challengeCheck = form.addCheckboxItem();
  challengeCheck.setTitle('ما هي التحديات أو المشكلات الأساسية التي تواجهها حالياً؟')
    .setChoices([
      challengeCheck.createChoice('ضعف في النمو الخضري وتفاوت في الإنتاج'),
      challengeCheck.createChoice('مشاكل في كفاءة الري واستهلاك المياه'),
      challengeCheck.createChoice('ظهور بؤر إصابات فطرية أو آفات حشرية'),
      challengeCheck.createChoice('مشاكل تملح في التربة أو سوء صرف'),
      challengeCheck.createChoice('حصر دقيق لأعداد الأشجار والمسافات البينية'),
      challengeCheck.createChoice('دراسة طبوغرافية لتسوية الأرض وتصريف السيول')
    ])
    .showOtherOption(true)
    .setRequired(true);

  var serviceCheck = form.addCheckboxItem();
  serviceCheck.setTitle('نوع الخدمة المطلوبة')
    .setChoices([
      serviceCheck.createChoice('مراقبة دورية عبر الأقمار الصناعية (مؤشرات حيوية NDVI / NDRE)'),
      serviceCheck.createChoice('مسح جوي فائق الدقة باستخدام الطائرات المسيرة (Drone - Multispectral/RGB)'),
      serviceCheck.createChoice('خرائط طبوغرافية وخطوط كفافية (DEM/DSM)'),
      serviceCheck.createChoice('تقرير لمرة واحدة لتقييم الوضع الراهن'),
      serviceCheck.createChoice('اشتراك موسمي منتظم (تقارير دورية)')
    ])
    .setRequired(true);

  var timeline = form.addMultipleChoiceItem();
  timeline.setTitle('متى ترغب في بدء الخدمة؟')
    .setChoices([
      timeline.createChoice('فوراً (خلال أسبوعين)'),
      timeline.createChoice('خلال شهر إلى ثلاثة أشهر'),
      timeline.createChoice('مع بداية الموسم القادم'),
      timeline.createChoice('استكشاف فقط في الوقت الحالي')
    ])
    .setRequired(true);

  var budget = form.addMultipleChoiceItem();
  budget.setTitle('الميزانية التقديرية للخدمة (اختياري)')
    .setChoices([
      budget.createChoice('أقل من 5,000 ريال / 50,000 جنيه'),
      budget.createChoice('5,000 – 20,000 ريال / 50,000 – 200,000 جنيه'),
      budget.createChoice('أكثر من 20,000 ريال / 200,000 جنيه'),
      budget.createChoice('غير محددة بعد')
    ])
    .setRequired(false);

  form.addParagraphTextItem().setTitle('ملاحظات أو متطلبات خاصة');

  var consent = form.addCheckboxItem();
  consent.setTitle('الموافقة على معالجة البيانات')
    .setHelpText('تُستخدم بياناتكم وإحداثيات المزرعة فقط لإعداد العرض الفني وتقديم الخدمة، وفق نظام حماية البيانات الشخصية في المملكة وقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.')
    .setChoices([consent.createChoice('أوافق على معالجة بياناتي للأغراض الموضحة أعلاه')])
    .setRequired(true);

  form.setConfirmationMessage('تم استلام بيانات طلبكم بنجاح. سيقوم فريق التحليل الجغرافي والزراعي بدراسة الموقع والتواصل معكم قريباً.');

  // Link responses to a Google Sheet (lead pipeline)
  var sheet = SpreadsheetApp.create('Agri Intake — Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  PropertiesService.getScriptProperties().setProperty('AGRI_FORM_ID', form.getId());

  Logger.log('تم إنشاء النموذج بنجاح');
  Logger.log('Edit URL:      ' + form.getEditUrl());
  Logger.log('Public URL:    ' + form.getPublishedUrl());
  Logger.log('Responses:     ' + sheet.getUrl());
}

/** Run once after createAgriForm() to get an email per submission. */
function installSubmitTrigger() {
  var formId = PropertiesService.getScriptProperties().getProperty('AGRI_FORM_ID');
  if (!formId) throw new Error('Run createAgriForm() first.');
  ScriptApp.newTrigger('onAgriFormSubmit')
    .forForm(FormApp.openById(formId))
    .onFormSubmit()
    .create();
}

function onAgriFormSubmit(e) {
  if (!NOTIFY_EMAIL) return;
  var lines = e.response.getItemResponses().map(function (r) {
    var v = r.getResponse();
    return r.getItem().getTitle() + ': ' + (Array.isArray(v) ? v.join('، ') : v);
  });
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'طلب جديد — مراقبة المحاصيل بالاستشعار عن بُعد',
    body: lines.join('\n')
  });
}
