// applicant_invitation.js

frappe.ui.form.on("Applicant Invitation", {
    refresh(frm) {
        frm.trigger('package');
        add_company_information(frm);
        if (!frm.slider_initialized) {
            frm.slider_initialized = true;
            initialize_slider(frm);
        }

        // التحقق من حالة المستند
        // if (frm.doc.docstatus === 1) { // المستند معتمد
        //     make_slider_readonly(frm);
        // }
    },
    onload: function(frm) {
        frm.trigger('package');
        add_company_information(frm);
    },
    package: function(frm) {
        let item_list = [];
        frappe.call({
            doc: frm.doc,
            method: 'get_filtered_item_codes',
            callback: function(r) {
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
        let row = locals[cdt][cdn];
        row.service_price = 0;
    },
});

frappe.ui.form.on('Other Services', {
    service: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.service) {
            frappe.db.get_list('Item Price', {
                fields: ['price_list_rate'],
                filters: {
                    item_code: row.service
                },
                limit: 1
            }).then((data) => {
                if (data.length > 0) {
                    row.service_price = data[0].price_list_rate;
                } else {
                    row.service_price = 0;
                }
                frm.refresh_field('other_services');
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
    frappe.call({
        doc: frm.doc,
        method: 'add_company_information',
        callback: function(response) {
            if (response.message) {
                frm.set_value('company_name', response.message.company_name);
                frm.set_value('company_email', response.message.company_email);
                frm.set_value('cumulative_invoice', response.message.cumulative_invoice);
                if (response.message.cumulative_invoice) {
                    frm.set_value('payd_from', 'Company');
                    frm.set_df_property('payd_from', 'read_only', true);
                }
            }
        }
    });
}

function initialize_slider(frm) {
    let html_field = frm.get_field('packages');
    if (!html_field || html_field.slider_initialized) return;

    html_field.slider_initialized = true;

    if (!html_field.$wrapper.find('.swiper-container').length) {
        html_field.$wrapper.html(`
            <div class="swiper-container">
                <div class="swiper-wrapper" id="packages-container"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        `);
    }

    load_packages(frm);
}

function load_packages(frm) {
    frappe.call({
        doc: frm.doc,
        method: "get_packages",
        callback: function(r) {
            if (r.message) {
                const container = frm.get_field('packages').$wrapper.find('#packages-container');
                container.empty();

                if (frm.doc.docstatus === 1) { // إذا كان المستند معتمدًا
                    const selected_package = frm.doc.package;
                    if (!selected_package) {
                        container.html("<p>لم يتم اختيار حزمة.</p>");
                        return;
                    }

                    // جلب تفاصيل الحزمة المختارة
                    frappe.call({
                        doc: frm.doc,
                        method: "get_package_details",
                        args: {
                            package: selected_package
                        },
                        callback: function(res) {
                            if (res.message && Object.keys(res.message).length > 0) {
                                let pkg = res.message;
                                let image_src = pkg.file_image ? frappe.utils.get_file_link(pkg.file_image) : '/assets/your_app/images/default.png';

                                const slide = `
                                    <div class="swiper-slide">
                                        <div class="card">
                                            <img src="${image_src}" class="card-img-top" alt="${pkg.name}">
                                            <div class="card-body">
                                                <h5 class="card-title">${pkg.name}</h5>
                                                <p class="card-text">${pkg.custom_package_description}</p>
                                                <button class="btn btn-success" disabled>تم اختيار الباقة</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                container.append(slide);
                                initialize_swiper(frm, true); // تمرير true لوضع القراءة
                            } else {
                                container.html("<p>الحزمة المختارة غير موجودة.</p>");
                            }
                        },
                        error: function(error) {
                            container.html("<p>حدث خطأ أثناء جلب تفاصيل الحزمة.</p>");
                            console.error(error);
                        }
                    });
                } else { // إذا كان المستند غير معتمدًا
                    if (r.message.length === 0) {
                        container.html("<p>لا توجد حزم متاحة.</p>");
                        return;
                    }

                    r.message.forEach(pkg => {
                        let image_src = pkg.file_image ? frappe.utils.get_file_link(pkg.file_image) : '/assets/your_app/images/default.png';

                        const slide = `
                            <div class="swiper-slide">
                                <div class="card">
                                    <img src="${image_src}" class="card-img-top" alt="${pkg.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${pkg.name}</h5>
                                        <p class="card-text">${pkg.custom_package_description}</p>
                                        <button class="btn select-package" data-package="${pkg.name}">اختيار الباقة</button>
                                    </div>
                                </div>
                            </div>
                        `;
                        container.append(slide);
                    });

                    initialize_swiper(frm, false); // تمرير false لوضع التحرير
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

function initialize_swiper(frm, read_only) {
    const html_field = frm.get_field('packages');
    let swiperElement = html_field.$wrapper.find('.swiper-container')[0];

    // تأكد من تدمير السلايدر السابق إذا كان موجودًا
    if (html_field.swiper_instance) {
        html_field.swiper_instance.destroy(true, true);
    }

    // تهيئة السلايدر بناءً على الحالة (قراءة أو تحرير)
    html_field.swiper_instance = new Swiper(swiperElement, {
        slidesPerView: 1, // عرض بطاقة واحدة فقط
        spaceBetween: 30,
        effect: 'cube',
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        loop: !read_only, // السماح بالتكرار إذا كان الوضع تحرير
        pagination: {
            el: html_field.$wrapper.find('.swiper-pagination')[0],
            clickable: true,
        },
        navigation: {
            nextEl: html_field.$wrapper.find('.swiper-button-next')[0],
            prevEl: html_field.$wrapper.find('.swiper-button-prev')[0],
            enabled: !read_only // تمكين التنقل إذا كان الوضع تحرير
        },
        keyboard: {
            enabled: !read_only,          // تمكين التحكم باللوحة المفاتيح إذا كان الوضع تحرير
            onlyInViewport: true,   // السماح بالتحكم فقط عندما يكون السلايدر في العرض
        },
        mousewheel: {
            invert: false,            // عكس اتجاه التمرير إذا لزم الأمر
            enabled: !read_only,     // تمكين التمرير بالماوس إذا كان الوضع تحرير
        },
    });

    if (read_only) {
        // إخفاء أزرار التنقل في وضع القراءة
        html_field.$wrapper.find('.swiper-button-next, .swiper-button-prev').hide();
    } else {
        // إظهار أزرار التنقل في وضع التحرير
        html_field.$wrapper.find('.swiper-button-next, .swiper-button-prev').show();

        // تعيين أحداث النقر على أزرار اختيار الحزمة فقط في وضع التحرير
        html_field.$wrapper.find('.select-package').off('click').on('click', function() {
            const packageName = $(this).data('package');
            frm.set_value('package', packageName);
            frappe.msgprint(__("تم اختيار الباقة: " + packageName));
            // إعادة تحميل السلايدر لعرض الحزمة المختارة فقط
            load_packages(frm);
        });
    }

    if (!document.getElementById('slider-styles')) {
        let style = document.createElement('style');
        style.id = 'slider-styles';
        style.innerHTML = `
            /* توحيد مقاسات البطاقات */
            .card {
                width: 100%; /* استخدام 100% ضمن السلايدر */
                max-width: 400px; /* أقصى عرض للبطاقة */
                height: 100%; /* استخدام 100% لضمان التناسب */
                min-height: 450px; /* ارتفاع أدنى */
                border: none;
                border-radius: 15px; 
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                transition: transform 0.3s, box-shadow 0.3s;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background: linear-gradient(to bottom, #ffffff, #f9f9f9);
            }
            .card:hover {
                transform: scale(1.05); 
                box-shadow: 0 15px 40px rgba(0,0,0,0.2);
            }
            .card img {
                width: 100%;
                height: 60%; 
                object-fit: cover; 
            }
            .card-body {
                padding: 15px;
                flex-grow: 1; 
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;
            }
            .card-title {
                font-family: 'Arial', sans-serif;
                font-size: 1.5rem; /* حجم أكبر للعناوين */
                color: #333;
                margin-bottom: 10px;
            }
            .card-text {
                font-size: 1rem;
                color: #666;
                flex-grow: 1;
            }
            .select-package {
                width: 100%;
                margin-top: 20px;
                background-color: #28a745; 
                color: white;
                border: none;
                border-radius: 5px; 
                padding: 10px;
                transition: background-color 0.3s; 
                font-weight: bold; 
                cursor: pointer;
            }
            .select-package:hover {
                background-color: #218838; 
            }
            .swiper-container {
                width: 100%;
                padding-top: 20px;
                padding-bottom: 50px;
            }
            .swiper-slide {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .swiper-button-next {
            background-color: #00b64a00;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            }
            .swiper-button-prev {
            background-color: #00b64a00;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            }  
            /* تحسين التجاوب */
            @media (max-width: 768px) {
                .card {
                    max-width: 90%;
                    min-height: 400px;
                }
                .card-title {
                    font-size: 1.3rem;
                }
                .card-text {
                    font-size: 0.95rem;
                }
                .select-package {
                    padding: 8px;
                    margin-top: 15px;
                }
            }

            @media (max-width: 480px) {
                .card {
                    max-width: 100%;
                    min-height: 350px;
                }
                .card-title {
                    font-size: 1.1rem;
                }
                .card-text {
                    font-size: 0.9rem;
                }
                .select-package {
                    padding: 6px;
                    margin-top: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    } 
}

function make_slider_readonly(frm) {
    // إعادة تحميل السلايدر ليعرض الحزمة المختارة فقط وتعطيل التنقل
    load_packages(frm);
    
}
   