function createAgriForm() {
  var form = FormApp.create('طلب خدمات الاستشعار عن بُعد ومراقبة المحاصيل الزراعية');
  form.setDescription('جمع البيانات الجغرافية والزراعية لمزرعتكم لتقديم تحليلات دقيقة مبنية على الأقمار الصناعية والدرون.');

  // القسم الأول: البيانات الشخصية
  form.addTextItem().setTitle('الاسم الكامل').setRequired(true);
  form.addTextItem().setTitle('اسم الشركة / الجهة / المزرعة').setRequired(false);
  form.addTextItem().setTitle('رقم الهاتف (مع واتساب)').setRequired(true);
  form.addTextItem().setTitle('البريد الإلكتروني').setRequired(true);
  form.addTextItem().setTitle('المحافظة / الدولة').setRequired(true);

  // القسم الثاني: المواصفات الجغرافية
  form.addPageBreakItem().setTitle('المواصفات الجغرافية للمزرعة');
  form.addTextItem().setTitle('المساحة الإجمالية للمزرعة (مع الوحدة: فدان/هكتار)').setRequired(true);
  form.addTextItem().setTitle('إحداثيات الموقع أو رابط خرائط جوجل (Google Maps Pin)').setRequired(true);
  
  var boundaryChoice = form.addMultipleChoiceItem();
  boundaryChoice.setTitle('هل يتوفر لديك ملف حدود المزرعة بصيغة رقمية (KML / KMZ / Shapefile)؟')
    .setChoices([
      boundaryChoice.createChoice('نعم'),
      boundaryChoice.createChoice('لا، سأعتمد على رابط الخريطة لتحديد الحدود')
    ]);

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
    ]);

  var irrigationChoice = form.addMultipleChoiceItem();
  irrigationChoice.setTitle('نظام الري المستخدم')
    .setChoices([
      irrigationChoice.createChoice('ري بالتنقيط (Drip)'),
      irrigationChoice.createChoice('ري محوري (Pivot)'),
      irrigationChoice.createChoice('ري بالغمر (Flood)'),
      irrigationChoice.createChoice('ري بالرش (Sprinkler)')
    ]).showOtherOption(true);

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
    ]).showOtherOption(true);

  var serviceCheck = form.addCheckboxItem();
  serviceCheck.setTitle('نوع الخدمة المطلوبة')
    .setChoices([
      serviceCheck.createChoice('مراقبة دورية عبر الأقمار الصناعية (مؤشرات حيوية NDVI / NDRE)'),
      serviceCheck.createChoice('مسح جوي فائق الدقة باستخدام الطائرات المسيرة (Drone - Multispectral/RGB)'),
      serviceCheck.createChoice('خرائط طبوغرافية وخطوط كفافية (DEM/DSM)'),
      serviceCheck.createChoice('تقرير لمرة واحدة لتقييم الوضع الراهن'),
      serviceCheck.createChoice('اشتراك موسمي منتظم (تقارير دورية)')
    ]);

  form.addParagraphTextItem().setTitle('ملاحظات أو متطلبات خاصة');
  
  form.setConfirmationMessage('تم استلام بيانات طلبكم بنجاح. سيقوم فريق التحليل الجغرافي والزراعي بدراسة الموقع والتواصل معكم قريباً.');
  
  Logger.log('تم إنشاء النموذج بنجاح: ' + form.getEditUrl());
}
