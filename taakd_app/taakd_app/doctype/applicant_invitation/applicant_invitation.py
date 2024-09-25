# Copyright (c) 2024, Asofi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _

class ApplicantInvitation(Document):
	sales_invoice_name =""
	def before_save(self):
		self.add_company_information()
		self.add_full_name()
		
	def on_submit(self):
		self.create_user()
		if self.payd_from == "Employee":
			self.create_sales_invoice(self._full_name)
			self.create_customer()
		else:
			print("#"*40,self.company_name)
			self.create_sales_invoice(self.company_name)
			

	def on_cancel(self):
		pass	

	def add_full_name(self):
		middle_name = self.middle_name
		if self.middle_name == None: 
			middle_name = ""
		self._full_name = f"{self.first_name} {middle_name} {self.last_name}"  

	def add_company_information(self):
		user = frappe.get_doc("User", frappe.session.user)
		self.db_set("company_name",user.full_name)
		if user.full_name == "Administrator":
			self.db_set("company_email","administrator") 
		else :
			self.db_set("company_email",user.email)

	def create_user(self):
		if frappe.db.exists("User", {"email":self.email}):
			return True 
		else:
			new_doc = frappe.new_doc("User")
			new_doc.email = self.email
			new_doc.first_name = self.first_name
			new_doc.last_name = self.last_name
			new_doc.middle_name = self.middle_name
			new_doc.enabled = True
			new_doc.language = self.language
			new_doc.module_profile = ""
			new_doc.role_profile_name = "Applicant"
			new_doc.insert(ignore_permissions = True)
			return new_doc   

	def create_customer(self):
		if frappe.db.exists("Customer", {"customer_name":self._full_name}):
			return True 
		else:
			new_doc = frappe.new_doc("Customer")
			new_doc.email = self.email
			new_doc.customer_name = self._full_name
			new_doc.customer_type = "Individual"
			new_doc.customer_group = "Applicants"
			new_doc.insert(ignore_permissions = True)
			return new_doc  
		
	def create_verification_instructions_request(self):
		new_doc = frappe.new_doc("Verification Instructions Request")
		new_doc.payd_from = self.payd_from
		new_doc.user_id = self.email
		new_doc.company_submitting_application = self.company_email
		new_doc.language = self.language
		new_doc.application_status = "Job Request"
		# new_doc.sales_invoice = sales_invoice_name
		new_doc.insert(ignore_permissions = True)
		return new_doc  

	def create_sales_invoice(self,customer):
			if not customer:
				frappe.throw(_("Customer is not set. Cannot create Sales Invoice.") )   
			sales_invoice = frappe.get_doc(
				{
					"doctype": "Sales Invoice",
					"customer": customer,
				}
			)
			self.preparing_the_sales_invoice(self.other_services, sales_invoice)
			sales_invoice.save(ignore_permissions = True)
			sales_invoice_name = sales_invoice.name
			
	

	def preparing_the_sales_invoice(self, list_items, sales_invoice):
		for i in list_items:
			is_stock_item = frappe.get_value("Item", i.service, "is_stock_item")
			if is_stock_item:
				sales_invoice.append(
					"items",
					{
						"item_code": i.service,
						"qty": 1,
						"uom":"Nos",
					},
				)
			elif bundle := frappe.db.exists("Product Bundle", {"new_item_code": i.service}):
				self.preparing(bundle, sales_invoice)
		if self.package:
			self.preparing(self.package, sales_invoice)   

	def preparing(self, bundle, sales_invoice):
		bundle = frappe.get_doc("Product Bundle", bundle)
		for b_i in bundle.items:
			sales_invoice.append(
				"items",
				{
					"item_code": b_i.item_code,
					"qty": 1,
					"uom":"Nos",
				},
			)
   
	def get_sales_invoice_name (sales_invoice):
		sales_invoice_name = sales_invoice._full_name
		return sales_invoice_name