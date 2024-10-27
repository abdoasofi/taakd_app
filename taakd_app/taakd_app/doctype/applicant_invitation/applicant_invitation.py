# Copyright (c) 2024, Asofi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

class ApplicantInvitation(Document):
    def before_save(self):
        self.add_company_information()
        self.add_full_name()
        self.package_price = self.get_item_price(self.package)
        self.other_services_price = self.sum_other_services_price()
        self.sum_total_price()

    def on_submit(self):
        self.create_user()
        
        if self.payd_from == "Employee":
            # Create or retrieve the individual Customer
            customer_doc = self.create_customer(
                customer_name=self._full_name, 
                customer_type="Individual",
                email=self.email, 
                customer_group="Applicants"
            )
        else:
            # Create or retrieve the company Customer
            customer_doc = self.create_customer(
                customer_name=self.company_name, 
                customer_type="Company",
                email=self.company_email, 
                customer_group="Companies"
            )
        customer_name = customer_doc.name                       
        # Now create the Sales Invoice with the correct Customer identifier
        sales_invoice_name = self.create_sales_invoice(customer_name)
        
        # Proceed to create Verification Instructions Request
        self.create_verification_instructions_request(sales_invoice_name)

    def on_cancel(self):
        pass    
    
    def validate(self):
        self.ensure_unique_other_services()
    
    def ensure_unique_other_services(self):
        """
        يتحقق من عدم تكرار اختيار نفس Product Bundle في جدول Customer Packages.
        """
        other_services = [os.service for os in self.other_services if os.service]
        if len(other_services) != len(set(other_services)):
            frappe.throw(_("لا يمكن اختيار نفس service أكثر من مرة."))
             
    def add_full_name(self):
        middle_name = self.middle_name or ""
        self._full_name = f"{self.first_name} {middle_name} {self.last_name}"  

    def add_company_information(self):
        user = frappe.get_doc("User", frappe.session.user)
        self.company_name = user.full_name
        if user.full_name == "Administrator":
            self.company_email = "administrator" 
        else:
            self.company_email = user.email

    def create_user(self):
        if frappe.db.exists("User", {"email": self.email}):
            return frappe.get_doc("User", {"email": self.email})
        else:
            new_doc = frappe.new_doc("User")
            new_doc.email = self.email
            new_doc.first_name = self.first_name
            new_doc.last_name = self.last_name
            new_doc.middle_name = self.middle_name or ""
            new_doc.enabled = True
            new_doc.language = self.language
            new_doc.module_profile = ""
            new_doc.role_profile_name = "Applicant"
            new_doc.insert(ignore_permissions=True)
            return new_doc   

    def create_customer(self, customer_name, customer_type, email, customer_group):
        """Creates a Customer if not exists and returns the Customer document.

        Args:
            customer_name (str): The name of the customer.
            customer_type (str): Type of customer. Accepted values: "Individual", "Company".
            email (str): The email of the customer.
            customer_group (str): The customer group. E.g., "Applicants", "Companies".
            
        Returns:
            doc: A Frappe Customer document.
        """
        filters = {"customer_name": customer_name, "email": email}
        if frappe.db.exists("Customer", filters):
            frappe.logger().debug(f"Customer '{customer_name}' already exists.")
            customer_doc = frappe.get_doc("Customer", filters)
        else:
            new_doc = frappe.new_doc("Customer")
            new_doc.customer_name = customer_name
            new_doc.customer_type = customer_type
            new_doc.customer_group = customer_group
            new_doc.email = email
            new_doc.insert(ignore_permissions=True)
            customer_doc = new_doc
            frappe.logger().debug(f"Customer Created: {customer_doc.name}")
        
        return customer_doc
                
    def create_verification_instructions_request(self, sales_invoice_name):
        new_doc = frappe.new_doc("Verification Instructions Request")
        new_doc.payd_from = self.payd_from
        new_doc.user_id = self.email
        new_doc.company_submitting_application = self.company_email
        new_doc.language = self.language
        new_doc.sales_invoice = sales_invoice_name
        new_doc.insert(ignore_permissions=True)
        return new_doc  
    
    def create_sales_invoice(self, customer):
        if not customer:
            frappe.throw(_("Customer is not set. Cannot create Sales Invoice."))   

        # التحقق من قيمة cumulative_invoice و payd_from
        if self.cumulative_invoice == 1 and self.payd_from == "Company":
            existing_invoice = self.get_existing_draft_invoice(customer)
            if existing_invoice:
                # إذا وجدت فاتورة مسودة، نضيف إليها الأصناف الجديدة مع تجديع الأصناف المتشابهة
                sales_invoice = frappe.get_doc("Sales Invoice", existing_invoice)
                self.preparing_the_sales_invoice(self.other_services, sales_invoice)
                sales_invoice.save(ignore_permissions=True)
                frappe.db.commit()  # التأكد من حفظ التغييرات
                return sales_invoice.name
            else:
                # إذا لم توجد فاتورة مسودة، ننشئ فاتورة جديدة
                sales_invoice = frappe.get_doc({
                    "doctype": "Sales Invoice",
                    "customer": customer,
                })
                self.preparing_the_sales_invoice(self.other_services, sales_invoice)
                sales_invoice.save(ignore_permissions=True)
                frappe.db.commit()
                return sales_invoice.name
        else:
            # السلوك الحالي لإنشاء فاتورة جديدة
            sales_invoice = frappe.get_doc({
                "doctype": "Sales Invoice",
                "customer": customer,
            })
            self.preparing_the_sales_invoice(self.other_services, sales_invoice)
            sales_invoice.save(ignore_permissions=True)
            frappe.db.commit()
            return sales_invoice.name

    def get_existing_draft_invoice(self, customer):
        """يبحث عن فاتورة مبيعات مسودة للشركة المحددة.

        Args:
            customer (str): اسم العميل.

        Returns:
            str or None: اسم الفاتورة المسودة إذا وجدت، وإلا None.
        """
        invoice = frappe.db.get_value(
            "Sales Invoice",
            {
                "customer": customer,
                "docstatus": 0  # 0 تعني المسودة
            },
            "name",
            order_by="creation desc"  # للحصول على أحدث فاتورة
        )
        return invoice

    def preparing_the_sales_invoice(self, list_items, sales_invoice):
        if self.package:
            self.add_or_update_item(sales_invoice, self.package, qty=1, uom="Nos")
        for i in list_items:
            is_stock_item = frappe.get_value("Item", i.service, "is_stock_item")
            if is_stock_item:
                self.add_or_update_item(sales_invoice, i.service, qty=1, uom="Nos")

    def add_or_update_item(self, sales_invoice, item_code, qty, uom):
        """
        يضيف صنفًا إلى الفاتورة أو يحدث الكمية إذا كان الصنف موجودًا بالفعل.

        Args:
            sales_invoice (Document): وثيقة فاتورة المبيعات.
            item_code (str): كود الصنف.
            qty (float): الكمية المراد إضافتها.
            uom (str): وحدة القياس.
        """
        # البحث عن الصنف في الفاتورة الحالية
        existing_item = None
        for item in sales_invoice.items:
            if item.item_code == item_code:
                existing_item = item
                break
        
        if existing_item:
            # زيادة الكمية إذا الصنف موجود بالفعل
            existing_item.qty += qty
            frappe.logger().debug(f"Item '{item_code}' exists. Increasing qty to {existing_item.qty}.")
        else:
            # إضافة الصنف كعنصر جديد إذا لم يكن موجودًا
            sales_invoice.append(
                "items",
                {
                    "item_code": item_code,
                    "qty": qty,
                    "uom": uom,
                },
            )
            frappe.logger().debug(f"Adding new item '{item_code}' with qty {qty}.")

    def get_item_price(self, item):
        try:
            price_data = frappe.db.get_list(
                "Item Price",
                fields=['price_list_rate'],
                filters={'item_code': item},
                limit=1
            )
            if price_data:
                return float(price_data[0].price_list_rate)
            else:
                frappe.log_error(
                    _("Price not found for item: {0}").format(item),
                    "ApplicantInvitation: get_item_price"
                )
                return 0.0  # Return a default value instead of None
        except Exception as e:
            frappe.log_error(
                _("Error fetching price for item {0}: {1}").format(item, str(e)),
                "ApplicantInvitation: get_item_price"
            )
            return 0.0  # Return a default value instead of None

    def sum_other_services_price(self):
        sum_other_services_price = 0.0
        if self.other_services:
            for i in self.other_services:
                service_price = self.get_item_price(i.service)
                if service_price is not None:
                    sum_other_services_price += service_price
                else:
                    frappe.log_error(
                        _("Service price for {0} returned None.").format(i.service),
                        "ApplicantInvitation: sum_other_services_price"
                    )
        return sum_other_services_price

    def sum_total_price(self):
        other_services_price = self.sum_other_services_price() or 0.0
        package_price = self.get_item_price(self.package) or 0.0
        self.total_price = other_services_price + package_price

    @frappe.whitelist()
    def get_filtered_item_codes(self):
        try:
            parent = self.package 
            item_codes = frappe.db.sql_list(
                """
                SELECT item_code
                FROM `tabProduct Bundle Item`
                WHERE parent = %s
                """, (parent,)  # Ensure the parameter is a tuple
            )
            return item_codes
        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "Error in get_filtered_item_codes")
            return []  # Return an empty list on error