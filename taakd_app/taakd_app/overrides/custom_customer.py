from erpnext.selling.doctype.customer.customer import Customer
import frappe
from frappe import _, msgprint

class CustomCustomer(Customer):
    def after_insert(self):
        self.create_user()
        self.manage_user_permissions()

    def on_update(self):
        self.manage_user_permissions()
        self.update_cumulative_invoice_on_user()
        
    def validate(self):
        super(CustomCustomer, self).validate()
        self.ensure_unique_product_bundles()
    
    def ensure_unique_product_bundles(self):
        """
        يتحقق من عدم تكرار اختيار نفس Product Bundle في جدول Customer Packages.
        """
        selected_packages = [pkg.package for pkg in self.customer_packages if pkg.package]
        if len(selected_packages) != len(set(selected_packages)):
            frappe.throw(_("لا يمكن اختيار نفس Product Bundle أكثر من مرة."))
            
    def create_user(self):
        if frappe.db.exists("User", {"email": self.email}):
            return frappe.get_doc("User", {"email": self.email})
        else:
            new_doc = frappe.new_doc("User")
            new_doc.email = self.email
            new_doc.cumulative_invoice = self.cumulative_invoice
            new_doc.first_name = self.customer_name
            new_doc.enabled = True
            new_doc.module_profile = ""
            new_doc.role_profile_name = "Company"
            new_doc.insert(ignore_permissions=True)
            return new_doc
        
    def update_cumulative_invoice_on_user(self):
        user = self.get_user()
        user.cumulative_invoice = self.cumulative_invoice
        user.save()
        
    def manage_user_permissions(self):
        """
        تدير User Permissions بناءً على Product Bundles الموجودة في Customer Packages.
        تقوم بإنشاء Permissions جديدة وإزالة Permissions القديمة إذا لزم الأمر.
        """
        user = self.get_user()
        if not user:
            frappe.throw(_("لم يتم العثور على مستخدم مرتبط بالعميل."))

        # الحصول على قائمة Product Bundles الحالية المرتبطة بالعميل
        current_packages = [cp.package for cp in self.customer_packages if cp.package]

        # الحصول على قائمة Product Bundles الحالية في User Permissions
        existing_permissions = frappe.get_all(
            "User Permission",
            filters={
                "user": user.name,
                "allow": "Product Bundle"
            },
            fields=["for_value"]
        )
        existing_package_values = [perm.for_value for perm in existing_permissions]

        # تحديد الحزم الجديدة التي يجب إضافتها
        packages_to_add = set(current_packages) - set(existing_package_values)
        # تحديد الحزم القديمة التي يجب إزالتها
        packages_to_remove = set(existing_package_values) - set(current_packages)

        # إنشاء User Permissions جديدة
        for package in packages_to_add:
            self.create_user_permission(user, package)

        # حذف User Permissions القديمة
        for package in packages_to_remove:
            self.delete_user_permission(user, package)

    def get_user(self):
        """
        يسترجع User المرتبط بالعميل بناءً على البريد الإلكتروني.
        """
        if frappe.db.exists("User", {"email": self.email}):
            return frappe.get_doc("User", {"email": self.email})
        return None

    def create_user_permission(self, user, product_bundle):
        """
        ينشئ User Permission معين لمستخدم ولتطبيق Product Bundle محدد.

        Args:
            user (frappe.core.doctype.user.user.User): مستند User.
            product_bundle (str): اسم Product Bundle.
        """
        try:
            user_permission = frappe.get_doc({
                "doctype": "User Permission",
                "user": user.name,
                "allow": "Product Bundle",
                "for_value": product_bundle,
                "is_default": 0  # أو 1 إذا كنت تريد جعل هذا Permission هو الافتراضي
            })
            user_permission.insert(ignore_permissions=True)
            frappe.db.commit()
            frappe.msgprint(_("تم إنشاء User Permission لـ {0} للمستخدم {1}.").format(product_bundle, user.email))
        except Exception as e:
            frappe.log_error(message=frappe.get_traceback(), title="Error Creating User Permission")
            frappe.throw(_("حدث خطأ أثناء إنشاء User Permission لـ {0}.").format(product_bundle))

    def delete_user_permission(self, user, product_bundle):
        """
        يحذف User Permission معين لمستخدم ولتطبيق Product Bundle محدد.

        Args:
            user (frappe.core.doctype.user.user.User): مستند User.
            product_bundle (str): اسم Product Bundle.
        """
        try:
            permissions = frappe.get_all(
                "User Permission",
                filters={
                    "user": user.name,
                    "allow": "Product Bundle",
                    "for_value": product_bundle
                }
            )
            for perm in permissions:
                perm_doc = frappe.get_doc("User Permission", perm.name)
                perm_doc.delete()
            frappe.db.commit()
            frappe.msgprint(_("تم حذف User Permission لـ {0} للمستخدم {1}.").format(product_bundle, user.email))
        except Exception as e:
            frappe.log_error(message=frappe.get_traceback(), title="Error Deleting User Permission")
            frappe.throw(_("حدث خطأ أثناء حذف User Permission لـ {0}.").format(product_bundle))
            
            
            