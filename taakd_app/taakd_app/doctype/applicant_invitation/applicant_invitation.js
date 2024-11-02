// applicant_invitation.js
// // Copyright (c) 2024, Asofi and contributors
// // For license information, please see license.txt
frappe.ui.form.on("Applicant Invitation", {
    refresh(frm) {
        frm.trigger('package');
        add_company_information(frm);
        if (!frm.slider_initialized) {
            frm.slider_initialized = true;

            // تحميل Swiper CSS و JS إذا لم يتم تحميله مسبقًا
            load_swiper_assets(frm);
        }
    },
    onload: function(frm){
        frm.trigger('package');
        add_company_information(frm);
    },
    package: function(frm){
        let item_list = [];
        frappe.call({
            doc: frm.doc,
            method: 'get_filtered_item_codes', 
            callback: function(r){
                if (r.message) {
                    item_list = r.message;
                    frm.fields_dict['other_services'].grid.get_field('service').get_query = function(doc) {
                        return {
                            "filters": {
                                "item_code": ["in", item_list] 
                            }
                        }
                    };
                    
                    frm.refresh_field('other_services');
                }
            }
        });
    },
    other_services_add: function(frm, cdt, cdn) {
        // حدث عند إضافة صف جديد إلى Child Table
        let row = locals[cdt][cdn]; 
        row.service_price = 0;
    },    
});

frappe.ui.form.on('Other Services', {
    service: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.service) {
            // استعلام السعر من جدول Item Price
            frappe.db.get_list('Item Price', {
                fields: ['price_list_rate'],
                filters: {
                    item_code: row.service
                },
                limit: 1 // لاسترداد سعر واحد
            }).then((data) => {
                if (data.length > 0) {
                    row.service_price = data[0].price_list_rate; // الحصول على السعر
                } else {
                    row.service_price = 0; // إذا لم يتم العثور على سعر
                }
                frm.refresh_field('other_services'); // تحديث الحقول لعرض القيمة الجديدة
            }).catch((error) => {
                console.error("حدث خطأ أثناء جلب السعر:", error);
                row.service_price = 0;
                frm.refresh_field('other_services');
            });
        } else {
            row.service_price = 0;
            frm.refresh_field('other_services');
        }
    }
});

function add_company_information(frm) {
    // استدعاء دالة سيرفرية للحصول على بيانات الشركة
    frappe.call({
        doc: frm.doc,
        method: 'add_company_information',
        callback: function(response) {
            if (response.message) {
                // تحديث الحقول في النموذج بناءً على معلومات الشركة
                frm.set_value('company_name', response.message.company_name);
                frm.set_value('company_email', response.message.company_email);
                frm.set_value('cumulative_invoice', response.message.cumulative_invoice);
                if(response.message.cumulative_invoice)
                {
                    frm.set_value('payd_from', 'Company'); 
                    frm.set_df_property('payd_from', 'read_only', true);
                }
            }
        }
    });
}

function load_swiper_assets(frm) {
    // تحميل Swiper CSS إذا لم يتم تحميله مسبقًا
    if (!document.querySelector('link[href="https://unpkg.com/swiper/swiper-bundle.min.css"]')) {
        let swiperCSS = document.createElement('link');
        swiperCSS.rel = 'stylesheet';
        swiperCSS.href = 'https://unpkg.com/swiper/swiper-bundle.min.css';
        document.head.appendChild(swiperCSS);
    }

    // تحميل Swiper JS إذا لم يتم تحميله مسبقًا
    if (!document.querySelector('script[src="https://unpkg.com/swiper/swiper-bundle.min.js"]')) {
        let swiperJS = document.createElement('script');
        swiperJS.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
        swiperJS.onload = function() {
            initialize_slider(frm);
        };
        document.body.appendChild(swiperJS);
    } else {
        if (typeof Swiper !== 'undefined') {
            initialize_slider(frm);
        } else {
            document.querySelector('script[src="https://unpkg.com/swiper/swiper-bundle.min.js"]').addEventListener('load', function() {
                initialize_slider(frm);
            });
        }
    }
}

function initialize_slider(frm) {
    // التأكد من وجود حقل HTML
    let html_field = frm.get_field('packages');
    if (!html_field) {
        frappe.msgprint(__("حقل HTML 'packages' غير موجود."));
        return;
    }

    // التحقق مما إذا تم تهيئة السلايدر مسبقًا
    if (html_field.slider_initialized) {
        return;
    }
    html_field.slider_initialized = true;

    // إنشاء الهيكل الأساسي للسلايدر إذا لم يكن موجودًا
    if (!html_field.$wrapper.find('.swiper-container').length) {
        html_field.$wrapper.html(`
            <div class="swiper-container">
                <div class="swiper-wrapper" id="packages-container">
                    <!-- سيتم إضافة شرائح السلايدر هنا ديناميكيًا بواسطة JavaScript -->
                </div>
                <!-- أزرار التنقل -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <!-- شريط التقدم -->
                <div class="swiper-pagination"></div>
            </div>
        `);
    }

    // جلب بيانات الحزم من السيرفر
    frappe.call({
        doc: frm.doc,
        method: "get_packages",
        callback: function(r) {
            if(r.message) {
                const packages = r.message;
                const container = html_field.$wrapper.find('#packages-container');
                
                container.empty(); // تنظيف المحتوى الحالي

                if (packages.length === 0) {
                    container.html("<p>لا توجد حزم متاحة.</p>");
                    return;
                }

                packages.forEach(pkg => {
                    // استخدام الرابط الكامل للصورة
                    let image_src = pkg.file_image ? frappe.utils.get_file_link(pkg.file_image) : '/assets/your_app_name/images/default.png'; // تأكد من استبدال 'your_app_name' باسم تطبيقك

                    const slide = `
                        <div class="swiper-slide">
                            <div class="card">
                                <img src="${image_src}" class="card-img-top" alt="${pkg.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${pkg.name}</h5>
                                    <p class="card-text">${pkg.description}</p>
                                    <button class="btn btn-primary select-package" data-package="${pkg.name}">اختيار الصنف</button>
                                </div>
                            </div>
                        </div>
                    `;
                    container.append(slide);
                });

                // إزالة أي تهيئة سابقة لـ Swiper
                html_field.$wrapper.find('.swiper-container').each(function() {
                    if (this.swiper) {
                        this.swiper.destroy(true, true);
                    }
                });

                // تهيئة Swiper بعد إضافة الشرائح
                var swiperInstance = new Swiper(html_field.$wrapper.find('.swiper-container')[0], {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: true,
                    pagination: {
                        el: html_field.$wrapper.find('.swiper-pagination')[0],
                        clickable: true,
                    },
                    navigation: {
                        nextEl: html_field.$wrapper.find('.swiper-button-next')[0],
                        prevEl: html_field.$wrapper.find('.swiper-button-prev')[0],
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    },
                    // إضافة أي إعدادات أخرى مفيدة
                });

                // إضافة مستمع للنقر على الأزرار
                html_field.$wrapper.find('.select-package').off('click').on('click', function() {
                    const packageName = $(this).data('package');
                    frm.set_value('package', packageName);
                    frappe.msgprint(__("تم اختيار الصنف: " + packageName));
                });

                // إضافة تنسيقات CSS مخصصة (إذا لم يتم إضافتها سابقًا)
                if (!document.getElementById('slider-styles')) {
                    let style = document.createElement('style');
                    style.id = 'slider-styles';
                    style.innerHTML = `
                        .card {
                            border: 1px solid #e0e0e0;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                        }
                        .card img {
                            width: 100%;
                            height: 150px;
                            object-fit: cover;
                        }
                        .card-body {
                            padding: 15px;
                            flex-grow: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        }
                        .select-package {
                            width: 100%;
                            margin-top: 10px;
                        }

                        /* تنسيقات Swiper */
                        .swiper-container {
                            width: 100%;
                            padding-top: 20px;
                            padding-bottom: 50px;
                        }
                        .swiper-slide {
                            background: #fff;
                            /* المركز الأفقي والعمودي للبطاقة */
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    `;
                    document.head.appendChild(style);
                }
            } else {
                frappe.msgprint(__("لم يتم العثور على حزم لعرضها."));
            }
        },
        error: function(error) {
            frappe.msgprint(__("حدث خطأ أثناء جلب الحزم. يرجى المحاولة لاحقًا."));
            console.error(error);
        }
    });
}