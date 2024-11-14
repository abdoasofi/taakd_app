# verification_instructions_request.py
import frappe
from frappe.model.document import Document
from frappe.utils.file_manager import save_file
from frappe import _

class VerificationInstructionsRequest(Document):
    """Document class for Verification Instructions Request."""
    
    def before_save(self):
        self.add_full_name()

    def add_full_name(self) -> None:
        middle_name = self.middle_name or ""
        self.full_name = f"{self.first_name} {middle_name} {self.last_name}" 

    def on_submit(self):
        """Hook that runs when the document is submitted."""
        create_applicant_report(self)


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
        
        frappe.log_error(message=f"Received employment_id: {employment_id}", title="Upload Verification File")

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
        # الحصول على رابط الملف
        file_url = file_doc.file_url
        frappe.log_error(message=f"Uploaded file URL: {file_url}", title="Upload Verification File")

        # الحصول على الوثيقة الرئيسية
        parent_doc = frappe.get_doc(doctype, docname)
        frappe.log_error(message=f"Parent Doc: {parent_doc.name}", title="Upload Verification File")

        # العثور على السجل الفرعي بناءً على `employment_id` في حقل 'employment_id'
        child_doc = next((child for child in parent_doc.get(parentfield, []) if child.employment_id == employment_id), None)
        
        frappe.log_error(message=f"Found child_doc: {child_doc}", title="Upload Verification File")

        if not child_doc:
            frappe.throw(_("Employment record not found."))

        # تحديث حقل الملف في السجل الفرعي
        child_doc.file = file_url
        child_doc.save()
        parent_doc.save()
        frappe.db.commit()

        frappe.log_error(message=f"File successfully linked to employment_id: {employment_id}", title="Upload Verification File")

        return {"status": "success", "file_url": file_url}

    except Exception as e:
        frappe.log_error(message=str(e), title="File Upload Error")
        return {"status": "error", "message": _("An error occurred while uploading the file. Please try again.")}

def create_applicant_report(doc):
    """Create a new applicant report based on the verification instructions request."""
    applicant_report = frappe.get_doc({
        "doctype": "Applicant Report",
        "verification_instructions_request": doc.name,
        "employer_name": doc.employer_name,
        "first_name": doc.first_name,
        "last_name": doc.last_name,
        "middle_name": doc.middle_name,
        "dont_middle_name": doc.dont_middle_name,
        "suffix": doc.suffix,
        "email": doc.email,
        "from_time": doc.from_time,
        "to_time": doc.to_time,
        "country": doc.country,
        "date_of_birth": doc.date_of_birth,
        "country_now": doc.country_now,
        "city": doc.city,
        "governorate": doc.governorate,
        "zip_code": doc.zip_code,
        "location_text": doc.location_text,
        "street_address": doc.street_address,
        "date_living_address": doc.date_living_address,
        "full_name": doc.full_name,
        "electronic_signature": doc.electronic_signature,
        "email_address": doc.email_address,
        "sales_invoice": doc.sales_invoice,
        "payment_status": doc.payment_status,
        "aliases_section": [],
        "phone": [],
        "education_information": [],
        "employment_history": [],
        "professional_qualification": [],
         
    })

    # Copying data from child table `aliases_section`
    for aliases in doc.alias_name:
        child_aliases = {
            "first_name": aliases.first_name,
            "middle_name": aliases.middle_name
        }
        applicant_report.append("alias_name", child_aliases)
        
    # Copying data from child table `phone`
    for ph in doc.phone:
        child_ph = {
            "phone": ph.phone,
        }
        applicant_report.append("phone", child_ph) 
               
    # Copying data from child table `education_information`
    for entry in doc.education_information:
        child_entry = {
            "name_of_school_or_college_university": entry.name_of_school_or_college_university,
            "country": entry.country,
            "city": entry.city,
            "governorate": entry.governorate,
            "location_text": entry.location_text,
            "from_date": entry.from_date,
            "end_date": entry.to_date,  # التأكد من أسماء الحقول
            "field_of_study_or_major": entry.field_of_study_or_major,
            "phone": entry.phone,
            "Ext": entry.ext,
            "diploma": entry.diploma,
            "another_name": entry.another_name
        }
        applicant_report.append("education_information", child_entry)
        
    # Copying data from child table `employment_history`
    for ei in doc.employment_history:
        child_ei = {
            "company": ei.company,
            "continuous": ei.continuous,
            "country": ei.country,
            "city": ei.city,
            "governorate": ei.governorate,
            "location_text": ei.location_text,
            "from_date": ei.from_date,
            "end_date": ei.end_date,
            "name_of_your_employer": ei.name_of_your_employer,
            "phone": ei.phone,
            "Ext": ei.ext,
            "type_of_employment": ei.type_of_employment,
            "contact_the_employer": ei.contact_the_employer,  # تم إزالة الفواصل
            "issuing_salary": ei.issuing_salary,  # تم إزالة الفواصل
            "activity_has_stopped": ei.activity_has_stopped,  # تم إزالة الفواصل
            "the_company_has_different_names": ei.the_company_has_different_names,  # تم إزالة الفواصل
            "different_company_names": ei.different_company_names,  # تم إزالة الفواصل
            "official_job_title_held_currently": ei.official_job_title_held_currently,  # تم إزالة الفواصل
            "you_have_a_nickname": ei.you_have_a_nickname,  # تم تصحيح الاسم وإزالة الفواصل
            "nickname": ei.nickname,  # تم إزالة الفواصل
            "file": ei.file,  # تم إزالة الفواصل
            "employment_id": ei.employment_id  # تم إزالة الفواصل
        }
        applicant_report.append("employment_history", child_ei)                

    # Copying data from child table `professional_qualification`
    for pq in doc.professional_qualification:
        child_pq = {
            "awarding_body": pq.awarding_body,
            "license_or_certificate_number": pq.license_or_certificate_number,
            "date_awarded": pq.date_awarded,
            "your_name_varies": pq.your_name_varies,
            "award_name_description": pq.award_name_description,
            "issuing_country": pq.issuing_country,
            "is_an_expiration_date": pq.is_an_expiration_date,
            "expiration_date": pq.expiration_date
        }
        applicant_report.append("professional_qualification", child_pq)
        
    # Insert the new applicant report
    applicant_report.insert()
    frappe.db.commit()  # Ensure the record is saved
    doc.db_set("applicant_report", applicant_report.name)