# verification_instructions_request.py
import frappe
from frappe.model.document import Document
from frappe.utils.file_manager import save_file
from frappe import _

class VerificationInstructionsRequest(Document):
    """Document class for Verification Instructions Request."""
    
    def before_save(self):
        pass
    #     """Hook that runs before saving the document."""
    #     self.add_full_name()

    # def add_full_name(self) -> None:
    #     """Constructs the full name from individual name fields."""
    #     parts = [self.first_name]
    #     if self.middle_name:
    #         parts.append(self.middle_name)
    #     parts.append(self.last_name)
    #     self.full_name = " ".join(parts)


@frappe.whitelist()
def upload_verification_file():
    try:
        # الحصول على البيانات المرسلة من الطلب
        doctype = frappe.form_dict.get('doctype')
        docname = frappe.form_dict.get('docname')
        fieldname = frappe.form_dict.get('fieldname')
        parentfield = frappe.form_dict.get('parentfield')
        employment_id = frappe.form_dict.get('employment_id')  # الحصول على معرف التوظيف
        filedata = frappe.request.files.get('filedata')
        
        # التحقق من توفر جميع المعاملات المطلوبة
        if not all([doctype, docname, fieldname, parentfield, employment_id, filedata]):
            frappe.throw(_("Missing required parameters."))

        # التحقق من صلاحيات المستخدم
        if not frappe.has_permission(doctype, "write", doc=docname):
            frappe.throw(_("You do not have permission to modify this document."))

        # قراءة محتوى الملف
        file_content = filedata.read()

        # حفظ الملف في Frappe
        file_doc = save_file(
            fname=filedata.filename,
            content=file_content,
            dt=doctype,
            dn=docname,
            df=fieldname,
            folder=None,
            decode=False,
            is_private=0,
        )
        print("************* file_doc.file_url *********************** ",file_doc.file_url)
        # الحصول على رابط الملف
        file_url = file_doc.file_url
        print("************* file_url *********************** ",file_url)
        # الحصول على الوثيقة الرئيسية
        parent_doc = frappe.get_doc(doctype, docname)
        print("************* parent_doc *********************** ",parent_doc)
        # العثور على السجل الفرعي بناءً على `employment_id` في حقل 'employment_id'
        child_doc = next((child for child in parent_doc.get(parentfield, []) if child.employment_id == employment_id), None)
        
        print("************* child.employment_id == employment_id *********************** ",child_doc.employment_id, employment_id)
        if not child_doc:
            frappe.throw(_("Employment record not found."))

        # تحديث حقل الملف في السجل الفرعي
        print("************* child_doc.file  *********************** ",child_doc.file )
        child_doc.file = file_url
        print("************* child_doc.file  *********************** ",child_doc.file )
        child_doc.save()
        parent_doc.save()
        frappe.db.commit()

        return {"status": "success", "file_url": file_url}

    except Exception as e:
        frappe.log_error(message=str(e), title="File Upload Error")
        return {"status": "error", "message": _("An error occurred while uploading the file. Please try again.")}